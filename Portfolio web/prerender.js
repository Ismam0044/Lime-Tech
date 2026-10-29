// Writes a fully rendered HTML file for every page into dist/, so search engines and AI crawlers
// see the real content without running JavaScript. Runs after the client and server builds.
import { readFileSync, rmSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('./dist/', import.meta.url));
const serverDir = fileURLToPath(new URL('./dist-server/', import.meta.url));
const { render, pageHead, routePaths } = await import(new URL('./dist-server/entry-server.js', import.meta.url));
const template = readFileSync(dist + 'index.html', 'utf8');

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const setContent = (html, selector, value) => {
  const pattern = new RegExp(`(<meta ${selector} content=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error('index.html is missing <meta ' + selector + '>');
  return html.replace(pattern, (_, start, end) => start + escapeAttr(value) + end);
};

function renderPage(path) {
  const head = pageHead(path);
  let html = template.replace('<div id="root"></div>', () => `<div id="root">${render(path)}</div>`);
  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeAttr(head.title)}</title>`);
  html = setContent(html, 'name="description"', head.description);
  html = setContent(html, 'property="og:title"', head.title);
  html = setContent(html, 'property="og:description"', head.description);
  const extra = head.url
    ? `<meta property="og:url" content="${head.url}" />\n    <link rel="canonical" href="${head.url}" />`
    : `<meta name="robots" content="${head.robots}" />`;
  return html.replace('</head>', () => `    ${extra}\n  </head>`);
}

function write(file, html) {
  mkdirSync(dirname(dist + file), { recursive: true });
  writeFileSync(dist + file, html);
}

// vercel.json's cleanUrls serves /services/erp from services/erp.html.
for (const path of routePaths) write(path === '/' ? 'index.html' : path.slice(1) + '.html', renderPage(path));
// Vercel serves 404.html, with a 404 status, for any URL without a matching file.
write('404.html', renderPage('/404'));
rmSync(serverDir, { recursive: true, force: true });
console.log(`Pre-rendered ${routePaths.length} pages and 404.html`);

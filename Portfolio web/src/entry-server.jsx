import { renderToString } from 'react-dom/server';
import SiteApp, { pageHead, routePaths } from './SiteApp.jsx';

export { pageHead, routePaths };

export function render(path) {
  return renderToString(<SiteApp path={path} />);
}

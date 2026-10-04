import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCore() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    } catch {
      return undefined;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 20);
    camera.position.set(0, 0, 4.25);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const core = new THREE.Group();
    scene.add(core);

    const uniforms = { uTime: { value: 0 } };
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vPosition;
        void main() {
          vec3 p = position;
          float ripple = sin(position.x * 7.0 + uTime * 0.42) * sin(position.y * 6.0 - uTime * 0.32);
          p += normal * ripple * 0.018;
          vec4 viewPosition = modelViewMatrix * vec4(p, 1.0);
          vNormal = normalize(normalMatrix * normal);
          vViewPosition = -viewPosition.xyz;
          vPosition = p;
          gl_Position = projectionMatrix * viewPosition;
        }
      `,
      fragmentShader: `
        #include <tonemapping_pars_fragment>
        #include <colorspace_pars_fragment>
        uniform float uTime;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        varying vec3 vPosition;
        void main() {
          vec3 n = normalize(vNormal);
          vec3 viewDirection = normalize(vViewPosition);
          float fresnel = pow(1.0 - max(dot(n, viewDirection), 0.0), 2.25);
          float current = 0.5 + 0.5 * sin(vPosition.y * 9.0 + sin(vPosition.x * 6.0 + uTime * 0.3) * 0.65 - uTime * 0.38);
          float bands = smoothstep(0.78, 0.99, current) * 0.34;
          float light = max(dot(n, normalize(vec3(-0.48, 0.72, 0.62))), 0.0);
          vec3 deep = vec3(0.035, 0.12, 0.085);
          vec3 lime = vec3(0.55, 0.86, 0.19);
          vec3 color = mix(deep, lime, bands + light * 0.22);
          color += vec3(0.62, 0.95, 0.25) * fresnel * 0.9;
          gl_FragColor = vec4(color, 1.0);
          #include <tonemapping_fragment>
          #include <colorspace_fragment>
        }
      `,
    });

    const orbGeometry = new THREE.IcosahedronGeometry(0.72, 5);
    const orb = new THREE.Mesh(orbGeometry, coreMaterial);
    core.add(orb);

    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.755, 2),
      new THREE.MeshBasicMaterial({ color: 0xb5e44a, wireframe: true, transparent: true, opacity: 0.14 })
    );
    core.add(wire);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xb5e44a, transparent: true, opacity: 0.64 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.96, 0.006, 8, 180), ringMaterial);
    ring.rotation.set(1.03, 0.15, -0.28);
    core.add(ring);

    const secondRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.02, 0.003, 6, 180),
      new THREE.MeshBasicMaterial({ color: 0xd8efaa, transparent: true, opacity: 0.3 })
    );
    secondRing.rotation.set(0.38, 0.9, 0.15);
    core.add(secondRing);

    const particleCount = 76;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const height = Math.random() * 1.7 - 0.85;
      const radius = 0.83 + Math.random() * 0.36;
      const ringRadius = Math.sqrt(1 - height * height);
      positions[i * 3] = Math.cos(angle) * ringRadius * radius;
      positions[i * 3 + 1] = height * radius;
      positions[i * 3 + 2] = Math.sin(angle) * ringRadius * radius;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xd2f18b, size: 0.018, transparent: true, opacity: 0.78, sizeAttenuation: true })
    );
    core.add(particles);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 300 ? 4.6 : 4.25;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    let frame = 0;
    let elapsed = 0;
    let pointerX = 0;
    let pointerY = 0;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animate = () => {
      frame = 0;
      elapsed += 0.01;
      uniforms.uTime.value = elapsed;
      core.rotation.y += (pointerX * 0.16 + Math.sin(elapsed * 0.22) * 0.06 - core.rotation.y) * 0.025;
      core.rotation.x += (-pointerY * 0.12 + Math.cos(elapsed * 0.18) * 0.035 - core.rotation.x) * 0.025;
      ring.rotation.z += 0.0018;
      secondRing.rotation.y -= 0.0011;
      renderer.render(scene, camera);
      if (!motionQuery.matches) frame = window.requestAnimationFrame(animate);
    };
    const onPointerMove = (event) => {
      const bounds = host.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    const onMotionChange = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      if (motionQuery.matches) renderer.render(scene, camera);
      else if (!frame) frame = window.requestAnimationFrame(animate);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    host.addEventListener('pointermove', onPointerMove, { passive: true });
    motionQuery.addEventListener?.('change', onMotionChange);
    resize();
    if (!motionQuery.matches) frame = window.requestAnimationFrame(animate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener('pointermove', onPointerMove);
      motionQuery.removeEventListener?.('change', onMotionChange);
      orbGeometry.dispose();
      coreMaterial.dispose();
      wire.geometry.dispose();
      wire.material.dispose();
      ring.geometry.dispose();
      ring.material.dispose();
      secondRing.geometry.dispose();
      secondRing.material.dispose();
      particleGeometry.dispose();
      particles.material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="three-core" ref={hostRef} aria-hidden="true" />;
}

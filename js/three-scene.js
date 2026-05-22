// ===== THREE.JS 3D SCENE =====
(function () {
  const canvas = document.getElementById('bg-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 30);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  // ---- FLOATING PARTICLES ----
  const particleCount = 1800;
  const positions = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);
  const colors = new Float32Array(particleCount * 3);

  const c1 = new THREE.Color('#4f8ef7');
  const c2 = new THREE.Color('#a855f7');
  const c3 = new THREE.Color('#06d6a0');

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 120;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    sizes[i] = Math.random() * 2 + 0.5;
    const mix = Math.random();
    const col = mix < 0.4 ? c1 : mix < 0.7 ? c2 : c3;
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ---- WIREFRAME FLOATING SHAPES ----
  const shapes = [];

  function createWireShape(geometry, color, x, y, z) {
    const mat = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.12 });
    const mesh = new THREE.Mesh(geometry, mat);
    mesh.position.set(x, y, z);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    scene.add(mesh);
    return mesh;
  }

  shapes.push(createWireShape(new THREE.IcosahedronGeometry(4, 1),  0x4f8ef7, -18,  5, -10));
  shapes.push(createWireShape(new THREE.OctahedronGeometry(3, 0),   0xa855f7,  20, -4,  -8));
  shapes.push(createWireShape(new THREE.TorusGeometry(3, 0.8, 8, 20), 0x06d6a0, -8, -12, -15));
  shapes.push(createWireShape(new THREE.TetrahedronGeometry(3, 0),  0x4f8ef7,  15, 10, -12));
  shapes.push(createWireShape(new THREE.IcosahedronGeometry(2, 0),  0xa855f7, -24, -8,  -5));
  shapes.push(createWireShape(new THREE.OctahedronGeometry(2, 0),   0x06d6a0,  22,  8,  -6));

  // ---- GLOWING RINGS ----
  const rings = [];
  function createRing(radius, color, x, y, z) {
    const geo = new THREE.TorusGeometry(radius, 0.05, 4, 64);
    const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.15 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;
  }
  rings.push(createRing(8,  0x4f8ef7,  0, 0, -20));
  rings.push(createRing(5,  0xa855f7, -10, 5, -15));
  rings.push(createRing(6,  0x06d6a0,  12, -5, -18));

  // ---- MOUSE PARALLAX ----
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.3;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
  });

  // ---- SCROLL EFFECT ----
  let scrollY = 0;
  window.addEventListener('scroll', () => { scrollY = window.scrollY; });

  // ---- RESIZE ----
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // ---- ANIMATE ----
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Smooth mouse follow
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;
    camera.position.x = targetX * 8;
    camera.position.y = -targetY * 4 - scrollY * 0.008;
    camera.lookAt(0, -scrollY * 0.008, 0);

    // Rotate particles
    particles.rotation.y = t * 0.04;
    particles.rotation.x = t * 0.02;

    // Animate shapes
    shapes.forEach((s, i) => {
      s.rotation.x += 0.003 + i * 0.0005;
      s.rotation.y += 0.004 + i * 0.0003;
      s.position.y += Math.sin(t * 0.4 + i) * 0.008;
    });

    // Animate rings
    rings.forEach((r, i) => {
      r.rotation.x = t * 0.2 + i;
      r.rotation.z = t * 0.15 + i;
    });

    renderer.render(scene, camera);
  }

  animate();
})();

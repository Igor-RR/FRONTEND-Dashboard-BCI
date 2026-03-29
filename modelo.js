// =============================
// IMPORTS (MESMA VERSÃO - CRÍTICO)
// =============================

import * as THREE from 'https://unpkg.com/three@0.152.2/build/three.module.js';

import { GLTFLoader } from 'https://unpkg.com/three@0.152.2/examples/jsm/loaders/GLTFLoader.js?module';


// =============================
// DEBUG INICIAL
// =============================

console.log("SCRIPT CARREGOU");


// =============================
// CONTAINER (DIV DO HTML)
// =============================

const container = document.getElementById("cerebro-3d");
console.log("Container:", container);


// =============================
// CENA
// =============================

const scene = new THREE.Scene();


// =============================
// CÂMERA
// =============================

const camera = new THREE.PerspectiveCamera(
  75,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);


// =============================
// RENDERER
// =============================

const renderer = new THREE.WebGLRenderer({ antialias: true, aplha:true });

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// fundo visível (debug)
renderer.setClearColor(0x000000, 0);

container.appendChild(renderer.domElement);


// =============================
// LUZ
// =============================

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

// =============================
// CARREGAR O GLB
// =============================

const loader = new GLTFLoader();

let modelo;

loader.load(
  './assets/cerebro.glb',

  (gltf) => {
    console.log("GLB carregado");

    modelo = gltf.scene;

    // 🔥 CORRIGE MATERIAIS (evita erro)
    modelo.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0xaaaaaa
        });
      }
    });

    // 🔧 ajuste inicial
    modelo.scale.set(5, 5, 5);
    modelo.position.set(0, -1, 0);

    scene.add(modelo);
  },

  undefined,

  (error) => {
    console.error("Erro ao carregar GLB:", error);
  }
);

// =============================
// LOOP DE ANIMAÇÃO
// =============================

function animate() {
  requestAnimationFrame(animate);

  // rotação leve
  if (modelo) {
    modelo.rotation.y += 0.01;
  }

  renderer.render(scene, camera);
}

animate();


// =============================
// RESPONSIVIDADE
// =============================

window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
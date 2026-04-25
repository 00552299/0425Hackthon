import * as THREE from 'three';
import { createRenderer } from './core/renderer.js';
import { createScene } from './core/scene.js';
import { createCamera } from './core/camera.js';
import { setupXR } from './core/xr.js';
import { initHandTracking } from './systems/handTracking.js';
import { createInteractionSystem } from './systems/interaction.js';
import { createPhysicsSystem } from './systems/physics.js';
import { createGrabbableBox } from './objects/grabbable.js';
import { createUIPanel } from './objects/uiPanel.js';

const scene = createScene();
const camera = createCamera();
const renderer = createRenderer();

setupXR(renderer);
document.body.style.margin = '0';
document.body.appendChild(renderer.domElement);

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({ color: '#94a3b8' })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

scene.add(createGrabbableBox());
scene.add(createUIPanel());

const handTracking = initHandTracking(renderer);
const interaction = createInteractionSystem();
const physics = createPhysicsSystem();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

renderer.setAnimationLoop(() => {
    const hands = handTracking.getHands();
    physics.step(1 / 72);
    interaction.update({ hands, scene, camera });
    renderer.render(scene, camera);
});

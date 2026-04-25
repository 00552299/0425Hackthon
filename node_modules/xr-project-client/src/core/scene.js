import * as THREE from 'three';

export function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#dbeafe');

    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1.2);
    light.position.set(0, 1, 0);
    scene.add(light);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(3, 10, 10);
    scene.add(dirLight);

    return scene;
}

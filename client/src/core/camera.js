import * as THREE from 'three';

export function createCamera() {
    const camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.01,
        100
    );
    camera.position.set(0, 1.6, 3);
    return camera;
}

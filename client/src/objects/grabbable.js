import * as THREE from 'three';

export function createGrabbableBox() {
    const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const material = new THREE.MeshStandardMaterial({ color: '#22c55e' });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.grabbable = true;
    mesh.position.set(0, 1.4, -1);
    return mesh;
}

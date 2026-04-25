import * as THREE from 'three';

export function createUIPanel() {
    const geometry = new THREE.PlaneGeometry(0.8, 0.4);
    const material = new THREE.MeshBasicMaterial({ color: '#f8fafc' });
    const panel = new THREE.Mesh(geometry, material);
    panel.position.set(0, 1.6, -1.2);
    return panel;
}

import * as THREE from 'three';

export function createClickModule({ scene, interaction, hud, moduleData }) {
    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.SphereGeometry(0.28, 32, 32);
    const material = new THREE.MeshStandardMaterial({
        color: '#38bdf8',
        roughness: 0.45,
        metalness: 0.2,
    });
    const target = new THREE.Mesh(geometry, material);
    target.position.set(0, 1.4, -1.1);
    group.add(target);

    let state = 'base';
    let morphProgress = 0;
    let targetProgress = 0;

    function applyStateVisual(progress) {
        target.scale.set(1 + progress * 0.35, 1 - progress * 0.18, 1 + progress * 0.2);
        material.color.setRGB(0.22 + progress * 0.56, 0.74 - progress * 0.5, 0.97 - progress * 0.74);
    }

    function renderHUD() {
        const baseWord = moduleData.wordPair?.base || 'base';
        const changedWord = moduleData.wordPair?.changed || 'changed';
        const word = state === 'base' ? baseWord : changedWord;
        hud.setCard({
            titleText: moduleData.title,
            subtitleText: `Word: ${word} | Click to toggle state`,
            tipsText: 'Click (or press Space) to switch model state. Idle auto-advances.',
        });
    }

    interaction.registerClickableTarget(target, () => {
        state = state === 'base' ? 'changed' : 'base';
        targetProgress = state === 'changed' ? 1 : 0;
        renderHUD();
    });

    renderHUD();

    return {
        autoAdvanceSeconds: moduleData.autoAdvanceSeconds || 10,
        update(delta) {
            morphProgress = THREE.MathUtils.damp(morphProgress, targetProgress, 8, delta);
            applyStateVisual(morphProgress);
            target.rotation.y += delta * (0.3 + morphProgress * 1.1);
        },
        dispose() {
            interaction.unregisterClickableTarget(target);
            scene.remove(group);
            geometry.dispose();
            material.dispose();
        },
    };
}

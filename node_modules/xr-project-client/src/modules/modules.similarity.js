import * as THREE from 'three';

function makeLabelSprite(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 90;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#e2e8f0';
    ctx.font = 'bold 34px Segoe UI';
    ctx.fillText(text, 20, 56);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.SpriteMaterial({ map: texture, depthTest: false });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.56, 0.18, 1);
    return { sprite, texture, material };
}

export function createSimilarityModule({ scene, interaction, hud, moduleData }) {
    const group = new THREE.Group();
    scene.add(group);

    const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.22, 1),
        new THREE.MeshStandardMaterial({ color: '#22c55e' })
    );
    core.position.set(0, 1.4, -1.1);
    group.add(core);

    const expandButton = new THREE.Mesh(
        new THREE.BoxGeometry(0.12, 0.12, 0.12),
        new THREE.MeshStandardMaterial({ color: '#f59e0b' })
    );
    expandButton.position.set(0, 1.8, -1.1);
    group.add(expandButton);

    const children = [];
    const linkLines = [];
    let expanded = false;

    function clearChildren() {
        for (const node of children) {
            group.remove(node.mesh);
            group.remove(node.label);
            node.geometry.dispose();
            node.material.dispose();
            node.labelTexture.dispose();
            node.labelMaterial.dispose();
        }
        children.length = 0;

        for (const line of linkLines) {
            group.remove(line);
            line.geometry.dispose();
            line.material.dispose();
        }
        linkLines.length = 0;
    }

    function buildChildren() {
        clearChildren();
        const words = moduleData.relatedWords || [];
        const radius = 0.9;
        words.forEach((word, index) => {
            const angle = (Math.PI * 2 * index) / Math.max(words.length, 1);
            const pos = new THREE.Vector3(
                core.position.x + Math.cos(angle) * radius,
                core.position.y + 0.12 * Math.sin(angle * 2),
                core.position.z + Math.sin(angle) * radius
            );

            const geometry = new THREE.SphereGeometry(0.09, 16, 16);
            const material = new THREE.MeshStandardMaterial({ color: '#38bdf8' });
            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.copy(pos);

            const { sprite: label, texture: labelTexture, material: labelMaterial } = makeLabelSprite(word);
            label.position.copy(pos.clone().add(new THREE.Vector3(0, 0.16, 0)));

            const points = [core.position.clone(), pos.clone()];
            const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
            const line = new THREE.Line(
                lineGeometry,
                new THREE.LineBasicMaterial({ color: '#94a3b8' })
            );

            group.add(mesh);
            group.add(label);
            group.add(line);

            children.push({ mesh, geometry, material, label, labelTexture, labelMaterial });
            linkLines.push(line);
        });
    }

    function renderHUD() {
        const stateText = expanded ? 'Expanded' : 'Collapsed';
        hud.setCard({
            titleText: moduleData.title,
            subtitleText: `Core word: ${moduleData.coreWord || 'core'} | ${stateText}`,
            tipsText: 'Click + cube to expand or collapse spatial related-word nodes.',
        });
    }

    interaction.registerClickableTarget(expandButton, () => {
        expanded = !expanded;
        if (expanded) {
            buildChildren();
        } else {
            clearChildren();
        }
        renderHUD();
    });

    renderHUD();

    return {
        autoAdvanceSeconds: moduleData.autoAdvanceSeconds || 12,
        update(delta) {
            core.rotation.y += delta * 0.8;
            expandButton.rotation.x += delta * 0.9;
            expandButton.rotation.y += delta * 1.2;
        },
        dispose() {
            interaction.unregisterClickableTarget(expandButton);
            clearChildren();
            scene.remove(group);
            core.geometry.dispose();
            core.material.dispose();
            expandButton.geometry.dispose();
            expandButton.material.dispose();
        },
    };
}

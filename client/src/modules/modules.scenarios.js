import * as THREE from 'three';

const STYLE = {
    cinemagraph_25d: { color: '#f97316', subtitle: '2.5D motion frame with subtle parallax illusion.' },
    diorama_3d: { color: '#22c55e', subtitle: 'Mini spatial stage with animated semantic context.' },
    vertical_holo: { color: '#06b6d4', subtitle: 'Vertical social-style player for colloquial usage.' },
    immersive_cinema: { color: '#6366f1', subtitle: 'Wide cinematic screen with subtitle keyword highlighting.' },
};

function createContainerMesh(containerType) {
    if (containerType === 'diorama_3d') {
        return new THREE.Mesh(
            new THREE.CylinderGeometry(0.34, 0.44, 0.16, 36),
            new THREE.MeshStandardMaterial({ color: STYLE[containerType].color })
        );
    }

    if (containerType === 'vertical_holo') {
        return new THREE.Mesh(
            new THREE.PlaneGeometry(0.34, 0.68),
            new THREE.MeshStandardMaterial({ color: STYLE[containerType].color, emissive: STYLE[containerType].color, emissiveIntensity: 0.2 })
        );
    }

    return new THREE.Mesh(
        new THREE.PlaneGeometry(0.84, 0.46),
        new THREE.MeshStandardMaterial({ color: STYLE[containerType].color })
    );
}

export function createScenariosModule({ scene, interaction, hud, moduleData }) {
    const group = new THREE.Group();
    scene.add(group);

    const containers = moduleData.containers || [];
    let activeIndex = 0;
    let activeMesh = null;
    let animationTime = 0;

    const switchButton = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.08, 0.08),
        new THREE.MeshStandardMaterial({ color: '#f8fafc' })
    );
    switchButton.position.set(0, 1.9, -1.05);
    group.add(switchButton);

    function mountContainer(index) {
        if (!containers.length) {
            return;
        }

        if (activeMesh) {
            group.remove(activeMesh);
            activeMesh.geometry.dispose();
            activeMesh.material.dispose();
            activeMesh = null;
        }

        activeIndex = ((index % containers.length) + containers.length) % containers.length;
        const active = containers[activeIndex];
        const style = STYLE[active.type] || STYLE.cinemagraph_25d;
        activeMesh = createContainerMesh(active.type);
        activeMesh.position.set(0, 1.45, -1.05);
        group.add(activeMesh);

        if (active.type === 'immersive_cinema') {
            scene.background = new THREE.Color('#0f172a');
        } else {
            scene.background = new THREE.Color('#dbeafe');
        }

        hud.setCard({
            titleText: moduleData.title,
            subtitleText: `Keyword: ${moduleData.keyword || 'keyword'} | Container: ${active.label || active.type}`,
            tipsText: `${style.subtitle} Click white switch block to cycle container types.`,
        });
    }

    interaction.registerClickableTarget(switchButton, () => {
        mountContainer(activeIndex + 1);
    });

    mountContainer(0);

    return {
        autoAdvanceSeconds: moduleData.autoAdvanceSeconds || 16,
        update(delta) {
            animationTime += delta;
            switchButton.rotation.y += delta * 1.7;
            if (activeMesh) {
                activeMesh.position.y = 1.45 + Math.sin(animationTime * 1.4) * 0.03;
                activeMesh.rotation.y += delta * 0.35;
            }
        },
        dispose() {
            interaction.unregisterClickableTarget(switchButton);
            if (activeMesh) {
                group.remove(activeMesh);
                activeMesh.geometry.dispose();
                activeMesh.material.dispose();
            }
            group.remove(switchButton);
            switchButton.geometry.dispose();
            switchButton.material.dispose();
            scene.remove(group);
            scene.background = new THREE.Color('#dbeafe');
        },
    };
}

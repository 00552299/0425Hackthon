import * as THREE from 'three';

function makeCallout(text) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 80;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 28px Segoe UI';
    ctx.fillText(text, 14, 52);

    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: tex, depthTest: false });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(0.4, 0.125, 1);

    return { sprite, tex, mat };
}

export function createRotateModule({ scene, interaction, hud, moduleData }) {
    const group = new THREE.Group();
    scene.add(group);

    const plate = new THREE.Mesh(
        new THREE.PlaneGeometry(0.58, 0.42),
        new THREE.MeshStandardMaterial({ color: '#f8fafc', emissive: '#1e293b', emissiveIntensity: 0.05 })
    );
    plate.position.set(0, 1.45, -1.1);
    group.add(plate);

    const model3d = new THREE.Mesh(
        new THREE.TorusKnotGeometry(0.14, 0.045, 120, 14),
        new THREE.MeshStandardMaterial({ color: '#06b6d4', roughness: 0.35, metalness: 0.5 })
    );
    model3d.position.copy(plate.position);
    model3d.visible = false;
    group.add(model3d);

    const callouts = [];
    let calloutCursor = 0;
    let hoverSeconds = 0;
    let exploded = false;
    let rotateSeconds = 0;

    function resetCallouts() {
        for (const item of callouts) {
            group.remove(item.line);
            group.remove(item.sprite);
            item.line.geometry.dispose();
            item.line.material.dispose();
            item.tex.dispose();
            item.mat.dispose();
        }
        callouts.length = 0;
    }

    function pushCallout(label) {
        const angle = model3d.rotation.y;
        const anchor = new THREE.Vector3(
            model3d.position.x + Math.cos(angle) * 0.22,
            model3d.position.y + Math.sin(angle * 2) * 0.06,
            model3d.position.z + Math.sin(angle) * 0.22
        );
        const tip = anchor.clone().add(new THREE.Vector3(0.18, 0.1, 0));

        const lineGeo = new THREE.BufferGeometry().setFromPoints([anchor, tip]);
        const line = new THREE.Line(
            lineGeo,
            new THREE.LineBasicMaterial({ color: '#f59e0b' })
        );
        const { sprite, tex, mat } = makeCallout(label);
        sprite.position.copy(tip.clone().add(new THREE.Vector3(0.2, 0.06, 0)));

        group.add(line);
        group.add(sprite);
        callouts.push({ line, sprite, tex, mat });
    }

    function renderHUD() {
        const mode = exploded ? '3D rotating' : '2D waiting gaze';
        hud.setCard({
            titleText: moduleData.title,
            subtitleText: `Seed: ${moduleData.seedWord || 'seed'} | Mode: ${mode}`,
            tipsText: 'Keep gaze at center card to trigger pop-out; model resets after one cycle.',
        });
    }

    renderHUD();

    return {
        autoAdvanceSeconds: moduleData.autoAdvanceSeconds || 14,
        update(delta) {
            if (!exploded) {
                const hovered = interaction.isHovering(plate);
                hoverSeconds = hovered ? hoverSeconds + delta : 0;
                if (hoverSeconds >= (moduleData.hoverTriggerSeconds || 2)) {
                    exploded = true;
                    plate.visible = false;
                    model3d.visible = true;
                    hoverSeconds = 0;
                    rotateSeconds = 0;
                    calloutCursor = 0;
                    resetCallouts();
                    renderHUD();
                }
                return;
            }

            rotateSeconds += delta;
            model3d.rotation.y += delta * 1.6;
            model3d.rotation.x += delta * 0.4;

            const calloutDefs = moduleData.callouts || [];
            if (calloutCursor < calloutDefs.length) {
                const triggerAngle = THREE.MathUtils.degToRad(calloutDefs[calloutCursor].angleDeg || 0);
                const normalized = ((model3d.rotation.y % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
                if (Math.abs(normalized - triggerAngle) < 0.06) {
                    pushCallout(calloutDefs[calloutCursor].label || 'part');
                    calloutCursor += 1;
                }
            }

            if (rotateSeconds > 7) {
                exploded = false;
                plate.visible = true;
                model3d.visible = false;
                model3d.rotation.set(0, 0, 0);
                resetCallouts();
                renderHUD();
            }
        },
        dispose() {
            resetCallouts();
            scene.remove(group);
            plate.geometry.dispose();
            plate.material.dispose();
            model3d.geometry.dispose();
            model3d.material.dispose();
        },
    };
}

export const InteractionType = Object.freeze({
    GRAB: 'grab',
    RELEASE: 'release',
    PINCH: 'pinch',
});

export function createSceneDTO(scene) {
    return {
        id: scene.id,
        name: scene.name,
        objects: scene.objects,
    };
}

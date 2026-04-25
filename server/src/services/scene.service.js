export async function fetchSceneData() {
    return {
        id: 'default-scene',
        name: 'XR Demo Scene',
        objects: [
            { id: 'cube-1', type: 'box', position: [0, 1.4, -1] },
            { id: 'panel-1', type: 'ui-panel', position: [0, 1.6, -1.2] },
        ],
    };
}

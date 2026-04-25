const MODULE_TYPES = Object.freeze({
    CLICK: 'click',
    SIMILARITY: 'similarity',
    ROTATE: 'rotate',
    SCENARIOS: 'scenarios',
});

const SCENARIO_CONTAINER_TYPES = Object.freeze({
    CINEMAGRAPH_25D: 'cinemagraph_25d',
    DIORAMA_3D: 'diorama_3d',
    VERTICAL_HOLO: 'vertical_holo',
    IMMERSIVE_CINEMA: 'immersive_cinema',
});

export async function fetchLearningSession() {
    return {
        sessionId: 'session-outline-v1',
        title: 'VR Vocabulary Learning - Core Interaction Skeleton',
        generatedAt: new Date().toISOString(),
        modules: [
            {
                id: 'm-click-01',
                type: MODULE_TYPES.CLICK,
                title: 'Click - State Transition',
                wordPair: {
                    base: 'intact',
                    changed: 'broken',
                },
                autoAdvanceSeconds: 10,
                interaction: {
                    trigger: 'ray_click',
                    transition: 'smooth_morph',
                },
            },
            {
                id: 'm-similarity-01',
                type: MODULE_TYPES.SIMILARITY,
                title: 'Similarity - Spatial Node Expansion',
                coreWord: 'vase',
                relatedWords: ['ceramic', 'container', 'ornament', 'fragile'],
                autoAdvanceSeconds: 12,
                interaction: {
                    trigger: 'ray_click_or_gesture',
                    control: 'expand_button',
                },
            },
            {
                id: 'm-rotate-01',
                type: MODULE_TYPES.ROTATE,
                title: 'Rotate - Structural Deconstruction',
                seedWord: 'engine',
                callouts: [
                    { angleDeg: 0, label: 'casing' },
                    { angleDeg: 120, label: 'shaft' },
                    { angleDeg: 240, label: 'core' },
                ],
                hoverTriggerSeconds: 2,
                autoAdvanceSeconds: 14,
                interaction: {
                    trigger: 'gaze_hover',
                    transition: '2d_to_3d_popout',
                },
            },
            {
                id: 'm-scenarios-01',
                type: MODULE_TYPES.SCENARIOS,
                title: 'Scenarios - Multimodal Container Shell',
                keyword: 'resilient',
                autoAdvanceSeconds: 16,
                containers: [
                    {
                        type: SCENARIO_CONTAINER_TYPES.CINEMAGRAPH_25D,
                        label: '2.5D Dynamic Frame',
                    },
                    {
                        type: SCENARIO_CONTAINER_TYPES.DIORAMA_3D,
                        label: '3D Diorama',
                    },
                    {
                        type: SCENARIO_CONTAINER_TYPES.VERTICAL_HOLO,
                        label: 'Vertical Holographic Player',
                    },
                    {
                        type: SCENARIO_CONTAINER_TYPES.IMMERSIVE_CINEMA,
                        label: 'Immersive Cinema Screen',
                    },
                ],
                interaction: {
                    trigger: 'ray_click',
                    behavior: 'switch_container',
                },
            },
        ],
    };
}

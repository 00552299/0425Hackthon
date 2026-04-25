export const ModuleType = Object.freeze({
    CLICK: 'click',
    SIMILARITY: 'similarity',
    ROTATE: 'rotate',
    SCENARIOS: 'scenarios',
});

export const ScenarioContainerType = Object.freeze({
    CINEMAGRAPH_25D: 'cinemagraph_25d',
    DIORAMA_3D: 'diorama_3d',
    VERTICAL_HOLO: 'vertical_holo',
    IMMERSIVE_CINEMA: 'immersive_cinema',
});

export const InteractionType = Object.freeze({
    RAY_CLICK: 'ray_click',
    RAY_CLICK_OR_GESTURE: 'ray_click_or_gesture',
    GAZE_HOVER: 'gaze_hover',
});

export function createLearningSessionDTO(session) {
    return {
        sessionId: session.sessionId,
        title: session.title,
        generatedAt: session.generatedAt,
        modules: session.modules,
    };
}

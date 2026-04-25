export function initHandTracking(renderer) {
    return {
        getHands() {
            if (!renderer.xr) {
                return [];
            }
            return [renderer.xr.getHand(0), renderer.xr.getHand(1)].filter(Boolean);
        },
    };
}

import { ENDPOINTS } from './endpoints.js';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

async function request(path, options = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
        ...options,
    });

    if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
    }

    return res.json();
}

export const apiClient = {
    getScene() {
        return request(ENDPOINTS.scene);
    },
    getUser() {
        return request(ENDPOINTS.user);
    },
    postInteraction(payload) {
        return request(ENDPOINTS.interaction, {
            method: 'POST',
            body: JSON.stringify(payload),
        });
    },
};

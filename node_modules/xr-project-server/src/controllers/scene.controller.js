import { fetchSceneData } from '../services/scene.service.js';

export async function getScene(_req, res) {
    const scene = await fetchSceneData();
    res.json(scene);
}

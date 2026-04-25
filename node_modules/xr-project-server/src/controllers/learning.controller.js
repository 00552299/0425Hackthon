import { fetchLearningSession } from '../services/learning.service.js';

export async function getLearningSession(_req, res) {
    const session = await fetchLearningSession();
    res.json(session);
}

import { fetchUserProfile } from '../services/user.service.js';

export async function getUser(_req, res) {
    const user = await fetchUserProfile();
    res.json(user);
}

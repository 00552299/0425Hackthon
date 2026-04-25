import { Router } from 'express';
import { getLearningSession } from '../controllers/learning.controller.js';

const router = Router();

router.get('/session', getLearningSession);

export default router;

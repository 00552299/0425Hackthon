import { Router } from 'express';
import { getScene } from '../controllers/scene.controller.js';

const router = Router();

router.get('/', getScene);

export default router;

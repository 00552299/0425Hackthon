import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
    res.json({ success: true, received: req.body });
});

export default router;

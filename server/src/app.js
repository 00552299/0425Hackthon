import express from 'express';
import cors from 'cors';
import sceneRoutes from './routes/scene.routes.js';
import userRoutes from './routes/user.routes.js';
import interactionRoutes from './routes/interaction.routes.js';

export function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get('/health', (_req, res) => {
        res.json({ ok: true });
    });

    app.use('/api/scene', sceneRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/interaction', interactionRoutes);

    return app;
}

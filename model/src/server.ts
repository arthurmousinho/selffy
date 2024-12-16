import express from 'express';
import cors from 'cors';
import { modelRouter } from './router';
import { apiKeyMiddleware } from './middlewares/api-key.middleware';
import { CORS_OPTIONS, SERVER_PORT } from './config/api.config';

const app = express();

app.use(express.json());
app.use(cors(CORS_OPTIONS));
app.use(apiKeyMiddleware); 
app.use(modelRouter);

app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
});
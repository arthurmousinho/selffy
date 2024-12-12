import express from 'express';
import { modelHealthRouter } from './routes/model-health';
import { generateTaskDescriptionRouter } from './routes/generate-task-description';

const app = express();

app.use(express.json());

app.use(modelHealthRouter);
app.use(generateTaskDescriptionRouter);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
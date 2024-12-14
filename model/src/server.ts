import express from 'express';
import { modelRouter } from './router';

const app = express();

app.use(express.json());
app.use(modelRouter);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
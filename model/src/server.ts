import express, { Request, Response } from 'express';
import ollama from 'ollama';
import { OLLAMA_MODEL } from './config/ollama.config';

const app = express();
const router = express.Router();

app.use(express.json());

router.get('/', async (req: Request, res: Response) => {
    const llm_data = await ollama.generate({
        model: OLLAMA_MODEL,
        prompt: 'what is 2+2',
    });
    res.json({ response: llm_data.response });
});

router.post('/generate-task-description', async (req: Request, res) => {

    const { taskTitle, taskDescription } = req.body as { taskTitle: string, taskDescription: string }

    const prompt = `
        "You are an assistant specialized in creating task descriptions. "
        "Generate a brief and concise description for a development task based on the title and details provided. "
        "The description should summarize the task in one paragraph, focusing on its main features and goals.\n\n"
        "Task Title: ${taskTitle}\n"
        "Task Details: ${taskDescription}\n\n"
        "Ensure the description is simple, clear, and avoids technical jargon."
    `;

    const llm_data = await ollama.generate({
        model: OLLAMA_MODEL,
        prompt,
    });

    res.json({ response: llm_data.response });
})

app.use(router);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
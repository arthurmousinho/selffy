import { Request, Router } from "express";
import ollama from 'ollama';
import { OLLAMA_MODEL } from '../config/ollama.config';

const generateTaskDescriptionRouter = Router();
const router = generateTaskDescriptionRouter;

type BodyProps = {
    taskTitle: string;
    projectDescription: string;
}

router.post('/generate-task-description', async (req: Request, res) => {
    const { taskTitle, projectDescription } = req.body as BodyProps;

    const prompt = `
        Create a concise and short task description based on the title and project description. 
        The description should be one or two sentences, clear and focused. 
        Avoid introductions, explanations, topics, or any additional context.

        Task Title: ${taskTitle}
        Project Description: ${projectDescription}
    `;

    const llm_data = await ollama.generate({
        model: OLLAMA_MODEL,
        prompt,
    });

    res.json({ response: llm_data.response });
});

export { generateTaskDescriptionRouter }
import { Request, Response, Router } from "express";
import { generateTaskDescription } from "./app/generate-task-description";
import { z } from "zod";
import { checkModelHeath } from "./app/check-model-health";

export const modelRouter = Router();

const taskDescriptionSchema = z.object({
    taskTitle: z.string().trim(),
    projectDescription: z.string().trim()
})

modelRouter.post('/generate-task-description', async (req: Request, res: Response) => {
    try {
        const body = taskDescriptionSchema.parse(req.body);
        const description = await generateTaskDescription(body)
        res.json({ response: description });
    } catch (error) {
        res.status(500).json({
            response: 'Error during task description generation'
        })
    }
});

modelRouter.get('/', async (req: Request, res: Response) => {
    try {
        const response = await checkModelHeath();
        res.json({ response });
    } catch (error) {
        res.status(500).json({
            response: 'Error during model health checking'
        })
    }
})
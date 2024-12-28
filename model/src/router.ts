import { Request, Response, Router } from "express";
import { generateTaskDescription } from "./app/generate-task-description";
import { z } from "zod";
import { checkModelHeath } from "./app/check-model-health";
import { generateTaskGuide } from "./app/generate-task-guide";

export const modelRouter = Router();

const taskDescriptionSchema = z.object({
    taskTitle: z.string().trim(),
    projectDescription: z.string().trim()
})

modelRouter.post(
    '/generate-task-description', 
    async (req: Request, res: Response) => {
    try {
        const body = taskDescriptionSchema.parse(req.body);
        const response = await generateTaskDescription(body)
        res.json({ response });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            response: 'Error during task description generation'
        })
    }
});

const generateTaskGuideSchema = z.object({
    taskTitle: z.string().trim(),
    taskDescription: z.string().trim(),
    projectDescription: z.string().trim()
})

modelRouter.post(
    '/generate-task-guide', 
    async (req: Request, res: Response) => {
    try {
        const body = generateTaskGuideSchema.parse(req.body);
        const response = await generateTaskGuide(body)
        res.json({ response });
    } catch (error) {
        console.log(error);
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
        console.log(error);
        res.status(500).json({
            response: 'Error during model health checking'
        })
    }
})
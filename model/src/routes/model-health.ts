import { Request, Response, Router } from "express";
import ollama from 'ollama';
import { OLLAMA_MODEL } from '../config/ollama.config';

const modelHealthRouter = Router();
const router = modelHealthRouter;

router.get('/', async (req: Request, res: Response) => {
    const llm_data = await ollama.generate({
        model: OLLAMA_MODEL,
        prompt: 'what is 2+2',
    });
    res.json(llm_data);
});

export { modelHealthRouter }
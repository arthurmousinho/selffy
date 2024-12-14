import { OLLAMA_MODEL } from "../config/ollama.config";
import ollama from 'ollama';

export async function checkModelHeath() {
    const modelResponseData = await ollama.generate({
        model: OLLAMA_MODEL,
        prompt: 'Hi, what can you do?',
    });
    return modelResponseData;
}
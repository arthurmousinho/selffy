import { OLLAMA_MODEL } from "../config/ollama.config";
import ollama from 'ollama';

type Props = {
    taskTitle: string;
    projectDescription: string;
}

export async function generateTaskDescription(props: Props) {
    const prompt = `
        Create a concise and short task description based on the title and project description. 
        The description should be one or two sentences, clear and focused. 
        Avoid introductions, explanations, topics, or any additional context.

        Task Title: ${props.taskTitle}
        Project Description: ${props.projectDescription}
    `;

    const modelResponseData = await ollama.generate({
        model: OLLAMA_MODEL,
        prompt,
    });

    return modelResponseData.response
}
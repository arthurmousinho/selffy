import { OLLAMA_MODEL } from "../config/ollama.config";
import ollama from 'ollama';

type Props = {
    taskTitle: string;
    taskDescription: string;
    projectDescription: string;
}

export async function generateTaskGuide(props: Props) {
    const prompt = `
        You are a highly capable AI assistant. The user needs help completing a task. Here are the details:

        Task title: ${props.taskTitle}
        Task description: ${props.taskDescription || "No description provided. Please create one based on the project context."}

        Project description:
        ${props.projectDescription}

        Based on this information, please provide a step-by-step guide to help the user successfully complete this task. Include any relevant tools, frameworks, or best practices that could be helpful for the task. Make your explanation clear and easy to follow.
    `;

    const modelResponseData = await ollama.generate({
        model: OLLAMA_MODEL,
        prompt,
    });

    return modelResponseData.response;
}

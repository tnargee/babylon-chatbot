import { OpenAI } from "openai";

export async function query(chatHistory) {

    const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
    });

    let newThread = await openai.beta.threads.create();

    for (let i = 0; i < chatHistory.length; i++) {
        await openai.beta.threads.messages.create({
            thread_id: newThread.id,
            role: i % 2 == 0 ? "user" : "assistant",
            content: chatHistory[i],
        });
    }

    let run = await openai.beta.threads.runs.create({
        thread_id: newThread.id,
        assistant_id: import.meta.env.ASSISTANT_ID,
    });

    console.log(run);
};

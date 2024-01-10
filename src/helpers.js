
import { OpenAI } from "openai";


const client = new OpenAI(
    {   
        apiKey: import.meta.env.VITE_KEY,
        dangerouslyAllowBrowser: true,
    }
);

export async function createThread() {
    let thread = await client.beta.threads.create();
    return thread.id;
}

export async function query(question, threadID) {

    let message = await client.beta.threads.messages.create(
        threadID,
        {
            role: "user",
            content: question,
        }
    )

    

    let run = await client.beta.threads.runs.create(
        threadID,
        {
            assistant_id: import.meta.env.VITE_ASSISTANT_ID,
        }
    )

    while (true) {
        let runStatus = await client.beta.threads.runs.retrieve(
            threadID,
            run.id
        );

        if (runStatus.status == "completed"){
            console.log("Run finished")
            const msgs = await client.beta.threads.messages.list(threadID)
            const response = msgs.data[0].content[0].text.value;
            let cleanedResponse = response.replace(/【[0-9]+†source】/g, "");
            return cleanedResponse;
            break;
        } else {
            console.log("Run is not finished yet");
        }
    }

};

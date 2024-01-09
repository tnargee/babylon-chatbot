
import { OpenAI } from "openai";


const client = new OpenAI(
    {   
        //change this back to the actual API key once testing is finished
        // DO NOT LEAVE AS COMMENT
        // apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        apiKey: "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", //change back when testing
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
            assistant_id: "asst_8hyA2QINdC17K82EveO6Pcn3", //change to real key when testing
            // assistantID: import.meta.env.ASSISTANT_ID,
            // change this back when finished
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
            return msgs.data[0].content[0].text.value;
            break;
        } else {
            console.log("Run is not finished yet");
        }
    }

};

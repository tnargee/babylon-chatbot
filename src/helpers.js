import { OpenAI } from "openai";

export async function query(question, client, thread) {
    // const client = new OpenAI(
    //     {   
    //         //change this back to the actual API key once testing is finished
    //         // DO NOT LEAVE AS COMMENT
    //         // apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    //         apiKey: "myKey", //change back when testing
    //         dangerouslyAllowBrowser: true,
    //     }
    // );

    // let thread = await client.beta.threads.create();

    let message = await client.beta.threads.messages.create(
        thread.id, 
        {
            role: "user",
            content: question,
        }
    )

    let run = await client.beta.threads.runs.create(
        thread.id,
        {
            assistant_id: "asst_8hyA2QINdC17K82EveO6Pcn3" //change to real key when testing
            // assistantID: import.meta.env.ASSISTANT_ID,
            // change this back when finished
        }
    )

    while (true) {
        let runStatus = await client.beta.threads.runs.retrieve(
            thread.id,
            run.id
        );

        if (runStatus.status == "completed"){
            const msgs = await client.beta.threads.messages.list(thread.id)
            console.log(msgs.data.map((datapiece) => {console.log(datapiece.content[0].text.value)}));
            return msgs.data[0].content[0].text.value;
            break;
        } else {
            console.log("Run is not finished yet");
        }
    }

};

 const client = new OpenAI(
        {   
            //change this back to the actual API key once testing is finished
            // DO NOT LEAVE AS COMMENT
            // apiKey: import.meta.env.VITE_OPENAI_API_KEY,
            apiKey: "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", //change back when testing
            dangerouslyAllowBrowser: true,
        }
    );

let thread = await client.beta.threads.create();

console.log(await query("Help me with this Python code: print('hello'); it's not compiling", client, thread));
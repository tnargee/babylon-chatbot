//the query function is not done yet.

import { OpenAI } from "openai";

export async function query(chatHistory) {
    const client = new OpenAI(
        {   
            //change this back to the actual API key once testing is finished
            // DO NOT LEAVE AS COMMENT
            // apiKey: import.meta.env.VITE_OPENAI_API_KEY,
            apiKey: "myKey", //change back when testing
            dangerouslyAllowBrowser: true,
        }
    );

    let thread = await client.beta.threads.create();
    
    for (let i = 0; i < chatHistory.length; i++){
        let message = await client.beta.threads.messages.create(
            thread.id, 
            {
                // This ternary operator is causing the request to be denied as invalid
                // Perhaps manually setting assistant commands isn't allowed
                // Maybe an alternative solution is to pass the thread along and not create
                // new threads
                // role: i%2 === 0 ? "user" : "assistant",
                role: "user",
                content: chatHistory[i],
            }
        )
    }

    let run = await client.beta.threads.runs.create(
        thread.id,
        {
            assistant_id: "myAsstID" //change to real key when testing
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
            break;
        } else {
            console.log("Run is not finished yet");
        }
    }

};

query(["Hello", "How are you!", "I'm doing fine today, could I have some help with my farm"]);

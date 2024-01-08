import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { createThread, query } from "../helpers";
import { OpenAI } from "openai";

export const ChatHistory = ({userInput}) => {
    const [history, setHistory] = useState([]);
    const [thread, setThread] = useState(null);
    

    useEffect(() => {
        const threadSetter = async () => {
            let threadID = await createThread();
            setThread(threadID);
        }
        threadSetter();
    }, [])


    useEffect(() => {

        const ask = async () => {
            return await query(userInput, thread);
        }

        const updateHistory = async () => {
             
            if (userInput.trim() != ""){ 
                setHistory((prevState) => {
                    return [...prevState, userInput]});

                let response = await ask();
                setHistory((prevState) => {
                    return [...prevState, response]
                })

            }
        
            
        }

        updateHistory();
        

       
    }, [userInput]);
        

    return (
        <div className="chat-history">
            {history.map((text, index) => {
                return (
                    <>
                        <ChatBox key={index} input = {text}></ChatBox>
                    </>
                );
            })}
        </div>
    )
}

export default ChatHistory;
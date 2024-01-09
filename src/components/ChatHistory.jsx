import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { createThread, query } from "../helpers";
import { OpenAI } from "openai";

export const ChatHistory = ({userInput, loadingSetter}) => {
    const [history, setHistory] = useState([]);
    const [thread, setThread] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    

    useEffect(() => {
        const threadSetter = async () => {
            let threadID = await createThread();
            setThread(threadID);
        }
        threadSetter();
    }, [])

    useEffect(() => {
        loadingSetter(isLoading);
    }, [isLoading])


    useEffect(() => {

        const ask = async () => {
            setIsLoading(true);
            return await query(userInput, thread);
        }

        const updateHistory = async () => {
             
            if (userInput.trim() != ""){ 
                setHistory((prevState) => {
                    return [...prevState, userInput]});

                let response = await ask();
                setIsLoading(false);
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
                        {index%2==0 ? <p>User:</p> : <p>Assistant:</p>}
                        <ChatBox key={index} input = {text}></ChatBox>
                    </>
                );
            })}
            {isLoading && <p>Loading Response...</p>}
        </div>
    )
}

export default ChatHistory;
import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { createThread, query } from "../helpers";
import { OpenAI } from "openai";
import Button from '@mui/material/Button';
import { PromptButton } from "./PromptButton";

export const ChatHistory = ({userInput, loadingSetter, setUserInput}) => {
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
             
            if (thread && userInput.trim() != ""){ 
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
        <div>
            { history.length === 0 &&
            <PromptButton setUserInput={setUserInput}></PromptButton>
            }

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
        </div>
    )
}

export default ChatHistory;
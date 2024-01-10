import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { createThread, query } from "../helpers";
import { OpenAI } from "openai";
import Button from '@mui/material/Button';
import { PromptButton } from "./PromptButton";
import userIcon from '../assets/user-icon2.png';
import assistantIcon from '../assets/assistant-icon.png';

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
        <div>
            { history.length === 0 &&
            <PromptButton ></PromptButton>
            }

        <div className="chat-history">
            {history.map((text, index) => {
                
                return (
                    <div className="chat-entry">
                        {index%2==0 ? 
                        <div className="chat-sender">
                            <img src={userIcon} alt="User icon"/> 
                            <p>You</p>
                        </div>    
                        :
                        <div className="chat-sender">
                            <img src={assistantIcon} alt="Assistant icon"/>
                            <p>Assistant</p>
                        </div>}
                
                        
                        <ChatBox key={index} input = {text}></ChatBox>

                    </div>
                
                );
            })}

            {isLoading && <p>Loading Response...</p>}

            </div>
        </div>
    )
}

export default ChatHistory;
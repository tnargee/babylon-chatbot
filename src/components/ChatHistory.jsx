import { useState, useEffect, useRef } from "react";
import ChatBox from "./ChatBox";
import { createThread, query } from "../helpers";
import { OpenAI } from "openai";
import Button from '@mui/material/Button';
import { PromptButton } from "./PromptButton";
import userIcon from '../assets/user-icon2.png';
import assistantIcon from '../assets/assistant-icon.png';
import { tableBodyClasses } from "@mui/material";

export const ChatHistory = ({userInput, loadingSetter, setUserInput}) => {
    const [history, setHistory] = useState([]);
    const [thread, setThread] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const chatHistoryRef = useRef(null);
    

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
        // Add a slight delay to ensure messages are rendered
        const timer = setTimeout(() => {
            if (chatHistoryRef.current?.lastChild) {
                chatHistoryRef.current.lastChild.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }, 100); // Adjust delay as needed
    
        return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }, [history]);

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

            <div className="chat-history" ref={chatHistoryRef}>
                {history.map((text, index) => {
                    const isUser = index % 2 == 0;
                    return (
                        <div className={`chat-entry ${isUser ? "user-message" : "assistant-message"}`}>
                            <div className="chat-sender">
                                <img src={isUser ? userIcon : assistantIcon} alt={isUser ? "User icon" : "Assistant icon"} /> 
                                <b>{isUser ? "You" : "Assistant"}</b>
                            </div>                
                            <ChatBox key={index} input={text}></ChatBox>
                        </div>
                    );
                })}

            {isLoading && <p>Loading Response...</p>}

            </div>
        </div>
    )
}

export default ChatHistory;
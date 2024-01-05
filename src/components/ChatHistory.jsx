import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";
import { query } from "../helpers.js"

export const ChatHistory = ({userInput}) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (userInput.trim() != ""){ 
            setHistory((prevState) => {
                //remove later, query function broken
                query([...prevState, userInput]);

                return [...prevState, userInput]});
        }
    }, [userInput]);
        

    return (
        <div className="chat-history">
            {history.map((query) => {
                return (
                    <>
                        <ChatBox input = {query}></ChatBox>
                    </>
                );
            })}
        </div>
    )
}

export default ChatHistory;
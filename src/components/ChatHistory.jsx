import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";

export const ChatHistory = ({userInput}) => {
    const [history, setHistory] = useState([]);
    const [thread, setThread] = useState(null);

    useEffect(() => {
        setThread(makeThread());
    }, [])

    useEffect(() => {
        if (userInput.trim() != ""){ 
                setHistory((prevState) => {
                    return [...prevState, userInput, query(userInput, thread, client)]});
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
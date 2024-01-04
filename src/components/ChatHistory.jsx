import { useState, useEffect } from "react";
import ChatBox from "./ChatBox";

export const ChatHistory = ({userInput}) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        if (userInput.trim() != ""){
            setHistory((prevState) => {return [...prevState, userInput]});
        }
    }, [userInput]);
        

    return (
        <>
            {history.map((query) => {
                return (
                    <>
                        <ChatBox input = {query}></ChatBox>
                    </>
                );
            })}
        </>
    )
}

export default ChatHistory;
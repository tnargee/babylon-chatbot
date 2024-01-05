import { useEffect, useState } from "react";
import ChatHistory from "./ChatHistory";
import InputBox from "./InputBox";
import "./chatbox.css"

export const Chatbot = () => {
    const [userInput, setUserInput] = useState("");

    return (
        <>
        <div className="container">
            <ChatHistory userInput={userInput}></ChatHistory>
        </div>

            <InputBox setUserInput={setUserInput}></InputBox>
            
        </>
    )
}

export default Chatbot;
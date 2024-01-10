import { useEffect, useState } from "react";
import ChatHistory from "./ChatHistory";
import InputBox from "./InputBox";
import "./chatbox.css"

export const Chatbot = () => {
    const [userInput, setUserInput] = useState("");
    const [loadingQuery, setLoadingQuery] = useState(false);

    return (
        <>
        <div className="container">
            <ChatHistory userInput={userInput} loadingSetter={setLoadingQuery} setUserInput={setUserInput}></ChatHistory>
        </div>
            <InputBox setUserInput={setUserInput} isLoading={loadingQuery}></InputBox>
        </>
    )
}

export default Chatbot;
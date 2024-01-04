import { useState } from "react";
import ChatHistory from "./ChatHistory";
import InputBox from "./InputBox";

export const Chatbot = () => {
    const [userInput, setUserInput] = useState("");
    return (
        <>
            <ChatHistory userInput={userInput}></ChatHistory>
            <InputBox setUserInput={setUserInput}></InputBox>
        </>
    )
}

export default Chatbot;
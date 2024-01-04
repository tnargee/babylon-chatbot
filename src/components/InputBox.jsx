import { useState } from "react";
import "./chatbox.css";

export const InputBox = ({setUserInput}) => {
    const [localInput, setLocalInput] = useState("");

    const keyDown = (event) => {
        if (event.key == "Enter"){
            setUserInput(event.target.value);
            setLocalInput("");
            event.preventDefault();
        }
    };

    return (
        <>
            <input type="text" className="textinput" value={localInput} 
            onChange={(e) => setLocalInput(e.target.value)} onKeyDown={keyDown}></input>
        </>
    )
}

export default InputBox;
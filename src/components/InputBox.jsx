import { useState, useEffect } from "react";
import "./chatbox.css";
import submitIcon from '../assets/submit-icon.png';

export const InputBox = ({setUserInput, isLoading}) => {
    const [localInput, setLocalInput] = useState("");

    const submitMessage = () => {
        setUserInput(localInput);
        setLocalInput("");
    };

    const keyDown = (event) => {
        if (event.key == "Enter" && !event.shiftKey){
            submitMessage();
            event.preventDefault();
        }
    };

    const adjustHeight = (event) => {
        const textarea = event.target;
        textarea.style.height = 'inherit';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }

    useEffect(() => {
        const textarea = document.querySelector('.textinput');
        if (textarea) {
            textarea.style.height = `${Math.min(textarea.scrollHeight, 50)}px`;
        }
    }, []);

    return (

        !isLoading && 
            
        <div className="input-box-container">
            <textarea 
                className="textinput" 
                value={localInput} 
                onChange={(e) => {
                    setLocalInput(e.target.value) 
                    adjustHeight(e);
                }}
                onKeyDown={keyDown}
                onInput={adjustHeight}
                placeholder="Type your message here..."
            />
            <button className="submit-button" onClick={submitMessage}>
                <img src={submitIcon} alt="Submit" />
            </button>
        </div>
    )
}

export default InputBox;
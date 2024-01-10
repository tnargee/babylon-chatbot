import { useState, useEffect, useRef } from "react";
import "./chatbox.css";
import submitIcon from '../assets/submit-icon-light.png';

export const InputBox = ({setUserInput, isLoading}) => {
    const [localInput, setLocalInput] = useState("");
    const textInputRef = useRef(null);

    const submitMessage = () => {
        setUserInput(localInput);
        setLocalInput("");
        if (textInputRef.current) {
            textInputRef.current.style.height = '50px';  // Reset the height of the textarea
        }
    };

    const keyDown = (event) => {
        if (event.key == "Enter" && !event.shiftKey){
            submitMessage();
            event.preventDefault();
        }
    };

    /* const adjustHeight = (event) => {
        const textarea = event.target;
        textarea.style.height = 'inherit';
        textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    } */

    useEffect(() => {
        const textarea = document.querySelector('.textinput');
        if (textarea) {
            textarea.style.height = `${Math.min(textarea.scrollHeight, 50)}px`;
        }
    }, []);

    const autoGrow = (event) => {
        const element = event.target;
        element.style.height = '5px'; // Reset height to shrink if needed
        element.style.height = (element.scrollHeight) + 'px';
        if (element.scrollHeight < element.maxHeight) {
            element.style.overflowY = 'hidden'; // Hide scrollbar when content is small
        } else {
            element.style.overflowY = 'auto'; // Show scrollbar when content exceeds max height
        }
    }

    return (

        !isLoading && 
            
        <div className="input-box-container">
            <textarea 
                ref={textInputRef}
                className="textinput" 
                value={localInput} 
                onChange={(e) => {
                    setLocalInput(e.target.value); 
                    /* adjustHeight(e); */
                }}
                onInput={autoGrow}
                onKeyDown={keyDown}
                /* onInput={adjustHeight} */ 
                placeholder="Type your message here..."
                style={{ height: '50px' }}
            />
            <button className="submit-button" onClick={submitMessage}>
                <img src={submitIcon} alt="Submit" />
            </button>
        </div>
    )
}

export default InputBox;
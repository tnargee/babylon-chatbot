import "./chatbox.css"

export const ChatBox = ({input}) => {
    return (
        <>
            <div className="textbox">
                <p>{input}</p>
            </div>
        </>
    )
}

export default ChatBox;
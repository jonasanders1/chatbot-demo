import { ReactTyped } from "react-typed";
import { useState } from "react";

/* eslint-disable react/prop-types */
const MessageItem = ({ message }) => {

  const [animationComplete, setAnimationComplete] = useState(false);
  

  const handleTypingDone = () => {
    setAnimationComplete(true);
    
  };

  return (
    <div
      className={`message-container ${
        message.sender === "user" ? "msg-user" : "msg-bot"
      }`}
    >
      {message.sender === "bot" && !animationComplete ? (
        <ReactTyped
          className="message-text"
          strings={[message.text]} // Provide an array of strings
          typeSpeed={30}
          startDelay={250}
          onComplete={handleTypingDone}
          showCursor={true}
        />
      ) : (
        <p className="message-text">{message.text}</p>
      )}
    </div>
  );
};

export default MessageItem;

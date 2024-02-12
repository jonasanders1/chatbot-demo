import { ReactTyped } from "react-typed";
import { useState } from "react";
import "../assets/styles/components/messageItem.css";
import { colors } from "../assets/styles/colors";
/* eslint-disable react/prop-types */
const MessageItem = ({ message }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  const handleTypingDone = () => {
    setAnimationComplete(true);
  };

  return (
    <div
      className="message-container"
      style={
        message.sender === "user"
          ? {
              borderLeft: `5px solid ${colors.userMessageBorder}`,
              borderBottom: `1px solid ${colors.userMessageBorder}`,
            }
          : {
              borderLeft: `5px solid ${colors.botMessageBorder}`,
              borderBottom: `1px solid ${colors.botMessageBorder}`,
            }
      }
    >
      <div className="message-header">
        {/* <div
          className="dot"
          style={
            message.sender === "user"
              ? { backgroundColor: `${colors.userMessageBorder}` }
              : { backgroundColor: `${colors.botMessageBorder}` }
          }
        ></div> */}
        <h3
          className="message-header-text"
          style={
            message.sender === "user"
              ? { color: `${colors.userMessageBorder}` }
              : { color: `${colors.botMessageBorder}` }
          }
        >
          {message.sender === "user" ? "You" : "Bot"}
        </h3>
      </div>

      {message.sender === "bot" && !animationComplete ? (
        <ReactTyped
          style={{ color: colors.chatTextColor }}
          className="message-text"
          strings={[message.text]}
          typeSpeed={30}
          startDelay={250}
          onComplete={handleTypingDone}
          showCursor={true}
        />
      ) : (
        <div>
          <p className="message-text" style={{ color: colors.chatTextColor }}>
            {message.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageItem;

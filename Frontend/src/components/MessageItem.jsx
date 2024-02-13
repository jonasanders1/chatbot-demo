/* eslint-disable react/prop-types */
import { useState } from "react";
// Styles
import "../assets/styles/components/messageItem.css";
// Colors
import { colors } from "../assets/styles/colors";
// Library for typing animation
import { ReactTyped } from "react-typed";

const MessageItem = ({ message }) => {
  const [animationComplete, setAnimationComplete] = useState(false);

  // Function for changing the state of the animation
  // ReactTyped --> onComplete --> handleTypingDone
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
        <p
          className="message-text"
          style={{ color: colors.chatTextColor }}
          dangerouslySetInnerHTML={{
            __html: message.text.replace(/\n/g, "<br>"),
          }}
        ></p>
      )}
    </div>
  );
};

export default MessageItem;

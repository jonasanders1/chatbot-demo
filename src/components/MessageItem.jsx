/* eslint-disable react/prop-types */
const MessageItem = ({ message }) => {
  return (
    <div
      className={`message-container ${
        message.sender === "user" ? "msg-user" : "msg-bot"
      }`}
    >
      <p className="message-text">{message.text}</p>
    </div>
  );
};

export default MessageItem;

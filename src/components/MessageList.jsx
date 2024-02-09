import MessageItem from "./MessageItem";

const MessageList = ({ messages }) => {
  return (
    messages.length !== 0 &&
    // <MessageList />
    messages.map((message, index) => (
      <MessageItem key={index} message={message} />
    ))
  );
};

export default MessageList;

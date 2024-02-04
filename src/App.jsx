import { useEffect, useState } from "react";
import "./App.css";
import { FaArrowUp } from "react-icons/fa";
import Greeting from "./components/Greeting";
import MessageItem from "./components/MessageItem";

function App() {
  const [userMsg, setUserMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [typingMessage, setTypingMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsActive(userMsg.trim() !== "");
  }, [userMsg]);

  useEffect(() => {
    if (isTyping && typingMessage.length > 0) {
      // Set a timeout to simulate typing
      const timeout = setTimeout(() => {
        // Update the last message to include the next character of the typing message
        setMessages((prevMessages) => {
          const lastMessageIndex = prevMessages.length - 1;
          const lastMessage = prevMessages[lastMessageIndex];
          const updatedMessage = {
            ...lastMessage,
            text: lastMessage.text + typingMessage[0],
          };
          return [...prevMessages.slice(0, lastMessageIndex), updatedMessage];
        });
        // Remove the first character from the typing message
        setTypingMessage((prev) => prev.slice(1));
      }, 100); // Adjust typing speed here (milliseconds per character)
      return () => clearTimeout(timeout);
    } else if (isTyping && typingMessage.length === 0) {
      setIsTyping(false);
    }
  }, [isTyping, typingMessage]);

  const handleUserMessage = (e) => {
    e.preventDefault();
    if (!userMsg.trim()) {
      return;
    }
    setMessages([...messages, { text: userMsg, sender: "user" }]);
    setUserMsg("");
    setIsTyping(true);

    setTimeout(() => {
      setTypingMessage(
        "This is a bot response. The message appears to be typing in real-time."
      );
    }, 400); // Adjust delay before bot response (milliseconds)
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="message-screen">
          {messages.length === 0 ? (
            <Greeting />
          ) : (
            messages.map((message, index) => (
              <MessageItem key={index} message={message} />
            ))
          )}
          {isTyping && (
            <MessageItem
              key="typing"
              message={{ text: typingMessage, sender: "bot" }}
            />
          )}
        </div>

        <form onSubmit={handleUserMessage} className="input-container">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={userMsg}
            onChange={(e) => setUserMsg(e.target.value)}
          />
          <button type="submit" className={isActive ? "active" : "disabled"}>
            <FaArrowUp size={20} color="white" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

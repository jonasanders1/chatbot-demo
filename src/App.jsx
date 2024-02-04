import { useEffect, useState } from "react";
import "./App.css";
import { FaArrowUp } from "react-icons/fa";
import Greeting from "./components/Greeting";
import MessageItem from "./components/MessageItem";
import WaitingPrompt from "./components/WaitingPrompt";

function App() {
  const [userMsg, setUserMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsActive(userMsg.trim() !== "");
  }, [userMsg]);
  useEffect(() => {
    console.log("Is loading: ", isLoading);
  }, [isLoading]);

  const handleUserMessage = (e) => {
    e.preventDefault();
    if (!userMsg.trim()) {
      return;
    }

    // Add the user message to the messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMsg, sender: "user" },
    ]);
    // Reset the input field after sending the message
    setUserMsg("");
    setIsLoading(true);

    const botResponse = "Hei Jonas! Hva kan jeg hjelpe deg med i dag?";

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: "bot" },
      ]);
      setIsLoading(false);
    }, 3000);
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
          {isLoading && <WaitingPrompt />}
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

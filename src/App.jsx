import { useEffect, useState } from "react";
import "./App.css";
import { FaArrowUp } from "react-icons/fa";
import Logo from './assets/robot.png'

function App() {
  const [userMsg, setUserMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(userMsg.trim() !== "");
    console.log(isActive);
  }, [userMsg]);

  const handleUserMessage = (e) => {
    e.preventDefault();
    if (!userMsg.trim()) {
      return;
    }
    // Add the user message to the messages state
    setMessages([...messages, { text: userMsg, sender: "user" }]);
    // Reset the input field after sending the message
    setUserMsg("");
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="message-screen">
          {messages.length === 0 ? (
            <div className="greeting-container">
              <img src={Logo} width={60} alt="logo"  />
              <h1 className="greeting-txt">How can i help you today?</h1>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`message-container ${
                  message.sender === "user" ? "msg-user" : "msg-bot"
                }`}
              >
                <p className="message-text">{message.text}</p>
              </div>
            ))
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

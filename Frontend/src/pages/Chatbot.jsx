/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
// Styles
import "../assets/styles/pages/chatbot.css";
// Colors
import { colors } from "../assets/styles/colors";
// Custom components
import Greeting from "../components/Greeting";
import MessageList from "../components/MessageList";
import Input from "../components/Input";
import Sidebar from "../components/Sidebar";
import LoadingAnimation from "../components/LoadingAnimation";

const Page = () => {
  const [userInput, setUserInput] = useState("");
  const [isUsersTurn, setIsUsersTurn] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isBotMessageLoading, setIsBotMessageLoading] = useState(false);
  const [isTextareaDisabled, setIsTextareaDisabled] = useState(false);
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const chatContainerRef = useRef(null);

  // Hook to always display new messages when added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Hook to detect empty messages from user
  useEffect(() => {
    setIsActive(userInput.trim() !== "");
  }, [userInput]);

  // Hook to make bot answer after
  useEffect(() => {
    if (!isUsersTurn) {
      handleBotAnswer();
    }
  }, [isUsersTurn]);

  // Function for testing message logic
  const handleBotAnswer = async () => {
    setIsBotMessageLoading(true);

    setTimeout(() => {
      fetch("http://127.0.0.1:5000/bot/messages")
        .then((response) => response.json())
        .then((data) => {
          const botResponse = data[0].text;
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: botResponse, sender: "bot" },
          ]);
        })
        .catch((error) => {
          console.error("Error fetching messages:", error);
        })
        .finally(() => {
          setIsBotMessageLoading(false);
          setIsUsersTurn(true);
          setIsTextareaDisabled(false);
        });
    }, 1000);
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="chatbot-container">
        <div className="chatbot">
          <div className="message-screen" ref={chatContainerRef}>
            {messages.length === 0 ? (
              <Greeting />
            ) : (
              <MessageList messages={messages} />
            )}
            {isBotMessageLoading && <LoadingAnimation />}
          </div>
          <Input
            isBotMessageLoading={isBotMessageLoading}
            setMessages={setMessages}
            setIsActive={setIsActive}
            userInput={userInput}
            setUserInput={setUserInput}
            isActive={isActive}
            isUsersTurn={isUsersTurn}
            setIsUsersTurn={setIsUsersTurn}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

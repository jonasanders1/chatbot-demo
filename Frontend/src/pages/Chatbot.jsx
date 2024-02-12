/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Greeting from "../components/Greeting";
import MessageList from "../components/MessageList";
import WaitingPrompt from "../components/WaitingPrompt";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import "../assets/styles/pages/chatbot.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { colors } from "../assets/styles/colors";

const Page = () => {
  const [userInput, setUserInput] = useState("");
  const [isUsersTurn, setIsUsersTurn] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [setIsTextareaDisabled] = useState(false);
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    setIsActive(userInput.trim() !== "");
  }, [userInput]);

  useEffect(() => {
    if (!isUsersTurn) {
      handleBotAnswer();
    }
  }, [isUsersTurn]);

  // function only for testing (API call handles this logic)
  const handleBotAnswer = async () => {
    setIsLoading(true);

    fetch("http://127.0.0.1:5000/bot/messages")
      .then((response) => response.json())
      .then((data) => {
        const botResponse = data[0].text;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: "bot" },
        ]);
        console.log(data[0].text);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsUsersTurn(true);
        setIsTextareaDisabled(false);
      });
  };

  return (
    <div className="container" style={{ backgroundColor: colors.backgroundColor}}>
      <div className="sidebar" style={{backgroundColor: colors.sidebarBackGroundColor}}>
        <div className="sidebar-header">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <button className="go-back-btn">
              <IoArrowBackCircleSharp size={30} color={colors.textColor} />
              <span className="go-back-btn-text" style={{color: colors.textColor}}>Configure</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="chatbot-container">
        <div className="chatbot">
          <div className="message-screen">
            {messages.length === 0 ? (
              <Greeting />
            ) : (
              <MessageList messages={messages} />
            )}
            {isLoading && <WaitingPrompt />}
          </div>
          <Input
            isLoading={isLoading}
            setMessages={setMessages}
            setIsActive={setIsActive}
            userInput={userInput}
            setUserInput={setUserInput}
            isActive={isActive}
            setIsUsersTurn={setIsUsersTurn}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;

/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import Greeting from "../components/Greeting";
import MessageList from "../components/MessageList";
import WaitingPrompt from "../components/WaitingPrompt";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import "../assets/styles/pages/chatbot.css";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { colors } from "../assets/styles/colors";
import { HiMenu } from "react-icons/hi";

const Page = () => {
  const [userInput, setUserInput] = useState("");
  const [isUsersTurn, setIsUsersTurn] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTextareaDisabled, setIsTextareaDisabled] = useState(false);
  const [companyUrl, setCompanyUrl] = useState("");
  const [companyName, setCompanyName] = useState("");
  const chatContainerRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Hook to scroll down when new messages is added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setIsActive(userInput.trim() !== "");
  }, [userInput]);

  useEffect(() => {
    if (!isUsersTurn) {
      handleBotAnswer();
    }
  }, [isUsersTurn]);

  const handleSidebarMenu = () => {
    console.log(isSidebarOpen);
    setIsSidebarOpen((prev) => !prev);
  };

  // function only for testing (API call handles this logic)
  const handleBotAnswer = async () => {
    setIsLoading(true);

    setTimeout(() => {
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
    }, 1000);
  };

  return (
    <div
      className="container"
      style={{ backgroundColor: colors.backgroundColor }}
    >
      {!isSidebarOpen && (
        <button
          className="open-sidebar-menu sidebar-button"
          onClick={handleSidebarMenu}
        >
          <HiMenu color={colors.sidebarBackGroundColor} size={25} />
        </button>
      )}
      <div
        className={`sidebar ${!isSidebarOpen ? "hidden" : ""}`}
        style={{ backgroundColor: colors.sidebarBackGroundColor }}
      >
        <div className="sidebar-header">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <button className="go-back-btn">
              <IoArrowBackCircleSharp
                size={30}
                color={colors.sidebarSecondaryColor}
              />
              <span
                className="go-back-btn-text"
                style={{ color: colors.sidebarSecondaryColor }}
              >
                Configure
              </span>
            </button>
          </Link>
          <button
            className="close-sidebar-menu sidebar-button"
            onClick={handleSidebarMenu}
          >
            <HiMenu color={colors.backgroundColor} size={25} />
          </button>
        </div>
        <div className="footer">
          <h3 style={{color: colors.backgroundColor}}>Andersen consulting</h3>
        </div>
      </div>

      <div className="chatbot-container">
        <div className="chatbot">
          <div className="message-screen" ref={chatContainerRef}>
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

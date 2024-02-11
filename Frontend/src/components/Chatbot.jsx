/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Greeting from "./Greeting";
import MessageList from "./MessageList";
import WaitingPrompt from "./WaitingPrompt";
import Input from "./Input";

const Chatbot = () => {
  const [userInput, setUserInput] = useState("");
  const [isUsersTurn, setIsUsersTurn] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isTextareaDisabled, setIsTextareaDisabled] = useState(false);

  useEffect(() => {
    setIsActive(userInput.trim() !== "");
  }, [userInput]);

  useEffect(() => {
    if (!isUsersTurn) {
      handleBotAnswer();
    }
  }, [isUsersTurn]);

  const handleBotAnswer = () => {
    setIsLoading(true);

    fetch("http://127.0.0.1:5000/bot/messages")
      .then((response) => response.json())
      .then((data) => {
        const botResponse = data[0].text;
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botResponse, sender: "bot" },
        ]);
        console.log(data[0].text)
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
    <div>
      <div className="wrapper">
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
  );
};

export default Chatbot;

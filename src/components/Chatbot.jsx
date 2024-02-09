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

    const botResponse = "Hei Jonas! Hva kan jeg hjelpe deg med i dag?";
    // spilt response to characters
    const characters = botResponse.split("");
    let botMessage = "";

    const addCharacter = (index) => {
      if (index < characters.length) {
        // delete prev message
        if (index > 0) {
          setMessages((prevMessages) => prevMessages.slice(0, -1));
        }
        // Concatenate the character to the botMessage
        botMessage += characters[index];

        // Set the messages state with the current bot message
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: botMessage, sender: "bot" },
        ]);
        setTimeout(() => addCharacter(index + 1), 20);
      } else {
        setIsLoading(false);
        setIsUsersTurn(true);
      }
    };
    // function call with 0 as initial index
    addCharacter(0);
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

/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
// Styles
import "../assets/styles/components/input.css";
// Icons
import { FaArrowUp } from "react-icons/fa";

const Input = ({
  userInput,
  setUserInput,
  isActive,
  setMessages,
  isBotMessageLoading,
  setIsUsersTurn,
  isTextareaDisabled,
  isUsersTurn,
}) => {
  const textareaRef = useRef(null);

  // Hook for detecting and focusing the input
  useEffect(() => {
    if (isUsersTurn && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isUsersTurn]);

  // Function that posts the message from the user
  // --> Stores the message in an array for displaying purposes
  const handleUserMessage = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) {
      // Do nothing if input is empty
      return;
    }
    if (isBotMessageLoading) {
      // Do nothing if bot is writing
      return;
    }
    // POST userInput to backend
    // try {
    //   const response = await fetch("http://localhost:5000/message", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ message: userInput }),
    //   });
    //   const responseData = await response.json();
    //   console.log(responseData);
    // } catch (error) {
    //   console.error("Error:", error);
    // }

    // Add the user message to the messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, sender: "user" },
    ]);

    // Clear the input field
    setUserInput("");
    setIsUsersTurn(false);
    adjustTextareaHeight();
  };

  // Function to adjust the hight of the input field based on the content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  };

  // Enter --> submit the form
  // Enter + shift --> new line
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleUserMessage(e);
    } else if (e.key === "Enter" && e.shiftKey) {
      // (new line)
    }
  };

  return (
    <form onSubmit={handleUserMessage} className="input-form">
      <textarea
        ref={textareaRef}
        className="input-container"
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Ask me anything..."
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
          adjustTextareaHeight();
          console.log(textareaRef.current.scrollHeight);
        }}
        disabled={isBotMessageLoading || isTextareaDisabled}
      />

      <button
        disabled={!isUsersTurn}
        type="submit"
        className={isActive ? "active input-button" : "disabled input-button"}
      >
        <FaArrowUp size={20} color="white" />
      </button>
    </form>
  );
};

export default Input;

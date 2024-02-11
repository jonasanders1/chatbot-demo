/* eslint-disable react/prop-types */
import { useRef } from "react";
import { FaArrowUp } from "react-icons/fa";

const Input = ({
  userInput,
  setUserInput,
  isActive,
  setMessages,
  isLoading,
  setIsUsersTurn,
  isTextareaDisabled,
}) => {
  const textareaRef = useRef(null);

  const handleUserMessage = (e) => {
    e.preventDefault();
    if (!userInput.trim()) {
      return;
    }
    if (isLoading) {
      return;
    }

    // Add the user message to the messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userInput, sender: "user" },
    ]);

    // Clear the input field
    setUserInput("");
    setIsUsersTurn(false);
    adjustTextareaHeight();
  };

  // Function to adjust the hight of the input field
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
    <form onSubmit={handleUserMessage}>
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
        disabled={isLoading || isTextareaDisabled} // Disable textarea based on state
      />
      <button type="submit" className={isActive ? "active" : "disabled"}>
        <FaArrowUp size={20} color="white" />
      </button>
    </form>
  );
};

export default Input;

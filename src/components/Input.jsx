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

  // Function to adjust the textarea height based on its content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height to auto to recalculate the scroll height
      textarea.style.height = textarea.scrollHeight + "px"; // Set the height to match the scroll height
    }
  };

  return (
    <form onSubmit={handleUserMessage}>
      <textarea
        ref={textareaRef}
        className="input-container"
        type="text"
        placeholder="Ask me anything..."
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value);
          adjustTextareaHeight();
          console.log(textareaRef.current.scrollHeight);
        }}
      />
      <button type="submit" className={isActive ? "active" : "disabled"}>
        <FaArrowUp size={20} color="white" />
      </button>
    </form>
  );
};

export default Input;

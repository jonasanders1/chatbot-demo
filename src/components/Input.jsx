/* eslint-disable react/prop-types */
import { FaArrowUp } from "react-icons/fa";

const Input = ({
  userInput,
  setUserInput,
  isActive,
  setMessages,
  isLoading,
  setIsUsersTurn,
}) => {
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
  };

  return (
    <form onSubmit={handleUserMessage} className="input-container">
      <input
        type="text"
        placeholder="Ask me anything..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button type="submit" className={isActive ? "active" : "disabled"}>
        <FaArrowUp size={20} color="white" />
      </button>
    </form>
  );
};

export default Input;

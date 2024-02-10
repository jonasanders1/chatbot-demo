import { useState } from "react";
import { ReactTyped } from "react-typed";

const MyComponent = () => {
  const botMessage = ["Hei Jonas! Hva kan jeg hjelpe deg med i dag?"];

  const [animationComplete, setAnimationComplete] = useState(false);
  let lastIndex = 0;

  const handleTypingDone = () => {
    setAnimationComplete(true);
    lastIndex = botMessage.length - 1;
  };

  return (
    <div>
      {animationComplete ? (
        <p>{botMessage[lastIndex]}</p>
      ) : (
        <ReactTyped
          strings={botMessage}
          typeSpeed={40}
          onComplete={handleTypingDone}
          showCursor={true}
        />
      )}
    </div>
  );
};

export default MyComponent;

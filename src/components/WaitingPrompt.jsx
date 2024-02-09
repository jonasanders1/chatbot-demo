import "../index.css";
import Lottie from "lottie-react";
import animationData from "../assets/LoadingAnimation.json";
import { useState } from "react";

const WaitingPrompt = () => {
  const [isLoading, setIsLoading] = useState(false);

  setTimeout(() => {
    setIsLoading(true);
  }, 600);

  return (
    <div className="loading-container">
      {isLoading && (
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          style={{ width: 200, height: 90 }}
        />
      )}
    </div>
  );
};

export default WaitingPrompt;

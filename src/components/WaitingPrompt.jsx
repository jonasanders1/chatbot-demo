import "../index.css";
import Lottie from "lottie-react";
import animationData from "../assets/LoadingAnimation.json";

const WaitingPrompt = () => {
  return (
    <div className="loading-container">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 200, height: 90 }}
      />
    </div>
  );
};

export default WaitingPrompt;

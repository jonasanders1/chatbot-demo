// Animation downloaded as JSON
import animationData from "../assets/LoadingAnimation.json";
// Library for the loading animation
import Lottie from "lottie-react";
// styles
import "../assets/styles/components/loadingAnimation.css";

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <Lottie
        className="animation"
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 80, height: 80 }}
      />
    </div>
  );
};

export default LoadingAnimation;

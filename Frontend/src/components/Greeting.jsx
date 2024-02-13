import Logo from '../assets/robot.png'
import "../assets/styles/components/greeting.css";

const Greeting = () => {
  return (
    <div className="greeting-container">
    <img src={Logo} width={60} alt="logo"  />
    <h1 className="greeting-txt">How can i help you today?</h1>
  </div>
  )
}

export default Greeting

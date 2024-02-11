import "./App.css";
// import MyComponent from "./components/MyComponent";

import Chatbot from "./components/Chatbot";
import Header from "./components/Header";

function App() {
  return (
    <div className="container">
      <div className="header-wrapper">
        <Header />
      </div>
      <div className="bot-wrapper">
        <Chatbot />
      </div>
    </div>
  );
}

export default App;

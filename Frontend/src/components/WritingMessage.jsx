import { useState, useEffect } from 'react';

function MessageComponent() {
  const [message, setMessage] = useState('');
  const [index, setIndex] = useState(0);
  const text = "Hello, world! This is a test message."; // Your message here
  const delay = 100; // Milliseconds between each character

  useEffect(() => {
    // Clear message when component unmounts
    return () => {
      setMessage('');
    };
  }, []);

  useEffect(() => {
    // If index is less than the length of the text, set timeout to add next character
    if (index < text.length) {
      const timer = setTimeout(() => {
        setMessage(prevMessage => prevMessage + text.charAt(index));
        setIndex(prevIndex => prevIndex + 1);
      }, delay);

      // Clear timeout when component unmounts or index reaches the end
      return () => clearTimeout(timer);
    }
  }, [index, text]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default MessageComponent;

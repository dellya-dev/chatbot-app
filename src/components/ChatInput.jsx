import { useState } from 'react'
import {Chatbot} from 'supersimpledev'
import LoadingSpinnerImage from '../assets/loading-spinner.gif'
import './ChatInput.css'

function ChatInput({chatMessages, setChatMessages}) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  function saveInputText(event) {
    setInputText(event.target.value);
  }

  // function sendMessage() {
  async function sendMessage() {
    if (isLoading || inputText === '') {
      return;
    }

    setIsLoading(true);

    setInputText('');


    const newChatMessages = [
      ...chatMessages,
      {
        message:inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];


    //setChatMessages(newChatMessages);
    setChatMessages([
      ...newChatMessages,
      {
        message: <img src={LoadingSpinnerImage} alt="loading" className="loading-spinner" 
        />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    
    // const response = Chatbot.getResponse(inputText);
    const response = await Chatbot.getResponseAsync(inputText);
      setChatMessages([
      ...newChatMessages,
      {
        message:response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setIsLoading(false);

    //setInputText('');
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      sendMessage();
    } else if (event.key === 'Escape') {
      setInputText('');
    }
  }

  return (
    <div className="chat-input-container">
      <input type="text" 
        placeholder="Send a message to Chatbot" size="30" 
        onChange={saveInputText}
        onKeyDown={handleKeyDown}
        value={inputText}
        className="chat-input"
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
}

export default ChatInput;

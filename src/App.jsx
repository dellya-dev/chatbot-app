import { useState, useEffect} from 'react'
import { ChatInput } from './components/Chatinput'
import ChatMessages from './components/ChatMessages'
import './App.css'
import { Chatbot } from 'supersimpledev'



 function App() {
        /*
        const [chatMessages, setChatMessages] = React.useState([{
            message: 'hello chatbot', 
            sender: 'user',
            id: 'id1'
          }, {
            message: 'Hello! How can help you',
            sender: 'robot',
            id: 'id2'
          }, {
            message: 'can you get me todays date', 
            sender: 'user',
            id: 'id3'
          }, {
            message: 'today is today', 
            sender: 'robot',
            id: 'id4'
          }]); */

          const [chatMessages, setChatMessages] = useState([]);
        //  const [chatMessages, setChatMessages] = array;
       // const chatMessages = array[0];
      //  const setChatMessages = array[1];
      // call array destructuring

      useEffect(() => {
        Chatbot.addResponses({
          'goodbye': 'Goodbye. Have a great day!',
          'give me a unique id': function() {
            return `Sure! here's a unique ID: ${crypto.randomUUID()}`
          }
        });
      }, []);

        return (
          <div className="app-container">
            {chatMessages.length === 0 && (
              <p className="welcome-message">
                Welcome to the chatbot project! Send a message using the textbox
              </p>
            )}
            <ChatMessages 
            chatMessages={chatMessages}
            />
            <ChatInput 
              chatMessages={chatMessages}
              setChatMessages={setChatMessages}
            />
          </div>
        );
      }

export default App

import React, { useState } from 'react';
import Message from '../components/Message';

const MessageContext = React.createContext();

const MessageContextProvider = props => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message, color) => {
    setMessages([...messages, { text: message, color }]);
    // setTimeout(() => {
    //   setMessages(messages.filter(msg => msg.text !== message));
    // }, 3000);
  };

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
      {messages.map(msg => (
        <Message key={msg.text} color={msg.color}>
          {msg.text}
        </Message>
      ))}
      {props.children}
    </MessageContext.Provider>
  );
};

const MessageContextConsumer = MessageContext.Consumer;

export { MessageContext, MessageContextProvider, MessageContextConsumer };

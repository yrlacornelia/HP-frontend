'use client'
import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';

const WebSocketComponent = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stomp = Stomp.over(socket);
    
    stomp.connect({}, () => {
      console.log('Connected to WebSocket');
      
      stomp.subscribe('/topic/public', (response) => {
        const message = JSON.parse(response.body);
        setReceivedMessage(message.content);
      });

      setStompClient(stomp);
    }, (error) => {
      console.error('Connection error', error);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect(() => {
          console.log('Disconnected from WebSocket');
        }, {});
      }
    };
  }, []);

  const sendMessage = () => {
    if (stompClient && message) {
      const chatMessage = {
        content: message,
        sender: { username: 'hej' } 
      };
      stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
      setMessage('');
    }
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message..."
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h2>Received message:</h2>
        <p>{receivedMessage}</p>
      </div>
    </div>
  );
};

export default WebSocketComponent;

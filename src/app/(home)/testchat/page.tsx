'use client'
'use client'
import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Client } from 'stompjs';
const WebSocketComponent = () => {
  const [stompClients, setStompClients] = useState(null);
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  useEffect(() => {
    // Establishing WebSocket connection
    const socket = new SockJS('http://localhost:8080/ws'); // Replace with your server URL

    const stomp = Stomp.over(socket);
    stomp.connect({}, () => {
      console.log('Connected to WebSocket');

      // Subscribing to the topic
      stomp.subscribe('/topic/greetings', (response) => {
        const message = JSON.parse(response.body);
        setReceivedMessage(message.content);
      });
    });


  }, []); // Empty dependency array ensures useEffect runs only once


  return (
    <div>
      <h1>WebSocket Example</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message..."
      />
    
      <div>
        <h2>Received message:</h2>
        <p>{receivedMessage}</p>
      </div>
    </div>
  );
};

export default WebSocketComponent;

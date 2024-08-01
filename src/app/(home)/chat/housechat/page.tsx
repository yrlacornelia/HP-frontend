'use client'
import React, { useEffect, useState } from "react";
import ChatFeedCard from "@/components/cards/chatFeedCard";
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';
import ChatSidebar from "@/components/navigation/chatSidebar";
import EventCard from "@/components/cards/eventCard";
import { fetchAllEvents, fetchCsrfToken } from "@/app/utils/api";
type Message = {
    id: number;
    content: string;
    createdAt: string;
    sender: {
        id: number;
        username: string;
        imageData: string;
    };
};
type RecivedMessage = {
    id: number;
    content: string;
    createdAt: string;

};
const HouseChate = () => {

    const [user, setUser] = useState("")
    useEffect(() => {
        const fetchCurrentUser = async () => {
          try {
              const response = await fetch('http://localhost:8080/users/currentuser', {
                  method: 'GET',
                  credentials: 'include', 
              });
              
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              
              const data = await response.json(); 
              setUser(data.username);
              return data.username;
          } catch (error) {
              console.error("Failed to fetch current user:", error);
              throw error;
          }
      };
      fetchCurrentUser();
      }, []);
      useEffect(() => {
        const fetchAllUsers = async () => {
            const users = await fetchAllEvents();
            console.log(users)
            setEvents(users);
       
        };
        fetchAllUsers();
    }, []);


    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [message, setMessage] = useState('');
    const [events, setEvents] = useState<{id: number; title: string; startTime: string;content: string; attendees: number;}[]>([]);
    const [receivedMessages, setReceivedMessages] = useState<{ id: number; createdAt: string;content: string; sender: { username: string; } }[]>([]);
    const [messages, setMessages] = useState<Message[]>([]); 
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const stomp = Stomp.over(socket);
        
        stomp.connect({}, () => {
          console.log('Connected to WebSocket');
          stomp.subscribe('/topic/public', (response) => {
            const themessage = JSON.parse(response.body);
            
            setReceivedMessages(receivedMessages => {
                if (!receivedMessages.some(msg => msg.id === themessage.id)) {
                    return [themessage, ...receivedMessages];
                }
                return receivedMessages;
            });
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
            sender: { username:user} 
          };
          stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));

          setMessage('');
        }
      };    
      

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch('http://localhost:8080/chat/returnAllMessages', {
                    method: 'GET',
                    credentials: 'include', 
                });      

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMessages(data); 
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []); 

     useEffect(() => {
        const getCsrfToken = async () => {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
        };
        getCsrfToken();
    }, []);

    const [csrfToken, setCsrfToken] = useState('');
        const setAttend = async () => {
            try {
                const response = await fetch('http://localhost:8080/users/setEvent', {
                    method: 'POST',
                    credentials: 'include', 
                    headers: {
                        'X-CSRF-TOKEN': csrfToken
                    },
                });      

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
           
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };
console.log(events)
      

    return (<div className="flex justify-between">
        <ChatSidebar />
        <div className="flex gap-10 w-1/2 flex-col">
            <div onKeyDown={(e) => {
        if (e.key === "Enter")
            sendMessage();
        }} className=" border px-20 py-10  rounded-md border-transparent bg-blue mt-10">
                <p className="mb-5">Hello yrla, welcome to the chat of house Griffindor</p>
                <div >
                    <textarea className="text-black" placeholder="Whats on your mind?" name="textarea" id="textarea" onChange={(e) => setMessage(e.target.value)} rows={2} cols={70}></textarea>
                </div>
                {/* <button onClick={sendMessage}>Send</button> */}
            </div>
    
            {receivedMessages.map((message) => (
                    <ChatFeedCard
                        key={message.id}
                        user={message.sender.username}
                        time={message.createdAt}
                        content={message.content}
                        img={"/"}
                    />
                ))}
                      {messages.map((message) => (
                    <ChatFeedCard
                        key={message.id}
                        user={message.sender.username}
                        time={message.createdAt}
                        content={message.content}
                        img={"/"}
                    />
                ))}
        </div>

        <div>
             {events.map((event) => (
                 <div key={event.id}>
                     <EventCard title={event.title} content={event.content} time={event.startTime} attendees={event.attendees} />
                
                 </div>
             ))}
         </div>
         <div>
            <button onClick={setAttend}>set atteend</button>
         </div>



    </div>);
}

 export default HouseChate;

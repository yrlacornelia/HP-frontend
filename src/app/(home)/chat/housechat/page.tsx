'use client'
import React, { useEffect, useState } from "react";
import ChatFeedCard from "@/components/cards/chatFeedCard";
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';
import ChatSidebar from "@/components/navigation/chatSidebar";
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


    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [message, setMessage] = useState('');
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
    return (<div className="flex justify-between">
        <ChatSidebar />
        <div className="flex gap-10 w-1/2 flex-col">
            <div className=" border px-20 py-10 border-lg boder-black">
                <p className="mb-5">Hello yrla, welcome to the chat of house Griffindor</p>
                <div >
                    <textarea placeholder="Whats on your mind?" name="textarea" id="textarea" onChange={(e) => setMessage(e.target.value)} rows={2} cols={70}></textarea>
                </div>
                <button onClick={sendMessage}>Send</button>
            </div>
    
            {receivedMessages.map((message) => (
                    <ChatFeedCard
                        key={1}
                        user={message.sender.username}
                        time={message.createdAt}
                        content={message.content}
                        img={"/"}
                    />
                ))}
                      {messages.map((message) => (
                    <ChatFeedCard
                        key={1}
                        user={message.sender.username}
                        time={"11"}
                        content={message.content}
                        img={"/"}
                    />
                ))}
        </div>

        <div className="w-80 m-5  rounded bg-black h-max p-5  flex flex-col gap-5 ">


            <h3 className="text-center">Going shark fishing</h3>
            <div className=" w-full h-0.5 bg-white blur-sm"></div>
            <div className="flex items-center gap-5">
                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.875 30.875H8.125V13H30.875M26 1.625V4.875H13V1.625H9.75V4.875H8.125C6.32125 4.875 4.875 6.32125 4.875 8.125V30.875C4.875 31.737 5.21741 32.5636 5.8269 33.1731C6.4364 33.7826 7.26305 34.125 8.125 34.125H30.875C31.737 34.125 32.5636 33.7826 33.1731 33.1731C33.7826 32.5636 34.125 31.737 34.125 30.875V8.125C34.125 7.26305 33.7826 6.4364 33.1731 5.8269C32.5636 5.21741 31.737 4.875 30.875 4.875H29.25V1.625M27.625 19.5H19.5V27.625H27.625V19.5Z" fill="white" />
            </svg>
                <p className="opacity-55">march 20, 19:00</p></div>
            <div className=" w-full h-0.5 bg-white blur-sm"></div>
            <div className="flex  items-center gap-5">
                <svg width="39" height="39" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 19.5C17.7125 19.5 16.25 18.0375 16.25 16.25C16.25 14.4625 17.7125 13 19.5 13C21.2875 13 22.75 14.4625 22.75 16.25C22.75 18.0375 21.2875 19.5 19.5 19.5ZM29.25 16.575C29.25 10.6762 24.9437 6.5 19.5 6.5C14.0563 6.5 9.75 10.6762 9.75 16.575C9.75 20.3775 12.9187 25.415 19.5 31.4275C26.0813 25.415 29.25 20.3775 29.25 16.575ZM19.5 3.25C26.325 3.25 32.5 8.4825 32.5 16.575C32.5 21.97 28.1612 28.3562 19.5 35.75C10.8388 28.3562 6.5 21.97 6.5 16.575C6.5 8.4825 12.675 3.25 19.5 3.25Z" fill="white" />
            </svg>
                <p className="opacity-55">Forbidden forest</p></div>
            <div className=" w-full h-0.5 bg-white blur-sm"></div>
            <div className="flex items-center gap-5"> 
                <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.1874 23C28.3402 23 26.5541 22.1752 25.1561 20.6784C23.7968 19.2185 22.9667 17.2716 22.8202 15.198C22.6639 12.986 23.3386 10.952 24.7195 9.46953C26.1004 7.98711 28.0311 7.1875 30.1874 7.1875C32.3284 7.1875 34.2645 8.00148 35.6409 9.48031C37.0308 10.9735 37.7073 13.004 37.551 15.1971C37.401 17.2734 36.5717 19.2194 35.2151 20.6775C33.8207 22.1752 32.0355 23 30.1874 23ZM42.0315 38.8125H18.3442C17.9634 38.8145 17.5871 38.7292 17.2445 38.563C16.9018 38.3968 16.6018 38.1542 16.3676 37.8539C16.1192 37.5283 15.9477 37.1507 15.8658 36.7495C15.784 36.3482 15.794 35.9337 15.8951 35.5368C16.6515 32.4992 18.5257 29.98 21.3144 28.2523C23.7896 26.7195 26.9404 25.875 30.1874 25.875C33.4981 25.875 36.5663 26.6836 39.0559 28.2154C41.8509 29.9341 43.7277 32.4677 44.4806 35.5422C44.5805 35.9393 44.5894 36.3539 44.5066 36.7549C44.4238 37.156 44.2516 37.5332 44.0027 37.8584C43.7687 38.1573 43.4694 38.3987 43.1278 38.5641C42.7861 38.7295 42.4111 38.8144 42.0315 38.8125ZM13.2069 23.3594C10.0453 23.3594 7.26556 20.4197 7.00771 16.8071C6.88013 14.9563 7.45693 13.2448 8.6249 11.9896C9.78029 10.7471 11.4101 10.0625 13.2069 10.0625C15.0038 10.0625 16.621 10.7507 17.7827 12.0004C18.9596 13.2654 19.5346 14.9734 19.3999 16.8089C19.142 20.4206 16.3631 23.3594 13.2069 23.3594ZM19.1061 26.185C17.5257 25.4123 15.4746 25.026 13.2078 25.026C10.561 25.026 7.9906 25.716 5.96912 26.9684C3.6772 28.3906 2.13548 30.4615 1.51287 32.9619C1.42175 33.3215 1.41313 33.6971 1.48766 34.0605C1.56218 34.424 1.71792 34.7659 1.94322 35.0606C2.157 35.3351 2.43088 35.5568 2.74379 35.7088C3.0567 35.8609 3.4003 35.9391 3.74818 35.9375H13.7208C13.8892 35.9375 14.0521 35.8784 14.1813 35.7705C14.3106 35.6626 14.3978 35.5128 14.4279 35.3472C14.4378 35.2906 14.4504 35.234 14.4647 35.1783C15.2266 32.1182 17.0118 29.5325 19.6496 27.6476C19.7466 27.5777 19.8247 27.4846 19.8767 27.3769C19.9286 27.2692 19.9529 27.1502 19.9473 27.0308C19.9417 26.9113 19.9063 26.7951 19.8445 26.6928C19.7826 26.5904 19.6962 26.5051 19.593 26.4446C19.452 26.362 19.2902 26.2748 19.1061 26.185Z" fill="white" />
            </svg>
                <p className="opacity-55">18</p></div>


        </div>
    </div>);
}

export default HouseChate;


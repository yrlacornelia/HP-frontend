'use client'
import React, { useEffect, useState } from "react";
import ChatFeedCard from "@/components/cards/chatFeedCard";
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';
import ChatSidebar from "@/components/navigation/chatSidebar";
import EventCard from "@/components/cards/eventCard";
import { fetchAllEvents, fetchCsrfToken, fetchCurrentEvents, fetchCurrentUser } from "@/app/utils/api";
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
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [message, setMessage] = useState('');
    const [events, setEvents] = useState<{ id: number; title: string; startTime: string; content: string; attendees: string[]; }[]>([]);
    const [userEvents, setUserEvents] = useState<{ id: number; title: string; }[]>([]);
    const [receivedMessages, setReceivedMessages] = useState<{ id: number; createdAt: string; content: string; sender: { username: string; } }[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchUser = async () => {
            const currentuser = await fetchCurrentUser();
            setUser(currentuser.username)
        };
        fetchUser();
    }, []);
    useEffect(() => {
        const fetchCurUserEvents = async () => {
            const currentuser = await fetchCurrentEvents();
            setUserEvents(currentuser)
        };

        fetchCurUserEvents();
    }, []);

 
    useEffect(() => {
        const fetchAll = async () => {
            const users = await fetchAllEvents();
            setEvents(users);

        };
        fetchAll();
    }, []);

    const attending = (eventId:number) => {
        const eventWithId1 = userEvents.find(event => event.id === eventId);
        
        if(eventWithId1)
            return true 
        else 
        return false 
        
    }
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
                sender: { username: user }
            };
            stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));

            setMessage('');
        }
    };
console.log(userEvents)

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
            <div onKeyDown={(e) => {
                if (e.key === "Enter")
                    sendMessage();
            }} className=" border px-20 py-10  rounded-md border-transparent bg-blue mt-10">
                <p className="mb-5">Hello {user}, welcome to the chat of house Griffindor</p>
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
                    <EventCard attending={attending(event.id)} id={event.id} title={event.title} content={event.content} time={event.startTime} attendees={event.attendees} />

                </div>
            ))}
        </div>
        <div>

        </div>



    </div>);
}

export default HouseChate;

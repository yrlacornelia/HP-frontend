'use client'
import Image from 'next/image';
import React from 'react';

type ChatFeedCardProps = {
    user: string;
    time: string;
    content: string;
    img: string;
};

const ChatFeedCard: React.FC<ChatFeedCardProps> = ({ user, time, content, img }) => {
    const createdAt = new Date(time);
    const formattedDate = createdAt.toLocaleString('sv-SE', { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    return (
        <>
            <div className="border px-20 py-10 border-lg border-black">
                <div className="mb-5 flex gap-5">

                    <Image className="h-10 w-10  rounded-full" width={200} height={200}  src={`data:image/jpeg;base64,${img}`} alt="letter" />
                    <div>
                        <p>{user}</p>
                        <p>{formattedDate}</p>
                    </div>
                </div>
                <div>{content}</div>
            </div>
        </>
    );
};

export default ChatFeedCard;

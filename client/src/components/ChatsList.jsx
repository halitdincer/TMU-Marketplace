import React from "react";
import { Link } from "react-router-dom";

function ChatsList({ messages, conversantId, userId }) {
  conversantId = parseInt(conversantId);

  // Group messages by conversation and find the latest message in each
  const latestMessages = messages.reduce((acc, message) => {
    // Determine the other party in the conversation
    const key = message.sender === userId ? message.receiver : message.sender;

    // If there's already an entry for this conversation, check if the current message is newer
    if (!acc[key] || new Date(acc[key].timestamp) < new Date(message.timestamp)) {
      acc[key] = message;
    }

    return acc;
  }, {});

  const chats = Object.values(latestMessages).map((message) => ({
    id: message.sender === userId ? message.receiver : message.sender,
    name: message.sender === userId ? message.receiver_name : message.sender_name,
    last_message: message.sender === userId ? `You: ${message.text}` : message.text,
    profile_picture_url: message.sender === userId ? message.receiver_profile_picture : message.sender_profile_picture,
    timestamp: message.timestamp,
  }));

  return (
    <div className="lg:w-1/3 w-full h-screen overflow-y-auto p-3 mb-9 pb-20">
      <h1 className="text-2xl font-semibold mb-4">Chats</h1>
      {chats.map((chat, index) => (
        <Link key={index} to={`/inbox/${chat.id}`}>
          <div
            className={`flex items-center mb-1 border-b border-t border-gray-100 cursor-pointer p-2 rounded-md ${
              chat.id === conversantId ? "bg-gray-100" : "hover:bg-gray-100"
            }`}
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img
                src={chat.profile_picture_url ? chat.profile_picture_url : `https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato`}
                alt="Conversation Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{chat.name}</h2>
              <p className="text-gray-600">{chat.last_message}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChatsList;

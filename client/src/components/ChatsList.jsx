import React from "react";
import { Link } from "react-router-dom";
function ChatsList({ chats, conversantId }) {
  conversantId = parseInt(conversantId);

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
                src={`https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato`}
                alt="Conversation Avatar"
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{chat.name}</h2>
              <p className="text-gray-600">{chat.last_message}</p>
              <p className="text-gray-600">{chat.last_message.timestamp}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ChatsList;

import React from 'react';

function Avatar({ avatarUrl, altText }) {
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
      <img src={avatarUrl} alt={altText} className="w-8 h-8 rounded-full" />
    </div>
  );
}

function ChatMessage({ message, isSender }) {
  const messageClass = isSender ? "flex justify-end mb-4 cursor-pointer" : "flex mb-4 cursor-pointer";
  const messageBoxClass = isSender ? "flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3" : "flex max-w-96 bg-white rounded-lg p-3 gap-3";
  const avatarUrl = isSender
    ? "https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato"
    : "https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato";
  
  return (
    <div className={messageClass}>
      {!isSender && <Avatar avatarUrl={avatarUrl} altText="User Avatar" />}
      <div className={messageBoxClass}>
        <p>{message.text}</p>
      </div>
      {isSender && <Avatar avatarUrl={avatarUrl} altText="My Avatar" />}
    </div>
  );
}

function ChatWindow({ messages, userId }) {
  // Sort messages by timestamp before rendering
  const sortedMessages = messages.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
  return (
    <div className="flex-1 relative">
      <header className="bg-white p-4 text-gray-700">
        <h1 className="text-2xl font-semibold">{messages[0].receiver_name}</h1>
      </header>
      <div className="h-screen overflow-y-auto p-4 pb-36">
        {sortedMessages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} isSender={msg.sender === userId} />
        ))}
      </div>
      <footer className="bg-white p-4 absolute bottom-0 w-full">
        <div className="flex items-center">
          <input type="text" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
          <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
        </div>
      </footer>
    </div>
  );
}

export default ChatWindow;

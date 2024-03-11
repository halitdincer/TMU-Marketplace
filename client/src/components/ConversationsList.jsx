import React from 'react';
function ConversationsList({conversations}){

  return (
    <div className="w-1/3 h-screen overflow-y-auto p-3 mb-9 pb-20">
      {conversations.map((conversation, index) => (
        <div key={index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
            <img 
              src={`https://placehold.co/200x/${conversation.color}/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato`} 
              alt="Conversation Avatar" 
              className="w-12 h-12 rounded-full" 
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold">{conversation.name}</h2>
            <p className="text-gray-600">{conversation.last_message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConversationsList;

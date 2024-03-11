import React, { useState, useEffect } from 'react';
import Sidebar from 'components/Sidebar';
import ConversationsList from 'components/ConversationsList';

function InboxPage(){
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const userId = 1; // Assuming this is the logged-in user's ID
    const fetchMessages = async () => {
      try {
        const [receivedResponse, sentResponse] = await Promise.all([
          fetch(`http://localhost:8000/api/messages/?receiver_id=${userId}`),
          fetch(`http://localhost:8000/api/messages/?sender_id=${userId}`)
        ]);
  
        if (!receivedResponse.ok || !sentResponse.ok) {
          throw new Error('Network response was not ok');
        }
  
        const receivedMessages = await receivedResponse.json();
        const sentMessages = await sentResponse.json();
  
        const allMessages = [...receivedMessages, ...sentMessages];
  
        // Adjusting for conversation identification based on the sender and receiver names
        const groupedConversations = allMessages.reduce((acc, message) => {
          const otherUserId = message.sender === userId ? message.receiver : message.sender;
          const otherUserName = message.sender === userId ? message.receiver_name : message.sender_name;
  
          if (!acc[otherUserId]) {
            acc[otherUserId] = {
              id: otherUserId,
              messages: [],
              name: otherUserName, // Name of the person user is conversing with
            };
          }
          acc[otherUserId].messages.push(message);
          return acc;
        }, {});
  
        // Extract and prepare conversations for the state
        const conversationsArray = Object.values(groupedConversations).map(convo => ({
          id: convo.id,
          name: convo.name,
          last_message: convo.messages[0].text, // Assuming the last message's text is needed
        }));
  
        setConversations(conversationsArray);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    fetchMessages();
  }, []);


  return (
    <div className="flex">
      <Sidebar />
      <div class="flex-1 flex h-screen overflow-hidden pt-6 sm:pt-6">

        <ConversationsList  conversations={conversations} />

        <div class="flex-1 relative">

            <header class="bg-white p-4 text-gray-700">
                <h1 class="text-2xl font-semibold">Alice</h1>
            </header>
            

            <div class=" h-screen overflow-y-auto p-4 pb-36">

               <div class="flex mb-4 cursor-pointer">
                 <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-8 h-8 rounded-full" />
                 </div>
                 <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p class="text-gray-700">Hey Bob, how's it going?</p>
                 </div>
               </div>
               
               <div class="flex justify-end mb-4 cursor-pointer">
                 <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
                 </div>
                 <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" class="w-8 h-8 rounded-full" />
                 </div>
               </div>
               
               <div class="flex mb-4 cursor-pointer">
                 <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-8 h-8 rounded-full" />
                 </div>
                 <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p class="text-gray-700">That book sounds interesting! What's it about?</p>
                 </div>
               </div>
               
               <div class="flex justify-end mb-4 cursor-pointer">
                 <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>It's about an astronaut stranded on Mars, trying to survive. Gripping stuff!</p>
                 </div>
                 <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" class="w-8 h-8 rounded-full" />
                 </div>
               </div>
               
               <div class="flex mb-4 cursor-pointer">
                 <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-8 h-8 rounded-full" />
                 </div>
                 <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p class="text-gray-700">I'm intrigued! Maybe I'll borrow it from you when you're done?</p>
                 </div>
               </div>
               
               <div class="flex justify-end mb-4 cursor-pointer">
                 <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Of course! I'll drop it off at your place tomorrow.</p>
                 </div>
                 <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" class="w-8 h-8 rounded-full" />
                 </div>
               </div>
               
               <div class="flex mb-4 cursor-pointer">
                 <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-8 h-8 rounded-full" />
                 </div>
                 <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p class="text-gray-700">Thanks, you're the best!</p>
                 </div>
               </div>
               
               <div class="flex justify-end mb-4 cursor-pointer">
                 <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Anytime! Let me know how you like it. 😊</p>
                 </div>
                 <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" class="w-8 h-8 rounded-full" />
                 </div>
               </div>
               
               <div class="flex mb-4 cursor-pointer">
                 <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-8 h-8 rounded-full" />
                 </div>
                 <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p class="text-gray-700">So, pizza next week, right?</p>
                 </div>
               </div>
               
               <div class="flex justify-end mb-4 cursor-pointer">
                 <div class="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                   <p>Absolutely! Can't wait for our pizza date. 🍕</p>
                 </div>
                 <div class="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                   <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" class="w-8 h-8 rounded-full" />
                 </div>
               </div>
               <div class="flex mb-4 cursor-pointer">
                 <div class="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                   <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" class="w-8 h-8 rounded-full" />
                 </div>
                 <div class="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                   <p class="text-gray-700">Hoorayy!!</p>
                 </div>
               </div>
               
            </div>
            
            <footer class="bg-white p-4 absolute bottom-0 w-full">
                <div class="flex items-center">
                    <input type="text" placeholder="Type a message..." class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
                    <button class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                </div>
            </footer>
        </div>
      </div>
    </div>

  );
};

export default InboxPage;
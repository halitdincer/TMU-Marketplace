import React, { useState, useEffect, useContext } from 'react';
import Sidebar from 'components/Sidebar';
import ChatsList from 'components/ChatsList';
import { useParams } from 'react-router-dom';
import ChatWindow from 'components/ChatWindow';
import { AuthContext } from 'components/AuthProvider';


function InboxPage() {
  
  const [chats, setChats] = useState([]);
  const [activeChatMessages, setActiveChatMessages] = useState([]);
  let { conversantId } = useParams();
  const { userData, apiToken } = useContext(AuthContext);

  

  useEffect(() => {
    const userId = userData.id; 
    const fetchMessages = async () => {
      try {

        const options = {
          headers: {
            'Authorization': `Token ${apiToken}` 
          }
        };

        const [receivedResponse, sentResponse] = await Promise.all([
          fetch('http://localhost:8000/api/messages/received', options),
          fetch('http://localhost:8000/api/messages/sent', options)
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
  
        // Extract and prepare chats for the state
        setChats(
          Object.values(groupedConversations).map(chat => ({
            id: chat.id,
            name: chat.name,
            last_message: chat.messages[0].text,
          }))
        );

        // Extract and prepare the active chat messages for the state
        if (conversantId && conversantId.trim() !== '') {
          const activeChat = groupedConversations[parseInt(conversantId)];
          if (activeChat) {
            setActiveChatMessages(activeChat.messages);
          }
        }

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
  
    fetchMessages();
  }, [conversantId]);



  return (
    <div className="flex">
      <Sidebar />
      
      <div class="flex-1 flex h-screen overflow-hidden pt-6 sm:pt-6">

        {/* Check if user signed in yet */}
        {!userData ? (
          <>
          {/* If user is not signed in, display warning */}
          <div className='flex justify-center items-center text-center h-screen w-full'>
            <p>Login required to view your messages. Please <a href='login' className='text-blue-600'>sign in</a>.</p>
          </div>
          </>
        ) : (
          <>
          {/* If user already signed in, display chatsList and chatWindow */}
          <ChatsList  chats={chats} conversantId={conversantId} />

          {activeChatMessages && activeChatMessages.length > 0 ? (
            <ChatWindow userId={1} messages={activeChatMessages} />
          ) : (
            <div className='flex justify-center items-center text-center h-screen w-full'>
              <p>No messages to display. Please select a conversation</p>
            </div>
          )}

          </>

        )}
      </div>
    </div>

  );
};

export default InboxPage;
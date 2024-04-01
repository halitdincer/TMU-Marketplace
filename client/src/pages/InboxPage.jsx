import React, { useState, useEffect, useContext } from "react";
import Sidebar from "components/Sidebar";
import ChatsList from "components/ChatsList";
import { useParams, Link } from "react-router-dom";
import ChatWindow from "components/ChatWindow";
import { AuthContext } from "components/AuthProvider";

function InboxPage() {
  const [chats, setChats] = useState([]);
  const [activeChatMessages, setActiveChatMessages] = useState([]);
  let { conversantId } = useParams();
  const { userData } = useContext(AuthContext);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // Initial check on mount
    handleResize();
    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const userId = 1; // Assuming this is the logged-in user's ID
    const fetchMessages = async () => {
      try {
        const [receivedResponse, sentResponse] = await Promise.all([
          fetch(`http://localhost:8000/api/messages/?receiver_id=${userId}`),
          fetch(`http://localhost:8000/api/messages/?sender_id=${userId}`),
        ]);

        if (!receivedResponse.ok || !sentResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const receivedMessages = await receivedResponse.json();
        const sentMessages = await sentResponse.json();

        const allMessages = [...receivedMessages, ...sentMessages];

        // Adjusting for conversation identification based on the sender and receiver names
        const groupedConversations = allMessages.reduce((acc, message) => {
          const otherUserId =
            message.sender === userId ? message.receiver : message.sender;
          const otherUserName =
            message.sender === userId
              ? message.receiver_name
              : message.sender_name;

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
          Object.values(groupedConversations).map((chat) => ({
            id: chat.id,
            name: chat.name,
            last_message: chat.messages[0].text,
          }))
        );

        // Extract and prepare the active chat messages for the state
        if (conversantId && conversantId.trim() !== "") {
          const activeChat = groupedConversations[parseInt(conversantId)];
          if (activeChat) {
            setActiveChatMessages(activeChat.messages);
          }
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchMessages();
  }, [conversantId]);

  return (
    <div className="flex">
      {/* <Sidebar /> */}
      {!isMobile && <Sidebar />}
      <div className="flex-1 flex h-screen overflow-hidden pt-6 sm:pt-6 sm:ml-28">
        {/* Check if user signed in yet */}
        {!userData ? (
          <>
            {/* If user is not signed in, display warning */}
            <div className="flex justify-center items-center text-center h-screen w-full">
              <p>
                Login required to view your messages. Please{" "}
                <a href="login" className="text-blue-600">
                  sign in
                </a>
                .
              </p>
            </div>
          </>
        ) : (
          <>
            {/* If user already signed in, display chatsList and chatWindow */}
            {isMobile ? (
              <>
                {/* Mobile view: Check if a specific conversation is selected */}
                {conversantId &&
                conversantId.trim() !== "" &&
                activeChatMessages.length > 0 ? (
                  <>
                    <div className="fixed top-4 left-0 z-50 p-3 mb-6">
                      {/* Back arrow to go back to the chats list */}
                      <Link to="/inbox" className="text-gray-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </Link>
                    </div>
                    {/* Render ChatWindow for the selected conversation */}

                    <ChatWindow userId={1} messages={activeChatMessages} />
                  </>
                ) : (
                  // If no specific conversation selected, display the ChatsList
                  <>
                    <Sidebar />
                    <ChatsList chats={chats} conversantId={conversantId} />
                  </>
                )}
              </>
            ) : (
              <>
                <ChatsList chats={chats} conversantId={conversantId} />
                {activeChatMessages && activeChatMessages.length > 0 ? (
                  <ChatWindow userId={1} messages={activeChatMessages} />
                ) : (
                  <div className="flex flex-col justify-center items-center flex-1">
                    <p>No messages to display. Please select a conversation</p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default InboxPage;

import React from 'react';
import AdsList from 'components/AdsList'
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { socket } from 'utils/socket';

function InboxPage({isConnected}){

  function connect() {
    alert("Starting the connection");
    socket.connect();
  }

  function disconnect() {
    alert("Ending the connection");
    socket.disconnect();
  }

  return (
    <div className="flex">
      <Sidebar />
      <div class="flex-1">
        <Header />
        <div className="bg-white py-6 sm:py-6">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="text-5xl font-semibold">Inbox</h1>
            <p>State: { '' + isConnected }</p>
            <button onClick={ connect }>Connect</button>
            <button onClick={ disconnect }>Disconnect</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InboxPage;
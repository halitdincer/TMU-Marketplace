import { io } from 'socket.io-client';

//const URL = process.env.NODE_ENV === 'production' ? undefined : 'ws://localhost:8000/chat/';
const URL = 'ws://localhost:8000/chat/' ;
export const socket = io(URL, {
    autoConnect: false
});
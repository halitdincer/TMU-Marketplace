// The WebSocket client for connecting to the WebSocket server.
import { io } from 'socket.io-client';

/**
 * The URL of the WebSocket server.
 * @type {string}
 */
const URL = 'ws://localhost:8000/chat/';

/**
 * The socket instance for connecting to the WebSocket server.
 * @type {Socket}
 */
export const socket = io(URL, {
    autoConnect: false
});
import io from 'socket.io-client';
import feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client';

const socket = io();
const client = feathers();

client.configure(hooks());
client.configure(socketio(socket));

export default client;

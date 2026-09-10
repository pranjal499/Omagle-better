import express from 'express'
import type { Application, Request, Response } from 'express'
import http, { createServer } from 'http'
import { join } from 'path'
import { Server, Socket } from 'socket.io'
import { UserManager } from './managers/UserManager.js';

const app: Application = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

const userManager = new UserManager();
console.log('socket io server is initialized');

io.engine.on('connection_error', (err) => {
    console.log('socket error')
    console.log(err);
})

io.on('connection', (socket: Socket) => {
    console.log("user is connected")
    userManager.addUser('initName', socket);
    socket.on('disconnect', () => {
        userManager.removeUser(socket.id);
    })
})

server.listen(3000, () => {
    console.log('server is running on port *3000');
})
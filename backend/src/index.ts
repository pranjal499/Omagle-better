import express from 'express'
import type {Application, Request, Response} from 'express'
import http, {createServer} from 'http'
import {join} from 'path'
import {Server, Socket} from 'socket.io'

const app: Application = express();
const server = http.createServer(http);

const io = new Server();

io.on('connection', (socket: Socket) => {
    console.log("user is connected")
})

app.listen(3000, () => {
    console.log('server is running on port 3000');
})
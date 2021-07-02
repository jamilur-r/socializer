import express from 'express'
import { createServer } from "http";
import { Server } from 'socket.io'


const baseapp = express()
const post_server = createServer(baseapp)
const io = new Server(post_server)

baseapp.get('/', (req, res) => res.json({ msg: 'helo' }))

io.on('connection', (socket) => {
    console.log('a user connected');
});

post_server.listen(5001, () => console.log(`POST SERVER @ http://localhost:5001`))
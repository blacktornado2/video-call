import express, { Express, Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app: Express = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // IMPORTANT: In production, restrict this to your app's domain
    methods: ["GET", "POST"],
  },
});

app.get('/', (req: Request, res: Response) => {
  res.send('✅ Togetherly Signaling Server is running!');
});

// --- WebRTC Signaling Logic ---
// This block runs for every client that connects to the server
io.on('connection', (socket: Socket) => {
  console.log(`[CONNECTION] User connected: ${socket.id}`);

  // Event: A user wants to join a specific room
  socket.on('join-room', (roomId: string) => {
    console.log(`[JOIN] User ${socket.id} is joining room: ${roomId}`);

    // Join the specified room
    socket.join(roomId);

    // Notify all *other* clients in the room that a new user has joined.
    // The new user will initiate the WebRTC handshake with them.
    socket.to(roomId).emit('user-joined', socket.id);

    // Event: Handle user disconnection
    socket.on('disconnect', () => {
      console.log(`[DISCONNECT] User ${socket.id} disconnected`);
      // Notify the room that this user has left
      socket.to(roomId).emit('user-left', socket.id);
    });

    // --- WebRTC Message Relaying ---
    // The server's only job is to relay these messages between clients.
    // It doesn't need to understand the content of the SDP or ICE candidates.

    // Event: Relay an "offer" to a specific user
    socket.on('offer', (payload: { target: string; sdp: any }) => {
      console.log(`[OFFER] Relaying offer from ${socket.id} to ${payload.target}`);
      io.to(payload.target).emit('offer', {
        sender: socket.id,
        sdp: payload.sdp,
      });
    });

    // Event: Relay an "answer" back to a user
    socket.on('answer', (payload: { target: string; sdp: any }) => {
      console.log(`[ANSWER] Relaying answer from ${socket.id} to ${payload.target}`);
      io.to(payload.target).emit('answer', {
        sender: socket.id,
        sdp: payload.sdp,
      });
    });

    // Event: Relay ICE candidates for establishing the peer connection
    socket.on('ice-candidate', (payload: { target: string; candidate: any }) => {
      // Ensure the target is not the sender
      if (socket.id !== payload.target) {
        // console.log(`[ICE] Relaying ICE candidate from ${socket.id} to ${payload.target}`);
        io.to(payload.target).emit('ice-candidate', {
          sender: socket.id,
          candidate: payload.candidate,
        });
      }
    });
  });
});


const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});

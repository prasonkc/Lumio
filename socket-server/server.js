const http = require("http");
const { Server } = require("socket.io");

// Create HTTP server
const httpServer = http.createServer();

//  Attach Socket.IO server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

//  Listen for client connections
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Join a private room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });

  // Listen for messages from this client
  socket.on("send-message", (data) => {
    const { roomId, message } = data
    console.log("Message received:", message);

    // Only broadcast to specific room
    io.to(roomId).emit("new-message", message)

    // Broadcast to all clients
    // io.emit("new-message", msg);
  });

  // Typing indicator
  socket.on("typing", ({ userId }) => {
    socket.broadcast.emit("user-typing", { userId });
  });

  // Handle disconnect
  socket.on("disconnect", (reason) => {
    console.log("Client disconnected:", socket.id, "reason:", reason);
  });
});

//start server once
httpServer.listen(4000, () => {
  console.log("Socket.IO server running on port 4000");
});

import type { NextApiRequest, NextApiResponse } from "next";
import { Server as IOServer } from "socket.io";
import { Server as HTTPServer } from "http";

type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: HTTPServer & {
      io?: IOServer;
    };
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  // If Socket.IO already attached, stop here.
  if (res.socket.server.io) {
    console.log("Socket.IO already running");
    res.end();
    return;
  }

  // Create new Socket.IO server and attach to the underlying HTTP server
  const httpServer = res.socket.server as unknown as HTTPServer;
  const io = new IOServer(httpServer, {
    path: "/api/socket",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // save to server so we don't re-init on next requests
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);

    // client emits "send-message"
    socket.on("send-message", (msg: string) => {
      // broadcast to everyone
      io.emit("new-message", msg);
    });

    // client emits "typing"
    socket.on("typing", (payload) => {
      socket.broadcast.emit("user-typing", payload);
    });

    socket.on("disconnect", (reason) => {
      console.log("Client disconnected", socket.id, "reason:", reason);
    });
  });

  // finish the http response
  res.end();
}

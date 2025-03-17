import { Server } from "socket.io";

import http from "http";
import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
const app = express();
const server = http.createServer(app);
configDotenv();

const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  },
});

const userSocketMap = {};

export const getReceiverSocketID = (userId) => {
  return userSocketMap[userId];
};

io.on("connection", (socket) => {
  console.log("User connected ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("onlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("User disconnected ", socket.id);
    delete userSocketMap[userId];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});
export { io, app, server };

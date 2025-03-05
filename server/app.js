const express = require("express");
const app = express();
const port = 3000;
const { createServer } = require("http");
const { Server } = require("socket.io");
const roomHandler = require("./roomHandler");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
const rooms = [];

io.on("connection", (socket) => {
  console.log("connected", socket.id);
  roomHandler(io, socket, rooms);

  socket.on("disconnect", () => {
    console.log("disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Simple socket.io chat server for HungerHelp
const http = require("http");
const socketio = require("socket.io");
const express = require("express");
const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Store active chats: { donationId: { hotelId, charityId } }
const activeChats = {};

io.on("connection", (socket) => {
  // Join chat room for a claimed donation
  socket.on("joinDonationChat", ({ donationId, hotelId, charityId }) => {
    socket.join(donationId);
    activeChats[donationId] = { hotelId, charityId };
  });

  // Relay chat messages
  socket.on("sendMessage", ({ donationId, senderId, message }) => {
    io.to(donationId).emit("receiveMessage", {
      senderId,
      message,
      timestamp: Date.now(),
    });
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    // Optionally clean up
  });
});

module.exports = { app, server };

// To use: require('./chat').server.listen(port)

import React, { useEffect, useState, useRef } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import io from "socket.io-client";

const SOCKET_URL =
  process.env.REACT_APP_API_URL?.replace("/api", "") || "http://localhost:5000";

export default function DonationChat({
  donationId,
  hotelId,
  charityId,
  userId,
}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const socketRef = useRef();
  const messagesEndRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL);
    socketRef.current.emit("joinDonationChat", {
      donationId,
      hotelId,
      charityId,
    });
    socketRef.current.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [donationId, hotelId, charityId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      socketRef.current.emit("sendMessage", {
        donationId,
        senderId: userId,
        message: input,
      });
      setInput("");
    }
  };

  return (
    <Paper sx={{ p: 2, mt: 2 }}>
      <Typography variant="h6">
        Chat with {userId === hotelId ? "Charity" : "Hotel"}
      </Typography>
      <Box
        sx={{
          maxHeight: 250,
          overflowY: "auto",
          mb: 2,
          p: 1,
          border: "1px solid #eee",
        }}>
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              mb: 1,
              textAlign: msg.senderId === userId ? "right" : "left",
            }}>
            <Typography
              variant="body2"
              color={msg.senderId === userId ? "primary" : "secondary"}>
              {msg.message}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          size="small"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          disabled={!input.trim()}>
          Send
        </Button>
      </Box>
    </Paper>
  );
}

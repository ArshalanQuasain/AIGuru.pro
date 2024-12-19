import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  Paper,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import HandymanIcon from "@mui/icons-material/Handyman";
import constructionBg from "../assets/construction_bg.avif"; 

const ConstructionBot = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Handle text-based question
  const handleSend = async () => {
    if (!question.trim()) {
      setError("Please ask a question.");
      return;
    }
    setError("");
    setLoading(true);

    const userMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      const response = await fetch("http://localhost:5000/api/construction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      const botMessage = { role: "bot", content: data.reply || "No response available." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError("Error communicating with server.");
    } finally {
      setLoading(false);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    setError("");
    setLoading(true);
    setFile(uploadedFile);

    const formData = new FormData();
    formData.append("file", uploadedFile);

    const userMessage = {
      role: "user",
      content: `Uploaded: ${uploadedFile.name}`,
      file: URL.createObjectURL(uploadedFile),
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const botMessage = { role: "bot", content: data.result || "No insights available." };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setError("Failed to analyze the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${constructionBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: "rgba(255,255,255,0.7)", // Semi-transparent overlay
          zIndex: 1,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          backgroundColor: "#8D6E63",
          color: "#fff",
          textAlign: "center",
          py: 2,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          🛠 Construction Q&A Bot
        </Typography>
        <Typography variant="subtitle1" fontStyle="italic">
          Expert guidance for your building projects
        </Typography>
      </Box>

      {/* Chat Container */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "16px",
          zIndex: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Paper
              elevation={2}
              sx={{
                padding: "8px 12px",
                maxWidth: "70%",
                backgroundColor: msg.role === "user" ? "#D7CCC8" : "#E0F7FA",
                borderRadius: "12px",
                wordBreak: "break-word",
              }}
            >
              {msg.file && (
                <img
                  src={msg.file}
                  alt="Uploaded file"
                  style={{ maxWidth: "100%", borderRadius: "8px", marginBottom: "8px" }}
                />
              )}
              <Typography>{msg.content}</Typography>
            </Paper>
          </Box>
        ))}
        {loading && <CircularProgress size={24} sx={{ alignSelf: "center" }} />}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: "12px",
          backgroundColor: "#fff",
          borderTop: "1px solid #ddd",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Button
          component="label"
          variant="contained"
          startIcon={<UploadFileIcon />}
          sx={{ whiteSpace: "nowrap", minWidth: "120px" }}
        >
          Upload File
          <input type="file" accept=".csv,.txt,.pdf,.png,.jpg" hidden onChange={handleFileUpload} />
        </Button>

        <TextField
          fullWidth
          placeholder="Ask your construction question here..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleSend} disabled={loading}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: "20px" } }}
        />
      </Box>
    </Box>
  );
};

export default ConstructionBot;

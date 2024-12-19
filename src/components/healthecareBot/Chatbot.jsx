import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  IconButton,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Container,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ChatBubble from './ChatBubble';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Scroll to the latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/healthcare/chat`, { message: input });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setError('Sorry, something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      sendMessage();
    }
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <MedicalServicesIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Medical Chatbot</Typography>
        </Toolbar>
      </AppBar>

      {/* Chat Area */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          overflowY: 'auto',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Container maxWidth="md">
          {messages.map((msg, index) => (
            <ChatBubble key={index} message={msg.text} sender={msg.sender} />
          ))}
          {loading && (
            <Box display="flex" justifyContent="center" my={2}>
              <CircularProgress />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Container>
      </Box>

      {/* Input Area */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          backgroundColor: '#fff',
          boxShadow: 3,
        }}
      >
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={11}>
            <TextField
              fullWidth
              placeholder="Ask your medical question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress} // Handle Enter key press
              variant="outlined"
              sx={{
                backgroundColor: '#f1f1f1',
                borderRadius: '25px',
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              onClick={sendMessage}
              color="primary"
              sx={{
                backgroundColor: '#1976d2',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#115293',
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      {/* Error Snackbar */}
      {error && (
        <Snackbar
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError('')}
        >
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

export default Chatbot;

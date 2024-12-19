import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper, Typography, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MedicationIcon from '@mui/icons-material/Medication';
import axios from 'axios';
import Message from './Message';

const PharmaBot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages([...messages, userMessage]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/pharma/chat`, { message: input });
            const botMessage = { sender: 'bot', text: response.data.reply };
            setMessages((prev) => [...prev, botMessage]);
        } catch {
            const errorMessage = { sender: 'bot', text: 'Something went wrong. Try again!' };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(-45deg, #1E293B, #3B82F6, #9333EA, #7DD3FC)',
                backgroundSize: '400% 400%',
                animation: 'gradientShift 15s ease infinite',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
                position: 'relative',
            }}
        >
            <style>
                {`
                @keyframes gradientShift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                `}
            </style>

            {/* Chatbot Container */}
            <Paper
                elevation={10}
                sx={{
                    width: '90%',
                    maxWidth: '1000px',
                    height: '80vh',
                    borderRadius: 5,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px)',
                    overflow: 'hidden',
                    position: 'relative',
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        background: 'linear-gradient(90deg, #9333EA, #3B82F6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        px: 3,
                        py: 2,
                        color: '#fff',
                    }}
                >
                    <Box display="flex" alignItems="center">
                        <Avatar
                            sx={{
                                bgcolor: '#fff',
                                mr: 2,
                                animation: 'pulse 2s infinite',
                            }}
                        >
                            <MedicationIcon sx={{ color: '#3B82F6' }} />
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold">
                            Pharma Assistant Bot
                        </Typography>
                    </Box>
                </Box>

                {/* Chatbox */}
                <Box
                    sx={{
                        flex: 1,
                        p: 2,
                        height: 'calc(100% - 64px)',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {/* Messages */}
                    <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
                        {messages.map((msg, index) => (
                            <Message key={index} sender={msg.sender} text={msg.text} />
                        ))}
                        {loading && (
                            <Typography sx={{ color: '#bbb', fontStyle: 'italic', mt: 1 }}>
                                Bot is typing...
                            </Typography>
                        )}
                    </Box>

                    {/* Input */}
                    <Paper
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            p: 1,
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(5px)',
                        }}
                    >
                        <TextField
                            placeholder="Type a message..."
                            variant="outlined"
                            fullWidth
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            sx={{
                                input: { color: 'white' },
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                    '&:hover fieldset': { borderColor: 'white' },
                                },
                            }}
                        />
                        <IconButton color="inherit" onClick={handleSend}>
                            <SendIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </Paper>
                </Box>
            </Paper>
        </Box>
    );
};

export default PharmaBot;

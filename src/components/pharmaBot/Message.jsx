import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { green, blue } from '@mui/material/colors';
import PersonIcon from '@mui/icons-material/Person';
import MedicationIcon from '@mui/icons-material/Medication';

const Message = ({ sender, text }) => {
    const isBot = sender === 'bot';

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                mb: 2,
                flexDirection: isBot ? 'row' : 'row-reverse',
                animation: 'slideIn 0.5s ease',
            }}
        >
            <Avatar sx={{ bgcolor: isBot ? blue[500] : green[500], mx: 1 }}>
                {isBot ? <MedicationIcon /> : <PersonIcon />}
            </Avatar>
            <Box
                sx={{
                    backgroundColor: isBot ? blue[100] : green[100],
                    color: '#333',
                    borderRadius: 3,
                    p: 1.5,
                    maxWidth: '70%',
                    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Typography variant="body2">{text}</Typography>
            </Box>
            <style>
                {`
                @keyframes slideIn {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                `}
            </style>
        </Box>
    );
};

export default Message;

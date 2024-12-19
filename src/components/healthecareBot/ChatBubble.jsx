import React from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

const ChatBubble = ({ message, sender }) => {
  const isBot = sender === 'bot';

  return (
    <Box
      display="flex"
      justifyContent={isBot ? 'flex-start' : 'flex-end'}
      alignItems="flex-end"
      mb={2}
    >
      {isBot && <Avatar sx={{ bgcolor: '#4CAF50', mr: 1 }}><MedicalServicesIcon /></Avatar>}
      <Paper
        elevation={3}
        sx={{
          maxWidth: '70%',
          padding: '12px',
          borderRadius: '15px',
          backgroundColor: isBot ? '#f1f1f1' : '#1976d2',
          color: isBot ? '#000' : '#fff',
          wordBreak: 'break-word',
        }}
      >
        <Typography variant="body1">{message}</Typography>
      </Paper>
      {!isBot && <Avatar sx={{ bgcolor: '#1976d2', ml: 1 }}>U</Avatar>}
    </Box>
  );
};

export default ChatBubble;

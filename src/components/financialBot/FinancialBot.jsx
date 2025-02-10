import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SendIcon from "@mui/icons-material/Send";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const FinancialBot = () => {
  // Overall tab index: 0 = Ask a Question, 1 = Upload Documents (Summarize), 2 = Chat with Document (persistent)
  const [tab, setTab] = useState(0);

  // Tab 0 (Ask a Question using Cerebras)
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Tab 1 (Upload Documents to Summarize)
  const [files, setFiles] = useState([]);
  const [fileHistory, setFileHistory] = useState([]);

  // Tab 2 (Chat with Document persistently)
  const [docChatHistory, setDocChatHistory] = useState([]);
  const [docFile, setDocFile] = useState(null);
  const [docContent, setDocContent] = useState(""); // persistent extracted document text
  const [docQuery, setDocQuery] = useState("");

  // Loading state for all tabs
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const handleTabChange = (event, newValue) => setTab(newValue);

  // -----------------------
  // Tab 0: Ask a Question (Cerebras Chat)
  // -----------------------
  const handleSubmit = async () => {
    if (!prompt) return;
    setChatHistory([...chatHistory, { type: "user", message: prompt }]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/finance/query`, { prompt });
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", message: res.data.reply },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [
        ...prev,
        { type: "bot", message: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // -----------------------
  // Tab 1: Upload Documents (Summarize)
  // -----------------------
  const handleFileUpload = async () => {
    if (!files.length) return;

    const fileNames = Array.from(files).map((file) => file.name);
    setFileHistory((prev) => [
      ...prev,
      { type: "user", message: `Uploaded: ${fileNames.join(", ")}` },
    ]);

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("documents", file));

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/finance/summarize`, formData);
      setFileHistory((prev) => [
        ...prev,
        { type: "bot", message: res.data.summary },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setFileHistory((prev) => [
        ...prev,
        { type: "bot", message: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setFiles([]);
    }
  };

  // -----------------------
  // Tab 2: Persistent Chat with Document
  // -----------------------
  // First, upload the document and store its extracted text
  const handleDocUpload = async () => {
    if (!docFile) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("document", docFile);
    try {
      const res = await axios.post(`${API_URL}/finance/uploadDocument`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setDocContent(res.data.docContent);
      setDocChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          message:
            "Document uploaded successfully. You can now ask questions about it.",
        },
      ]);
    } catch (error) {
      console.error("Error uploading document:", error);
      setDocChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          message: "Failed to upload document. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setDocFile(null);
    }
  };

  // Now, chat with the persistent document (send the stored docContent along with the query)
  const handleDocChatSubmit = async () => {
    if (!docContent || !docQuery) return;
    setDocChatHistory((prev) => [
      ...prev,
      { type: "user", message: docQuery },
    ]);
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/finance/chatpdf`, {
        query: docQuery,
        docContent: docContent,
      });
      setDocChatHistory((prev) => [
        ...prev,
        { type: "bot", message: res.data.answer },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setDocChatHistory((prev) => [
        ...prev,
        {
          type: "bot",
          message: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setDocQuery("");
    }
  };

  const handleDocChatKeyPress = (e) => {
    if (e.key === "Enter") {
      handleDocChatSubmit();
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, fileHistory, docChatHistory, loading]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom right, #e0f7fa, #80deea)",
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 700,
          borderRadius: 5,
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mb: 3,
            }}
          >
            <AccountBalanceIcon sx={{ fontSize: 40, color: "#00796b" }} />
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "#00796b",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              Finance Chatbot
            </Typography>
          </Box>

          <AppBar
            position="static"
            sx={{
              background: "#004d40",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="fullWidth"
              textColor="inherit"
              TabIndicatorProps={{
                style: { backgroundColor: "#26a69a", height: "4px" },
              }}
            >
              <Tab
                label="Ask a Question"
                sx={{
                  "&.Mui-selected": { fontWeight: "bold", color: "#ffffff" },
                }}
              />
              <Tab
                label="Upload Documents"
                sx={{
                  "&.Mui-selected": { fontWeight: "bold", color: "#ffffff" },
                }}
              />
              <Tab
                label="Chat with Document"
                sx={{
                  "&.Mui-selected": { fontWeight: "bold", color: "#ffffff" },
                }}
              />
            </Tabs>
          </AppBar>

          {/* ----------------- Tab 0: Ask a Question ----------------- */}
          {tab === 0 && (
            <Box
              p={3}
              sx={{
                background: "#ffffff",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  height: 300,
                  overflowY: "auto",
                  padding: 2,
                  background: "#f1f8e9",
                  borderRadius: 2,
                }}
              >
                <List>
                  {chatHistory.map((chat, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        justifyContent:
                          chat.type === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "70%",
                          padding: 1,
                          background:
                            chat.type === "user" ? "#80cbc4" : "#e0f7ea",
                          borderRadius: 2,
                          color: "#004d40",
                        }}
                      >
                        <ListItemText
                          primary={chat.message}
                          sx={{ wordWrap: "break-word" }}
                        />
                      </Box>
                    </ListItem>
                  ))}
                  {loading && (
                    <ListItem sx={{ justifyContent: "flex-start" }}>
                      <Box
                        sx={{
                          maxWidth: "70%",
                          padding: 1,
                          background: "#e0f7ea",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress size={20} sx={{ color: "#26a69a" }} />
                      </Box>
                    </ListItem>
                  )}
                  <div ref={chatEndRef} />
                </List>
              </Paper>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  placeholder="Type your message..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyPress={handleKeyPress}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "20px",
                      "& fieldset": {
                        borderColor: "#80cbc4",
                      },
                    },
                  }}
                />
                <IconButton
                  onClick={handleSubmit}
                  sx={{
                    background: "#26a69a",
                    color: "#fff",
                    marginLeft: 1,
                    "&:hover": { background: "#00796b" },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </Box>
            </Box>
          )}

{/** ----------------- Tab 1: Upload Documents (Summarize) ----------------- **/}
{tab === 1 && (
  <Box
    p={3}
    sx={{
      background: "#ffffff",
      borderRadius: 2,
      display: "flex",
      flexDirection: "column",
      gap: 2,
    }}
  >
    <Paper
      elevation={0}
      sx={{
        height: 300,
        overflowY: "auto",
        padding: 2,
        background: "#f1f8e9",
        borderRadius: 2,
      }}
    >
      <List>
        {fileHistory.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              justifyContent:
                item.type === "user" ? "flex-end" : "flex-start",
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                padding: 1,
                background:
                  item.type === "user" ? "#80cbc4" : "#e0f7ea",
                borderRadius: 2,
                color: "#004d40",
              }}
            >
              <ListItemText
                primary={item.message}
                sx={{ wordWrap: "break-word" }}
              />
            </Box>
          </ListItem>
        ))}
        {loading && (
          <ListItem sx={{ justifyContent: "flex-start" }}>
            <Box
              sx={{
                maxWidth: "70%",
                padding: 1,
                background: "#e0f7ea",
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={20} sx={{ color: "#26a69a" }} />
            </Box>
          </ListItem>
        )}
        <div ref={chatEndRef} />
      </List>
    </Paper>
    <input
      type="file"
      multiple
      onChange={(e) => setFiles(e.target.files)}
      style={{ display: "none" }}
      id="upload-button"
    />
    <label htmlFor="upload-button">
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        component="span"
        fullWidth
        sx={{
          mt: 1,
          borderColor: "#80cbc4",
          color: "#00796b",
          "&:hover": { background: "#e0f7ea" },
        }}
      >
        Choose Files
      </Button>
    </label>
    {files && files.length > 0 && (
      <Typography variant="body2" sx={{ mt: 1 }}>
        Selected files: {Array.from(files).map(file => file.name).join(", ")}
      </Typography>
    )}
    <Button
      variant="contained"
      onClick={handleFileUpload}
      fullWidth
      sx={{
        mt: 2,
        background: "#26a69a",
        "&:hover": { background: "#00796b" },
        fontWeight: "bold",
      }}
    >
      Summarize
    </Button>
  </Box>
)}

          {/* ----------------- Tab 2: Chat with Document (Persistent) ----------------- */}
          {tab === 2 && (
            <Box
              p={3}
              sx={{
                background: "#ffffff",
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Paper
                elevation={0}
                sx={{
                  height: 300,
                  overflowY: "auto",
                  padding: 2,
                  background: "#f1f8e9",
                  borderRadius: 2,
                }}
              >
                <List>
                  {docChatHistory.map((item, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        justifyContent:
                          item.type === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: "70%",
                          padding: 1,
                          background:
                            item.type === "user" ? "#80cbc4" : "#e0f7ea",
                          borderRadius: 2,
                          color: "#004d40",
                        }}
                      >
                        <ListItemText
                          primary={item.message}
                          sx={{ wordWrap: "break-word" }}
                        />
                      </Box>
                    </ListItem>
                  ))}
                  {loading && (
                    <ListItem sx={{ justifyContent: "flex-start" }}>
                      <Box
                        sx={{
                          maxWidth: "70%",
                          padding: 1,
                          background: "#e0f7ea",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress size={20} sx={{ color: "#26a69a" }} />
                      </Box>
                    </ListItem>
                  )}
                  <div ref={chatEndRef} />
                </List>
              </Paper>

              {/* If no document has been uploaded yet, show the upload section */}
              {!docContent ? (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => setDocFile(e.target.files[0])}
                    style={{ display: "none" }}
                    id="doc-upload-button"
                  />
                  <label htmlFor="doc-upload-button">
                    <Button
                      variant="outlined"
                      startIcon={<CloudUploadIcon />}
                      component="span"
                      fullWidth
                      sx={{
                        borderColor: "#80cbc4",
                        color: "#00796b",
                        "&:hover": { background: "#e0f7ea" },
                      }}
                    >
                      {docFile ? docFile.name : "Choose Document to Upload"}
                    </Button>
                  </label>
                  <Button
                    variant="contained"
                    onClick={handleDocUpload}
                    fullWidth
                    sx={{
                      background: "#26a69a",
                      "&:hover": { background: "#00796b" },
                      fontWeight: "bold",
                    }}
                  >
                    Upload Document
                  </Button>
                </Box>
              ) : (
                <>
                  {/* If a document is already uploaded, allow the user to ask questions */}
                  <TextField
                    placeholder="Ask a question about the document..."
                    value={docQuery}
                    onChange={(e) => setDocQuery(e.target.value)}
                    onKeyPress={handleDocChatKeyPress}
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "20px",
                        "& fieldset": { borderColor: "#80cbc4" },
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleDocChatSubmit}
                    fullWidth
                    sx={{
                      background: "#26a69a",
                      "&:hover": { background: "#00796b" },
                      fontWeight: "bold",
                    }}
                  >
                    Send
                  </Button>
                  {/* Optionally, allow the user to reset and upload a new document */}
                  <Button
                    variant="text"
                    onClick={() => {
                      setDocContent("");
                      setDocChatHistory([]);
                    }}
                    fullWidth
                    sx={{ color: "#00796b" }}
                  >
                    Reset Document
                  </Button>
                </>
              )}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default FinancialBot;

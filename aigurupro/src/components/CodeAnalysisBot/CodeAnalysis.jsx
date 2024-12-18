import React, { useState } from "react";
import {
  CssBaseline,
  Box,
  Typography,
  Container,
  Switch,
  TextField,
  Button,
  CircularProgress,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CodeIcon from "@mui/icons-material/Code";
import { SaveAlt } from "@mui/icons-material";

const CodeAnalysis = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1e88e5",
      },
    },
  });

  const fixedIcons = [
    { symbol: "<>", top: "10%", left: "15%" },
    { symbol: "{}", top: "20%", left: "60%" },
    { symbol: "()", top: "40%", left: "30%" },
    { symbol: "[]", top: "50%", left: "80%" },
    { symbol: "/* */", top: "70%", left: "20%" },
    { symbol: "() =>", top: "80%", left: "50%" },
    { symbol: "===", top: "30%", left: "10%" },
  ];
  const API_URL = import.meta.env.VITE_API_URL;

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError("Please input some code before analyzing.");
      return;
    }

    setLoading(true);
    setResult("");
    setError("");

    try {
      const response = await fetch(`${API_URL}/code-review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.result) {
        setResult(data.result);
      } else {
        setError("No analysis result available.");
      }
    } catch (err) {
      console.error("API Error:", err.message);
      setError("Failed to analyze code. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const downloadResult = () => {
    const element = document.createElement("a");
    const file = new Blob([result], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "analysis.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: darkMode
              ? "linear-gradient(135deg, #303030 0%, #1a1a1a 100%)"
              : "linear-gradient(135deg, #f0f4f8 0%, #e6f1ff 100%)",
            zIndex: 1,
          }}
        >
          {fixedIcons.map(({ symbol, top, left }, index) => (
            <Box
              key={index}
              sx={{
                position: "absolute",
                top,
                left,
                color: darkMode
                  ? "rgba(255,255,255,0.05)"
                  : "rgba(30, 136, 229, 0.2)",
                fontFamily: "monospace",
                fontWeight: "bold",
                fontSize: "24px",
              }}
            >
              {symbol}
            </Box>
          ))}
        </Box>

        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(90deg, #1e3c72, #2a5298)",
            padding: "12px",
            textAlign: "center",
            color: "#fff",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            borderRadius: "0 0 16px 16px",
            zIndex: 3,
            position: "relative",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
            }}
          >
            <CodeIcon
              fontSize="large"
              sx={{
                mr: 1,
                transform: "rotate(-15deg)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "rotate(15deg) scale(1.1)",
                },
              }}
            />
            Code Analysis Bot
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              fontStyle: "italic",
              opacity: 0.8,
              textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            Get actionable insights for your code instantly.
          </Typography>

          {/* Dark Mode Toggle */}
          <Box
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 4, // Ensure the toggle is above everything
            }}
          >
            <Typography variant="body2" sx={{ color: "#fff" }}>
              Dark Mode
            </Typography>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="default"
            />
          </Box>
        </Box>

        {/* Main Content */}
        <Container
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start", // Align to top
            padding: "24px",
            position: "relative",
            zIndex: 3, // Main content layer
            height: "100vh", // Full height for scrolling
            overflowY: "auto", // Add vertical scrollbar
          }}
        >
          {/* Code Input */}
          <TextField
            label="Paste your code here"
            multiline
            rows={8}
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            sx={{ marginBottom: "16px" }}
          />

          {/* Analyze Button */}
          <Button
            variant="contained"
            onClick={handleAnalyze}
            disabled={loading}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#fff",
              "&:hover": { backgroundColor: "#1565c0" },
              marginBottom: "16px",
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Analyze"
            )}
          </Button>

          {/* Display Results */}
          {result && (
            <Paper
              elevation={3}
              sx={{
                padding: "16px",
                textAlign: "left",
                maxHeight: "400px", // Increase height for larger results
                overflowY: "auto", // Vertical scroll for the result only
                width: "100%",
                backgroundColor: darkMode ? "#424242" : "#f9f9f9",
                marginBottom: "16px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  whiteSpace: "pre-wrap", // Keep formatting intact
                  fontFamily: "monospace",
                }}
              >
                {result}
              </Typography>
            </Paper>
          )}

          {/* Download Results */}
          {result && (
            <Button
              variant="outlined"
              onClick={downloadResult}
              startIcon={<SaveAlt />}
              sx={{
                marginTop: "8px",
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
              }}
            >
              Download Results
            </Button>
          )}

          {/* Error Message */}
          {error && <Typography color="error">{error}</Typography>}
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CodeAnalysis;

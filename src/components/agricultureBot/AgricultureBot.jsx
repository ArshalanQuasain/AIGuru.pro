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
  Chip,
  Divider,
  Alert,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import GrassIcon from "@mui/icons-material/Grass";
import WarningIcon from "@mui/icons-material/Warning";
import ChatIcon from "@mui/icons-material/Chat";
import { styled } from "@mui/material/styles";
import agricultureBg from "../../assets/agriculture_bg.jpg"; // You'll need to add this image

// Custom styled components for agriculture theme
const AgriChip = styled(Chip)(({ theme }) => ({
  backgroundColor: "#1E5631",
  color: "#fff",
  fontWeight: "bold",
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const ExecutiveSummary = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(229, 187, 75, 0.15)",
  borderLeft: "3px solid #E5BB4B",
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  borderRadius: "0 4px 4px 0",
}));

const SupportingDetail = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  display: "flex",
  alignItems: "flex-start",
}));

const ActionItem = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(139, 69, 19, 0.1)",
  borderRadius: "4px",
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  display: "flex",
  alignItems: "center",
}));

const ActionDifficulty = styled(Chip)(({ difficulty }) => ({
  backgroundColor:
    difficulty === "Simple" ? "#4caf50" :
      difficulty === "Moderate" ? "#ff9800" : "#f44336",
  color: "#fff",
  marginLeft: "auto",
  fontSize: "0.7rem",
}));

const OffTopicBanner = styled(Alert)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  borderRadius: "4px",
}));

const AgricultureBot = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [activeUseCase, setActiveUseCase] = useState(null);
  const [isOffTopic, setIsOffTopic] = useState(false);

  const messagesEndRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // Sample use cases based on the design document
  const useCases = [
    {
      id: 1,
      title: "Crop Portfolio Optimization",
      document: "Annual Crop Performance Report - Karnataka Region 2024.pdf",
      initialQuery: "Analyze this crop report and identify our top 3 underperforming crops based on ROI.",
      followupQuery: "What alternative crops should we consider for these underperforming areas to maximize profit next season?"
    },
    {
      id: 2,
      title: "Market Intelligence & Pricing",
      document: "Agricultural Commodities Market Trends Q1-Q2 2025.pdf",
      initialQuery: "Based on these market trends, when should we sell our rice inventory to maximize revenue?",
      followupQuery: "How should we adjust our pricing strategy for premium organic produce given these market conditions?"
    },
    {
      id: 3,
      title: "Supply Chain Optimization",
      document: "Agricultural Supply Chain Assessment - Punjab Operations 2024.pdf",
      initialQuery: "Identify the key inefficiencies in our fertilizer supply chain.",
      followupQuery: "Recommend optimization strategies that could reduce our supply chain costs by at least 12%."
    },
    {
      id: 4,
      title: "Customer Segmentation",
      document: "Customer Purchase Data Analysis - Maharashtra Region 2024.xlsx",
      initialQuery: "Segment our customer base and identify our highest-value customer profile.",
      followupQuery: "Create a targeted marketing strategy for this high-value segment for our new precision irrigation system."
    }
  ];

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Welcome message on component mount
  useEffect(() => {
    const welcomeMessage = {
      role: "bot",
      content: "Welcome to the Agricultural Intelligence Assistant! I can help you analyze crop performance, market trends, supply chain optimization, and customer data. You can also upload agricultural documents for analysis. How can I assist you today?",
      isWelcome: true
    };
    setMessages([welcomeMessage]);
  }, []);

  // Check if a message is likely agricultural or not
  const checkIfAgricultural = (text) => {
    const agriKeywords = [
      'crop', 'farm', 'agricultur', 'harvest', 'seed', 'irrigation', 'fertilizer',
      'soil', 'yield', 'pesticide', 'cultivation', 'planting', 'rice', 'wheat',
      'maize', 'corn', 'sugarcane', 'ROI', 'supply chain', 'market', 'commodity',
      'pricing', 'farmer', 'hectare', 'acre', 'organic', 'monsoon', 'rainfall',
      'seasonal', 'productivity', 'processing', 'storage', 'distribution', 'export'
    ];

    const lowerText = text.toLowerCase();

    // This is a simple check - in reality we're using the backend for this detection
    return agriKeywords.some(keyword => lowerText.includes(keyword));
  };

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
      const response = await fetch(`${API_URL}/agriculture/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      // Check if the response is agriculture-related (using the flag from backend)
      const isAgricultureRelated = data.isAgricultureRelated !== undefined
        ? data.isAgricultureRelated
        : checkIfAgricultural(question); // Fallback if backend doesn't provide the flag

      // Update off-topic state
      setIsOffTopic(!isAgricultureRelated);

      const botMessage = {
        role: "bot",
        content: data.reply || "I couldn't process that request. Please try again.",
        formatted: isAgricultureRelated ? formatBotResponse(data.reply) : null,
        isOffTopic: !isAgricultureRelated
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error:", err);
      setError("Error communicating with server. Please try again.");
      const errorMessage = {
        role: "bot",
        content: "I'm having trouble connecting to the server right now. Please try again in a moment.",
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Format bot response according to design specs
  const formatBotResponse = (text) => {
    if (!text) return null;

    // Parse the AI's response to extract structured information
    try {
      // Check if the response follows the expected format
      const hasExecutiveSummary = text.includes("Executive Summary") || text.includes("Key Points");
      const hasSupportingDetails = text.includes("Supporting Details") || text.includes("Details:");
      const hasRecommendedActions = text.includes("Recommended Actions") || text.includes("Next Steps");

      // If the response doesn't have the expected sections, display as regular text
      if (!hasExecutiveSummary && !hasSupportingDetails && !hasRecommendedActions) {
        return null;
      }

      // Extract executive summary points
      const executiveSummaryRegex = /Executive Summary:?([\s\S]*?)(?:Supporting Details|Details:|Recommended Actions|Next Steps|$)/i;
      const executiveSummaryMatch = text.match(executiveSummaryRegex);

      const executiveSummary = executiveSummaryMatch ?
        executiveSummaryMatch[1]
          .split(/•|\*|(?:\d+\.)|(?:-\s)/)
          .filter(item => item.trim().length > 0)
          .map(item => item.trim())
          .slice(0, 5) : [];

      // Extract supporting details
      const supportingDetailsRegex = /(?:Supporting Details|Details:)([\s\S]*?)(?:Recommended Actions|Next Steps|$)/i;
      const supportingDetailsMatch = text.match(supportingDetailsRegex);

      const supportingDetailsRaw = supportingDetailsMatch ?
        supportingDetailsMatch[1]
          .split(/•|\*|(?:\d+\.)|(?:-\s)/)
          .filter(item => item.trim().length > 0)
          .map(item => item.trim()) : [];

      const supportingDetails = supportingDetailsRaw.map(detail => {
        // Try to split into main point and supporting data
        const parts = detail.split(/:\s*|–\s*|—\s*/, 2);
        if (parts.length === 2) {
          return {
            point: parts[0].trim(),
            data: parts[1].trim()
          };
        } else {
          return {
            point: detail,
            data: ""
          };
        }
      });

      // Extract recommended actions
      const recommendedActionsRegex = /(?:Recommended Actions|Next Steps):?([\s\S]*?)$/i;
      const recommendedActionsMatch = text.match(recommendedActionsRegex);

      const recommendedActionsRaw = recommendedActionsMatch ?
        recommendedActionsMatch[1]
          .split(/•|\*|(?:\d+\.)|(?:-\s)/)
          .filter(item => item.trim().length > 0)
          .map(item => item.trim()) : [];

      const recommendedActions = recommendedActionsRaw.map(action => {
        // Try to extract difficulty, timeline and impact
        const difficultyMatch = action.match(/Difficulty:?\s*(\w+)/i);
        const timelineMatch = action.match(/Timeline:?\s*([^|]+)/i);
        const impactMatch = action.match(/Impact:?\s*([^|]+?)(?:$|Difficulty)/i);

        // Extract the main action by removing the metadata parts
        let actionText = action
          .replace(/Difficulty:?\s*\w+/i, '')
          .replace(/Timeline:?\s*[^|]+/i, '')
          .replace(/Impact:?\s*[^|]+/i, '')
          .replace(/\|/g, '')
          .trim();

        // If pipes or dashes are used to separate
        const actionParts = actionText.split(/\s+[-|]\s+/);
        if (actionParts.length > 1) {
          actionText = actionParts[0];
        }

        const difficulty = difficultyMatch ? difficultyMatch[1] :
          action.includes("Simple") ? "Simple" :
            action.includes("Moderate") ? "Moderate" :
              action.includes("Complex") ? "Complex" : "Moderate";

        return {
          action: actionText,
          difficulty: difficulty,
          timeline: timelineMatch ? timelineMatch[1].trim() : "Near-term",
          impact: impactMatch ? impactMatch[1].trim() : "Improved performance"
        };
      });

      return {
        executiveSummary,
        supportingDetails,
        recommendedActions
      };
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return null;
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
      const response = await fetch(`${API_URL}/agriculture/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      // Check if the file is agriculture-related (using the flag from backend)
      const isAgricultureRelated = data.isAgricultureRelated !== undefined
        ? data.isAgricultureRelated
        : true; // Assume relevant by default if backend doesn't provide the flag

      // Update off-topic state
      setIsOffTopic(!isAgricultureRelated);

      const botMessage = {
        role: "bot",
        content: data.result || "No insights available from this document.",
        formatted: isAgricultureRelated ? formatBotResponse(data.result) : null,
        isOffTopic: !isAgricultureRelated
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to analyze the file.");
      const errorMessage = {
        role: "bot",
        content: "I had trouble analyzing that file. Please try again or use a different file.",
        isError: true
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Handle demo use case selection
  const handleUseCaseClick = (useCase) => {
    setActiveUseCase(useCase);
    setIsOffTopic(false); // Reset off-topic state when selecting a use case

    // Create user message for document upload
    const userMessage = {
      role: "user",
      content: `Uploaded: ${useCase.document}`,
      isDemo: true
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show loading state
    setLoading(true);

    // Simulate document upload and analysis with real AI request
    // For demo purposes, we'll send a structured prompt that describes the synthetic document
    const demoDocuments = {
      1: `Annual Crop Performance Report - Karnataka Region 2024
Key points:
- Contains data on 12 crop varieties including wheat, rice, sugarcane, chili, cotton, maize
- Performance metrics show wheat with 12% yield decline despite 8% increase in inputs
- Sugarcane margins compressed by 15% due to market oversupply
- Chili crops affected by unexpected weather patterns reducing quality grade
- Resource allocation data shows water usage up 7% year-over-year
- Regional breakdown shows western districts underperforming eastern districts by 18%
- Year-over-year comparison shows overall 4% decline in profitability
`,
      2: `Agricultural Commodities Market Trends Q1-Q2 2025
Key points:
- Price trends for 10 major commodities (6-month historical, 3-month projection)
- Rice prices showing 22% seasonal volatility with projected peak in weeks 3-5 of Q2
- Premium for organic produce increased from 35% to 52% in urban markets
- New export opportunity to Middle East with 30% higher margins than domestic
- Supply chain disruption for fertilizer and equipment noted in northern regions
- Government policy changes reducing import tariffs on agricultural equipment
- Consumer demand shifting towards organic and specialty varieties
`,
      3: `Agricultural Supply Chain Assessment - Punjab Operations 2024
Key points:
- Supplier performance scorecards for 18 major suppliers
- 22% of inventory holding costs deemed excessive based on industry benchmarks
- Supplier B consistently delivering 7-10 days behind schedule
- Three suppliers providing identical inputs at price variances of up to 18%
- Weather-related transportation delays increasing costs by 7% annually
- Inventory turnover rates below industry average for fertilizer products
- Quality control processes showing inconsistencies in 4 supplier categories
`,
      4: `Customer Purchase Data Analysis - Maharashtra Region 2024
Key points:
- Customer segmentation by farm size, region, and crop types
- Medium-sized farms (50-200 acres) focusing on cash crops represent 24% of customers but 47% of revenue
- Seasonal buying concentrated in pre-monsoon period (68% of annual purchases)
- Premium product adoption rates vary widely by region (8% to 41%)
- Customer retention rates declining in small farm segment (from 76% to 64%)
- Three-year purchase history shows shift towards technology-enabled products
- Price sensitivity highest among small farms (under 50 acres)
`
    };

    // Create a prompt that mimics document analysis but still uses real AI
    const analysisPrompt = `I've uploaded: ${useCase.document}

Document contents summary:
${demoDocuments[useCase.id]}

Based on this agricultural document, provide a brief acknowledgment that you've analyzed it and are ready for questions.`;

    // Send to actual backend for AI processing
    fetch(`${API_URL}/agriculture/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: analysisPrompt }),
    })
      .then(response => {
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);
        return response.json();
      })
      .then(data => {
        // Create a simplified response that prompts for questions
        const botMessage = {
          role: "bot",
          content: data.reply || `I've analyzed ${useCase.document}. What would you like to know about it?`
        };
        setMessages(prev => [...prev, botMessage]);
      })
      .catch(err => {
        console.error("Error:", err);
        // Fallback in case of API failure
        const fallbackMessage = {
          role: "bot",
          content: `I've analyzed ${useCase.document}. What would you like to know about it?`
        };
        setMessages(prev => [...prev, fallbackMessage]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handle demo query with real AI processing
  const handleDemoQuery = (query) => {
    if (!activeUseCase) return;

    // Reset off-topic state for demo queries
    setIsOffTopic(false);

    // Create user message
    const userMessage = {
      role: "user",
      content: query,
      isDemo: true
    };
    setMessages((prev) => [...prev, userMessage]);

    // Show loading state
    setLoading(true);

    // Create a context-rich prompt that includes document info and the query
    const demoDocuments = {
      1: `Annual Crop Performance Report - Karnataka Region 2024
Key points:
- Contains data on 12 crop varieties including wheat, rice, sugarcane, chili, cotton, maize
- Performance metrics show wheat with 12% yield decline despite 8% increase in inputs
- Sugarcane margins compressed by 15% due to market oversupply
- Chili crops affected by unexpected weather patterns reducing quality grade
- Resource allocation data shows water usage up 7% year-over-year
- Regional breakdown shows western districts underperforming eastern districts by 18%
- Year-over-year comparison shows overall 4% decline in profitability
`,
      2: `Agricultural Commodities Market Trends Q1-Q2 2025
Key points:
- Price trends for 10 major commodities (6-month historical, 3-month projection)
- Rice prices showing 22% seasonal volatility with projected peak in weeks 3-5 of Q2
- Premium for organic produce increased from 35% to 52% in urban markets
- New export opportunity to Middle East with 30% higher margins than domestic
- Supply chain disruption for fertilizer and equipment noted in northern regions
- Government policy changes reducing import tariffs on agricultural equipment
- Consumer demand shifting towards organic and specialty varieties
`,
      3: `Agricultural Supply Chain Assessment - Punjab Operations 2024
Key points:
- Supplier performance scorecards for 18 major suppliers
- 22% of inventory holding costs deemed excessive based on industry benchmarks
- Supplier B consistently delivering 7-10 days behind schedule
- Three suppliers providing identical inputs at price variances of up to 18%
- Weather-related transportation delays increasing costs by 7% annually
- Inventory turnover rates below industry average for fertilizer products
- Quality control processes showing inconsistencies in 4 supplier categories
`,
      4: `Customer Purchase Data Analysis - Maharashtra Region 2024
Key points:
- Customer segmentation by farm size, region, and crop types
- Medium-sized farms (50-200 acres) focusing on cash crops represent 24% of customers but 47% of revenue
- Seasonal buying concentrated in pre-monsoon period (68% of annual purchases)
- Premium product adoption rates vary widely by region (8% to 41%)
- Customer retention rates declining in small farm segment (from 76% to 64%)
- Three-year purchase history shows shift towards technology-enabled products
- Price sensitivity highest among small farms (under 50 acres)
`
    };

    // Prepare context-rich prompt to get a realistic but formatted response
    const contextPrompt = `I'm a C-level executive at an agricultural company in India. I've uploaded the document: ${activeUseCase.document}

Document contents summary:
${demoDocuments[activeUseCase.id]}

My question about this document is: ${query}

Please provide a detailed analysis with:
1. Executive Summary (2-3 bullet points of key findings)
2. Supporting Details (3-5 points with specific data)
3. Recommended Actions (2-3 actionable items with difficulty level, timeline, and expected impact)`;

    // Send to actual backend for AI processing
    fetch(`${API_URL}/agriculture/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: contextPrompt }),
    })
      .then(response => {
        if (!response.ok) throw new Error(`Server responded with ${response.status}`);
        return response.json();
      })
      .then(data => {
        // Use the AI's actual response
        const botMessage = {
          role: "bot",
          content: data.reply || "I couldn't analyze that properly. Please try again.",
          formatted: formatBotResponse(data.reply)
        };
        setMessages(prev => [...prev, botMessage]);
      })
      .catch(err => {
        console.error("Error:", err);
        // Fallback in case of API failure
        const errorMessage = {
          role: "bot",
          content: "I'm having trouble connecting to my analysis system. Please try again in a moment.",
          isError: true
        };
        setMessages(prev => [...prev, errorMessage]);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Render formatted bot response
  const renderFormattedResponse = (formatted) => {
    if (!formatted) return null;

    return (
      <>
        {formatted.executiveSummary && (
          <ExecutiveSummary className="executive-summary">
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }} className="executive-summary-title">
              Executive Summary:
            </Typography>
            {formatted.executiveSummary.map((point, idx) => (
              <Typography key={idx} variant="body2" sx={{ mb: 0.5 }} className="executive-summary-point">
                • {point}
              </Typography>
            ))}
          </ExecutiveSummary>
        )}

        {formatted.supportingDetails && (
          <Box sx={{ mb: 2 }} className="supporting-details-container">
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }} className="supporting-details-title">
              Supporting Details:
            </Typography>
            {formatted.supportingDetails.map((detail, idx) => (
              <SupportingDetail key={idx} className="supporting-detail">
                <GrassIcon sx={{ fontSize: 14, mr: 1, mt: 0.5, color: "#1E5631" }} />
                <Box>
                  <Typography variant="body2" className="detail-point">{detail.point}</Typography>
                  <Typography variant="caption" color="text.secondary" className="detail-data">
                    {detail.data}
                  </Typography>
                </Box>
              </SupportingDetail>
            ))}
          </Box>
        )}

        {formatted.recommendedActions && (
          <Box className="recommended-actions-container">
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }} className="recommended-actions-title">
              Recommended Actions:
            </Typography>
            {formatted.recommendedActions.map((action, idx) => (
              <ActionItem key={idx} className="action-item">
                <Box>
                  <Typography variant="body2" fontWeight="medium" className="action-text">
                    {action.action}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" className="action-meta">
                    Timeline: {action.timeline} | Impact: {action.impact}
                  </Typography>
                </Box>
                <ActionDifficulty
                  label={action.difficulty}
                  difficulty={action.difficulty}
                  size="small"
                  className="action-difficulty"
                />
              </ActionItem>
            ))}
          </Box>
        )}
      </>
    );
  };

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundImage: `url(${agricultureBg})`,
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
          background: "rgba(0, 0, 0, 0.5)", // Dark overlay for better readability
          zIndex: 1,
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(to right, #056676, #1B6F69)", // Calming teal gradient
          color: "#fff",
          textAlign: "center",
          py: 2,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" display="flex" justifyContent="center" alignItems="center">
          <AgricultureIcon sx={{ mr: 1, color: "#fff" }} /> Agricultural Intelligence Bot
        </Typography>
        <Typography variant="subtitle1" fontStyle="italic" color="rgba(255, 255, 255, 0.7)">
          Smart insights for agricultural business growth
        </Typography>
      </Box>
  
      {/* Use Cases */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          p: 2,
          background: "linear-gradient(to right, #056676, #1B6F69)", // Same gradient as header
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          position: "relative",
          zIndex: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ width: "100%", textAlign: "center", color: "#fff", mb: 1 }}>
          Demo Use Cases:
        </Typography>
        {useCases.map((useCase) => (
          <Button
            key={useCase.id}
            variant="outlined"
            size="small"
            onClick={() => handleUseCaseClick(useCase)}
            sx={{
              borderColor: "#2196F3", // Fresh blue for a modern touch
              color: "#fff",
              backgroundColor: activeUseCase?.id === useCase.id ? "rgba(33, 150, 243, 0.1)" : "transparent",
              "&:hover": {
                backgroundColor: "rgba(33, 150, 243, 0.15)",
                borderColor: "#1E3A8A",
              },
            }}
          >
            {useCase.title}
          </Button>
        ))}
      </Box>
  
      {/* Off-Topic Banner */}
      {isOffTopic && (
        <OffTopicBanner
          severity="info"
          icon={<ChatIcon />}
          sx={{
            mx: 2,
            mt: 1,
            backgroundColor: "rgba(33, 150, 243, 0.1)",
            border: "1px solid rgba(33, 150, 243, 0.3)"
          }}
        >
          <Typography variant="body2" sx={{ color: "#333" }}>
            <strong>Conversational Mode:</strong> You're now chatting outside the agricultural demo context. Responses will be conversational.
          </Typography>
        </OffTopicBanner>
      )}
  
      {/* Chat Container */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "16px",
          zIndex: 2,
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Slight
        }}
      >
        {messages.map((msg, index) => (
          <Box key={index} display="flex" justifyContent={msg.role === "user" ? "flex-end" : "flex-start"}>
            <Paper
              elevation={2}
              sx={{
                p: 2,
                maxWidth: "75%",
                backgroundColor: msg.role === "user"
                  ? "#E5BB4B"
                  : msg.isError
                    ? "#f8d7da"
                    : msg.isOffTopic
                      ? "#e3f2fd"
                      : "#F5F5DC",
                color: "#333",
                borderRadius: 2,
                wordBreak: "break-word",
                borderLeft: msg.role === "bot"
                  ? msg.isOffTopic
                    ? "4px solid #2196f3" // Blue accent for off-topic
                    : "4px solid #1E5631" // Deep green accent for on-topic
                  : "none",
              }}
            >
              {msg.file && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Document uploaded:
                  </Typography>
                  <Box
                    component="img"
                    src={msg.file}
                    alt="Document preview"
                    sx={{
                      maxWidth: "100%",
                      borderRadius: "4px",
                      mt: 0.5,
                      maxHeight: "120px",
                      objectFit: "cover"
                    }}
                  />
                </Box>
              )}
  
              {msg.isOffTopic && msg.role === "bot" && (
                <Typography variant="caption" fontStyle="italic" display="block" mb={1} color="text.secondary">
                  <ChatIcon sx={{ fontSize: '0.8rem', mr: 0.5 }} /> Conversational mode
                </Typography>
              )}
  
              {msg.isDemo && msg.role === "user" && (
                <Typography variant="caption" fontStyle="italic" display="block" mb={1} color="text.secondary">
                  Demo mode
                </Typography>
              )}

              {/* If there's formatted content, use that, otherwise use regular content */}
              {msg.formatted ? (
                renderFormattedResponse(msg.formatted)
              ) : (
                <Typography variant="body2" className="chat-text">{msg.content}</Typography>
              )}
  
              {/* Show demo query buttons if this is a bot message in response to document upload */}
              {activeUseCase && msg.role === "bot" && msg.content.includes("analyzed") && (
                <Box sx={{ mt: 1.5, pt: 1.5, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
                  <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                    Demo Queries:
                  </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      fullWidth
                    className="demo-query-button"
                    sx={{ mb: 1, fontSize: "0.75rem", textTransform: "none" }}
                    onClick={() => handleDemoQuery(activeUseCase.initialQuery)}
                    >
                    {activeUseCase.initialQuery}
                    </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    fullWidth
                    className="demo-query-button"
                    sx={{ fontSize: "0.75rem", textTransform: "none" }}
                    onClick={() => handleDemoQuery(activeUseCase.followupQuery)}
                  >
                    {activeUseCase.followupQuery}
                  </Button>
                </Box>
              )}
            </Paper>
          </Box>
        ))}
  
        {loading && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress size={30} sx={{ color: "#1E5631" }} />
          </Box>
        )}
  
        <div ref={messagesEndRef} />
      </Box>
  
      {/* Return to Demo Button */}
      {isOffTopic && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
            p: 1,
          backgroundColor: 'rgba(255,255,255,0.7)',
          position: 'relative',
            zIndex: 2,
          borderTop: '1px solid rgba(0,0,0,0.1)'
        }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<AgricultureIcon />}
            onClick={() => {
              setIsOffTopic(false);
              setQuestion("Tell me about agricultural optimizations for Indian farmers");
              setTimeout(() => handleSend(), 100);
            }}
            sx={{
              color: '#1E5631',
              borderColor: '#1E5631',
              '&:hover': {
                backgroundColor: 'rgba(30, 86, 49, 0.05)',
                borderColor: '#1E5631',
              }
            }}
          >
            Return to Agricultural Demo
          </Button>
        </Box>
      )}
  
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
          sx={{
            backgroundColor: "#1E5631",
            "&:hover": { backgroundColor: "#164a29" },
            minWidth: 130,
            whiteSpace: "nowrap",
          }}
        >
          Upload File
          <input type="file" hidden accept=".csv,.txt,.pdf,.xlsx,.xls" onChange={handleFileUpload} />
        </Button>
  
        <TextField
          fullWidth
          placeholder={isOffTopic
            ? "Ask me anything..."
            : "Ask about crop optimization, market trends, supply chain..."}
          className="input-field"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !loading && handleSend()}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSend}
                  disabled={loading}
                  sx={{
                    backgroundColor: isOffTopic ? "#2196f3" : "#E5BB4B",
                    color: "#fff",
                    "&:hover": { backgroundColor: isOffTopic ? "#1976d2" : "#d4aa43" },
                    "&.Mui-disabled": { backgroundColor: "#f0f0f0" },
                  }}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "20px",
              backgroundColor: isOffTopic ? "rgba(33, 150, 243, 0.05)" : "#F5F5DC", // Light blue for off-topic
            }
          }}
        />
      </Box>

      {/* Error Message */}
      {error && (
        <Box
          sx={{
            position: "fixed",
            bottom: 70,
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "8px 16px",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            zIndex: 3,
          }}
        >
          <Typography variant="body2">{error}</Typography>
        </Box>
      )}
    </Box>
  );
  
};

export default AgricultureBot;

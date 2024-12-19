import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import HealthCareSection from "./components/Sec/HealthCareSection";
import FinancialSection from "./components/Sec/FinanceSection";
import AgriculturalSection from "./components/Sec/AgricultureSection";
import PharmaceuticalsSection from "./components/Sec/PharmaceuticalsSection";
import ConstructionSection from "./components/Sec/ConstructionSection";
import ITServicesSection from "./components/Sec/itServiceSection";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/fotter/Fotter";
import CodeAnalysis from "./components/CodeAnalysisBot/CodeAnalysis";
import ConstructionBot from "./components/constructionBot/ConstructionBot"
import Chatbot from "./components/healthecareBot/Chatbot"
import PharmaBot from "./components/pharmaBot/PharmaBot";

const App = () => {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <AppRoutes />
    </Router>
  );
};

// Separate Routes and Footer logic into another component
const AppRoutes = () => {
  const location = useLocation(); 
  const hideFooterRoutes = ["/code-review", "/construction-bot","/healthcare-bot","/pharma-bot"];

  // Function to check if the current path should hide the footer
  const shouldShowFooter = !hideFooterRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/code-review" element={<CodeReviewPage />} />
        <Route path="/construction-bot" element={<ConstructionBot />} />
        <Route path="/healthcare-bot" element={<Chatbot />} />
        <Route path="/pharma-bot" element={<PharmaBot />} />
        <Route path="/" element={<SectionScroll />} />
        <Route path="/:param" element={<SectionScroll />} />
      </Routes>

      {/* Conditionally render Footer */}
      {shouldShowFooter && <Footer />}
    </>
  );
};

const CodeReviewPage = () => {
  return (
    <div style={{ minHeight: "100vh", padding: "3rem", background: "#f9f9f9" }}>
      <CodeAnalysis darkMode={false} />
    </div>
  );
};

const SectionScroll = () => {
  const sections = [
    { id: "home", Component: Home },
    { id: "healthcare", Component: HealthCareSection },
    { id: "financial", Component: FinancialSection },
    { id: "agricultural", Component: AgriculturalSection },
    { id: "pharmaceuticals", Component: PharmaceuticalsSection },
    { id: "construction", Component: ConstructionSection },
    { id: "it-services", Component: ITServicesSection },
  ];

  React.useEffect(() => {
    const id = window.location.pathname.replace("/", "").toLowerCase();

    if (id) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [window.location.pathname]);

  return (
    <div>
      {sections.map(({ id, Component }) => (
        <div
          id={id}
          key={id}
          className="min-h-screen p-8 border-b border-secondary"
        >
          <Component />
        </div>
      ))}
    </div>
  );
};

export default App;

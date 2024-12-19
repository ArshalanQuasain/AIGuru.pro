import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useParams } from 'react-router-dom';
import Home from './components/Home';
import HealthCareSection from './components/Sec/HealthCareSection';
import FinancialSection from './components/Sec/FinanceSection';
import AgriculturalSection from './components/Sec/AgricultureSection';
import PharmaceuticalsSection from './components/Sec/PharmaceuticalsSection';
import ConstructionSection from './components/Sec/ConstructionSection';
import ITServicesSection from './components/Sec/itServiceSection';
import Contact from './components/contact/Contact';
import About from './components/about/About';
import Navbar from './components/navbar/Navbar';
import Footer from './components/fotter/Fotter';
import CodeAnalysis from './components/CodeAnalysisBot/CodeAnalysis';

function App() {
  return (
    <Router>
      {/* Navbar */}
      <Navbar />

      {/* Routes */}
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/code-review" element={<CodeReviewPage />} />
        <Route path="/" element={<SectionScroll />} />
        <Route path="/:param" element={<SectionScroll />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

const CodeReviewPage = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '3rem', background: '#f9f9f9' }}>
      <CodeAnalysis darkMode={false} />
    </div>
  );
};

const SectionScroll = () => {
  const location = useLocation();
  const { param } = useParams();

  const sections = [
    { id: 'home', Component: Home },
    { id: 'healthcare', Component: HealthCareSection },
    { id: 'financial', Component: FinancialSection },
    { id: 'agricultural', Component: AgriculturalSection },
    { id: 'pharmaceuticals', Component: PharmaceuticalsSection },
    { id: 'construction', Component: ConstructionSection },
    { id: 'it-services', Component: ITServicesSection },
  ];

  useEffect(() => {
    const id = param
      ? param.toLowerCase().replace(/\s+/g, '-')
      : location.pathname.split('/')[1].toLowerCase();

    if (id) {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.pathname, param]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.history.replaceState(null, '', `/${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach(({ id }) => {
      const sectionElement = document.getElementById(id);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

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

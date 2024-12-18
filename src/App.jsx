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

function App() {
  return (
    <Router> 
      <Navbar/>
      <Routes>
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/:param" element={<SectionScroll />} />
        <Route path="/" element={<SectionScroll />} />
      </Routes>
      <Footer/>
    </Router >
  );
}

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
    const id = param ? param.toLowerCase().replace(/\s+/g, '-') : location.pathname.split('/')[1].toLowerCase();

    if (id) {
      const section = document.getElementById(id); // Get the element based on the param or pathname
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.pathname, param]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the section is visible
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          window.history.replaceState(null, '', `/${entry.target.id}`); // Update URL when section is in view
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
      observer.disconnect(); // Clean up observer when component unmounts
    };
  }, []);

  return (
    <div>
      {sections.map(({ id, Component }) => (
        <div
          id={id} // Assigning the section's ID to match the route
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




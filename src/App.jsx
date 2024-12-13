import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import HealthCareSection from './components/Sec/HealthCareSection';
import FinancialSection from './components/Sec/FinanceSection';
import AgriculturalSection from './components/Sec/AgricultureSection'
import PharmaceuticalsSection from './components/Sec/PharmaceuticalsSection';
import ConstructionSection from './components/Sec/ConstructionSection';
import ITServicesSection from './components/Sec/itServiceSection';

function App() {
  return (
    <Router> {}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/healthcare" element={<HealthCareSection />} />
        <Route path="/financial" element={<FinancialSection />} />
        <Route path="/agricultural" element={<AgriculturalSection />} />
        <Route path="/pharmaceuticals" element={<PharmaceuticalsSection />} />
        <Route path="/construction" element={<ConstructionSection />} />
        <Route path="/it-services" element={<ITServicesSection />} />
      </Routes>
    </Router>
  );
}

export default App;

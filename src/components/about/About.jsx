import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
  const navigate = useNavigate();
  const handleonClick = () => {
    navigate("/contact");
  }

  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-900 to-blue-950 text-white">
        <h1 className="text-6xl font-semibold">AI Guru Solutions</h1>
        <h1 className="text-sm mb-6 text-gray-300">Bridging Silicon Valley Innovation with Indian Excellence</h1>
        <p className="text-lg max-w-4xl mx-auto text-gray-100">
          At AI Guru, we transform businesses through cutting-edge AI solutions backed by Silicon Valley expertise and deep understanding of local markets. Our comprehensive suite of enterprise solutions is designed to address complex business challenges across industries.
        </p>
      </div>

      {/* Core Solutions */}
      <div className="py-12 bg-gradient-to-r from-blue-900 to-blue-950 px-4 sm:px-8 md:px-16 text-gray-50">
        <h2 className="text-4xl font-semibold mb-8">Our Core Solutions:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-white text-gray-800 shadow-lg rounded-lg border border-gray-200 transform transition-transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4">Custom AI Implementation</h3>
            <ul className="list-disc pl-5">
              <li>Tailored AI solutions designed for your specific business needs</li>
              <li>End-to-end implementation support</li>
              <li>Integration with existing systems</li>
              <li>Scalable and future-ready architecture</li>
            </ul>
          </div>
          <div className="p-6 bg-white text-gray-800 shadow-lg rounded-lg border border-gray-200 transform transition-transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4">Industry-Specific Solutions</h3>
            <ul className="list-disc pl-5">
              <li><strong>Healthcare & Pharma</strong> - Medical AI systems, Health coaching, Patient analytics, Drug discovery</li>
              <li><strong>Banking & Finance</strong> - Risk assessment, Fraud detection, Financial analytics</li>
              <li><strong>Agriculture</strong> - Smart farming, Crop prediction, Weather analysis</li>
              <li><strong>IT Services</strong> - AI integration, Process automation, Chatbot development</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What Sets Us Apart */}
      <div className="py-12 px-4 sm:px-8 md:px-16 bg-gradient-to-r from-blue-900 to-blue-950 text-gray-50">
        <h2 className="text-4xl font-semibold mb-8">What Sets Us Apart</h2>
        <div className="max-w-6xl m-8 text-lg">
          <p><strong>Silicon Valley Expertise:</strong> Founded by former Amazon and Cerebras Systems executives, we bring cutting-edge AI knowledge and best practices from the global technology hub to your doorstep.</p>
          <p><strong>End-to-End Support:</strong> Our solutions include:</p>
          <ul className="list-decimal pl-5 mb-4">
            <li>Initial assessment and strategy development</li>
            <li>Custom implementation and integration</li>
            <li>Staff training and capability building</li>
            <li>Ongoing support and optimization</li>
          </ul>
          <p><strong>Proven Track Record:</strong> Successfully implemented solutions across 18 countries with a 92% success rate in implementations. Over 15,000 professionals trained in AI technologies and trusted by leading organizations across industries.</p>
        </div>
      </div>

      {/* Our Approach */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-950 py-12 px-4 sm:px-8 md:px-16 text-gray-50">
        <h2 className="text-4xl font-semibold mb-8">Our Approach</h2>
        <div className="max-w-6xl m-8 text-lg">
          <p><strong>Assessment:</strong> We begin by understanding your unique challenges and objectives.</p>
          <p><strong>Strategy:</strong> Develop a customized solution strategy aligned with your business goals.</p>
          <p><strong>Implementation:</strong> Execute with precision while ensuring minimal disruption.</p>
          <p><strong>Training:</strong> Empower your team with the knowledge to maximize the solution's potential.</p>
          <p><strong>Support:</strong> Provide ongoing assistance and optimization.</p>
        </div>
      </div>

      {/* Global Presence */}
      <div className="py-12 px-4 sm:px-8 md:px-16 bg-gradient-to-r from-blue-900 to-blue-950 text-gray-50">
        <h2 className="text-4xl font-semibold mb-8">Global Presence, Local Understanding</h2>
        <p className="text-lg max-w-4xl mx-auto text-center">
          With offices in Gujarat, India and New Jersey, USA, we combine global expertise with deep local market understanding to deliver solutions that work in real-world contexts.
        </p>
      </div>

      {/* Call to Action */}
      <div className="py-12 bg-gradient-to-r from-blue-900 to-blue-950 px-4 sm:px-8 md:px-16 text-gray-50">
        <h2 className="text-4xl font-semibold mb-8">Partner with Us</h2>
        <p className="text-lg text-center max-w-4xl mx-auto">
          Whether you're looking to implement AI solutions, transform your business processes, or build AI capabilities within your organization, AI Guru is your trusted partner in the AI transformation journey.
        </p>
        <div className="flex justify-center my-6">
          <button
            onClick={handleonClick}
            className="bg-white text-blue-900 hover:bg-gray-200 font-semibold py-2 px-6 rounded-lg">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;

import React from 'react';
const Section = ({ icon, industry, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start p-6 m-2 border-2 border-secondary rounded-lg w-full bg-transparent cursor-pointer shadow-md transform transition-transform duration-300 hover:translate-y-2"
    >
      <div className="flex items-center mb-2">
        <span className="mr-3">{icon}</span>
        <h3 className="text-lg text-secondary">{industry}</h3>
      </div>
      <p className="text-sm text-secondary">{text}</p>
    </button>
    
  );
};

export default Section;

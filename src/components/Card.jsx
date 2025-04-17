import React from "react";

const Card = ({ title, description, features, buttonText, onButtonClick }) => {
  return (
    <div className="relative p-6 rounded-lg bg-gray-900 border border-blue-900/60 cursor-pointer transform transition-all duration-300 ease-in-out">
      {/* Card Header */}
      <div className="p-6 border-pink-200 border-b-2 w-full">
        <h2 className="text-2xl font-semibold text-gray-50 mb-2">{title}</h2>
        <p className="text-sm text-pink-50">{description}</p>
      </div>

      {/* Key Features */}
      <div className="p-6 flex-1 w-full">
        <h4 className="text-md font-semibold text-white mb-2">Key Features:</h4>
        <ul className="list-disc list-inside text-blue-50 space-y-1 pl-1">
          {features.map((feature, index) => (
            <li key={index} className="text-sm">{feature}</li>
          ))}
        </ul>
      </div>

      {/* Card Footer */}
      <div className="p-4  border-pink-200 border-t-2">
        <button
          onClick={onButtonClick}
          className="px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg shadow-lg text-lg transition-transform transform active:scale-95"

        >
          {buttonText}
        </button> 
      </div>
    </div>
  );
};

export default Card;

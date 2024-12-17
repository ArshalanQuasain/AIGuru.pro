import React from "react";

const Card = ({ title, description, features, buttonText, onButtonClick }) => {
  return (
    <div className="relative p-6 rounded-lg shadow-md bg-gradient-to-br from-blue-50 to-blue-200 hover:from-blue-200 hover:to-blue-300 cursor-pointer transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-100 w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      {/* Key Features */}
      <div className="p-6 flex-1 w-full">
        <h4 className="text-md font-semibold text-gray-700 mb-2">Key Features:</h4>
        <ul className="list-disc list-inside text-gray-600 space-y-1 pl-1">
          {features.map((feature, index) => (
            <li key={index} className="text-sm">{feature}</li>
          ))}
        </ul>
      </div>

      {/* Card Footer */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={onButtonClick}
          className=" px-4 py-2 text-white bg-cyan-500 hover:bg-cyan-400 rounded-lg shadow-md transition-transform transform active:scale-95"
        >
          {buttonText}
        </button>
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 rounded-lg bg-black opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
    </div>
  );
};

export default Card;

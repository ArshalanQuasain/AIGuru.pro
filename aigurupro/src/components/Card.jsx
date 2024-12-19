import React from "react";
import {useNavigate} from "react-router-dom";

const Card = ({ title, description, features, buttonText, onButtonClick ,  link }) => {
  const navigate = useNavigate();
  const handlebuttonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
    else if (link) {
      navigate(link);
    }
    else {
      alert("Button Clicked and there is no route to navigate");
    }
  };
  return (
    <div className="relative p-6 rounded-lg shadow-md bg-gradient-to-br from-blue-50 to-blue-200">
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
          onClick={handlebuttonClick}
          className="px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg shadow-lg text-lg transition-transform transform active:scale-95"
        >
          {buttonText}
        </button> 
      </div>
    </div>
  );
};

export default Card;

import React from "react";
const Card = ({ title, description, features, buttonText, onButtonClick }) => {
    return (
      <div className="flex flex-col items-start m-2 border-2 p-6 border-secondary rounded-lg w-full bg-transparent cursor-pointer shadow-md transform transition-transform duration-300 hover:translate-y-2">
        <h2 className="text-lg font-semibold text-secondary mb-2">{title}</h2>
        <p className="text-sm text-secondary mb-4">{description}</p>
        <div className="mb-4">
          <h4 className="font-medium text-secondary">Key Features:</h4>
          <ul className="list-disc list-inside text-secondary">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <button
          onClick={onButtonClick}
          className="mt-auto px-4 py-2 bg-secondary text-primary rounded hover:bg-opacity-90 transition"
        >
          {buttonText}
        </button>
      </div>
    );
  };
  
export default Card;
  
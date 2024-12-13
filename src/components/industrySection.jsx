import React from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function IndustrySection({ Icon, title, brief, Data }) { 
    const navigate = useNavigate();
    return (
        <div className="flex flex-col py-8 px-4 md:px-16 lg:px-32">
            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center text-secondary pb-8"
            >
                <FaArrowLeft className="mr-2" />
                <span>Back to Industries</span>
            </button>

            <div className="flex items-center mb-8">
                <Icon className="text-secondary text-6xl mr-4" /> 
                <div>
                    <h1 className="text-4xl font-bold text-secondary mb-2">{title}</h1>
                    <p className="text-lg text-secondary">{brief}</p>
                </div>
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 gap-6">
                {Data.map((item, index) => (
                    <Card
                        key={index}
                        title={item.title}
                        description={item.description}
                        features={item.features}
                        buttonText={item.buttonText}
                        onButtonClick={item.onButtonClick}
                    />
                ))}
            </div>
            <div className="mb-8"></div>
        </div>
    );
}

export default IndustrySection;

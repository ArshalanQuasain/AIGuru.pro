import React from 'react';
import Card from './Card';

function IndustrySection({ Icon, title, brief, Data }) { 
    return (
        <div className="flex flex-col py-8 px-4 md:px-16 lg:px-32">
            <div className="flex items-center mb-8 z-50">
                <Icon className=" text-6xl mr-4 text-purple-400" /> 
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">{title}</h1>
                    <p className="text-lg text-gray-50">{brief}</p>
                </div>
            </div>
            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

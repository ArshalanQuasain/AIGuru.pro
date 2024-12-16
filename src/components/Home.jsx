import React from 'react';
import { Brain } from 'lucide-react';
import Data from './Data/industryData';
import Section from './Section';
import { useNavigate } from 'react-router-dom';
import Up from './Button/top'; 

function Home() {
    const navigate = useNavigate();

    const handleNavigation = (industry, link) => {
        const id = industry.toLowerCase().replace(/\s+/g, '-');
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            navigate(link);
        }
    };
    const handleUpschroller = () => {
        const section = document.getElementById('home');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            navigate('/home');
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center py-16 px-4 bg-primary text-center">
                {/* Logo */}
                <Brain className="text-secondary mb-8 w-24 h-24" />

                {/* Title */}
                <h1 className="text-6xl font-bold text-secondary">AIGuru.pro</h1>

                {/* Subtitle */}
                <p className="text-secondary mt-2 text-lg">
                    Transforming industries through cutting-edge AI solutions powered by <br />
                    ChatGPT and Claude
                </p>
            </div>

            {/* Industries Section */}
            <div className="w-full mx-auto py-6 px-4 md:px-16 lg:px-32">
                <h2 className="text-4xl font-bold text-secondary mb-4 text-center">
                    Industries We Serve
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Data.map(({ id, icon, industry, text, link }) => (
                        <Section
                            key={id}
                            icon={icon}
                            industry={industry}
                            text={text}
                            onClick={() => handleNavigation(industry, link)}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                <h2 className="text-4xl font-bold text-secondary mb-4 text-center">
                    Ready to Transform Your Industry?
                </h2>
                <p className="text-secondary mt-2 text-lg mb-6">
                    Explore our AI solutions tailored for your specific needs
                </p>
                <button
                    onClick={() => navigate('/solutions')}
                    className="bg-inherit border-2 border-secondary text-secondary font-medium py-3 px-6 rounded-lg transform transition-transform duration-300 hover:translate-y-2 hover:bg-secondary hover:text-primary"
                >
                    Explore Solutions
                </button>
            </div>

            <Up
                onClick={handleUpschroller} />
        </>
    );
}

export default Home;

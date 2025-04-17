import React from 'react';
import Data from './Data/industryData';
import { useNavigate } from 'react-router-dom';
import Up from './Button/top';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';
import ComputerIcon from '@mui/icons-material/Computer';
import DevicesIcon from '@mui/icons-material/Devices';
import StorageIcon from '@mui/icons-material/Storage';
import favicon from "../components/image/favicon.ico.png"

function Home() {
    const navigate = useNavigate();
    const fixedIcons = [
        { Icon: CodeIcon, top: '10%', left: '20%', size: '50px' },
        { Icon: CloudIcon, top: '30%', left: '60%', size: '60px' },
        { Icon: ComputerIcon, top: '50%', left: '10%', size: '40px' },
        { Icon: DevicesIcon, top: '70%', left: '80%', size: '50px' },
        { Icon: StorageIcon, top: '85%', left: '35%', size: '45px' },
        { Icon: CodeIcon, top: '15%', left: '75%', size: '55px' },
        { Icon: CloudIcon, top: '40%', left: '85%', size: '50px' },
        { Icon: ComputerIcon, top: '65%', left: '15%', size: '45px' },
        { Icon: DevicesIcon, top: '25%', left: '50%', size: '60px' },
        { Icon: StorageIcon, top: '90%', left: '5%', size: '40px' },
    ];

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
    };

    return (
        <>
            {/* Dark Background */}
            <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-gradient-to-b from-gray-900 to-blue-950">
                {fixedIcons.map(({ Icon, top, left, size }, index) => (
                    <Icon
                        key={index}
                        className="absolute"
                        style={{
                            top,
                            left,
                            fontSize: size,
                            color: 'rgba(255, 255, 255, 0.05)', // Very subtle white icons
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    {/* Logo */}
                    <img src={favicon} alt="AIGuru Logo" className="mb-8 w-24 h-24" />
                    <h1 className="text-6xl font-bold text-white">
                        AI Guru Solutions
                    </h1>

                    <p className="mt-4 text-lg text-gray-300">
                        Transforming industries through cutting-edge AI solutions powered by <br />
                        <span className="font-medium text-white">ChatGPT, Claude and LLaMa</span>
                    </p>
                </div>

                {/* Industries Section */}
                <div className="w-full mx-auto py-10 px-4 md:px-16 lg:px-32">
                    <h2 className="text-4xl font-bold text-white mb-10 text-center">
                        Industries We Serve
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {Data.map(({ id, icon, industry, text, link }) => (
                            <div
                                key={id}
                                onClick={() => handleNavigation(industry, link)}
                                className="relative p-6 rounded-lg bg-gray-900 border border-blue-900/60 cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-blue-900/20"
                            >
                                {/* Icon and Title */}
                                <div className="flex items-center mb-4 space-x-4">
                                    <div className="p-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                                        <img src={icon} alt={industry} className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white">{industry}</h3>
                                </div>
                                {/* Description Text */}
                                <p className="text-gray-50 text-sm">{text}</p>

                                {/* Hover Effect - Line Indicator */}
                                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <h2 className="text-4xl font-bold text-white text-center">
                        Ready to Transform Your Industry?
                    </h2>
                    <p className="text-gray-300 mt-4 text-lg mb-8">
                        Explore our AI solutions tailored for your specific needs
                    </p>
                    <button
                        onClick={() => navigate('/solutions')}
                        className="
                        bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                        text-white text-lg font-medium 
                        py-3 px-8 rounded-lg 
                        shadow-lg hover:shadow-blue-500/20
                        transform transition duration-300 
                        active:scale-95 hover:-translate-y-1
                      "                      
                    >
                        Explore Solutions
                    </button>
                </div>
            </div>

            {/* Scroll Up Button */}
            <Up onClick={handleUpschroller} />
        </>
    );
}

export default Home;

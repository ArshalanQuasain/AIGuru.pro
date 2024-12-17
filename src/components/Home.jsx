import React from 'react';
import { Brain } from 'lucide-react';
import Data from './Data/industryData';
import { useNavigate } from 'react-router-dom';
import Up from './Button/top';
import CodeIcon from '@mui/icons-material/Code';
import CloudIcon from '@mui/icons-material/Cloud';
import ComputerIcon from '@mui/icons-material/Computer';
import DevicesIcon from '@mui/icons-material/Devices';
import StorageIcon from '@mui/icons-material/Storage';

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
            {/* Background Gradient */}
            <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none bg-gradient-to-b from-blue-900 to-blue-700">
                {fixedIcons.map(({ Icon, top, left, size }, index) => (
                    <Icon
                        key={index}
                        className="absolute"
                        style={{
                            top,
                            left,
                            fontSize: size,
                            color: 'rgba(255, 255, 255, 0.1)',
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    {/* Logo */}
                    <Brain className="text-secondary mb-8 w-24 h-24" />
                    <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
                        AIGuru.pro
                    </h1>

                    <p className="text-slate-300 mt-2 text-lg">
                        Transforming industries through cutting-edge AI solutions powered by <br />
                        ChatGPT and Claude
                    </p>
                </div>

                {/* Industries Section */}
                <div className="w-full mx-auto py-6 px-4 md:px-16 lg:px-32">
                    <h2 className="text-4xl font-bold text-sky-400 mb-8 text-center">
                        Industries We Serve
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
                        {Data.map(({ id, icon, industry, text, link }) => (
                            <div
                                key={id}
                                onClick={() => handleNavigation(industry, link)}
                                className="relative p-6 rounded-lg shadow-md bg-gradient-to-br from-blue-50 to-blue-200 hover:from-blue-200 hover:to-blue-300 cursor-pointer transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl"
                            >
                                {/* Icon and Title */}
                                <div className="flex items-center mb-4 space-x-4">
                                    <div className="p-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                                        <img src={icon} alt={industry} className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-800">{industry}</h3>
                                </div>
                                {/* Description Text */}
                                <p className="text-gray-600 text-sm">{text}</p>

                                {/* Hover Effect Overlay */}
                                <div className="absolute inset-0 rounded-lg bg-gray-900 opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <h2 className="text-4xl font-bold text-cyan-300 mb-4">
                        Ready to Transform Your Industry?
                    </h2>
                    <p className="text-slate-300 mt-2 text-lg mb-6">
                        Explore our AI solutions tailored for your specific needs
                    </p>
                    <button
                        onClick={() => navigate('/solutions')}
                        className="bg-cyan-500 hover:bg-cyan-400 text-white font-medium py-3 px-6 rounded-lg transition-transform transform duration-300 hover:translate-y-1"
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

import React from 'react';
import Data from '../Data/healthCareData';
import IndustrySection from '../industrySection'; 
import { FaHeart } from 'react-icons/fa';

function HealthCareSection() {
    const title = "Healthcare";
    const brief = "AI solutions revolutionizing patient care and medical diagnostics";

    return (
        <IndustrySection
            title={title}
            brief={brief}
            Data={Data}
            Icon={FaHeart} 
        />
    );
}

export default HealthCareSection;

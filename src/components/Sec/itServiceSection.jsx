import React from 'react';
import Data from '../Data/itService';
import IndustrySection from '../industrySection'
import { FaMicrochip } from 'react-icons/fa';

function ItServiceSection() {
    const title = "IT Services";
    const brief = "Intelligent automation and system optimization";

    return (
        <IndustrySection
            title={title}
            brief={brief}
            Data={Data}
            Icon={FaMicrochip} 
        />
    );
}

export default ItServiceSection;

import React from 'react';
import Data from '../Data/PharmaceuticalsData';
import IndustrySection from '../industrySection'; 
import { FaPills } from 'react-icons/fa';

function PharmaceuticalsSection() {
    const title = "Pharmaceuticals";
    const brief = "Drug discovery and research automation";

    return (
        <IndustrySection
            title={title}
            brief={brief}
            Data={Data}
            Icon={FaPills} 
        />
    );
}

export default PharmaceuticalsSection;

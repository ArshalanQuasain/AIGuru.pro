import React from 'react';
import Data from '../Data/agricultureData';
import IndustrySection from '../industrySection'; 
import { FaTree } from 'react-icons/fa';

function AgriculturalSection() {
    const title = "Agricultural";
    const brief = "Precision farming and crop optimization solutions";

    return (
        <IndustrySection
            title={title}
            brief={brief}
            Data={Data}
            Icon={FaTree} 
        />
    );
}

export default AgriculturalSection;

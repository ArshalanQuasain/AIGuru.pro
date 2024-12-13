import React from 'react';
import Data from '../Data/constructionData';
import IndustrySection from '../industrySection';
import { FaBuilding } from 'react-icons/fa';

function ConstructionSection() {
    const title = "Construction";
    const brief = "Project planning and safety monitoring systems";

    return (
        <IndustrySection
            title={title}
            brief={brief}
            Data={Data}
            Icon={FaBuilding} 
        />
    );
}

export default ConstructionSection;

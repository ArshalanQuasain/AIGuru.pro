import React from 'react';
import Data from '../Data/financeData';
import IndustrySection from '../industrySection'
import { FaBriefcase } from 'react-icons/fa';

function FinancialSection() {
    const title = "Financial";
    const brief = "Smart financial analysis and risk assessment tools";

    return (
        <IndustrySection
            title={title}
            brief={brief}
            Data={Data}
            Icon={FaBriefcase} 
        />
    );
}

export default FinancialSection;

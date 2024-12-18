import { FaHeartbeat, FaBriefcase, FaTree, FaPills, FaBuilding, FaMicrochip } from 'react-icons/fa';
import healthcare from '../image/HealthCare.png';
import Financial from '../image/Finance.jpg';
import Agricultural from '../image/Agriculture.jpg';
import Pharmaceuticals from '../image/Pharmaceutical.jpg';
import Construction from '../image/Construction.png';
import ItServices from '../image/ItServices.jpg'; 

const IndustryData = [
  {
    id: 1,
    icon: healthcare,
    industry: 'Healthcare',
    text: 'AI solutions revolutionizing patient care and medical diagnostics',
    link: '/healthcare',
  },
  {
    id: 2,
    icon: Financial,
    industry: 'Financial',
    text: 'Smart financial analysis and risk assessment tools',
    link: '/financial',
  },
  {
    id: 3,
    icon: Agricultural,
    industry: 'Agricultural',
    text: 'Precision farming and crop optimization solutions',
    link: '/agricultural',
  },
  {
    id: 4,
    icon: Pharmaceuticals,
    industry: 'Pharmaceuticals',
    text: 'Innovative drug discovery and healthcare advancements',
    link: '/pharmaceuticals',
  },
  {
    id: 5,
    icon: Construction,
    industry: 'Construction',
    text: 'Revolutionizing the construction industry with AI-powered project management and optimization',
    link: '/construction',
  },
  {
    id: 6,
    icon: ItServices,
    industry: 'IT Services',
    text: 'AI-driven IT solutions for enhanced software development and infrastructure management',
    link: '/it-services',
  },
];

export default IndustryData;

import { FaHeartbeat, FaBriefcase, FaTree, FaPills , FaBuilding, FaMicrochip } from 'react-icons/fa';

const IndusryData = [
  {
    id: 1,
    icon: <span className="text-secondary text-2xl"><FaHeartbeat /></span>,
    industry: 'Healthcare',
    text: 'AI solutions revolutionizing patient care and medical diagnostics',
    link: '/healthcare',
  },
  {
    id: 2,
    icon: <span className="text-secondary text-2xl"><FaBriefcase /></span>,
    industry: 'Financial',
    text: 'Smart financial analysis and risk assessment tools',
    link: '/financial',
  },
  {
    id: 3,
    icon: <span className="text-secondary text-2xl"><FaTree /></span>,
    industry: 'Agricultural',
    text: 'Precision farming and crop optimization solutions',
    link: '/agricultural',
  },
  {
    id: 4,
    icon: <span className="text-secondary text-2xl"><FaPills /></span>,
    industry: 'Pharmaceuticals',
    text: 'Innovative drug discovery and healthcare advancements',
    link: '/pharmaceuticals',
  },
  {
    id: 5,
    icon: <span className="text-secondary text-2xl"><FaBuilding /></span> ,
    industry: 'Construction',
    text: 'Revolutionizing the construction industry with AI-powered project management and optimization',
    link: '/construction',
  },
  {
    id: 6,
    icon: <span className="text-secondary text-2xl"><FaMicrochip /></span>,
    industry: 'IT Services',
    text: 'AI-driven IT solutions for enhanced software development and infrastructure management',
    link: '/it-services',
  },
];

export default IndusryData;

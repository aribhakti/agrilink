import { NavItem, ClientRegion, ApplicationStatus } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { 
    label: 'Services', 
    path: '/services',
    subItems: [
      { label: 'Fertilizer Registration', path: '/services/fertilizer' },
      { label: 'Pesticide Registration', path: '/services/pesticide' },
      { label: 'Intellectual Property', path: '/services/ip' },
    ]
  },
  { label: 'Clients', path: '/clients' },
  { label: 'News & Regulations', path: '/news' },
  { label: 'Status Portal', path: '/status' },
];

export const CLIENT_REGIONS: ClientRegion[] = [
  { 
    id: 'jkt', 
    region: 'Jakarta (HQ Focus)', 
    count: 15, 
    description: 'Corporate Partners',
    clients: ['JAI', 'TBM', 'AgroCorp', 'IndoPlant']
  },
  { 
    id: 'ej', 
    region: 'East Java', 
    count: 9, 
    description: 'Ag-Chemical Producers',
    clients: ['PetroJaya', 'Surabaya Chems', 'EastGrow']
  },
  { 
    id: 'ns', 
    region: 'North Sumatra', 
    count: 6, 
    description: 'Plantation Suppliers',
    clients: ['Sumatra Palms', 'Medan Agro']
  },
  { 
    id: 'ban', 
    region: 'Tangerang/Banten', 
    count: 4, 
    description: 'Strategic Partners',
    clients: ['Banten Bio', 'TangSel Labs']
  },
  { 
    id: 'lam', 
    region: 'Lampung & Central Java', 
    count: 5, 
    description: 'Emerging Markets',
    clients: ['Lampung Tani', 'Java Fert']
  },
];

export const MOCK_STATUS_DB: ApplicationStatus[] = [
  { id: 'AGR-2023-001', companyName: 'PT Green Grow', productName: 'SuperPhos 20', stage: 'Efficacy Testing', lastUpdated: '2023-10-25' },
  { id: 'AGR-2023-002', companyName: 'CV Tani Maju', productName: 'BioKill X', stage: 'Commission Review', lastUpdated: '2023-11-02' },
  { id: 'AGR-2023-003', companyName: 'Global Chem Indonesia', productName: 'Nitrogen Plus', stage: 'Lab Analysis', lastUpdated: '2023-11-10' },
];
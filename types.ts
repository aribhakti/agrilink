// Import React to provide the React namespace for React.ReactNode
import React from 'react';

export interface NavItem {
  label: string;
  path: string;
  subItems?: NavItem[];
}

export interface ClientRegion {
  id: string;
  region: string;
  count: number;
  description: string;
  clients: string[];
}

export interface ProcessStep {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ApplicationStatus {
  id: string;
  companyName: string;
  productName: string;
  stage: 'Submitted' | 'Lab Analysis' | 'Efficacy Testing' | 'Commission Review' | 'Decree Issued';
  lastUpdated: string;
}
export interface BaseProfile {
  slug: string;
  name: string;
  name_arabic?: string;
  type: 'professional' | 'company';
  location: string;
  tags: string[];
  contact: {
    email: string;
    website?: string;
    linkedin?: string;
    github?: string;
    behance?: string;
    twitter?: string;
  };
  about?: string;
  about_arabic?: string;
}

export interface ProfessionalProfile extends BaseProfile {
  type: 'professional';
  title: string;
  title_arabic?: string;
  services: string[];
  technical_skills?: string[];
  work_experience?: WorkExperience[];
  certifications?: Certification[];
  projects?: Project[];
  languages?: string[];
  availability?: 'available' | 'busy' | 'unavailable';
}

export interface CompanyProfile extends BaseProfile {
  type: 'company';
  industry: string;
  company_size: 'startup' | 'small' | 'medium' | 'large';
  founded?: number;
  services: string[];
  technical_expertise?: string[];
  team?: {
    size: number;
    roles: string[];
  };
  notable_projects?: Project[];
  certifications?: Certification[];
}

export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface Project {
  name: string;
  url?: string;
  description: string;
}

export type Profile = ProfessionalProfile | CompanyProfile;
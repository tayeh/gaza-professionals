export interface Professional {
  id: string;
  fullName: string;
  nameArabic?: string;
  professionalTitle: string;
  titleArabic?: string;
  skills: string[];
  yearsExperience: number;
  email: string;
  linkedin?: string;
  github?: string;
  bio: string;
  bioArabic?: string;
  workStatus: 'available' | 'employed' | 'freelancing' | 'looking';
  languages: string[];
  location: string;
  avatar?: string;
}

export interface Company {
  id: string;
  name: string;
  nameArabic?: string;
  industry: string;
  services: string[];
  companySize: 'startup' | 'small' | 'medium' | 'large';
  location: string;
  email: string;
  website?: string;
  expertise: string[];
  notableProjects?: string[];
  description: string;
  descriptionArabic?: string;
  logo?: string;
}

export interface Service {
  id: string;
  category: string;
  name: string;
  nameArabic?: string;
  provider: string;
  description: string;
  descriptionArabic?: string;
  pricingRange?: string;
  contactMethod: string;
  availability: 'available' | 'busy' | 'unavailable';
  tags: string[];
}

export type Language = 'en' | 'ar';

export interface SearchFilters {
  query: string;
  skills?: string[];
  industry?: string[];
  location?: string[];
  workStatus?: string[];
  availability?: string[];
  experience?: number[];
  companySize?: string[];
}
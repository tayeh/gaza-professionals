import { Professional, Company, Service, SearchFilters } from '../types';

export const filterProfessionals = (professionals: Professional[], filters: SearchFilters): Professional[] => {
  return professionals.filter(professional => {
    // Query search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchableText = [
        professional.fullName,
        professional.nameArabic,
        professional.professionalTitle,
        professional.titleArabic,
        professional.bio,
        professional.bioArabic,
        ...professional.skills,
        ...professional.languages
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) return false;
    }

    // Skills filter
    if (filters.skills && filters.skills.length > 0) {
      const hasMatchingSkill = filters.skills.some(skill => 
        professional.skills.some(profSkill => 
          profSkill.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (!hasMatchingSkill) return false;
    }

    // Location filter
    if (filters.location && filters.location.length > 0) {
      if (!filters.location.includes(professional.location)) return false;
    }

    // Work status filter
    if (filters.workStatus && filters.workStatus.length > 0) {
      if (!filters.workStatus.includes(professional.workStatus)) return false;
    }

    // Experience filter
    if (filters.experience && filters.experience.length > 0) {
      const [minExp, maxExp] = filters.experience;
      if (professional.yearsExperience < minExp || professional.yearsExperience > maxExp) return false;
    }

    return true;
  });
};

export const filterCompanies = (companies: Company[], filters: SearchFilters): Company[] => {
  return companies.filter(company => {
    // Query search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchableText = [
        company.name,
        company.nameArabic,
        company.industry,
        company.description,
        company.descriptionArabic,
        ...company.services,
        ...company.expertise
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) return false;
    }

    // Industry filter
    if (filters.industry && filters.industry.length > 0) {
      if (!filters.industry.includes(company.industry)) return false;
    }

    // Location filter
    if (filters.location && filters.location.length > 0) {
      if (!filters.location.includes(company.location)) return false;
    }

    // Company size filter
    if (filters.companySize && filters.companySize.length > 0) {
      if (!filters.companySize.includes(company.companySize)) return false;
    }

    return true;
  });
};

export const filterServices = (services: Service[], filters: SearchFilters): Service[] => {
  return services.filter(service => {
    // Query search
    if (filters.query) {
      const query = filters.query.toLowerCase();
      const searchableText = [
        service.name,
        service.nameArabic,
        service.category,
        service.provider,
        service.description,
        service.descriptionArabic,
        ...service.tags
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) return false;
    }

    // Skills/Tags filter
    if (filters.skills && filters.skills.length > 0) {
      const hasMatchingTag = filters.skills.some(skill => 
        service.tags.some(tag => 
          tag.toLowerCase().includes(skill.toLowerCase())
        )
      );
      if (!hasMatchingTag) return false;
    }

    // Availability filter
    if (filters.availability && filters.availability.length > 0) {
      if (!filters.availability.includes(service.availability)) return false;
    }

    return true;
  });
};

export const sortProfessionals = (professionals: Professional[], sortBy: string): Professional[] => {
  switch (sortBy) {
    case 'experience':
      return [...professionals].sort((a, b) => b.yearsExperience - a.yearsExperience);
    case 'name':
      return [...professionals].sort((a, b) => a.fullName.localeCompare(b.fullName));
    default:
      return professionals;
  }
};

export const sortCompanies = (companies: Company[], sortBy: string): Company[] => {
  switch (sortBy) {
    case 'size':
      const sizeOrder = { large: 4, medium: 3, small: 2, startup: 1 };
      return [...companies].sort((a, b) => 
        (sizeOrder[b.companySize as keyof typeof sizeOrder] || 0) - 
        (sizeOrder[a.companySize as keyof typeof sizeOrder] || 0)
      );
    case 'name':
      return [...companies].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return companies;
  }
};

export const sortServices = (services: Service[], sortBy: string): Service[] => {
  switch (sortBy) {
    case 'availability':
      const availabilityOrder = { available: 3, busy: 2, unavailable: 1 };
      return [...services].sort((a, b) => 
        (availabilityOrder[b.availability as keyof typeof availabilityOrder] || 0) - 
        (availabilityOrder[a.availability as keyof typeof availabilityOrder] || 0)
      );
    case 'category':
      return [...services].sort((a, b) => a.category.localeCompare(b.category));
    default:
      return services;
  }
};
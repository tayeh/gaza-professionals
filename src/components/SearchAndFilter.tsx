import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';
import { SearchFilters } from '../types';
import { useLanguageContext } from '../contexts/LanguageContext';

interface SearchAndFilterProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  activeTab: string;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({ filters, onFiltersChange, activeTab }) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const { language } = useLanguageContext();

  const skillOptions = ['React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Machine Learning', 'UI/UX', 'SEO', 'DevOps', 'Mobile Development'];
  const industryOptions = ['Technology', 'Design & Marketing', 'Data & Analytics', 'Healthcare', 'Education', 'E-commerce'];
  const locationOptions = ['Gaza City', 'Khan Younis', 'Rafah', 'Deir el-Balah', 'Jabalia', 'Beit Hanoun'];
  const statusOptions = ['available', 'employed', 'freelancing', 'looking'];
  const companySizeOptions = ['startup', 'small', 'medium', 'large'];

  const updateFilters = (updates: Partial<SearchFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: '',
      skills: [],
      industry: [],
      location: [],
      workStatus: [],
      availability: [],
      experience: [],
      companySize: []
    });
    setShowAdvancedFilters(false);
  };

  const hasActiveFilters = () => {
    return filters.query || 
           (filters.skills && filters.skills.length > 0) ||
           (filters.industry && filters.industry.length > 0) ||
           (filters.location && filters.location.length > 0) ||
           (filters.workStatus && filters.workStatus.length > 0) ||
           (filters.companySize && filters.companySize.length > 0);
  };

  const MultiSelectFilter: React.FC<{
    label: string;
    options: string[];
    selected: string[] | undefined;
    onChange: (values: string[]) => void;
  }> = ({ label, options, selected = [], onChange }) => (
    <div>
      <label className={`block text-sm font-medium text-gray-700 mb-3 ${language === 'ar' ? 'font-arabic' : ''}`}>
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => {
              const isSelected = selected.includes(option);
              if (isSelected) {
                onChange(selected.filter(item => item !== option));
              } else {
                onChange([...selected, option]);
              }
            }}
            className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 hover:shadow-sm ${
              selected.includes(option)
                ? 'bg-primary-100 border-primary-300 text-primary-700 shadow-sm'
                : 'bg-white border-gray-300 text-gray-700 hover:border-primary-300 hover:text-primary-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-white shadow-sm border border-gray-200 rounded-xl p-6 mb-8 animate-slide-up">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder={language === 'ar' ? 'ابحث في الأسماء، المهارات، الشركات، الخدمات...' : 'Search names, skills, companies, services...'}
          value={filters.query}
          onChange={(e) => updateFilters({ query: e.target.value })}
          className={`w-full pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 text-lg ${
            language === 'ar' ? 'font-arabic text-right' : ''
          }`}
        />
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Advanced Filters Toggle */}
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>{language === 'ar' ? 'فلاتر متقدمة' : 'Advanced Filters'}</span>
        </button>

        {/* Clear Filters */}
        {hasActiveFilters() && (
          <button
            onClick={clearFilters}
            className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200 ${
              language === 'ar' ? 'font-arabic' : ''
            }`}
          >
            <X className="w-4 h-4" />
            <span>{language === 'ar' ? 'مسح الفلاتر' : 'Clear Filters'}</span>
          </button>
        )}

        {/* Active Filter Count */}
        {hasActiveFilters() && (
          <div className={`px-3 py-2 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium ${
            language === 'ar' ? 'font-arabic' : ''
          }`}>
            {(() => {
              const count = (filters.skills?.length || 0) + 
                           (filters.industry?.length || 0) + 
                           (filters.location?.length || 0) + 
                           (filters.workStatus?.length || 0) + 
                           (filters.companySize?.length || 0) + 
                           (filters.query ? 1 : 0);
              return `${count} ${language === 'ar' ? 'فلتر نشط' : 'active filters'}`;
            })()}
          </div>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="border-t border-gray-200 pt-6 space-y-6 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Skills Filter */}
            <MultiSelectFilter
              label={language === 'ar' ? 'المهارات والتقنيات' : 'Skills & Technologies'}
              options={skillOptions}
              selected={filters.skills}
              onChange={(skills) => updateFilters({ skills })}
            />

            {/* Industry Filter */}
            {activeTab === 'company' && (
              <MultiSelectFilter
                label={language === 'ar' ? 'الصناعة' : 'Industry'}
                options={industryOptions}
                selected={filters.industry}
                onChange={(industry) => updateFilters({ industry })}
              />
            )}

            {/* Location Filter */}
            <MultiSelectFilter
              label={language === 'ar' ? 'الموقع في غزة' : 'Location in Gaza'}
              options={locationOptions}
              selected={filters.location}
              onChange={(location) => updateFilters({ location })}
            />

            {/* Work Status Filter */}
            {activeTab === 'professional' && (
              <MultiSelectFilter
                label={language === 'ar' ? 'حالة العمل' : 'Work Status'}
                options={statusOptions}
                selected={filters.workStatus}
                onChange={(workStatus) => updateFilters({ workStatus })}
              />
            )}

            {/* Company Size Filter */}
            {activeTab === 'company' && (
              <MultiSelectFilter
                label={language === 'ar' ? 'حجم الشركة' : 'Company Size'}
                options={companySizeOptions}
                selected={filters.companySize}
                onChange={(companySize) => updateFilters({ companySize })}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;
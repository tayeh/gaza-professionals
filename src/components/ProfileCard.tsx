import React from 'react';
import { MapPin, Mail, ExternalLink, Users, Building2, User, Calendar, Award } from 'lucide-react';
import { Profile, ProfessionalProfile, CompanyProfile } from '../types/profile';
import { useLanguageContext } from '../contexts/LanguageContext';

interface ProfileCardProps {
  profile: Profile;
  onClick: (slug: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onClick }) => {
  const { language } = useLanguageContext();

  const getDisplayName = () => {
    return language === 'ar' && profile.name_arabic ? profile.name_arabic : profile.name;
  };

  const getDisplayTitle = () => {
    if (profile.type === 'professional') {
      const prof = profile as ProfessionalProfile;
      return language === 'ar' && prof.title_arabic ? prof.title_arabic : prof.title;
    }
    return (profile as CompanyProfile).industry;
  };

  const getDisplayAbout = () => {
    return language === 'ar' && profile.about_arabic ? profile.about_arabic : profile.about;
  };

  const getAvailabilityColor = (availability?: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityLabel = (availability?: string) => {
    const labels = {
      available: { en: 'Available', ar: 'متاح' },
      busy: { en: 'Busy', ar: 'مشغول' },
      unavailable: { en: 'Unavailable', ar: 'غير متاح' }
    };
    return labels[availability as keyof typeof labels]?.[language] || '';
  };

  const getSizeLabel = (size: string) => {
    const labels = {
      startup: { en: 'Startup', ar: 'ناشئة' },
      small: { en: 'Small', ar: 'صغيرة' },
      medium: { en: 'Medium', ar: 'متوسطة' },
      large: { en: 'Large', ar: 'كبيرة' }
    };
    return labels[size as keyof typeof labels]?.[language] || size;
  };

  // Ensure services array exists
  const services = profile.services || [];
  const tags = profile.tags || [];

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group animate-scale-up cursor-pointer flex flex-col h-full"
      onClick={() => onClick(profile.slug)}
    >
      {/* Header */}
      <div className="p-6 pb-4 flex-shrink-0">
        <div className="flex items-start space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              {profile.type === 'professional' ? (
                <User className="w-8 h-8 text-white" />
              ) : (
                <Building2 className="w-8 h-8 text-white" />
              )}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className={`text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2 ${
              language === 'ar' ? 'font-cairo' : ''
            }`}>
              {getDisplayName()}
            </h3>
            <p className={`text-primary-600 font-medium line-clamp-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {getDisplayTitle()}
            </p>
            <div className="flex items-center space-x-2 rtl:space-x-reverse mt-1">
              <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className={`text-sm text-gray-600 line-clamp-1 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {profile.location}
              </span>
            </div>
          </div>

          {/* Status/Size Badge */}
          <div className="flex flex-col space-y-2 flex-shrink-0">
            {profile.type === 'professional' && (profile as ProfessionalProfile).availability && (
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getAvailabilityColor((profile as ProfessionalProfile).availability)}`}>
                {getAvailabilityLabel((profile as ProfessionalProfile).availability)}
              </span>
            )}
            {profile.type === 'company' && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {getSizeLabel((profile as CompanyProfile).company_size)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Services/Skills */}
      {services.length > 0 && (
        <div className="px-6 pb-4 flex-shrink-0">
          <h4 className={`text-sm font-medium text-gray-900 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {profile.type === 'professional' 
              ? (language === 'ar' ? 'الخدمات' : 'Services')
              : (language === 'ar' ? 'الخدمات' : 'Services')
            }
          </h4>
          <div className="flex flex-wrap gap-2">
            {services.slice(0, 3).map((service, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
              >
                {service}
              </span>
            ))}
            {services.length > 3 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-md">
                +{services.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="px-6 pb-4 flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 4 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-md">
                +{tags.length - 4} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* About */}
      <div className="px-6 pb-4 flex-grow">
        {profile.about && (
          <p className={`text-sm text-gray-600 line-clamp-3 ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
            {getDisplayAbout()}
          </p>
        )}
      </div>

      {/* Additional Info */}
      <div className="px-6 pb-4 flex items-center justify-between text-sm text-gray-600 flex-shrink-0">
        {profile.type === 'professional' && (profile as ProfessionalProfile).work_experience && (
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className={language === 'ar' ? 'font-cairo' : ''}>
              {(profile as ProfessionalProfile).work_experience?.length} {language === 'ar' ? 'وظائف' : 'positions'}
            </span>
          </div>
        )}
        
        {profile.type === 'company' && (profile as CompanyProfile).team && (
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span className={language === 'ar' ? 'font-cairo' : ''}>
              {(profile as CompanyProfile).team?.size} {language === 'ar' ? 'موظف' : 'employees'}
            </span>
          </div>
        )}

        {(profile.certifications || (profile as CompanyProfile).notable_projects) && (
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            <Award className="w-4 h-4 flex-shrink-0" />
            <span className={language === 'ar' ? 'font-cairo' : ''}>
              {profile.certifications?.length || (profile as CompanyProfile).notable_projects?.length || 0} {language === 'ar' ? 'إنجازات' : 'achievements'}
            </span>
          </div>
        )}
      </div>

      {/* Contact - Fixed at bottom */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex-shrink-0">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <a
            href={`mailto:${profile.contact.email}`}
            className="flex items-center justify-center w-8 h-8 bg-primary-100 hover:bg-primary-200 text-primary-600 rounded-lg transition-colors duration-200"
            title="Email"
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="w-4 h-4" />
          </a>
          
          {profile.contact.website && (
            <a
              href={profile.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-colors duration-200"
              title="Website"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <div className="flex-1" />
          
          <button 
            className={`px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 ${
              language === 'ar' ? 'font-cairo' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onClick(profile.slug);
            }}
          >
            {language === 'ar' ? 'عرض الملف' : 'View Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
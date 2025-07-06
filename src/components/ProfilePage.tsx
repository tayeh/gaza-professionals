import React, { useEffect } from 'react';
import { ArrowLeft, MapPin, Mail, ExternalLink, Github, Linkedin, Calendar, Award, Users, Building2, User, Globe, Briefcase, Share2 } from 'lucide-react';
import { Profile, ProfessionalProfile, CompanyProfile } from '../types/profile';
import { useLanguageContext } from '../contexts/LanguageContext';

interface ProfilePageProps {
  profile: Profile;
  onBack: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ profile, onBack }) => {
  const { language } = useLanguageContext();

  // Update meta tags for SEO and social sharing
  useEffect(() => {
    const displayName = language === 'ar' && profile.name_arabic ? profile.name_arabic : profile.name;
    const displayTitle = profile.type === 'professional' 
      ? (language === 'ar' && (profile as ProfessionalProfile).title_arabic 
          ? (profile as ProfessionalProfile).title_arabic 
          : (profile as ProfessionalProfile).title)
      : (profile as CompanyProfile).industry;
    
    const description = profile.about 
      ? profile.about.substring(0, 160) + '...'
      : `${displayName} - ${displayTitle} | Gaza Professionals Directory`;

    // Update page title
    document.title = `${displayName} - Gaza Professionals Directory`;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${property}"]` : `meta[name="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', property);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', `Gaza, professionals, ${profile.tags.join(', ')}, ${profile.services.join(', ')}`);

    // Open Graph meta tags
    updateMetaTag('og:title', `${displayName} - Gaza Professionals Directory`, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:url', window.location.href, true);
    updateMetaTag('og:type', 'profile', true);
    updateMetaTag('og:site_name', 'Gaza Professionals Directory', true);
    updateMetaTag('og:locale', language === 'ar' ? 'ar_PS' : 'en_US', true);

    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', `${displayName} - Gaza Professionals Directory`);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:site', '@GazaDirectory');

    // Generate dynamic OG image URL (you would implement this with a service like Vercel OG or similar)
    const ogImageUrl = `https://gaza.ps/api/og?name=${encodeURIComponent(displayName)}&title=${encodeURIComponent(displayTitle)}&type=${profile.type}`;
    updateMetaTag('og:image', ogImageUrl, true);
    updateMetaTag('twitter:image', ogImageUrl);

    // Cleanup function to reset meta tags when component unmounts
    return () => {
      document.title = 'Gaza Professionals Directory - Connecting Gaza\'s Talent';
      updateMetaTag('description', 'A comprehensive directory of Gaza professionals and companies connecting local talent with global opportunities.');
    };
  }, [profile, language]);

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
      available: { en: 'Available for Work', ar: 'متاح للعمل' },
      busy: { en: 'Currently Busy', ar: 'مشغول حالياً' },
      unavailable: { en: 'Not Available', ar: 'غير متاح' }
    };
    return labels[availability as keyof typeof labels]?.[language] || '';
  };

  const getSizeLabel = (size: string) => {
    const labels = {
      startup: { en: 'Startup (1-10 employees)', ar: 'ناشئة (1-10 موظفين)' },
      small: { en: 'Small Company (11-50 employees)', ar: 'شركة صغيرة (11-50 موظف)' },
      medium: { en: 'Medium Company (51-200 employees)', ar: 'شركة متوسطة (51-200 موظف)' },
      large: { en: 'Large Company (200+ employees)', ar: 'شركة كبيرة (200+ موظف)' }
    };
    return labels[size as keyof typeof labels]?.[language] || size;
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = `${getDisplayName()} - Gaza Professionals Directory`;
    const text = profile.about ? 
      `${getDisplayName()} - ${profile.about.substring(0, 100)}...` :
      `Check out ${getDisplayName()}'s profile on Gaza Professionals Directory`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (err) {
        console.log('Error sharing:', err);
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(language === 'ar' ? 'تم نسخ الرابط!' : 'Link copied to clipboard!');
    }).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert(language === 'ar' ? 'تم نسخ الرابط!' : 'Link copied to clipboard!');
    });
  };

  const ContactLink: React.FC<{ href: string; icon: React.ReactNode; label: string; onClick?: () => void }> = ({ href, icon, label, onClick }) => (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      onClick={onClick}
      className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
    >
      <div className="flex items-center justify-center w-10 h-10 bg-primary-100 text-primary-600 rounded-lg">
        {icon}
      </div>
      <span className={`font-medium text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>{label}</span>
    </a>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className={`flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-primary-600 transition-colors duration-200 ${
                language === 'ar' ? 'font-cairo' : ''
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{language === 'ar' ? 'العودة إلى الدليل' : 'Back to Directory'}</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className={`flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 ${
                language === 'ar' ? 'font-cairo' : ''
              }`}
            >
              <Share2 className="w-4 h-4" />
              <span>{language === 'ar' ? 'مشاركة' : 'Share'}</span>
            </button>
          </div>

          <div className="flex items-start space-x-6 rtl:space-x-reverse">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                {profile.type === 'professional' ? (
                  <User className="w-12 h-12 text-white" />
                ) : (
                  <Building2 className="w-12 h-12 text-white" />
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className={`text-3xl font-bold text-gray-900 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {getDisplayName()}
              </h1>
              <p className={`text-xl text-primary-600 font-medium mb-3 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {getDisplayTitle()}
              </p>
              <div className="flex items-center space-x-4 rtl:space-x-reverse text-gray-600">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <MapPin className="w-5 h-5" />
                  <span className={language === 'ar' ? 'font-cairo' : ''}>{profile.location}</span>
                </div>
                {profile.type === 'professional' && (profile as ProfessionalProfile).availability && (
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor((profile as ProfessionalProfile).availability)}`}>
                    {getAvailabilityLabel((profile as ProfessionalProfile).availability)}
                  </span>
                )}
                {profile.type === 'company' && (
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {getSizeLabel((profile as CompanyProfile).company_size)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            {profile.about && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className={`text-xl font-semibold text-gray-900 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? 'نبذة عني' : 'About'}
                </h2>
                <p className={`text-gray-700 leading-relaxed whitespace-pre-line ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                  {getDisplayAbout()}
                </p>
              </div>
            )}

            {/* Services */}
            {profile.services && profile.services.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className={`text-xl font-semibold text-gray-900 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? 'الخدمات' : 'Services'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse p-3 bg-gray-50 rounded-lg">
                      <Briefcase className="w-5 h-5 text-primary-600" />
                      <span className={`text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical Skills */}
            {((profile.type === 'professional' && (profile as ProfessionalProfile).technical_skills) ||
              (profile.type === 'company' && (profile as CompanyProfile).technical_expertise)) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className={`text-xl font-semibold text-gray-900 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {profile.type === 'professional' 
                    ? (language === 'ar' ? 'المهارات التقنية' : 'Technical Skills')
                    : (language === 'ar' ? 'الخبرات التقنية' : 'Technical Expertise')
                  }
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(profile.type === 'professional' 
                    ? (profile as ProfessionalProfile).technical_skills 
                    : (profile as CompanyProfile).technical_expertise
                  )?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-primary-100 text-primary-700 rounded-lg font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Work Experience */}
            {profile.type === 'professional' && (profile as ProfessionalProfile).work_experience && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className={`text-xl font-semibold text-gray-900 mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? 'الخبرة المهنية' : 'Work Experience'}
                </h2>
                <div className="space-y-6">
                  {(profile as ProfessionalProfile).work_experience?.map((exp, index) => (
                    <div key={index} className="border-l-4 border-primary-200 pl-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-lg font-semibold text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {exp.role}
                        </h3>
                        <span className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {exp.period}
                        </span>
                      </div>
                      <p className={`text-primary-600 font-medium mb-3 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {exp.company}
                      </p>
                      <p className={`text-gray-700 leading-relaxed whitespace-pre-line ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notable Projects */}
            {((profile.type === 'professional' && (profile as ProfessionalProfile).projects) ||
              (profile.type === 'company' && (profile as CompanyProfile).notable_projects)) && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className={`text-xl font-semibold text-gray-900 mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {profile.type === 'professional' 
                    ? (language === 'ar' ? 'المشاريع' : 'Projects')
                    : (language === 'ar' ? 'المشاريع المميزة' : 'Notable Projects')
                  }
                </h2>
                <div className="space-y-6">
                  {(profile.type === 'professional' 
                    ? (profile as ProfessionalProfile).projects 
                    : (profile as CompanyProfile).notable_projects
                  )?.map((project, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className={`text-lg font-semibold text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {project.name}
                        </h3>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 rtl:space-x-reverse text-primary-600 hover:text-primary-700"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span className="text-sm">{language === 'ar' ? 'رابط' : 'Link'}</span>
                          </a>
                        )}
                      </div>
                      <p className={`text-gray-700 leading-relaxed whitespace-pre-line ${language === 'ar' ? 'font-cairo text-right' : ''}`}>
                        {project.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {profile.certifications && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className={`text-xl font-semibold text-gray-900 mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? 'الشهادات' : 'Certifications'}
                </h2>
                <div className="space-y-4">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start space-x-4 rtl:space-x-reverse p-4 bg-gray-50 rounded-lg">
                      <Award className="w-6 h-6 text-accent-600 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className={`font-semibold text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {cert.name}
                        </h3>
                        <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                          {cert.issuer} • {cert.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Info for Companies */}
            {profile.type === 'company' && (profile as CompanyProfile).team && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className={`text-xl font-semibold text-gray-900 mb-6 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? 'الفريق' : 'Team'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
                      <Users className="w-6 h-6 text-primary-600" />
                      <span className={`text-lg font-semibold text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>
                        {(profile as CompanyProfile).team?.size} {language === 'ar' ? 'موظف' : 'Employees'}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className={`font-semibold text-gray-900 mb-3 ${language === 'ar' ? 'font-cairo' : ''}`}>
                      {language === 'ar' ? 'الأدوار' : 'Roles'}
                    </h3>
                    <div className="space-y-2">
                      {(profile as CompanyProfile).team?.roles.map((role, index) => (
                        <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                          <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                          <span className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'ar' ? 'معلومات التواصل' : 'Contact Information'}
              </h2>
              <div className="space-y-3">
                <ContactLink
                  href={`mailto:${profile.contact.email}`}
                  icon={<Mail className="w-5 h-5" />}
                  label={language === 'ar' ? 'إرسال بريد إلكتروني' : 'Send Email'}
                />
                
                {profile.contact.website && (
                  <ContactLink
                    href={profile.contact.website}
                    icon={<Globe className="w-5 h-5" />}
                    label={language === 'ar' ? 'زيارة الموقع' : 'Visit Website'}
                  />
                )}
                
                {profile.contact.linkedin && (
                  <ContactLink
                    href={profile.contact.linkedin}
                    icon={<Linkedin className="w-5 h-5" />}
                    label={language === 'ar' ? 'LinkedIn' : 'LinkedIn'}
                  />
                )}
                
                {profile.contact.github && (
                  <ContactLink
                    href={profile.contact.github}
                    icon={<Github className="w-5 h-5" />}
                    label={language === 'ar' ? 'GitHub' : 'GitHub'}
                  />
                )}
              </div>
            </div>

            {/* Tags */}
            {profile.tags && profile.tags.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? 'العلامات' : 'Tags'}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary-100 text-secondary-700 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            {profile.type === 'company' && (profile as CompanyProfile).founded && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? 'معلومات إضافية' : 'Additional Info'}
                </h2>
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className={`text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'ar' ? 'تأسست في' : 'Founded in'} {(profile as CompanyProfile).founded}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
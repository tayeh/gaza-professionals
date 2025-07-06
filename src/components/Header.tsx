import React, { useState } from 'react';
import { Users, Building2, Menu, X, Globe, Github, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguageContext } from '../contexts/LanguageContext';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguageContext();
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { id: 'all', icon: Users, label: { en: 'All Profiles', ar: 'جميع الملفات' } },
    { id: 'professional', icon: User, label: { en: 'Professionals', ar: 'المهنيون' } },
    { id: 'company', icon: Building2, label: { en: 'Companies', ar: 'الشركات' } },
  ];

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleNavClick = (tab: string) => {
    if (tab === 'contribute') {
      navigate('/contribute');
    } else {
      navigate('/');
      setActiveTab(tab);
    }
    setIsMenuOpen(false);
  };

  const handleContributeClick = () => {
    navigate('/contribute');
    setIsMenuOpen(false);
  };

  // Determine if we're on a profile page
  const isProfilePage = location.pathname !== '/' && location.pathname !== '/contribute';

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'ar' ? 'دليل غزة المهني' : 'Gaza Directory'}
              </h1>
              <p className={`text-sm text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'ar' ? 'ربط المواهب المحلية بالفرص العالمية' : 'Connecting Local Talent'}
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Only show on directory pages */}
          {!isProfilePage && (
            <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-primary-100 text-primary-700 shadow-sm'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    } ${language === 'ar' ? 'font-cairo' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label[language]}</span>
                  </button>
                );
              })}
            </nav>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 rtl:space-x-reverse px-3 py-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
              title={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language === 'ar' ? 'EN' : 'العربية'}</span>
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/tayeh/gaza-professionals"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              <Github className="w-4 h-4" />
              <span className={`text-sm font-medium ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'ar' ? 'المساهمة' : 'Contribute'}
              </span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-primary-600 hover:bg-gray-50"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && !isProfilePage && (
          <div className="md:hidden border-t border-gray-200 py-4 animate-slide-up">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                    } ${language === 'ar' ? 'font-cairo' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label[language]}</span>
                  </button>
                );
              })}
              <button
                onClick={handleContributeClick}
                className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-3 py-3 rounded-lg transition-all duration-200 text-gray-600 hover:text-primary-600 hover:bg-gray-50 ${
                  language === 'ar' ? 'font-cairo' : ''
                }`}
              >
                <Github className="w-5 h-5" />
                <span>{language === 'ar' ? 'كيفية المساهمة' : 'How to Contribute'}</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
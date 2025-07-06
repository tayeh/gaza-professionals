import React, { useState, useMemo, useEffect } from 'react';
import { Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguageContext } from './contexts/LanguageContext';
import Header from './components/Header';
import SearchAndFilter from './components/SearchAndFilter';
import ProfileCard from './components/ProfileCard';
import ProfilePage from './components/ProfilePage';
import ContributionGuide from './components/ContributionGuide';
import { loadProfiles, loadProfile } from './utils/profileLoader';
import { Profile } from './types/profile';
import { SearchFilters } from './types';

function App() {
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<DirectoryPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/:slug" element={<ProfilePageRoute />} />
      </Routes>
    </LanguageProvider>
  );
}

// Profile page route component
function ProfilePageRoute() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      if (!slug) {
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const profileData = await loadProfile(slug);
        
        if (profileData) {
          setProfile(profileData);
          // Update page title and meta description
          document.title = `${profileData.name} - Gaza Professionals Directory`;
          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', 
              profileData.about ? 
                `${profileData.name} - ${profileData.about.substring(0, 150)}...` :
                `${profileData.name} - Gaza professional profile`
            );
          }
        } else {
          setError('Profile not found');
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, [slug, navigate]);

  const handleBack = () => {
    navigate('/');
  };

  if (loading) {
    return <ProfileLoadingPage onBack={handleBack} />;
  }

  if (error || !profile) {
    return <ProfileNotFoundPage onBack={handleBack} error={error} />;
  }

  return <ProfilePage profile={profile} onBack={handleBack} />;
}

// Contribute page component
function ContributePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'How to Contribute - Gaza Professionals Directory';
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab="contribute" 
        setActiveTab={(tab) => {
          if (tab === 'contribute') {
            navigate('/contribute');
          } else {
            navigate('/');
          }
        }} 
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ContributionGuide />
      </main>
    </div>
  );
}

// Main directory page component
function DirectoryPage() {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    skills: [],
    industry: [],
    location: [],
    workStatus: [],
    availability: [],
    experience: [],
    companySize: []
  });
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    document.title = 'Gaza Professionals Directory - Connecting Gaza\'s Talent';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'A comprehensive directory of Gaza professionals and companies connecting local talent with global opportunities.'
      );
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const loadedProfiles = await loadProfiles();
        setProfiles(loadedProfiles);
        
        if (loadedProfiles.length === 0) {
          setError('No profiles found. Make sure YAML files exist in the profiles directory.');
        }
      } catch (err) {
        console.error('Error loading profiles:', err);
        setError('Failed to load profiles. Please check the console for details.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredAndSortedData = useMemo(() => {
    let filtered = profiles;

    // Filter by type
    if (activeTab !== 'all') {
      filtered = filtered.filter(profile => profile.type === activeTab);
    }

    // Apply search filters
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter(profile => {
        const searchableText = [
          profile.name,
          profile.name_arabic,
          profile.type === 'professional' ? profile.title : profile.industry,
          profile.about,
          profile.about_arabic,
          ...(profile.services || []),
          ...(profile.tags || [])
        ].join(' ').toLowerCase();
        
        return searchableText.includes(query);
      });
    }

    // Apply other filters
    if (filters.location && filters.location.length > 0) {
      filtered = filtered.filter(profile => 
        filters.location!.some(loc => profile.location.includes(loc))
      );
    }

    if (filters.skills && filters.skills.length > 0) {
      filtered = filtered.filter(profile => 
        filters.skills!.some(skill => 
          (profile.tags || []).some(tag => tag.toLowerCase().includes(skill.toLowerCase())) ||
          (profile.services || []).some(service => service.toLowerCase().includes(skill.toLowerCase()))
        )
      );
    }

    // Sort
    if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [profiles, activeTab, filters, sortBy]);

  const handleProfileClick = (slug: string) => {
    navigate(`/${slug}`);
  };

  const handleTabChange = (tab: string) => {
    if (tab === 'contribute') {
      navigate('/contribute');
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <MainContent 
      activeTab={activeTab}
      setActiveTab={handleTabChange}
      profiles={profiles}
      filteredAndSortedData={filteredAndSortedData}
      filters={filters}
      setFilters={setFilters}
      sortBy={sortBy}
      setSortBy={setSortBy}
      handleProfileClick={handleProfileClick}
      loading={loading}
      error={error}
    />
  );
}

// Loading page for profiles
function ProfileLoadingPage({ onBack }: { onBack: () => void }) {
  const { language } = useLanguageContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="" setActiveTab={() => {}} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className={`flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-primary-600 transition-colors duration-200 mb-6 ${
            language === 'ar' ? 'font-cairo' : ''
          }`}
        >
          <span>←</span>
          <span>{language === 'ar' ? 'العودة إلى الدليل' : 'Back to Directory'}</span>
        </button>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 bg-primary-300 rounded-full"></div>
          </div>
          <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {language === 'ar' ? 'جاري تحميل الملف الشخصي...' : 'Loading profile...'}
          </h3>
          <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {language === 'ar' ? 'يرجى الانتظار بينما نحمل الملف الشخصي.' : 'Please wait while we load the profile.'}
          </p>
        </div>
      </main>
    </div>
  );
}

// Not found page for profiles
function ProfileNotFoundPage({ onBack, error }: { onBack: () => void; error?: string | null }) {
  const { language } = useLanguageContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="" setActiveTab={() => {}} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={onBack}
          className={`flex items-center space-x-2 rtl:space-x-reverse text-gray-600 hover:text-primary-600 transition-colors duration-200 mb-6 ${
            language === 'ar' ? 'font-cairo' : ''
          }`}
        >
          <span>←</span>
          <span>{language === 'ar' ? 'العودة إلى الدليل' : 'Back to Directory'}</span>
        </button>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {language === 'ar' ? 'الملف الشخصي غير موجود' : 'Profile Not Found'}
          </h3>
          <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {error || (language === 'ar' 
              ? 'عذراً، لم نتمكن من العثور على الملف الشخصي المطلوب.'
              : 'Sorry, we couldn\'t find the profile you\'re looking for.'
            )}
          </p>
          <button
            onClick={onBack}
            className={`px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 ${
              language === 'ar' ? 'font-cairo' : ''
            }`}
          >
            {language === 'ar' ? 'العودة إلى الدليل' : 'Back to Directory'}
          </button>
        </div>
      </main>
    </div>
  );
}

// Separate component to use the language context
function MainContent({ 
  activeTab, 
  setActiveTab, 
  profiles, 
  filteredAndSortedData, 
  filters, 
  setFilters, 
  sortBy, 
  setSortBy, 
  handleProfileClick,
  loading,
  error
}: any) {
  const { language } = useLanguageContext();

  const getTabTitle = (tab: string) => {
    const titles = {
      all: { en: 'All Profiles', ar: 'جميع الملفات' },
      professional: { en: 'Professionals', ar: 'المهنيون' },
      company: { en: 'Companies', ar: 'الشركات' },
      contribute: { en: 'How to Contribute', ar: 'كيفية المساهمة' }
    };
    return titles[tab as keyof typeof titles] || titles.all;
  };

  const getSortOptions = () => [
    { value: '', label: { en: 'Default', ar: 'افتراضي' } },
    { value: 'name', label: { en: 'Name', ar: 'الاسم' } }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="w-8 h-8 bg-primary-300 rounded-full"></div>
            </div>
            <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' ? 'جاري تحميل الملفات...' : 'Loading profiles...'}
            </h3>
            <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' ? 'يرجى الانتظار بينما نحمل ملفات المهنيين والشركات.' : 'Please wait while we load the professional and company profiles.'}
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' ? 'خطأ في تحميل الملفات' : 'Error Loading Profiles'}
            </h3>
            <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className={`px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}
            >
              {language === 'ar' ? 'إعادة المحاولة' : 'Try Again'}
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {language === 'ar' ? 'دليل المهنيين في غزة' : 'Gaza Professionals Directory'}
          </h1>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto mb-8 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {language === 'ar' 
              ? 'ربط المواهب والمهنيين والشركات المبدعة في غزة بالفرص العالمية'
              : 'Connecting Gaza\'s talented professionals and innovative companies with global opportunities'
            }
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span className={`flex items-center space-x-1 rtl:space-x-reverse ${language === 'ar' ? 'font-cairo' : ''}`}>
              <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
              <span>
                {profiles.filter(p => p.type === 'professional').length} {language === 'ar' ? 'مهنيين' : 'Professionals'}
              </span>
            </span>
            <span className={`flex items-center space-x-1 rtl:space-x-reverse ${language === 'ar' ? 'font-cairo' : ''}`}>
              <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
              <span>
                {profiles.filter(p => p.type === 'company').length} {language === 'ar' ? 'شركات' : 'Companies'}
              </span>
            </span>
            <span className={`flex items-center space-x-1 rtl:space-x-reverse ${language === 'ar' ? 'font-cairo' : ''}`}>
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span>
                {profiles.length} {language === 'ar' ? 'إجمالي الملفات' : 'Total Profiles'}
              </span>
            </span>
          </div>
        </div>

        <SearchAndFilter 
          filters={filters} 
          onFiltersChange={setFilters} 
          activeTab={activeTab}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold text-gray-900 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {getTabTitle(activeTab)[language]}
            </h2>
            <p className={`text-gray-600 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' 
                ? `تم العثور على ${filteredAndSortedData.length} نتيجة`
                : `${filteredAndSortedData.length} results found`
              }
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <label className={`text-sm font-medium text-gray-700 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' ? 'ترتيب حسب:' : 'Sort by:'}
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${language === 'ar' ? 'font-cairo' : ''}`}
            >
              {getSortOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label[language]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {filteredAndSortedData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedData.map((profile) => (
              <ProfileCard 
                key={profile.slug} 
                profile={profile} 
                onClick={handleProfileClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-gray-400">🔍</span>
            </div>
            <h3 className={`text-xl font-semibold text-gray-900 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
            </h3>
            <p className={`text-gray-600 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' 
                ? 'حاول تعديل معايير البحث أو الفلاتر للعثور على ما تبحث عنه.'
                : 'Try adjusting your search criteria or filters to find what you\'re looking for.'
              }
            </p>
            <button
              onClick={() => setFilters({
                query: '',
                skills: [],
                industry: [],
                location: [],
                workStatus: [],
                availability: [],
                experience: [],
                companySize: []
              })}
              className={`px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}
            >
              {language === 'ar' ? 'مسح جميع الفلاتر' : 'Clear all filters'}
            </button>
          </div>
        )}

        {/* Contribution CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-8 text-center text-white">
          <h3 className={`text-2xl font-bold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
            {language === 'ar' ? 'انضم إلى مجتمعنا' : 'Join Our Community'}
          </h3>
          <p className={`text-primary-100 mb-6 max-w-2xl mx-auto ${language === 'ar' ? 'font-cairo' : ''}`}>
            {language === 'ar' 
              ? 'هل أنت مهني أو شركة من غزة؟ أضف ملفك الشخصي إلى دليلنا وتواصل مع الفرص في جميع أنحاء العالم.'
              : 'Are you a Gaza professional or company? Add your profile to our directory and connect with opportunities worldwide.'
            }
          </p>
          <button
            onClick={() => setActiveTab('contribute')}
            className={`px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}
          >
            {language === 'ar' ? 'تعلم كيفية المساهمة' : 'Learn How to Contribute'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'ar' ? 'دليل المهنيين في غزة' : 'Gaza Professionals Directory'}
              </h4>
              <p className={`text-gray-400 mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'ar' 
                  ? 'ربط مواهب غزة بالفرص العالمية من خلال دليل مجتمعي مفتوح المصدر.'
                  : 'Connecting Gaza\'s talent with global opportunities through an open-source community directory.'
                }
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <a href="https://github.com/tayeh/gaza-professionals" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                  GitHub
                </a>
                <a href="https://www.facebook.com/groups/gazatechcommunity" target="_blank" rel="noopener noreferrer" className={`text-gray-400 hover:text-white transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}>
                  {language === 'ar' ? 'مجتمع فيسبوك' : 'Facebook Community'}
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  LinkedIn
                </a>
              </div>
            </div>
            
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => setActiveTab('all')} className={`hover:text-white transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'ar' ? 'جميع الملفات' : 'All Profiles'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('professional')} className={`hover:text-white transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'ar' ? 'المهنيون' : 'Professionals'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('company')} className={`hover:text-white transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'ar' ? 'الشركات' : 'Companies'}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('contribute')} className={`hover:text-white transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'ar' ? 'المساهمة' : 'Contribute'}
                  </button>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className={`text-lg font-semibold mb-4 ${language === 'ar' ? 'font-cairo' : ''}`}>
                {language === 'ar' ? 'المجتمع' : 'Community'}
              </h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="https://www.facebook.com/groups/gazatechcommunity" target="_blank" rel="noopener noreferrer" className={`hover:text-white transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'ar' ? 'مجتمع غزة التقني' : 'Gaza Tech Community'}
                  </a>
                </li>
                <li>
                  <a href="https://github.com/tayeh/gaza-professionals" target="_blank" rel="noopener noreferrer" className={`hover:text-white transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'ar' ? 'إرشادات المجتمع' : 'Community Guidelines'}
                  </a>
                </li>
                <li>
                  <a href="https://github.com/tayeh/gaza-professionals/issues" target="_blank" rel="noopener noreferrer" className={`hover:text-white transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'ar' ? 'الإبلاغ عن مشكلة' : 'Report an Issue'}
                  </a>
                </li>
                <li>
                  <a href="mailto:info@gaza.ps" className={`hover:text-white transition-colors duration-200 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p className={language === 'ar' ? 'font-cairo' : ''}>
              {language === 'ar' 
                ? '© 2025 دليل المهنيين في غزة. مشروع مفتوح المصدر لمجتمع غزة.'
                : '© 2025 Gaza Professionals Directory. Open source project for the Gaza community.'
              }
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
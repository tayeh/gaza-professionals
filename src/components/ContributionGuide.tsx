import React from 'react';
import { GitFork, FileText, Send, CheckCircle, AlertCircle, Users } from 'lucide-react';
import { useLanguageContext } from '../contexts/LanguageContext';

const ContributionGuide: React.FC = () => {
  const { language } = useLanguageContext();

  const steps = [
    {
      icon: GitFork,
      title: { en: 'Fork the Repository', ar: 'استنساخ المستودع' },
      description: { 
        en: 'Fork our GitHub repository to your account to start contributing.',
        ar: 'استنسخ مستودع GitHub إلى حسابك لبدء المساهمة.'
      }
    },
    {
      icon: FileText,
      title: { en: 'Create Your Profile', ar: 'أنشئ ملفك الشخصي' },
      description: { 
        en: 'Create a new .yml file in the profiles directory following our template.',
        ar: 'أنشئ ملف .yml جديد في مجلد الملفات الشخصية باتباع القالب الخاص بنا.'
      }
    },
    {
      icon: Send,
      title: { en: 'Submit Pull Request', ar: 'أرسل طلب السحب' },
      description: { 
        en: 'Submit a pull request with your information and verification documents.',
        ar: 'أرسل طلب سحب مع معلوماتك ووثائق التحقق.'
      }
    },
    {
      icon: CheckCircle,
      title: { en: 'Review & Approval', ar: 'المراجعة والموافقة' },
      description: { 
        en: 'Our team will review your submission and provide feedback if needed.',
        ar: 'سيراجع فريقنا مساهمتك ويقدم التغذية الراجعة إذا لزم الأمر.'
      }
    }
  ];

  const requirements = [
    { 
      text: { en: 'Must be Gaza resident or operate in Gaza', ar: 'يجب أن تكون مقيماً في غزة أو تعمل في غزة' },
      type: 'required'
    },
    { 
      text: { en: 'Provide accurate and current information', ar: 'تقديم معلومات دقيقة وحديثة' },
      type: 'required'
    },
    { 
      text: { en: 'Include proof of residency/operation', ar: 'تضمين إثبات الإقامة/العمل' },
      type: 'required'
    },
    { 
      text: { en: 'Follow professional formatting guidelines', ar: 'اتباع إرشادات التنسيق المهني' },
      type: 'recommended'
    },
    { 
      text: { en: 'Update information regularly via new PRs', ar: 'تحديث المعلومات بانتظام عبر طلبات سحب جديدة' },
      type: 'recommended'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 animate-fade-in">
      <div className="text-center mb-8">
        <Users className="w-12 h-12 text-primary-600 mx-auto mb-4" />
        <h2 className={`text-3xl font-bold text-gray-900 mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'كيفية المساهمة' : 'How to Contribute'}
        </h2>
        <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' 
            ? 'انضم إلى دليل المهنيين في غزة وساعد في ربط المواهب المحلية بالفرص العالمية'
            : 'Join the Gaza Professionals Directory and help connect local talent with global opportunities'
          }
        </p>
      </div>

      {/* Steps */}
      <div className="mb-12">
        <h3 className={`text-xl font-semibold text-gray-900 mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'خطوات المساهمة' : 'Contribution Steps'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                <h4 className={`font-semibold text-gray-900 mb-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {step.title[language]}
                </h4>
                <p className={`text-sm text-gray-600 ${language === 'ar' ? 'font-arabic' : ''}`}>
                  {step.description[language]}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Requirements */}
      <div className="mb-8">
        <h3 className={`text-xl font-semibold text-gray-900 mb-6 ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'المتطلبات والإرشادات' : 'Requirements & Guidelines'}
        </h3>
        <div className="space-y-3">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-start space-x-3 rtl:space-x-reverse">
              {req.type === 'required' ? (
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              ) : (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              )}
              <span className={`text-gray-700 ${language === 'ar' ? 'font-arabic' : ''}`}>
                {req.text[language]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Templates */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className={`text-lg font-semibold text-gray-900 mb-4 ${language === 'ar' ? 'font-arabic' : ''}`}>
          {language === 'ar' ? 'قوالب الملفات' : 'File Templates'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://github.com/tayeh/gaza-professionals/blob/main/templates/profile-template.yml"
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors duration-200 ${
              language === 'ar' ? 'font-arabic' : ''
            }`}
          >
            <FileText className="w-6 h-6 text-primary-600 mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">
              {language === 'ar' ? 'قالب المهني' : 'Professional Template'}
            </h4>
            <p className="text-sm text-gray-600">
              {language === 'ar' ? 'للأفراد المهنيين' : 'For individual professionals'}
            </p>
          </a>
          
          <a
            href="https://github.com/tayeh/gaza-professionals/blob/main/templates/profile-template.yml"
            target="_blank"
            rel="noopener noreferrer"
            className={`block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors duration-200 ${
              language === 'ar' ? 'font-arabic' : ''
            }`}
          >
            <FileText className="w-6 h-6 text-primary-600 mb-2" />
            <h4 className="font-medium text-gray-900 mb-1">
              {language === 'ar' ? 'قالب الشركة' : 'Company Template'}
            </h4>
            <p className="text-sm text-gray-600">
              {language === 'ar' ? 'للشركات والمؤسسات' : 'For companies and organizations'}
            </p>
          </a>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-8">
        <a
          href="https://github.com/tayeh/gaza-professionals"
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center space-x-2 rtl:space-x-reverse px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200 ${
            language === 'ar' ? 'font-arabic' : ''
          }`}
        >
          <GitFork className="w-5 h-5" />
          <span>{language === 'ar' ? 'ابدأ المساهمة الآن' : 'Start Contributing Now'}</span>
        </a>
      </div>
    </div>
  );
};

export default ContributionGuide;
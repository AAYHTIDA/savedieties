import { useLanguage } from '@/contexts/LanguageContext';
import { en } from '@/locales/en';
import { ml } from '@/locales/ml';

type TranslationKey = string;

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const translations = {
    en,
    ml
  };
  
  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
  
  return { t, language };
};

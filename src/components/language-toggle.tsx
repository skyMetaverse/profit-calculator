'use client';

import { Language } from '@/lib/i18n';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
    language: Language;
    onChange: (lang: Language) => void;
}

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
    return (
        <button
            onClick={() => onChange(language === 'en' ? 'zh' : 'en')}
            className="fixed top-4 left-4 p-2 rounded-lg bg-[--card-background] hover:bg-opacity-80 transition-colors"
            title={language === 'en' ? '切换到中文' : 'Switch to English'}
        >
            <Globe className="w-5 h-5" />
            <span className="sr-only">{language === 'en' ? '切换到中文' : 'Switch to English'}</span>
        </button>
    );
} 
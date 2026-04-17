import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type FontSize = 'small' | 'medium' | 'large' | 'xlarge';
export type FontFamily = 'serif' | 'sans' | 'mono';
export type LineHeight = 'compact' | 'normal' | 'relaxed';

interface ReaderSettings {
    fontSize: FontSize;
    fontFamily: FontFamily;
    lineHeight: LineHeight;
}

interface ReaderContextType {
    settings: ReaderSettings;
    setFontSize: (size: FontSize) => void;
    setFontFamily: (family: FontFamily) => void;
    setLineHeight: (height: LineHeight) => void;
}

const defaultSettings: ReaderSettings = {
    fontSize: 'medium',
    fontFamily: 'sans',
    lineHeight: 'normal',
};

const ReaderContext = createContext<ReaderContextType | undefined>(undefined);

const fontSizeMap: Record<FontSize, string> = {
    small: '0.95rem',
    medium: '1.1rem',
    large: '1.25rem',
    xlarge: '1.5rem',
};

const fontFamilyMap: Record<FontFamily, string> = {
    serif: 'Merriweather, serif',
    sans: 'Inter, system-ui, sans-serif',
    mono: 'JetBrains Mono, monospace',
};

const lineHeightMap: Record<LineHeight, string> = {
    compact: '1.4',
    normal: '1.75',
    relaxed: '2',
};

const applySettings = (settings: ReaderSettings) => {
    const root = document.documentElement;
    root.style.setProperty('--reader-font-size', fontSizeMap[settings.fontSize]);
    root.style.setProperty('--reader-font-family', fontFamilyMap[settings.fontFamily]);
    root.style.setProperty('--reader-line-height', lineHeightMap[settings.lineHeight]);
};

export const ReaderProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<ReaderSettings>(() => {
        if (typeof window === 'undefined') return defaultSettings;
        const saved = localStorage.getItem('readerSettings');
        if (saved) {
            return { ...defaultSettings, ...JSON.parse(saved) };
        }
        return defaultSettings;
    });

    useEffect(() => {
        localStorage.setItem('readerSettings', JSON.stringify(settings));
        applySettings(settings);
    }, [settings]);

    useEffect(() => {
        applySettings(settings);
    }, []);

    const setFontSize = (fontSize: FontSize) => setSettings(s => ({ ...s, fontSize }));
    const setFontFamily = (fontFamily: FontFamily) => setSettings(s => ({ ...s, fontFamily }));
    const setLineHeight = (lineHeight: LineHeight) => setSettings(s => ({ ...s, lineHeight }));

    return (
        <ReaderContext.Provider value={{ settings, setFontSize, setFontFamily, setLineHeight }}>
            {children}
        </ReaderContext.Provider>
    );
};

export const useReader = () => {
    const context = useContext(ReaderContext);
    if (!context) throw new Error('useReader must be used within a ReaderProvider');
    return context;
};

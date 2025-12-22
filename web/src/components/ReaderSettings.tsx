import { Settings2, Type, AlignJustify } from 'lucide-react';
import { Button } from './ui/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from './ui/popover';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./ui/tooltip";
import { useReader, FontSize, FontFamily, LineHeight } from '@/context/ReaderContext';
import { cn } from '@/lib/utils';

const fontSizes: { value: FontSize; label: string }[] = [
    { value: 'small', label: 'S' },
    { value: 'medium', label: 'M' },
    { value: 'large', label: 'L' },
    { value: 'xlarge', label: 'XL' },
];

const fontFamilies: { value: FontFamily; label: string; style: string }[] = [
    { value: 'serif', label: 'Serif', style: 'font-serif' },
    { value: 'sans', label: 'Sans', style: 'font-sans' },
    { value: 'mono', label: 'Mono', style: 'font-mono' },
];

const lineHeights: { value: LineHeight; label: string }[] = [
    { value: 'compact', label: 'Compact' },
    { value: 'normal', label: 'Normal' },
    { value: 'relaxed', label: 'Relaxed' },
];

export const ReaderSettings = () => {
    const { settings, setFontSize, setFontFamily, setLineHeight } = useReader();

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <span>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
                                aria-label="Reader settings"
                            >
                                <Settings2 className="h-4 w-4" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-72 p-4" align="start">
                            <div className="space-y-4">
                                <h4 className="font-medium text-sm text-muted-foreground">Reading Settings</h4>

                                {/* Font Size */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Type className="h-4 w-4" />
                                        <span>Font Size</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {fontSizes.map((size) => (
                                            <Button
                                                key={size.value}
                                                variant={settings.fontSize === size.value ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setFontSize(size.value)}
                                                className="flex-1"
                                            >
                                                {size.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Font Family */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Type className="h-4 w-4" />
                                        <span>Font</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {fontFamilies.map((font) => (
                                            <Button
                                                key={font.value}
                                                variant={settings.fontFamily === font.value ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setFontFamily(font.value)}
                                                className={cn("flex-1", font.style)}
                                            >
                                                {font.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Line Height */}
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <AlignJustify className="h-4 w-4" />
                                        <span>Line Spacing</span>
                                    </div>
                                    <div className="flex gap-1">
                                        {lineHeights.map((height) => (
                                            <Button
                                                key={height.value}
                                                variant={settings.lineHeight === height.value ? 'default' : 'outline'}
                                                size="sm"
                                                onClick={() => setLineHeight(height.value)}
                                                className="flex-1 text-xs"
                                            >
                                                {height.label}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </span>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="center">
                <p>Reader Settings</p>
            </TooltipContent>
        </Tooltip>
    );
};

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./ui/tooltip";

export const ScrollToTop = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        // Show scroll to top button when user scrolls down
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 400);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!showScrollTop) return null;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    onClick={scrollToTop}
                    size="icon"
                    className="fixed bottom-8 right-8 rounded-full shadow-elegant z-50 animate-in fade-in zoom-in duration-300"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="h-4 w-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
                <p>Scroll to top</p>
            </TooltipContent>
        </Tooltip>
    );
};

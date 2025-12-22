import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ThemeToggle } from "./ThemeToggle";
import { ReaderSettings } from "./ReaderSettings";
import { GithubEditButton } from "./GithubEditButton";
import { SidebarCloseButton } from "./SidebarCloseButton";
import { cn } from "@/lib/utils";

interface Chapter {
  id: string;
  title: string;
  level: number;
}

interface BookSidebarProps {
  chapters: Chapter[];
}

export const BookSidebar = ({ chapters }: BookSidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeChapter, setActiveChapter] = useState("");

  // Track active chapter based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) setActiveChapter(hash);
      setMobileOpen(false);
    };
    handleHashChange(); // Set initial
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Auto-scroll active item into view in sidebar
  useEffect(() => {
    if (!activeChapter) return;

    // Small delay to ensure DOM is updated
    requestAnimationFrame(() => {
      const activeElements = document.querySelectorAll(`[data-chapter-id="${activeChapter}"]`);
      activeElements.forEach((el) => {
        // Check if element is in the visible desktop sidebar (not mobile)
        const parent = el.closest('.lg\\:block');
        if (parent || window.innerWidth < 1024) {
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  }, [activeChapter]);

  const sidebarContent = (
    <div className="flex flex-col h-screen bg-background border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border space-y-4">
        {/* Branding Row */}
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src="https://github.com/subhashchy.png"
              alt="Logo"
              className="w-12 h-12 rounded-full border-2 border-sidebar-border shadow-sm object-cover bg-background"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-serif font-bold text-lg text-sidebar-foreground leading-tight tracking-tight">
              The Accidental CTO
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 font-semibold mt-1">
              By Subhash Choudhary
            </p>
          </div>
        </div>

        {/* Toolbar Row */}
        <div className="flex items-center justify-between pt-2 border-t border-sidebar-border/50">
          <div className="flex items-center gap-1">
            <ReaderSettings />
            <ThemeToggle />
            <GithubEditButton />
          </div>
          <SidebarCloseButton onClick={() => setMobileOpen(false)} />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-1">
          {chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              data-chapter-id={chapter.id}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg transition-all duration-200 block",
                "hover:bg-sidebar-accent hover:translate-x-1",
                activeChapter === chapter.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                  : "text-sidebar-foreground/80"
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-sm leading-relaxed",
                    chapter.level === 1 && "font-semibold text-base",
                    chapter.level === 2 && "font-medium ml-2",
                    chapter.level === 3 && "ml-4 text-xs"
                  )}
                >
                  {chapter.title}
                </span>
              </div>
            </a>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-card shadow-lg hover:shadow-accent"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full z-50 lg:hidden transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "w-80"
        )}
      >
        {sidebarContent}
      </div>

      {/* Desktop Sidebar (always expanded, not collapsible) */}
      <div
        className={cn(
          "hidden lg:block sticky top-0 h-screen w-80 transition-all duration-300"
        )}
      >
        {sidebarContent}
      </div>
    </>
  );
};

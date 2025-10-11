import { useState } from "react";
import { Edit, Menu, Pen, X } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

interface Chapter {
  id: string;
  title: string;
  level: number;
}

interface BookSidebarProps {
  chapters: Chapter[];
  activeChapter: string;
}

export const BookSidebar = ({ chapters, activeChapter }: BookSidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-screen bg-background border-r border-sidebar-border">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="font-bold text-sidebar-foreground">The Accidental CTO</h2>
              <p className="text-xs text-sidebar-foreground/60">By Subhash Choudhary</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a
              href="https://github.com/hitesh-c/The-Accidental-CTO/blob/main/The%20Accidental%20CTO.md"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-sidebar-accent rounded transition-colors"
              title="Edit on GitHub"
            >
              <Pen className="w-4 h-4" />
            </a>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(false)}
              className="lg:hidden hover:bg-sidebar-accent"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-1">
          {chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
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
        <SidebarContent />
      </div>

      {/* Desktop Sidebar (always expanded, not collapsible) */}
      <div
        className={cn(
          "hidden lg:block sticky top-0 h-screen w-80 transition-all duration-300"
        )}
      >
        <SidebarContent />
      </div>
    </>
  );
};

import { useEffect } from "react";
import { BookSidebar } from "@/components/BookSidebar";
import { BookContent } from "@/components/BookContent";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BOOK_CONTENT_PATH } from "@/lib/constants";
import { useMarkdownContent } from "@/hooks/useMarkdownContent";
import { Loader2 } from "lucide-react";

const Index = () => {
  const { content, chapters, loading, error } = useMarkdownContent(BOOK_CONTENT_PATH);

  // Update URL hash and save persistence when scrolling through sections
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      // Throttle updates to prevent jitters/glitches
      if (scrollTimeout) return;

      scrollTimeout = setTimeout(() => {
        const headings = document.querySelectorAll(".markdown-content h1[id], .markdown-content h2[id], .markdown-content h3[id]");
        let activeId = "";

        // Find the last heading that is above the "reading line" (100px from top)
        for (const h of headings) {
          if (h.getBoundingClientRect().top < 100) {
            activeId = h.id;
          } else {
            break;
          }
        }

        if (activeId) {
          // Update URL hash for sharing/back button
          if (window.location.hash !== `#${activeId}`) {
            history.replaceState(null, '', `#${activeId}`);
            window.dispatchEvent(new Event('hashchange'));
          }
          // Save persistence for "continue reading"
          localStorage.setItem("lastReadChapter", activeId);
        }
        scrollTimeout = undefined!;
      }, 50); // 50ms throttle
    };

    // Restore last read position on initial load if no hash exists
    if (!window.location.hash) {
      const savedChapter = localStorage.getItem("lastReadChapter");
      if (savedChapter) {
        // Small delay to ensure content has rendered before jumping
        setTimeout(() => {
          window.location.hash = savedChapter;
        }, 300);
      }
    }

    // Small delay to ensure content renders
    const timer = setTimeout(() => {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [content]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">The Accidental CTO</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-2xl font-bold text-destructive">Error Loading Book</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />
      <div className="flex min-h-screen px-4 max-w-[100vw]">
        <BookSidebar chapters={chapters} />
        <main className="flex-1 min-w-0 mt-8 lg:mt-0">
          <BookContent content={content} />
        </main>
        <ScrollToTop />
      </div>
    </>
  );
};

export default Index;

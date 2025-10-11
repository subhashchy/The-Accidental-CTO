import { useState, useEffect } from "react";

interface Chapter {
  id: string;
  title: string;
  level: number;
}

export const useMarkdownContent = (url: string) => {
  const [content, setContent] = useState<string>("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const text = await response.text();
        setContent(text);

        // Parse chapters from markdown
        const chapterRegex = /^(#{1,3})\s+(.+)$/gm;
        const matches = [...text.matchAll(chapterRegex)];
        
        // Helper to strip markdown formatting from titles
        const stripMarkdown = (text: string) => {
          return text
            .replace(/\*\*/g, '') // Remove bold
            .replace(/\*/g, '')   // Remove italic
            .replace(/`/g, '')    // Remove code
            .replace(/^#+\s+/, '') // Remove heading markers
            .trim();
        };

        // Helper to create slug from heading text
        const slugify = (text: string) => {
          return stripMarkdown(text)
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        };

        const parsedChapters: Chapter[] = matches
          .filter((match) => {
            const title = match[2].trim();
            // Filter out very short headings and non-chapter headings
            return title.length > 5 && !title.match(/^[A-Z\s]+$/);
          })
          .map((match) => ({
            id: slugify(match[2]),
            title: stripMarkdown(match[2]),
            level: match[1].length,
          }));

        setChapters(parsedChapters);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [url]);

  return { content, chapters, loading, error };
};

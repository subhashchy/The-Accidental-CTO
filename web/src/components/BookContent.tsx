import Markdown from "markdown-to-jsx";
import "./markdown-styles.css"; // Import your custom CSS

interface BookContentProps {
  content: string;
}

// Helper to create slug from heading text
const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const BookContent = ({ content }: BookContentProps) => {
  return (
    <div className="h-full">
      <article className="max-w-[80vw] mx-auto pl-4 md:px-8 py-8">
        <div className="markdown-content">
          <Markdown>
            {content}
          </Markdown>
        </div>
      </article>
    </div>
  );
};
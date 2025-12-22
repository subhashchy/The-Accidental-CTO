import Markdown from "markdown-to-jsx";
import "./markdown-styles.css"; // Import your custom CSS
import { ReactNode } from "react";

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

// Extract text from React children
const getTextFromChildren = (children: ReactNode): string => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(getTextFromChildren).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    return getTextFromChildren((children as { props: { children?: ReactNode } }).props.children);
  }
  return '';
};

// Custom heading components that add IDs
const createHeading = (Tag: 'h1' | 'h2' | 'h3') => {
  return ({ children }: { children: ReactNode }) => {
    const text = getTextFromChildren(children);
    const id = slugify(text);
    return <Tag id={id}>{children}</Tag>;
  };
};

export const BookContent = ({ content }: BookContentProps) => {
  return (
    <div className="h-full">
      <article className="w-full px-4 md:px-8 py-8">
        <div className="markdown-content">
          <Markdown
            options={{
              overrides: {
                h1: { component: createHeading('h1') },
                h2: { component: createHeading('h2') },
                h3: { component: createHeading('h3') },
              },
            }}
          >
            {content}
          </Markdown>
        </div>
      </article>
    </div>
  );
};
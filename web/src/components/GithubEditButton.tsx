import { Pen } from "lucide-react";
import { GITHUB_REPO_URL, BOOK_CONTENT_PATH } from "@/lib/constants";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";

export const GithubEditButton = () => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
                    asChild
                >
                    <a
                        href={`${GITHUB_REPO_URL}/blob/main${BOOK_CONTENT_PATH}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Edit on GitHub"
                    >
                        <Pen className="h-4 w-4" />
                    </a>
                </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p>Edit on GitHub</p>
            </TooltipContent>
        </Tooltip>
    );
};

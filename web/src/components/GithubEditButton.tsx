import { Pen } from "lucide-react";
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
                        href="https://github.com/subhashchy/The-Accidental-CTO/blob/main/The%20Accidental%20CTO.md"
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

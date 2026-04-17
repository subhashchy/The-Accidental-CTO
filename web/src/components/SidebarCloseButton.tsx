import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "./ui/tooltip";

interface SidebarCloseButtonProps {
    onClick: () => void;
}

export const SidebarCloseButton = ({ onClick }: SidebarCloseButtonProps) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClick}
                    className="lg:hidden h-9 w-9 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
                    aria-label="Close sidebar"
                >
                    <X className="h-4 w-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
                <p>Close Sidebar</p>
            </TooltipContent>
        </Tooltip>
    );
};

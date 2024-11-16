import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, Plus, Trash } from "lucide-react"
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ItemProps {
    id?: Id<"documents">;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
}
const Item = ({
    id,
    documentIcon,
    active,
    expanded,
    isSearch,
    level = 0,
    onExpand,
    label,
    onClick,
    icon: Icon,
}: ItemProps) => {
    const create = useMutation(api.documents.create);

    const { user } = useUser()
    const router = useRouter()
    const archive = useMutation(api.documents.archive);
    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    }

    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = archive({ id })
            .then(() => router.push(`/documents`))


        toast.promise(promise, {
            loading: "Moving to trash...",
            success: "Note moved to trash!",
            error: "Failed to archive note."
        });
    };

    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise = create({ title: "Untitled", parentDocument: id })
            .then((documentId) => {
                if (!expanded) {
                    onExpand?.();
                }
                router.push(`/documents/${documentId}`);
            });
        toast.promise(promise, {
            loading: "Creating a new note...",
            success: "New note created!",
            error: "Failed to create a new note."
        })

    }

    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
    return (
        <div
            onClick={onClick}
            role="button"
            style={{ paddingLeft: level ? `${(level * 12) + 12}px` : "12px" }}
            className={cn("group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
                active && "bg-primary/5 text-primary"
            )}
        >
            {!!id && (

                <div
                    role="button"
                    className="h-full rounded-sm  hover:bg-neutral-300  mr-1"
                    onClick={handleExpand}
                >                    {/* dark:bg-neutral-600 */}

                    <ChevronIcon
                        className="h-4 w-4 text-muted-foreground/50"
                    />
                </div>
            )}
            {documentIcon ? (
                <div className="mr-2 text-[18px] shrink-0">
                    {documentIcon}
                </div>
            ) : (
                <Icon className=" h-[18px] w-[18px] mr-2 text-muted-foreground shrink-0" />

            )}

            <span className="truncate">
                {label}
            </span>
            {/* 3:13 */}
            {isSearch && (
                <kbd className="ml-auto inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">ctrl k</span>
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            onClick={(e) => e.stopPropagation()}
                            asChild
                        >
                            <div
                                role="button"
                                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
                            >
                                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-60"
                            align="start"
                            side="right"
                            forceMount
                        >
                            <DropdownMenuItem onClick={onArchive}>
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <div className="text-xs text-muted-foreground p-2">
                                Last edited by: {user?.fullName}
                            </div>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <div
                        role="button"
                        onClick={onCreate}
                        className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 "
                    >
                        <Plus className="h-4 w-4 text-muted-foreground" />
                    </div>

                </div>

            )}
        </div>
    );
}

export default Item;

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 25}px` : "12px"
            }}
            className=" flex gap-x-2 py-[3px]"
        >
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-30%" />

        </div>
    )
}
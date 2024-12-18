"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import Title from "./title";
import Banner from "./banner";
import Menu from "./menu";
import Publish from "./publish";
import { cn } from "@/lib/utils";

interface NavbarProps {
    isCollapsed: boolean,
    onResetWidth: () => void

}

const Navbar = ({
    isCollapsed,
    onResetWidth
}: NavbarProps) => {
    const params = useParams();
    const document = useQuery(api.documents.getById, {
        documentId: params.documentId as Id<"documents">,
    });
    if (document === undefined) {
        return (
            <nav className="bg-background px-3 py-2 w-full flex item-center">
                <Title.Skeleton />
            </nav>
        )
    }
    if (document === null) {
        return null;
    }
    return (
        <>
            <nav className="bg-background px-3 py-2 w-full flex item-center gap-x-4">
                {isCollapsed && (
                    <MenuIcon
                        role="button"
                        onClick={onResetWidth}
                        className="h-6 w-6 text-muted-foreground"
                    />
                )}
                <div className="flex items-center justify-between w-full">
                    <Title initialData={document} />
                    <div className={cn("flex items-center gap-x-2",
                        !isCollapsed && "mr-60"
                    )}>
                        <Publish initialData={document} />
                        <Menu documentId={document._id} />

                    </div>


                </div>


            </nav>
            {document.isArchived && (
                <Banner documentId={document._id} />
            )}
        </>
    );
}

export default Navbar;
"use client"

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { SearchCommand } from "@/components/search-command";
import Navigation from "@/app/(main)/_components/navigation";
import ModalProvider from "@/components/providers/modal-provider";

const MainLayout = ({ children }: {
    children: React.ReactNode
}) => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    if (isLoading) {
        return (
            <div className="h-full flex items-center justify-center">
                <Spinner size="lg" />
            </div>
        )
    }
    if (!isAuthenticated) {
        return redirect("/")
    }
    return (
        <div className="h-full flex  ">
            <Navigation />

            <main className="h-full flex-1  overflow-y-auto"> {/* flex-1 */}
                <SearchCommand />
                <ModalProvider />
                {children}
            </main>
        </div>
    );
}

export default MainLayout;
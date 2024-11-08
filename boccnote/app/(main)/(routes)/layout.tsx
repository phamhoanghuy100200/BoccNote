"use client"

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import Navigation from "../_components/navigation";

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
                {children}
            </main>
        </div>
    );
}

export default MainLayout;
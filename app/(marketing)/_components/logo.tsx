import { cn } from "@/lib/utils";
import Image from "next/image";
import { Jersey_10 } from "next/font/google"
const font = Jersey_10({
    subsets: ['latin'],
    weight: ["400"]
})

const Logo = () => {
    return (
        <div className=" flex items-center gap-x-2">
            <Image
                src="/logo.png"
                alt="logo"
                height="30"
                width="40"
            />
            <p className={cn("hidden md:flex font-semibold text-2xl", font.className)}>
                BoccNote
            </p>
        </div>
    );
}

export default Logo;
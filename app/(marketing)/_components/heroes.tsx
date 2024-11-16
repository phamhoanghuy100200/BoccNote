import Image from "next/image";


const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[250px] h-[250px] sm:w-[325px] sm:h-[325px] md:h-[300px] md:w-[300px]">
                    <Image
                        src="/bocchi.png"
                        fill
                        alt="Documents"
                        className="object-contain"
                    />
                </div>

            </div>

        </div>
    );
}

export default Heroes;
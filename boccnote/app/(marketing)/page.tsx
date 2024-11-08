
import Footer from "./_components/footer";
import Heading from "./_components/heading";
import Heroes from "./_components/heroes";

export default function MarketingPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-center text-center gap-y-6  px-6 pb-2">
        <Heading />
        <Heroes />
        <Footer />
      </div>
    </div>

  );
}

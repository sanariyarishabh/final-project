import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-white">
      <Navbar />
      <Hero />
    </div>
  );
}

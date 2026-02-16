import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, PieChart, Wallet } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <div className="relative bg-primary min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
            {/* Ambient Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

            <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center relative z-10">
                <div className="anim-fade-in-up">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-secondary text-xs uppercase tracking-[0.2em] mb-6">
                        Premium Finance
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-8">
                        The Art of <br />
                        <span className="italic text-secondary">Wealth</span> Management
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                        Experience the tranquility of perfectly organized finances. A sanctuary for your transactions, designed for the discerning individual.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/register"
                            className="group relative px-8 py-4 bg-secondary text-secondary-foreground rounded-full text-sm font-bold uppercase tracking-widest overflow-hidden transition-all hover:scale-105"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start Journey <ArrowRight className="h-4 w-4" />
                            </span>
                        </Link>
                        <Link href="#about" className="text-white/80 hover:text-white text-sm uppercase tracking-widest border-b border-transparent hover:border-white transition-all pb-1">
                            Explore Features
                        </Link>
                    </div>
                </div>

                {/* Refined Dashboard Preview */}
                <div className="mt-20 relative mx-auto max-w-5xl rounded-t-3xl bg-background/5 p-4 ring-1 ring-white/10 backdrop-blur-sm">
                    <div className="rounded-t-2xl overflow-hidden bg-card border-x border-t border-border shadow-2xl">
                        <div className="aspect-[21/9] w-full bg-background relative flex items-center justify-center">
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mx-auto text-secondary">
                                    <PieChart className="h-8 w-8" />
                                </div>
                                <h3 className="text-2xl font-serif text-foreground">Dashboard Preview</h3>
                                <p className="text-muted-foreground">Your financial overview appears here.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Strip */}
            <div className="w-full border-t border-white/5 bg-primary/50 backdrop-blur-md absolute bottom-0 left-0 py-6 hidden lg:block">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white/40 text-sm uppercase tracking-widest">
                    <span>Secure</span>
                    <span>Private</span>
                    <span>Elegant</span>
                    <span>Intuitive</span>
                </div>
            </div>
        </div>
    );
}

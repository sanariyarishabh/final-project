import Link from "next/link";
import { ArrowLeft, Wallet } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full bg-background">
            {/* Left Side - Brand & Atmosphere */}
            <div className="hidden lg:flex w-1/2 flex-col justify-between bg-primary p-16 text-white relative overflow-hidden">
                {/* Abstract Shapes */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />

                <div className="relative z-10">
                    <Link href="/" className="flex items-center gap-3 text-white/90 hover:text-white transition-colors group w-fit">
                        <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                            <ArrowLeft className="h-4 w-4" />
                        </div>
                        <span className="font-serif tracking-wide">Return Home</span>
                    </Link>
                </div>

                <div className="relative z-10 max-w-lg">
                    <h1 className="text-5xl md:text-6xl font-serif leading-tight mb-6">
                        The Luxury of <br />
                        <span className="text-secondary italic">Clarity.</span>
                    </h1>
                    <p className="text-white/60 text-lg font-light leading-relaxed">
                        Join an exclusive community of individuals who have mastered the art of financial management.
                    </p>
                </div>

                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-8">
                    <div className="flex items-center gap-2">
                        <Wallet className="h-5 w-5 text-secondary" />
                        <span className="text-sm tracking-widest uppercase text-white/60">ExpenseMgr Premier</span>
                    </div>
                    <p className="text-xs text-white/30">&copy; 2026 Collection</p>
                </div>
            </div>

            {/* Right Side - Form Content */}
            <div className="flex w-full flex-col items-center justify-center p-8 lg:w-1/2 bg-background relative">
                {/* Mobile Back Button */}
                <Link href="/" className="absolute top-8 left-8 lg:hidden text-foreground/50 hover:text-foreground">
                    <ArrowLeft className="h-6 w-6" />
                </Link>

                <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {children}
                </div>
            </div>
        </div>
    );
}

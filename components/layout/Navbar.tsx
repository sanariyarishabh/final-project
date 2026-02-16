"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "#about" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-6">
            <div className="flex w-full max-w-6xl items-center justify-between rounded-full border border-white/5 bg-primary/90 px-8 py-4 shadow-2xl backdrop-blur-xl transition-all hover:bg-primary/95">
                <Link href="/" className="flex items-center gap-2 text-2xl font-serif font-medium tracking-tight text-white">
                    ExpenseMgr
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium tracking-wide transition-all hover:text-secondary",
                                pathname === link.href ? "text-secondary" : "text-white/80"
                            )}
                        >
                            {link.name.toUpperCase()}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-6">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-white/90 hover:text-white transition-colors hidden sm:block"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-full bg-secondary px-7 py-3 text-xs font-bold uppercase tracking-widest text-secondary-foreground shadow-lg transition-all hover:bg-secondary/90 hover:scale-105 active:scale-95"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </nav>
    );
}

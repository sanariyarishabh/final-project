"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Receipt, Settings, PieChart, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Transactions", href: "/transactions", icon: Receipt },
    { name: "Analytics", href: "/analytics", icon: PieChart },
    { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
            <div className="flex h-20 items-center px-8 border-b border-border">
                <Wallet className="h-8 w-8 text-primary mr-3" />
                <span className="text-2xl font-bold text-foreground tracking-tight">ExpenseMgr</span>
            </div>
            <nav className="flex-1 space-y-2 p-4 mt-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-border mt-auto">
                <div className="flex items-center gap-4 rounded-xl p-2 hover:bg-secondary transition-colors cursor-pointer">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                        U
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">User</p>
                        <p className="text-xs text-muted-foreground">user@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

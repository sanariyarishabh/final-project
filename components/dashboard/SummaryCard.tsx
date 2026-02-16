import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
    title: string;
    amount: number;
    icon: LucideIcon;
    variant?: "default" | "success" | "danger" | "warning";
    trend?: string;
    trendUp?: boolean;
}



export function SummaryCard({ title, amount, icon: Icon, variant = "default", trend, trendUp }: SummaryCardProps) {
    // Premium styling using background/foreground variables.
    // For colored variants, we use a subtle tint.

    // Note: In a real 'premium' system, we might stick to white cards with colored icons only, 
    // unless 'variant' implies the WHOLE card color. 
    // Let's stick to White Cards with Colored Icons for consistency and cleanliness.

    const iconStyles = {
        default: "bg-secondary text-primary",
        success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
        danger: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
        warning: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    };

    return (
        <div className={cn(
            "rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
            "dark:shadow-none" // Optional: reduce shadow in dark mode if needed, but subtle is fine.
        )}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                        ₹{amount.toLocaleString('en-IN')}
                    </h3>
                </div>
                <div className={cn("rounded-xl p-3", iconStyles[variant])}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center gap-2 text-sm">
                    <span className={cn(
                        "rounded-full px-2 py-0.5 text-xs font-medium",
                        trendUp
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                    )}>
                        {trend}
                    </span>
                    <span className="text-muted-foreground">vs last month</span>
                </div>
            )}
        </div>
    );
}

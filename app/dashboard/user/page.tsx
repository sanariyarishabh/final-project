"use client"
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

export default function UserDashboard() {
    return (
        <div className="space-y-8">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-serif text-foreground mb-2">My Overview</h1>
                    <p className="text-muted-foreground">Welcome back to your financial control center.</p>
                </div>
                <div className="text-right hidden md:block">
                    <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest">Current Balance</p>
                    <p className="text-3xl font-serif text-primary">$0.00</p>
                </div>
            </div>

            {/* Empty State / placeholder for now since we removed APIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Income', value: '$0.00', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Total Expenses', value: '$0.00', icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' },
                    { label: 'Savings', value: '$0.00', icon: PiggyBank, color: 'text-blue-500', bg: 'bg-blue-50' },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white border border-border/50 shadow-sm flex items-center gap-4">
                        <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
                            <stat.icon className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-serif text-foreground">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-12 rounded-3xl bg-white border border-border/50 shadow-sm text-center">
                <div className="h-20 w-20 rounded-full bg-secondary/30 mx-auto flex items-center justify-center mb-6">
                    <Wallet className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-xl font-serif text-foreground mb-2">No Transactions Yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-8">
                    Your financial journey starts here. Add your first expense or income to see your analytics light up.
                </p>

                {/* 
                Buttons are disabled/hidden for now as we removed the forms/APIs 
                as per "remove all previously created API endpoints and forms" request 
                */}
                <div className="flex gap-4 justify-center">
                    <button disabled className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground text-sm font-bold opacity-50 cursor-not-allowed">
                        Add Expense (Coming Soon)
                    </button>
                    <button disabled className="px-6 py-3 rounded-full bg-secondary text-secondary-foreground text-sm font-bold opacity-50 cursor-not-allowed">
                        Add Income (Coming Soon)
                    </button>
                </div>
            </div>
        </div>
    );
}

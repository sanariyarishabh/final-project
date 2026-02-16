'use client';

import { Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, CreditCard, TrendingDown, Wallet, Briefcase, PieChart } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: React.ReactNode;
    delay?: number;
    color?: string; // Optional custom color/gradient class
}

function StatCard({ title, value, trend, trendUp, icon, delay = 0, color }: StatCardProps) {
    return (
        <div
            className={`glass rounded-xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 fill-mode-forwards group`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className={`absolute top-0 right-0 p-4 opacity-10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${color ? color : 'text-primary'}`}>
                {icon}
            </div>
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
                    <h3 className="text-3xl font-serif text-foreground mt-2">{value}</h3>
                </div>

                {trend && (
                    <div className="flex items-center gap-2 mt-4 text-sm">
                        <span className={`flex items-center gap-1 font-medium ${trendUp ? 'text-emerald-600' : 'text-rose-500'}`}>
                            {trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                            {trend}
                        </span>
                        <span className="text-muted-foreground/60">vs last month</span>

                        {/* Mini Sparkline for Trend */}
                        <div className="ml-auto flex items-end gap-[1px] h-6 opacity-30">
                            {[4, 2, 5, 3, 6, 7, 5, 8].map((h, i) => (
                                <div key={i} className={`w-1 rounded-sm ${trendUp ? 'bg-emerald-600' : 'bg-rose-500'}`} style={{ height: `${h * 10}%` }} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Decorative gradient blob */}
            <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-3xl pointer-events-none opacity-10 ${color ? color.replace('text-', 'bg-') : 'bg-primary'}`} />
        </div>
    );
}

function RevenueChart({ isAdmin }: { isAdmin: boolean }) {
    // Enhanced "Wave" bar chart with gradients
    const data = isAdmin
        ? [35, 50, 45, 70, 55, 65, 80, 55, 75, 60, 90, 85]
        : [20, 45, 30, 80, 40, 60, 75, 50, 65, 55, 85, 95];

    return (
        <div className="w-full h-full min-h-[200px] relative flex items-end justify-between gap-3 px-2 pt-10 pb-2">
            {data.map((height, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end group relative h-full">
                    <div
                        className="w-full relative rounded-t-lg overflow-hidden transition-all duration-500 hover:scale-y-105 origin-bottom shadow-lg"
                        style={{
                            height: `${height}%`,
                        }}
                    >
                        {/* Colorful Gradient Bar */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${isAdmin ? 'from-primary/80 to-secondary' : 'from-indigo-900/80 to-blue-400'} opacity-80 group-hover:opacity-100 transition-opacity`} />

                        {/* Shine effect */}
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/30" />
                    </div>

                    {/* Floor Reflection */}
                    <div
                        className="w-full h-4 absolute -bottom-4 left-0 rounded-b-lg scale-y-[-0.2] opacity-20 blur-sm"
                        style={{
                            height: `${height}%`,
                            background: `linear-gradient(to top, ${isAdmin ? '#B7B79E' : '#60A5FA'}, transparent)`
                        }}
                    />

                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 bg-popover text-popover-foreground text-xs py-1 px-3 rounded-full border border-border shadow-xl whitespace-nowrap z-20 pointer-events-none">
                        <span className="font-bold">{height}k</span>
                        <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-popover rotate-45 border-r border-b border-border" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function IncomeExspenseChart() {
    // A simplified visual representation of a double bar chart for Income vs Expenses
    // Using a more vibrant color palette for this specific request

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const incomeData = [65, 59, 80, 81, 56, 95];
    const expenseData = [28, 48, 40, 19, 86, 27];
    const maxVal = 100;

    return (
        <div className="w-full h-full flex flex-col justify-between pt-6">
            <div className="flex h-full items-end justify-between gap-4 px-2">
                {months.map((month, i) => {
                    const incH = (incomeData[i] / maxVal) * 100;
                    const expH = (expenseData[i] / maxVal) * 100;

                    return (
                        <div key={month} className="flex-1 flex flex-col justify-end items-center gap-1 group h-full">
                            <div className="flex gap-1 w-full justify-center h-full items-end">
                                {/* Income Bar */}
                                <div
                                    className="w-3 md:w-4 bg-emerald-500 rounded-t-sm relative transition-all duration-500 group-hover:bg-emerald-400"
                                    style={{ height: `${incH}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-bold text-emerald-600 transition-opacity">
                                        ${incomeData[i]}k
                                    </div>
                                </div>

                                {/* Expense Bar */}
                                <div
                                    className="w-3 md:w-4 bg-rose-500 rounded-t-sm relative transition-all duration-500 group-hover:bg-rose-400"
                                    style={{ height: `${expH}%` }}
                                >
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] font-bold text-rose-600 transition-opacity">
                                        ${expenseData[i]}k
                                    </div>
                                </div>
                            </div>
                            <span className="text-[10px] text-muted-foreground uppercase opacity-60 mt-2">{month}</span>
                        </div>
                    )
                })}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mt-4 pb-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs text-muted-foreground font-medium">Income</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="text-xs text-muted-foreground font-medium">Expenses</span>
                </div>
            </div>
        </div>
    )
}


export default function StatsOverview({ role }: { role: 'admin' | 'user' }) {
    const isAdmin = role === 'admin';

    return (
        <div className="space-y-8 w-full max-w-7xl mx-auto p-4 animate-in fade-in duration-700">
            {/* Header */}
            <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-3xl font-serif text-foreground">
                    {isAdmin ? 'Platform Overview' : 'Financial Summary'}
                </h2>
                <p className="text-muted-foreground">
                    {isAdmin
                        ? 'Monitor user growth and platform performance.'
                        : 'Track your income, expenses, and savings.'}
                </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {isAdmin ? (
                    <>
                        <StatCard
                            title="Total Users"
                            value="12,345"
                            trend="+12%"
                            trendUp={true}
                            icon={<Users className="w-24 h-24" />}
                            delay={0}
                            color="text-blue-500"
                        />
                        <StatCard
                            title="Active Sessions"
                            value="843"
                            trend="+5%"
                            trendUp={true}
                            icon={<Activity className="w-24 h-24" />}
                            delay={100}
                            color="text-emerald-500"
                        />
                        <StatCard
                            title="Total Revenue"
                            value="$45,231"
                            trend="+8%"
                            trendUp={true}
                            icon={<DollarSign className="w-24 h-24" />}
                            delay={200}
                            color="text-amber-500"
                        />
                        <StatCard
                            title="Bounce Rate"
                            value="42%"
                            trend="-2%"
                            trendUp={true}
                            icon={<TrendingDown className="w-24 h-24" />}
                            delay={300}
                            color="text-rose-500"
                        />
                    </>
                ) : (
                    <>
                        <StatCard
                            title="Total Balance"
                            value="$12,450"
                            trend="+15%"
                            trendUp={true}
                            icon={<Wallet className="w-24 h-24" />}
                            delay={0}
                            color="text-primary"
                        />
                        <StatCard
                            title="Income"
                            value="$8,200"
                            trend="+12%"
                            trendUp={true}
                            icon={<ArrowUpRight className="w-24 h-24" />}
                            delay={100}
                            color="text-emerald-500"
                        />
                        <StatCard
                            title="Expenses"
                            value="$3,850"
                            trend="-5%"
                            trendUp={true}
                            icon={<ArrowDownRight className="w-24 h-24" />}
                            delay={200}
                            color="text-rose-500"
                        />
                        <StatCard
                            title="Savings"
                            value="$4,350"
                            trend="+22%"
                            trendUp={true}
                            icon={<CreditCard className="w-24 h-24" />}
                            delay={300}
                            color="text-blue-500"
                        />
                    </>
                )}
            </div>

            {/* Main Graph Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                {/* Large Chart - Context Aware */}
                <div className="lg:col-span-2 glass rounded-xl p-8 min-h-[400px] flex flex-col group hover:shadow-lg transition-shadow duration-500 border-primary/10">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-serif text-foreground flex items-center gap-2">
                                {isAdmin ? <Users className="w-5 h-5 text-primary" /> : <PieChart className="w-5 h-5 text-indigo-500" />}
                                {isAdmin ? 'User Growth Analytics' : 'Income & Expense Analytics'}
                            </h3>
                            <p className="text-sm text-muted-foreground">Yearly performance overview</p>
                        </div>
                        <div className="flex bg-secondary/10 p-1 rounded-full">
                            {['1W', '1M', '6M', '1Y'].map((period, i) => (
                                <button key={period} className={`px-4 py-1 text-xs rounded-full transition-all duration-300 ${i === 2 ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:bg-white/50'}`}>
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 relative w-full">
                        {/* If Admin show Revenue, If User show Income Vs Expense */}
                        {isAdmin ? <RevenueChart isAdmin={true} /> : <IncomeExspenseChart />}
                    </div>
                </div>

                {/* Side Panel / Recent Activity */}
                <div className="glass rounded-xl p-6 flex flex-col h-full hover:shadow-lg transition-shadow duration-500 border-primary/10">
                    <h3 className="text-xl font-serif text-foreground mb-6 flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-secondary" />
                        {isAdmin ? 'Recent Registrations' : 'Recent Transactions'}
                    </h3>

                    <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                        {[1, 2, 3, 4, 5, 6].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/10 transition-colors group cursor-pointer border border-transparent hover:border-secondary/20">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm
                     ${isAdmin
                                            ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
                                            : (i % 2 === 0 ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600')}
                   `}>
                                        {isAdmin ? <Users className="w-5 h-5" /> : (i % 2 === 0 ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />)}
                                    </div>
                                    <div>
                                        <p className="font-medium text-foreground text-sm">
                                            {isAdmin ? `New User #${1000 + i}` : (i % 2 === 0 ? 'Project Payment' : 'Server Costs')}
                                        </p>
                                        <p className="text-xs text-muted-foreground">{i * 15 + 2} mins ago</p>
                                    </div>
                                </div>
                                <span className={`font-mono text-sm font-medium ${isAdmin ? 'text-primary' : (i % 2 === 0 ? 'text-emerald-600' : 'text-rose-600')}`}>
                                    {isAdmin ? 'Active' : (i % 2 === 0 ? '+$1,200' : '-$450')}
                                </span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-3 border border-primary/20 rounded-xl text-sm hover:bg-primary hover:text-primary-foreground transition-all uppercase tracking-widest text-primary font-medium flex items-center justify-center gap-2 group">
                        View All Activity
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </button>
                </div>
            </div>
        </div>
    );
}

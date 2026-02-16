"use client"
import { Users, Activity, ShieldAlert, BadgeDollarSign } from 'lucide-react';

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
                    { label: 'System Load', value: '23%', icon: Activity, color: 'text-green-500', bg: 'bg-green-50' },
                    { label: 'Security Alerts', value: '0', icon: ShieldAlert, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                    { label: 'Revenue', value: '$45k', icon: BadgeDollarSign, color: 'text-indigo-500', bg: 'bg-indigo-50' },
                ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60">Live</span>
                        </div>
                        <h3 className="text-3xl font-serif text-foreground mb-1">{stat.value}</h3>
                        <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity / Placeholder Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-border/50 shadow-sm min-h-[400px]">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-serif text-foreground">System Activity</h3>
                        <button className="text-sm font-bold text-primary hover:underline">View Log</button>
                    </div>
                    <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-secondary/30 flex items-center justify-center">
                            <Activity className="h-8 w-8 text-muted-foreground/50" />
                        </div>
                        <div>
                            <p className="text-lg font-medium text-foreground">System is running smoothly</p>
                            <p className="text-sm text-muted-foreground">No recent critical anomalies detected.</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 rounded-3xl bg-indigo-900 text-white shadow-xl shadow-indigo-900/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 p-24 bg-blue-500/10 rounded-full blur-3xl -ml-12 -mb-12"></div>

                    <h3 className="text-xl font-serif mb-6 relative z-10">Admin Quick Actions</h3>
                    <div className="space-y-4 relative z-10">
                        <button className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium flex items-center justify-between">
                            Add New User <Users className="h-4 w-4 opacity-50" />
                        </button>
                        <button className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium flex items-center justify-between">
                            System Report <Activity className="h-4 w-4 opacity-50" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

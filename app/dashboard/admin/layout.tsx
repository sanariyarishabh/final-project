"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, Settings, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { logout } from '@/lib/session';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'Manage Users', href: '/dashboard/admin/users', icon: Users },
        { name: 'System Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-muted/40 font-sans text-foreground">
            {/* Floating Sidebar - Admin Version (Darker/Different accent maybe? I'll stick to clean style but with Admin indicators) */}
            <div className="hidden md:flex flex-col p-4 w-72 h-full">
                <aside className="flex-1 flex flex-col rounded-3xl bg-neutral-900 shadow-xl overflow-hidden relative border border-white/5 text-white">

                    <div className="flex h-20 items-center px-8 z-10 border-b border-white/10">
                        <Link href="/dashboard/admin" className="flex items-center gap-3 font-serif text-2xl tracking-tight text-white">
                            <div className="h-8 w-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            Admin<span className="text-indigo-400">Panel</span>
                        </Link>
                    </div>

                    <div className="flex-1 overflow-y-auto py-6 px-4 z-10">
                        <div className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 px-4">Admin Controls</div>
                        <nav className="space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${isActive
                                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 translate-x-1'
                                            : 'text-neutral-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
                                            }`}
                                    >
                                        <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-indigo-400'}`} />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Admin Profile Summary */}
                    <div className="p-4 z-10 mt-auto border-t border-white/10 bg-white/5">
                        <div className="flex items-center gap-3 mb-4 px-2">
                            <div className="h-10 w-10 rounded-full bg-indigo-500 text-white border-2 border-neutral-800 shadow-sm flex items-center justify-center font-bold">
                                A
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold truncate text-white">Administrator</p>
                                <p className="text-xs text-neutral-500 truncate">admin@system.com</p>
                            </div>
                        </div>
                        <form action={async () => {
                            await logout();
                        }}>
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/5 text-neutral-300 hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-all"
                            >
                                <LogOut className="h-4 w-4" />
                                Sign Out
                            </button>
                        </form>
                    </div>
                </aside>
            </div>

            {/* Main Content Wrapper */}
            <div className="flex flex-1 flex-col overflow-hidden transition-all relative">
                {/* Mobile Header */}
                <header className="flex md:hidden h-16 items-center justify-between border-b border-border bg-background px-6">
                    <span className="font-serif text-xl font-bold text-foreground">AdminPanel</span>
                    {/* Mobile menu trigger would go here */}
                </header>

                {/* Desktop Header */}
                <header className="hidden md:flex h-20 items-center justify-between px-8 bg-transparent">
                    <div>
                        <h2 className="text-3xl font-serif text-foreground animate-in fade-in slide-in-from-left-4 duration-500">
                            {navItems.find(i => i.href === pathname)?.name || 'Dashboard'}
                        </h2>
                        <p className="text-sm text-muted-foreground mt-1">System Overview & Management</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Super Admin Access</span>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:px-8 md:pb-8">
                    <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

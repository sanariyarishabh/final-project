"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Settings, LogOut, LayoutDashboard, FolderGit2 } from 'lucide-react';
import { logout } from '@/lib/session';

import { TransactionProvider } from '@/app/context/TransactionContext';

export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard/user', icon: LayoutDashboard },
        { name: 'Projects', href: '/dashboard/user/projects', icon: FolderGit2 },
        { name: 'Profile', href: '/user/profile', icon: User },
        { name: 'Settings', href: '/user/settings', icon: Settings },
    ];

    return (
        <TransactionProvider>
            <div className="flex h-screen overflow-hidden bg-muted/40 font-sans text-foreground">
                {/* Floating Sidebar - Premium Detached Look (Light Mode) */}
                <div className="hidden md:flex flex-col p-4 w-72 h-full">
                    <aside className="flex-1 flex flex-col rounded-3xl bg-white shadow-xl shadow-primary/5 overflow-hidden relative border border-white/50">

                        <div className="flex h-20 items-center px-8 z-10 border-b border-dashed border-border/50">
                            <Link href="/dashboard/user" className="flex items-center gap-3 font-serif text-2xl tracking-tight text-primary">
                                <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                                    <span className="font-bold font-sans">E</span>
                                </div>
                                ExpenseMgr
                            </Link>
                        </div>

                        <div className="flex-1 overflow-y-auto py-6 px-4 z-10">
                            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 mb-4 px-4">Navigation</div>
                            <nav className="space-y-2">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href;
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={`group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${isActive
                                                ? 'bg-primary text-white shadow-lg shadow-primary/25 translate-x-1'
                                                : 'text-muted-foreground hover:bg-secondary/20 hover:text-foreground hover:translate-x-1'
                                                }`}
                                        >
                                            <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-white' : 'text-muted-foreground group-hover:text-primary'}`} />
                                            {item.name}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* User Profile Summary in Sidebar */}
                        <div className="p-4 z-10 mt-auto border-t border-dashed border-border/50 bg-secondary/10">
                            <div className="flex items-center gap-3 mb-4 px-2">
                                <div className="h-10 w-10 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-primary font-bold">
                                    U
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-bold truncate">User Account</p>
                                    <p className="text-xs text-muted-foreground truncate">user@example.com</p>
                                </div>
                            </div>
                            <form action={async () => {
                                await logout();
                            }}>
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold uppercase tracking-widest bg-white border border-border/50 shadow-sm hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all text-muted-foreground"
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
                        <span className="font-serif text-xl font-bold text-primary">ExpenseMgr</span>
                        {/* Mobile menu trigger would go here */}
                    </header>

                    {/* Desktop Header - Transparent */}
                    <header className="hidden md:flex h-20 items-center justify-between px-8 bg-transparent">
                        <div>
                            <h2 className="text-3xl font-serif text-foreground animate-in fade-in slide-in-from-left-4 duration-500">
                                {navItems.find(i => i.href === pathname)?.name || 'Dashboard'}
                            </h2>
                            <p className="text-sm text-muted-foreground mt-1">Overview of your recent activity.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-200" />
                                <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-300" />
                                <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-400 flex items-center justify-center text-[10px] text-white font-bold">+3</div>
                            </div>
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Team Active</span>
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
        </TransactionProvider>
    );
}

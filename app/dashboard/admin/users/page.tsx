"use client";

import Link from "next/link";
import { Plus, Pencil, Search, Filter } from "lucide-react";
import DeleteUserButton from "@/app/components/DeleteUserButton";
import { useEffect, useState } from "react";

export type UserType = {
    UserID: number
    UserName: string
    EmailAddress: string
    Role: string
    MobileNo: string
    Created: string
    Modified: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<UserType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users');
                if (res.ok) {
                    const data = await res.json();
                    setUsers(data);
                }
            } catch (error) {
                console.error("Failed to fetch users", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-serif text-foreground mb-2">User Management</h1>
                    <p className="text-muted-foreground">View and manage system users and their roles.</p>
                </div>
                <Link
                    href="/dashboard/admin/users/add"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                >
                    <Plus className="h-5 w-5" />
                    Add New User
                </Link>
            </div>

            {/* Search/Filter Bar (Visual Only for now) */}
            <div className="bg-white p-4 rounded-2xl border border-border/50 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="w-full pl-10 pr-4 py-2 bg-secondary/30 rounded-lg border-none focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary/50 transition-colors text-sm font-medium text-muted-foreground">
                    <Filter className="h-4 w-4" /> Filter
                </button>
            </div>

            <div className="bg-white rounded-3xl border border-border/50 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-secondary/30 border-b border-border/50">
                            <tr>
                                <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">User</th>
                                <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Role</th>
                                <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Contact</th>
                                <th className="text-left py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Joined</th>
                                <th className="text-right py-4 px-6 text-xs font-bold uppercase tracking-widest text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-muted-foreground">Loading...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-muted-foreground">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.UserID} className="group hover:bg-secondary/10 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                                                    {user.UserName.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-foreground">{user.UserName}</p>
                                                    <p className="text-xs text-muted-foreground">{user.EmailAddress}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.Role === 'ADMIN'
                                                ? 'bg-purple-50 text-purple-700 border-purple-200'
                                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                }`}>
                                                {user.Role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-muted-foreground">
                                            {user.MobileNo || '-'}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-muted-foreground">
                                            {new Date(user.Created).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/dashboard/admin/users/${user.UserID}`}
                                                    className="p-2 rounded-lg bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                                                    title="Edit User"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                                <DeleteUserButton id={user.UserID} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

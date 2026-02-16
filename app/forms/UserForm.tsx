"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save, X } from "lucide-react"

type UserFormProps = {
    user?: {
        UserID: number
        UserName: string
        EmailAddress: string
        Password: string
        MobileNo: string
        Role: string
    } | null
    isEdit?: boolean
}

export default function UserForm({ user, isEdit = false }: UserFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            let res;
            if (isEdit && user) {
                res = await fetch(`/api/users/${user.UserID}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            } else {
                res = await fetch('/api/users', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
            }

            if (!res.ok) {
                const json = await res.json();
                throw new Error(json.error || "Failed to save user");
            }

            router.refresh();
            router.push('/dashboard/admin/users');
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md shadow-2xl w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-serif text-white">{isEdit ? 'Edit User' : 'Add New User'}</h2>
                    <p className="text-gray-400 mt-1">Manage system access and permissions.</p>
                </div>
                <button
                    onClick={() => router.back()}
                    className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-4 rounded-xl mb-6 text-sm flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" /> {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Username</label>
                        <input
                            name="UserName"
                            defaultValue={user?.UserName}
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-600"
                            placeholder="johndoe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                        <input
                            name="EmailAddress"
                            type="email"
                            defaultValue={user?.EmailAddress}
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-600"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
                        <input
                            name="Password"
                            type="text" // Using text to see password as requested often in these labs, change to password if needed
                            defaultValue={user?.Password}
                            required
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-600"
                            placeholder="Secret123"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Mobile No</label>
                        <input
                            name="MobileNo"
                            defaultValue={user?.MobileNo}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-gray-600"
                            placeholder="+1 234 567 890"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-1">Role</label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="cursor-pointer group">
                            <input type="radio" name="Role" value="USER" defaultChecked={!user || user.Role === 'USER'} className="peer sr-only" />
                            <div className="p-4 rounded-xl border border-white/10 bg-black/20 peer-checked:bg-indigo-600 peer-checked:border-indigo-500 transition-all text-center">
                                <span className="text-gray-400 peer-checked:text-white font-bold group-hover:text-white">User</span>
                            </div>
                        </label>
                        <label className="cursor-pointer group">
                            <input type="radio" name="Role" value="ADMIN" defaultChecked={user?.Role === 'ADMIN'} className="peer sr-only" />
                            <div className="p-4 rounded-xl border border-white/10 bg-black/20 peer-checked:bg-purple-600 peer-checked:border-purple-500 transition-all text-center">
                                <span className="text-gray-400 peer-checked:text-white font-bold group-hover:text-white">Admin</span>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="pt-4 flex gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-[2] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all transform active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                            <>
                                <Save className="w-5 h-5" />
                                {isEdit ? 'Update User' : 'Create User'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

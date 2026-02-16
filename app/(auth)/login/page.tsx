"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Wallet, Loader2 } from "lucide-react";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
    const [state, action, isPending] = useActionState(loginAction, undefined);

    return (
        <div className="space-y-8">
            <div className="space-y-3 text-center lg:text-left">
                <h1 className="text-4xl font-serif text-foreground">Welcome Back</h1>
                <p className="text-muted-foreground font-light">Access your personal financial sanctuary.</p>
            </div>

            <form action={action} className="space-y-6">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            className="w-full border-b border-border bg-transparent px-0 py-2.5 text-base placeholder:text-muted-foreground/30 focus:border-primary focus:outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="password">Password</label>
                            <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Forgot password?</Link>
                        </div>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Min. 8 characters"
                            className="w-full border-b border-border bg-transparent px-0 py-2.5 text-base placeholder:text-muted-foreground/30 focus:border-primary focus:outline-none transition-all"
                            required
                        />
                    </div>
                </div>

                <div className="pt-4">
                    {state?.message && (
                        <p className="text-red-500 text-sm mb-4">{state.message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full rounded-full bg-primary py-4 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest"
                    >
                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isPending ? "Authenticating..." : "Sign In"}
                    </button>
                </div>
            </form>

            <div className="text-center text-sm">
                <span className="text-muted-foreground">Not a member yet? </span>
                <Link href="/register" className="font-bold text-primary hover:underline">Create account</Link>
            </div>
        </div>
    );
}

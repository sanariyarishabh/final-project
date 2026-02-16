"use client";

import Link from "next/link";
import { useActionState } from "react";
import { Wallet, Loader2 } from "lucide-react";
import { registerAction } from "@/app/actions/auth";

export default function RegisterPage() {
    const [state, action, isPending] = useActionState(registerAction, undefined);

    return (
        <div className="space-y-8">
            <div className="space-y-3 text-center lg:text-left">
                <h1 className="text-4xl font-serif text-foreground">Create your account</h1>
                <p className="text-muted-foreground font-light">Begin your journey to financial serenity.</p>
            </div>

            <form action={action} className="space-y-6">
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="johndoe"
                            className="w-full border-b border-border bg-transparent px-0 py-2.5 text-base placeholder:text-muted-foreground/30 focus:border-primary focus:outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            className="w-full border-b border-border bg-transparent px-0 py-2.5 text-base placeholder:text-muted-foreground/30 focus:border-primary focus:outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="mobile">Mobile Number</label>
                        <input
                            id="mobile"
                            name="mobile"
                            type="tel"
                            placeholder="123 456 7890"
                            className="w-full border-b border-border bg-transparent px-0 py-2.5 text-base placeholder:text-muted-foreground/30 focus:border-primary focus:outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Min. 8 characters"
                            className="w-full border-b border-border bg-transparent px-0 py-2.5 text-base placeholder:text-muted-foreground/30 focus:border-primary focus:outline-none transition-all"
                            required
                            minLength={8}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground" htmlFor="role">Account Type</label>
                        <select
                            id="role"
                            name="role"
                            className="w-full border-b border-border bg-transparent px-0 py-2.5 text-base focus:border-primary focus:outline-none transition-all"
                        >
                            <option value="USER">Personal Account</option>
                            <option value="ADMIN">Administrator</option>
                        </select>
                    </div>
                </div>

                <div className="pt-2">
                    <div className="flex items-center gap-3 mb-6">
                        <input
                            id="terms"
                            type="checkbox"
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary/20 bg-background"
                            required
                        />
                        <label htmlFor="terms" className="text-sm text-muted-foreground">
                            I agree to the <Link href="#" className="underline hover:text-primary">Terms</Link> and <Link href="#" className="underline hover:text-primary">Privacy Policy</Link>
                        </label>
                    </div>

                    {state?.message && (
                        <p className="text-red-500 text-sm mb-4">{state.message}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full rounded-full bg-primary py-4 text-sm font-bold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 uppercase tracking-widest"
                    >
                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        {isPending ? "Creating..." : "Create Account"}
                    </button>
                </div>
            </form>

            <div className="text-center text-sm">
                <span className="text-muted-foreground">Already a member? </span>
                <Link href="/login" className="font-bold text-primary hover:underline">Sign in</Link>
            </div>
        </div>
    );
}

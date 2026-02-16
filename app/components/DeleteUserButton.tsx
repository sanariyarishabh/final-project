"use client"

import { Trash2, Loader2 } from "lucide-react"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

export default function DeleteUserButton({ id }: { id: number }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this user?")) {
            startTransition(async () => {
                try {
                    const res = await fetch(`/api/users/${id}`, {
                        method: 'DELETE'
                    });
                    if (!res.ok) throw new Error('Failed to delete');
                    router.refresh();
                } catch (error) {
                    console.error(error);
                    alert("Failed to delete user");
                }
            })
        }
    }

    return (
        <button
            onClick={handleDelete}
            disabled={isPending}
            className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-400 transition-colors disabled:opacity-50"
            title="Delete User"
        >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
        </button>
    )
}

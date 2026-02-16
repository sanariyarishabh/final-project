"use client";

import UserForm from "@/app/forms/UserForm";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";
import { use } from "react";

export default function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${id}`);
                if (!res.ok) {
                    if (res.status === 404) {
                        setError(true);
                        return;
                    }
                    throw new Error('Failed to fetch');
                }
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error(err);
                setError(true); // Treat fetch error as not found or generic error for now
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUser();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex w-full h-[50vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !user) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto py-8">
            <UserForm user={user} isEdit={true} />
        </div>
    )
}

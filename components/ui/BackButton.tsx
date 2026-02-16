"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:translate-x-[-2px] transition-all"
        >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
        </button>
    );
}

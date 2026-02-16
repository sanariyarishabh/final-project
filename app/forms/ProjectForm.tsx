"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ProjectForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        ProjectName: "",
        ProjectStartDate: "",
        ProjectEndDate: "",
        ProjectDetail: "",
        Description: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // Prepare payload with ISO dates if present
            const payload: any = { ...formData };
            if (formData.ProjectStartDate) {
                payload.ProjectStartDate = new Date(formData.ProjectStartDate).toISOString();
            } else {
                delete payload.ProjectStartDate;
            }
            if (formData.ProjectEndDate) {
                payload.ProjectEndDate = new Date(formData.ProjectEndDate).toISOString();
            } else {
                delete payload.ProjectEndDate;
            }

            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Failed to create project");

            router.refresh();
            router.push('/dashboard/user/projects');

        } catch (err) {
            setError("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-md shadow-xl w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">New Project</h2>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg mb-4 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Project Name</label>
                    <input
                        type="text"
                        required
                        value={formData.ProjectName}
                        onChange={(e) => setFormData({ ...formData, ProjectName: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-500"
                        placeholder="Web Development"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
                        <input
                            type="date"
                            value={formData.ProjectStartDate}
                            onChange={(e) => setFormData({ ...formData, ProjectStartDate: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all [color-scheme:dark]"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
                        <input
                            type="date"
                            value={formData.ProjectEndDate}
                            onChange={(e) => setFormData({ ...formData, ProjectEndDate: e.target.value })}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all [color-scheme:dark]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Details</label>
                    <input
                        type="text"
                        value={formData.ProjectDetail}
                        onChange={(e) => setFormData({ ...formData, ProjectDetail: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-500"
                        placeholder="Specific details..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea
                        rows={3}
                        value={formData.Description}
                        onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-500"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-3 rounded-lg transition-all transform active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Project"}
                </button>
            </form>
        </div>
    );
}

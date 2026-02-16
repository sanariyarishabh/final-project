'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, FolderGit2, Calendar } from 'lucide-react';

type Project = {
    ProjectID: number;
    ProjectName: string;
    ProjectStartDate: string;
    ProjectEndDate: string;
    ProjectDetail: string;
    Description: string;
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch('/api/projects');
                if (res.ok) {
                    const data = await res.json();
                    setProjects(data);
                }
            } catch (error) {
                console.error("Failed to fetch projects", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-serif text-foreground mb-2">My Projects</h1>
                    <p className="text-muted-foreground">Manage and track your active projects.</p>
                </div>
                <Link
                    href="/dashboard/user/projects/new"
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
                >
                    <Plus className="h-5 w-5" />
                    New Project
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-12 text-muted-foreground">Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground bg-white/5 rounded-3xl border border-border/50">
                    No projects found. Create one to get started!
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.ProjectID} className="bg-white hover:bg-white/90 dark:bg-white/5 p-6 rounded-3xl border border-border/50 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md group">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    <FolderGit2 className="h-6 w-6" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground border border-border px-2 py-1 rounded-full">
                                    Active
                                </span>
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-1">{project.ProjectName}</h3>
                            <p className="text-sm text-muted-foreground mb-6 line-clamp-2 min-h-[2.5rem]">{project.Description}</p>

                            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground border-t border-border/50 pt-4">
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="h-3.5 w-3.5" />
                                    <span>{new Date(project.ProjectStartDate).toLocaleDateString()}</span>
                                </div>
                                <span>•</span>
                                <span>{project.ProjectDetail}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

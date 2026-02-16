import ProjectForm from "@/app/forms/ProjectForm";

export default function NewProjectPage() {
    return (
        <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center">
                <h1 className="text-4xl font-serif text-foreground mb-2">Create New Project</h1>
                <p className="text-muted-foreground">Start a new venture and track your progress.</p>
            </div>
            <ProjectForm />
        </div>
    );
}

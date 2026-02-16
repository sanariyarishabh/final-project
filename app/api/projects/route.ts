import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const projects = await prisma.projects.findMany({
            orderBy: { Created: 'desc' }
        });
        return NextResponse.json(projects);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

import { getSession } from "@/lib/session"

export async function POST(request: Request) {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Validation
        if (!body.ProjectName) {
            return NextResponse.json({ error: 'Project Name is required' }, { status: 400 });
        }

        const newProject = await prisma.projects.create({
            data: {
                ProjectName: body.ProjectName,
                // Ensure dates are parsed
                ProjectStartDate: body.ProjectStartDate ? new Date(body.ProjectStartDate) : null,
                ProjectEndDate: body.ProjectEndDate ? new Date(body.ProjectEndDate) : null,
                ProjectDetail: body.ProjectDetail || '',
                Description: body.Description || '',
                UserID: session.userId,
            }
        });

        return NextResponse.json({
            message: 'Project created successfully',
            project: newProject
        }, { status: 201 });

    } catch (error) {
        console.error("Create Project Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

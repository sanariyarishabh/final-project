
export type UserType = {
    UserID: number
    UserName: string
    EmailAddress: string
    Role: string
    MobileNo: string
    Created: Date
    Modified: Date
    Password?: string
}

export type ProjectType = {
    ProjectID: number
    ProjectName: string
    ProjectStartDate: string
    ProjectEndDate: string
    ProjectDetail: string
    Description: string
    Created: Date
    Modified: Date
}

// Global variable to persist across module reloads in development (if possible)
// Using globalThis to act as a singleton store
const globalForMock = globalThis as unknown as {
    MOCK_USERS: UserType[]
    MOCK_PROJECTS: ProjectType[]
}

export const MOCK_USERS = globalForMock.MOCK_USERS || [
    {
        UserID: 1,
        UserName: 'admin',
        EmailAddress: 'admin@example.com',
        Role: 'ADMIN',
        MobileNo: '1234567890',
        Created: new Date(),
        Modified: new Date(),
        Password: 'admin'
    },
    {
        UserID: 2,
        UserName: 'user',
        EmailAddress: 'user@example.com',
        Role: 'USER',
        MobileNo: '0987654321',
        Created: new Date(),
        Modified: new Date(),
        Password: 'user'
    }
];

export const MOCK_PROJECTS = globalForMock.MOCK_PROJECTS || [
    {
        ProjectID: 1,
        ProjectName: "Website Redesign",
        ProjectStartDate: new Date().toISOString(),
        ProjectEndDate: new Date(Date.now() + 86400000 * 30).toISOString(),
        ProjectDetail: "Redesigning the corporate website",
        Description: "Full stack overhaul",
        Created: new Date(),
        Modified: new Date()
    },
    {
        ProjectID: 2,
        ProjectName: "Mobile App",
        ProjectStartDate: new Date().toISOString(),
        ProjectEndDate: new Date(Date.now() + 86400000 * 60).toISOString(),
        ProjectDetail: "iOS and Android app",
        Description: "Using React Native",
        Created: new Date(),
        Modified: new Date()
    }
];

if (process.env.NODE_ENV !== 'production') {
    globalForMock.MOCK_USERS = MOCK_USERS;
    globalForMock.MOCK_PROJECTS = MOCK_PROJECTS;
}

export type JobRoleRequest = {
    roleName: string,
    location: string,
    capabilityId: number,
    bandId: number,
    closingDate: Date,
    status: string,
    description: string,
    responsibilities: string,
    jobSpec: string
}
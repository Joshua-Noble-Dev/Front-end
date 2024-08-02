export type JobRoleRequest = {
    roleName: string,
    location: string,
    capabilityID: number,
    bandID: number,
    closingDate: Date,
    status: string,
    description: string,
    responsibilities: string,
    jobSpec: string,
    positions: number
}
import { JobRoleRequest } from "../models/JobRoleRequest";

const currentDate = new Date()

export const validateJobRoleRequest = function (jobRoleRequest: JobRoleRequest): void {

    const date = new Date(jobRoleRequest.closingDate);

    if (jobRoleRequest.roleName.length > 100) {
        throw new Error("Invalid Role Name");
    }

    if (jobRoleRequest.location.length > 200) {
        throw new Error("Invalid Location");
    }

    if (jobRoleRequest.jobSpec.length > 100) {
        throw new Error("Invalid Job Specification Link");
    }

    if (jobRoleRequest.description.length > 500) {
        throw new Error("Invalid Description length");
    }

    if (jobRoleRequest.responsibilities.length > 200) {
        throw new Error("Invalid Resposibilities length");
    }

    if (jobRoleRequest.positions < 1) {
        throw new Error("Position must be greater than 0");
    }

    if (date < currentDate) {
        throw new Error("Invalid Closing Date");
    }
}
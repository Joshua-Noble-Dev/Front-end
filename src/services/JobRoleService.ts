import axios, { AxiosResponse } from "axios";
import { JobRolesResponse } from "../models/JobRolesResponse";
import { JobRoleRequest } from "../models/JobRoleRequest";
import { validateJobRoleRequest } from "../validators/JobRoleValidator";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080';

export const URL: string = "/api/job-roles/";

export const getJobRoles = async (): Promise<JobRolesResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(URL);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get Job Roles');
    }
}

export const createJobRole = async(jobRole: JobRoleRequest): Promise<number> => {

    validateJobRoleRequest(jobRole);

    try {
        const response: AxiosResponse = await axios.post(URL, jobRole);

        return response.data;
        
    } catch (e) {
        if(e.response.status == 500) {
            throw new Error("Could not create job role");
        }
        throw new Error("Invalid data");
    }
}


export const getJobRoleById = async (id: string): Promise<JobRolesResponse> => {
    try {
        const response: AxiosResponse = await axios.get(URL + id);

        return response.data;
    } catch (e) { 

        if(e.response.status == 404) {
            throw new Error("Job Role does not exist");
        }
        
        throw new Error('Failed to get Job Role');
    }
}
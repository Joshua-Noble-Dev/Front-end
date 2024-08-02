import axios, { AxiosResponse } from "axios";
import { JobRolesResponse } from "../models/JobRolesResponse";
import { JobRoleRequest } from "../models/JobRoleRequest";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080/';

export const URL: string = "/api/job-roles/";

export const getJobRoles = async (): Promise<JobRolesResponse[]> => {
    try {
        const response: AxiosResponse = await axios.get(URL);

        return response.data;
    } catch (e) {
        throw new Error('Failed to get Job Roles');
    }
}

export const createJobRole = async(jobRole: JobRoleRequest): Promise<Number> => {
    try {
        const response: AxiosResponse = await axios.post(URL, jobRole);

        return response.data;
        
    } catch (e) {
        console.log(e);
        throw new Error(e.response.data);
    }
}

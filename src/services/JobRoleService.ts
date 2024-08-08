import axios, { AxiosResponse } from "axios";
import { JobRolesResponse } from "../models/JobRolesResponse";


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

export const applyForJob = async (roleId: string, userId: string, cvFile: File): Promise<File> => {         
    const formData = new FormData();         
    formData.append('userId', userId);         
    formData.append('cv', cvFile);         
    const response = await axios.post(`http://localhost:8080/job-roles/${roleId}/apply`, formData, {             
    headers: {                 
    'Content-Type': 'multipart/form-data' 
    } 
    }); 
    return response.data; }
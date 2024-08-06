import axios, { AxiosResponse } from "axios";
import { Capability } from "../models/Capability";
import { requestInstanceCap } from "../models";


axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080';

export const URL: string = "/api/capabilities/";

export const getCapabilities = async(): Promise<Capability[]> => {

    try {
        const response: AxiosResponse = await requestInstanceCap.get(URL);
        
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get capabilities');
    }

}
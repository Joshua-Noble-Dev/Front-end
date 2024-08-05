import axios, { AxiosResponse } from "axios";
import { Capability } from "../models/Capability";

export const baseURL = "http://localhost:8080/api/capabilities";

export const getCapabilities = async(): Promise<Capability[]> => {

    try {
        const response: AxiosResponse = await axios.get(baseURL);
        
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get capabilities');
    }

}
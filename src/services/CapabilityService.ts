import axios, { AxiosResponse } from "axios";
import { Capability } from "../models/Capability";

export const getCapabilities = async(): Promise<Capability[]> => {

    try {
        const response: AxiosResponse = await axios.get("http://localhost:8080/api/capabilities");
        
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get capabilities');
    }

}
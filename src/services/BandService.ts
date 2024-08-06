import axios, { AxiosResponse } from "axios";
import { Band } from "../models/Band";
import { requestInstanceBand } from "../models";

axios.defaults.baseURL = process.env.API_URL || 'http://localhost:8080';

export const URL: string = "/api/bands/";

export const getBands = async(): Promise<Band[]> => {

    try {
        const response: AxiosResponse = await requestInstanceBand.get(URL);
        
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get bands');
    }

}
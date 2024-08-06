import axios, { AxiosResponse } from "axios";
import { Band } from "../models/Band";

export const bandURL = "http://localhost:8080/api/bands";

export const getBands = async(): Promise<Band[]> => {

    try {
        const response: AxiosResponse = await axios.get(bandURL);
        
        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to get bands');
    }

}
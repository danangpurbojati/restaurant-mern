import axios from 'axios';
import { config } from "../config";

export const getCategories = async () => {
    return await axios.get(`${config.api_host}/api/categories`)
}
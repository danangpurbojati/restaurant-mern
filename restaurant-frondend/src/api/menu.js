import axios from 'axios';
import { config } from "../config";

export const getMenus = async (params) => {
    return await axios.get(`${config.api_host}/api/menus`, {
        params
    });
}
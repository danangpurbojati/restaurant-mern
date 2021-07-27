import { SET_ADDRESS } from "./constants";

export const saveAddress = (data) => {
    return {
        type: SET_ADDRESS,
        data
    }
}
import { getCategories } from "../../api/category";
import { SUCCESS_FETCH_CATEGORY } from "./constants";

export const successFetchingCategories = (data) => {
    return {
        type: SUCCESS_FETCH_CATEGORY,
        data
    }
}

export const fetchCategory = () => {
    return async (dispatch) => {
        try {
            const { data: { data } } = await getCategories();
            dispatch(successFetchingCategories(data));
        } catch (error) {
            console.log(error);
        }
    }
}


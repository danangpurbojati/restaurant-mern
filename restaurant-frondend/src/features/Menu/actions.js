import { getMenus } from "../../api/menu";
import { SUCCESS_FETCH_MENU, SET_PAGE, SET_CATEGORY, SET_KEYWORD } from "./constants";

export const successFetchingMenus = (data, count) => {
    return {
        type: SUCCESS_FETCH_MENU,
        data,
        count
    }
}

export const fetchMenus = () => {
    return async (dispatch, getState) => {

        let perPage = getState().menus.perPage || 4;
        let currentPage = getState().menus.currentPage || 1;
        let keyword = getState().menus.keyword || '';
        let category = getState().menus.category || '';

        const params = {
            limit: perPage, 
            skip: (currentPage * perPage) - perPage,
            q: keyword,
            category
        }

        try {
            let { data: {data, count} } = await getMenus(params);
            dispatch(successFetchingMenus(data, count));
        } catch (error) {
            console.log(error)
        }
    }
}

export const setPage = (number = 1) => {
    return {
        type: SET_PAGE,
        currentPage: number
    }
}

export const setCategory = (category) => {
    return {
        type: SET_CATEGORY, 
        category
    }
}

export const setKeyword = keyword => {
    return {
      type: SET_KEYWORD,
      keyword
    } 
}
import { SUCCESS_FETCH_MENU, SET_PAGE, SET_CATEGORY, SET_KEYWORD } from "./constants";

const initialState = {
    menus: [],
    currentPage: 1,
    totalItems: -1,
    perPage: 4,
    keyword: '',
    category: '',
};


const reducer = (state = initialState, action) => {
    switch(action.type){

        case SUCCESS_FETCH_MENU: 
            return {
                ...state,
                menus: action.data,
                totalItems: action.count
            }
        
        case SET_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        
        case SET_CATEGORY: 
            return {...state, currentPage: 1, category: action.category, keyword: ''};
        
        case SET_KEYWORD:
            return {...state, keyword: action.keyword, category: ''};

        default:
            return state;
    }
}

export default reducer;
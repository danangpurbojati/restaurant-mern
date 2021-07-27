import { SUCCESS_FETCH_CATEGORY } from "./constants";

const initialState = {
    categories: []
};


const reducer = (state = initialState, action) => {
    switch(action.type){

        case SUCCESS_FETCH_CATEGORY: 
            return {
                ...state,
                categories: action.data
            }

        default:
            return state;
    }
}

export default reducer;
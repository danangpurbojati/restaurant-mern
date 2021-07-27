import { SET_ADDRESS } from "./constants";

const initialState = {
    address: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SET_ADDRESS:
            return {
                ...state,
                address: action.data
            }

        default:
            return state;
    }
}

export default reducer;
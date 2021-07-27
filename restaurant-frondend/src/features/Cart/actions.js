import { ADD_ITEM, CLEAR_ITEMS, REMOVE_ITEM, SET_ITEMS } from "./constants"

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        item
    }
}

export const removeItem = (item) => {
    return {
        type: REMOVE_ITEM,
        item
    }
}

export const clearItems = () => {
    return {
        type: CLEAR_ITEMS
    }
}

export const setItems = (items) => {
    return {
        type: SET_ITEMS,
        items
    }
}
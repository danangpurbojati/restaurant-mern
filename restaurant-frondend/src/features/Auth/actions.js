import { USER_LOGIN, USER_LOGOUT } from './constants';

export const userLogin = (user, token) => {
    return {
        type: USER_LOGIN,
        user,
        token
    }
}

export const userLogout = (user, token) => {
    return {
        type: USER_LOGOUT
    }
}
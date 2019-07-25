import { SET_CURRENT_USER, USER_LOADING, GET_ALL_USERS } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
    isAuthenticated: false,
    usersList: [],
    user: {},
    loading: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                usersList: action.payload
            };
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
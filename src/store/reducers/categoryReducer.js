import {
    GET_ALL_CATEGORIES, GET_CATEGORY, CREATE_UPDATE_CATEGORY, DELETE_CATEGORY
} from "../actions/types";

const initialState = {
    categoryList: [],
    category: {},
    loading: false,
    created: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload,
                created: false
            }
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                categoryList: action.payload,
                created: false
            }
        case CREATE_UPDATE_CATEGORY:
            return {
                ...state,
                created: action.payload
            }
        case DELETE_CATEGORY:
            let filtered = state.categoryList.filter(item => {
                return item.category_id != action.payload;
            });
            return {
                ...state,
                categoryList: filtered,
                created: false
            }
        default:
            return state;
    }
}
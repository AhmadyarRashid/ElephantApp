import {
    GET_ALL_DEPARTMENTS
} from "../actions/types";

const initialState = {
    departmentsList: [],    
    loading: false,
    created: false
};
export default function (state = initialState, action) {
    switch (action.type) {       
        case GET_ALL_DEPARTMENTS:
            return {
                ...state,
                departmentsList: action.payload,
                created: false
            }        
        default:
            return state;
    }
}
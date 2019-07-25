import {
    CREATE_UPDATE_SUBTYPE, GET_SUBTYPE, DELETE_SUBTYPE, GET_ALL_SUBTYPES
} from "../actions/types";

const initialState = {
    subtypeList: [],
    subtype: {},
    loading: false,
    created: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SUBTYPE:
            return {
                ...state,
                subtype: action.payload
            }
        case GET_ALL_SUBTYPES:
            return {
                ...state,
                subtypeList: action.payload,
                created: false
            }
        case CREATE_UPDATE_SUBTYPE:
            return {
                ...state,
                created: action.payload
            }
        case DELETE_SUBTYPE:
            let filtered = state.subtypeList.filter(item => {
                return item.sub_type_id != action.payload;
            })
            return {
                ...state,
                subtypeList: filtered
            }
        default:
            return state;
    }
}
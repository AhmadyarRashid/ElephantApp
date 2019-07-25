import {
    CREATE_UPDATE_BOM, GET_BOM_DETAILS,
    GET_BOM_LINE_BY_ID, DELETE_BOM_LINE
} from "../actions/types";

const initialState = {
    bomLine: [],
    bomLineById: {},
    loading: false,
    created: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_UPDATE_BOM:
            return {
                ...state,
                created: action.payload
            }
        case GET_BOM_DETAILS:
            return {
                ...state,
                bomLine: action.payload,
                created: false
            };
        case DELETE_BOM_LINE:
            let filtered = state.bomLine.filter(bom => {
                return bom.bom_line_id != action.payload;
            });
            return {
                ...state,
                bomLine: filtered,
                created: false
            }
        case GET_BOM_LINE_BY_ID:
            return {
                ...state,
                bomLineById: action.payload
            };
        default:
            return state;
    }
}
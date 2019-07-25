import {
    CREATE_UPDATE_MATERIALTYPE, GET_MATERIALTYPE, DELETE_MATERIALTYPE, GET_ALL_MATERIALTYPES
} from "../actions/types";

const initialState = {
    materialsList: [],
    material: {},
    loading: false,
    created: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MATERIALTYPE:
            return {
                ...state,
                material: action.payload
            }
        case GET_ALL_MATERIALTYPES:
            return {
                ...state,
                materialsList: action.payload,
                created: false
            }
        case CREATE_UPDATE_MATERIALTYPE:
            return {
                ...state,
                created: action.payload
            }
        case DELETE_MATERIALTYPE:
            let filtered = state.materialsList.filter(item => {
                return item.material_type_id != action.payload;
            });            
            return {
                ...state,
                materialsList: filtered
            }
        default:
            return state;
    }
}
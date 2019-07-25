import { CREATE_UPDATE_VENDOR, GET_ALL_VENDORS, GET_VENDOR, DELETE_VENDOR } from "../actions/types";

const initialState = {
    vendors: [],
    vendor: {},
    loading: false,
    created: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case CREATE_UPDATE_VENDOR:
            return {
                ...state,
                created: action.payload
            }
        case DELETE_VENDOR:
            var index = state.vendors.findIndex((item) => {
                return item.vendor_id === action.payload;
            })
            return {
                ...state,
                vendors: state.vendors.filter((item, index) => {
                    return item.vendor_id != action.payload;
                })
            }
        case GET_VENDOR:
            return {
                ...state,
                vendor: action.payload
            };
        case GET_ALL_VENDORS:
            return {
                ...state,
                created: false,
                vendors: action.payload
            };
        default:
            return state;
    }
}
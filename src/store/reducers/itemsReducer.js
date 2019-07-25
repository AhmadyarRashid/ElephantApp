import {
    CREATE_UPDATE_FORECAST, SEARCH_RESULT, GET_ALL_FORECASTS, GET_FORECAST, DELETE_FORECAST,
    GET_ALL_SUBTYPES, GET_ALL_MATERIALTYPES, CREATE_UPDATE_SUBTYPE,GET_FORECAST_SUMMARY
} from "../actions/types";

const initialState = {
    forecasts: [],
    forecast: {},
    forecast_summary: {},
    searchResults: [],
    loading: false,
    created: false
};
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_FORECAST:
            return {
                ...state,
                forecast: action.payload
            }
        case GET_FORECAST_SUMMARY:
            return {
                ...state,
                forecast_summary: action.payload
            }
        case GET_ALL_SUBTYPES:
            return {
                ...state,
                subtypeList: action.payload
            }
        case GET_ALL_MATERIALTYPES:
            return {
                ...state,
                materialsList: action.payload
            }
        case CREATE_UPDATE_FORECAST:
            return {
                ...state,
                created: action.payload
            }
        case CREATE_UPDATE_SUBTYPE:
            return {
                ...state,
                created: action.payload
            }
        case DELETE_FORECAST:
            var index = state.forecasts.findIndex((item) => {
                return item.forecast_id === action.payload;
            })
            return {
                ...state,
                forecasts: state.forecasts.splice(index, 1)
            }
        case SEARCH_RESULT:
            return {
                ...state,
                searchResults: action.payload
            };
        case GET_ALL_FORECASTS:
            return {
                ...state,
                created: false,
                forecasts: action.payload
            };
        default:
            return state;
    }
}
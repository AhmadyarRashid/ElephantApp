import axios from "axios";
import {
    GET_ERRORS, CREATE_UPDATE_FORECAST,
    SEARCH_RESULT, GET_ALL_FORECASTS,
    GET_FORECAST, DELETE_FORECAST,
    CREATE_UPDATE_SUBTYPE,
    GET_FORECAST_SUMMARY
} from "./types";
import api from '../../api-endpoints/api';

export const createUpdateForecast = (values) => dispatch => {
    axios
        .post(api.createUpdateForecast, values)
        .then(res => {
            if (res.data.isSuccess) {
                dispatch({
                    type: CREATE_UPDATE_FORECAST,
                    payload: res.data.isSuccess
                })
                dispatch({ type: GET_ERRORS, payload: {} })
            }
            else {
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data
                })
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.data
            })
        );
};

export const createUpdateSubtype = (values) => dispatch => {
    axios
        .post(api.createUpdateSubType, values)
        .then(res => {
            if (res.data.isSuccess) {
                dispatch({
                    type: CREATE_UPDATE_SUBTYPE,
                    payload: res.data.isSuccess
                })
            }
            else {
                dispatch({
                    type: GET_ERRORS,
                    payload: res.data
                })
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.data
            })
        );
};

export const searchFinishedProducts = (text) => dispatch => {
    axios
        .post(api.searchItemsByCategory, { category_id: '06', text })
        .then(res => {
            dispatch({
                type: SEARCH_RESULT,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const getAllSalesForecasts = (type) => dispatch => {
    axios
        .get(`${api.getSalesForecast}/${type}`)
        .then(res => {
            dispatch({
                type: GET_ALL_FORECASTS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        });
};

export const getSalesForecastById = (id) => dispatch => {
    if (id != null && id != '' && id != undefined) {
        axios
            .get(api.getSalesForecastById + '/' + id)
            .then(res => {
                dispatch({
                    type: GET_FORECAST,
                    payload: res.data.data
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.data
                })
            });
    }
    else {
        dispatch({
            type: GET_FORECAST,
            payload: {}
        })
    }
};

export const deleteSalesForecast = (id) => dispatch => {
    axios
        .delete(api.deleteSalesForecast + '/' + id)
        .then(res => {
            dispatch({
                type: DELETE_FORECAST,
                payload: id
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.data
            })
        });
};

export const getForecastItemSummary = (type)=> dispatch =>{
    axios
            .get(api.getForecastItemSummary + '/' + type)
            .then(res => {
                dispatch({
                    type: GET_FORECAST_SUMMARY,
                    payload: res.data.data
                })
            })
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.data
                })
            });
}
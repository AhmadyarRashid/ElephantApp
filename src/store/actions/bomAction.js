import axios from "axios";
import {
    GET_ERRORS, GET_BOM_DETAILS, CREATE_UPDATE_BOM,
    GET_BOM_LINE_BY_ID, DELETE_BOM_LINE
} from "./types";
import api from '../../api-endpoints/api';

export const createUpdateBOM = (newBOM, history) => dispatch => {
    axios
        .post(api.createUpdateBOM, newBOM)
        .then(res => {
            if (res.data.isSuccess) {
                dispatch({
                    type: CREATE_UPDATE_BOM,
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

export const getItemBOM = (itemId) => dispatch => {
    axios
        .get(api.getItemBOM + '/' + itemId)
        .then(res => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_BOM_DETAILS,
                    payload: res.data.data
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
                payload: err.response.data
            })
        );
};

export const getNonSpecificBOM = (category_id) => dispatch => {
    axios
        .get(api.getNonSpecificBOM + '/' + category_id)
        .then(res => {
            if (res.data.isSuccess) {
                dispatch({
                    type: GET_BOM_DETAILS,
                    payload: res.data.data
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
                payload: err.response.data
            })
        );
};

export const getBOMLineById = (id) => dispatch => {
    if (id != null && id != '' && id != undefined) {
        axios
            .get(api.getBOMLineById + '/' + id)
            .then(res => {
                if (res.data.isSuccess) {
                    dispatch({
                        type: GET_BOM_LINE_BY_ID,
                        payload: res.data.data
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
                    payload: err.response.data
                })
            );
    }
    else {
        dispatch({
            type: GET_BOM_LINE_BY_ID,
            payload: {}
        })
    }

};

export const deleteBOMLine = (id) => dispatch => {
    axios
        .delete(api.deleteBOMLine + '/' + id)
        .then(res => {
            dispatch({
                type: DELETE_BOM_LINE,
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
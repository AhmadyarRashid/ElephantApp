import axios from "axios";
import {
    GET_ERRORS, CREATE_UPDATE_CATEGORY, GET_CATEGORY, DELETE_CATEGORY, GET_ALL_CATEGORIES
} from "./types";
import api from '../../api-endpoints/api';

export const createUpdateCategory = (values) => dispatch => {
    axios
        .post(api.createUpdateCategory, values)
        .then(res => {
            if (res.data.isSuccess) {
                dispatch({
                    type: CREATE_UPDATE_CATEGORY,
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
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: { isSuccess: false, message: err.message }
            })
        }
        );
};

export const getCategoryById = (id) => dispatch => {
    if (id != null && id != '' && id != undefined) {
        axios
            .get(api.getCategoryById + '/' + id)
            .then(res => {
                dispatch({
                    type: GET_CATEGORY,
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
            type: GET_CATEGORY,
            payload: {}
        })
    }
};

export const deleteCategory = (id) => dispatch => {
    axios
        .delete(api.deleteCategory + '/' + id)
        .then(res => {
            dispatch({
                type: DELETE_CATEGORY,
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

export const getAllCategories = () => dispatch => {
    axios
        .get(api.getAllItemCategories)
        .then(res => {
            dispatch({
                type: GET_ALL_CATEGORIES,
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

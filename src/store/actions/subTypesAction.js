import axios from "axios";
import {
    GET_ERRORS, GET_SUBTYPE, DELETE_SUBTYPE, GET_ALL_SUBTYPES, CREATE_UPDATE_SUBTYPE
} from "./types";
import api from '../../api-endpoints/api';

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
        .catch(err => {            
            dispatch({
                type: GET_ERRORS,
                payload: { isSuccess: false, message: err.message }
            })
        }
        );
};

export const getSubtypeById = (id) => dispatch => {
    if (id != null && id != '' && id != undefined) {
        axios
            .get(api.getSubtypeById + '/' + id)
            .then(res => {
                dispatch({
                    type: GET_SUBTYPE,
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
            type: GET_SUBTYPE,
            payload: {}
        })
    }
};

export const deleteSubType = (id) => dispatch => {
    axios
        .delete(api.deleteSubType + '/' + id)
        .then(res => {
            dispatch({
                type: DELETE_SUBTYPE,
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

export const getAllSubTypes = () => dispatch => {
    axios
        .get(api.getAllSubtypes)
        .then(res => {
            dispatch({
                type: GET_ALL_SUBTYPES,
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

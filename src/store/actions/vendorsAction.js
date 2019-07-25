import axios from "axios";
import { GET_ERRORS, CREATE_UPDATE_VENDOR, GET_ALL_VENDORS, GET_VENDOR, DELETE_VENDOR } from "./types";
import api from '../../api-endpoints/api';

export const createUpdateVendor = (vendor, history) => dispatch => {
    axios
        .post(api.createUpdateVendor, vendor)
        .then(res => {
            if (res.data.isSuccess) {
                dispatch({
                    type: CREATE_UPDATE_VENDOR,
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

export const getAllVendors = () => dispatch => {
    axios
        .get(api.getAllVendor)
        .then(res => {
            dispatch({
                type: GET_ALL_VENDORS,
                payload: res.data
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const getVendorById = (id) => dispatch => {
    if (id != null && id != '' && id != undefined) {
        axios
            .get(`${api.getVendorById}/${id}`)
            .then(res => {
                dispatch({
                    type: GET_VENDOR,
                    payload: res.data
                })
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
            type: GET_VENDOR,
            payload: {}
        })
    }
};

export const deleteVendor = (id) => dispatch => {
    axios
        .delete(api.deleteVendor + '/' + id)
        .then(res => {
            dispatch({
                type: DELETE_VENDOR,
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
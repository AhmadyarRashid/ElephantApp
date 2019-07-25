import axios from "axios";
import {
    GET_ERRORS, GET_MATERIALTYPE, DELETE_MATERIALTYPE, CREATE_UPDATE_MATERIALTYPE, GET_ALL_MATERIALTYPES
} from "./types";
import api from '../../api-endpoints/api';

export const createUpdateMaterialType = (values) => dispatch => {
    axios
        .post(api.createUpdateMaterialType, values)
        .then(res => {
            if (res.data.isSuccess) {
                dispatch({
                    type: CREATE_UPDATE_MATERIALTYPE,
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

export const getMaterialTypeById = (id) => dispatch => {
    if (id != null && id != '' && id != undefined) {
        axios
            .get(api.getMaterialTypeById + '/' + id)
            .then(res => {
                dispatch({
                    type: GET_MATERIALTYPE,
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
            type: GET_MATERIALTYPE,
            payload: {}
        })
    }
};

export const deleteMaterialType = (id) => dispatch => {
    axios
        .delete(api.deleteMaterialType + '/' + id)
        .then(res => {
            dispatch({
                type: DELETE_MATERIALTYPE,
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

export const getAllMaterialTypes = () => dispatch => {
    axios
        .get(api.getAllMaterialTypes)
        .then(res => {
            dispatch({
                type: GET_ALL_MATERIALTYPES,
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

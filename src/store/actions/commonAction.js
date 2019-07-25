import axios from "axios";
import {
    GET_ERRORS, GET_ALL_DEPARTMENTS,
} from "./types";
import api from '../../api-endpoints/api';

export const getAllDepartments = () => dispatch => {
    axios
        .get(api.getAllDepartments)
        .then(res => {
            dispatch({
                type: GET_ALL_DEPARTMENTS,
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

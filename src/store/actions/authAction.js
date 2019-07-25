import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, GET_ALL_USERS } from "./types";
import api from '../../api-endpoints/api';

// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
        .post(api.registerUser, userData)
        .then(res => {
            if (res.data.isSuccess) {
                history.push("/")
            }
            else {
                dispatch({ type: GET_ERRORS, payload: res.data })
            }
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
// Login - get user token
export const loginUser = userData => dispatch => {
    axios
        .post(api.loginUser, userData)
        .then(res => {
            if (res.data.isSuccess) {
                const { token } = res.data;
                localStorage.setItem("appvhc_jwt_token", token);

                if (token) {
                    // Set token to Auth header
                    setAuthToken(token);
                    // Decode token to get user data
                    const decoded = jwt_decode(token);
                    // Set current user
                    dispatch(setCurrentUser(decoded));
                    dispatch({ type: GET_ERRORS, payload: {} })
                }
            }
            else {
                dispatch({ type: GET_ERRORS, payload: res.data })
            }
        })
        .catch(err => {
            console.log('error' + err)
            dispatch({ type: GET_ERRORS, payload: err.response.data })
        }
        );
};
// Set logged in user
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};
// User loading
export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};
// Log user out
export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem("appvhc_jwt_token");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
};

export const getAllUsers = () => dispatch => {
    axios
        .get(api.getAllUsers)
        .then(res => {
            dispatch({
                type: GET_ALL_USERS,
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
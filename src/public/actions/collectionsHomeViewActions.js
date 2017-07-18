import * as types from './actionTypes.js';
import axios from 'axios';
import Auth from '../modules/Auth.js';
import qs from 'qs';

// Initiated the Axios request
export function getCollectionsInitiated() {
    return {type: types.READ_COLLECTIONS_HOME_INITIATED}
}

// Successfully retrieved the collections
export function getCollectionsSuccess(collections) {
    return {type: types.READ_COLLECTIONS_HOME_SUCCESS, collections: collections}
}

// Failed to retrieve the collections
export function getCollectionsFailure() {
    return {type: types.READ_COLLECTIONS_HOME_FAILURE}
}

// Function for retrieving the collections
export function getCollectionsHomeView() {
    return function (dispatch) {
        dispatch(getCollectionsInitiated());
        return axios({
            method: 'get',
            url: '/home/collections',
            headers: {'Authorization': `bearer ${Auth.getToken()}`}
        })
            .then((response) => {
                dispatch(getCollectionsSuccess(response));
            }).catch((err) => {
                dispatch(getCollectionsFailure());
            });
    }
}

// Handle comment change
export function onCommentChange(comment, collectionId, key) {
    return function (dispatch) {
        dispatch({type: types.ON_COMMENT_CHANGE_COLLECTIONS_HOME, comment: comment, collectionId: collectionId, key: key})
    }
}

// Initiated the Axios request
export function onSaveCommentInitiate() {
    return {type: types.ON_SAVE_COMMENT_COLLECTIONS_HOME_INITIATE}
}

// Successfully saved the comment
export function onSaveCommentSuccess() {
    return {type: types.ON_SAVE_COMMENT_COLLECTIONS_HOME_SUCCESS}
}

// Failed to save the comment
export function onSaveCommentFailure() {
    return {type: types.ON_SAVE_COMMENT_COLLECTIONS_HOME_FAILURE}
}

// Handle open SnackBar
export function onOpenSnackBar() {
    return function (dispatch) {
        dispatch({type: types.ON_OPEN_SNACK_BAR_HOME_VIEW});
        setTimeout(() => {
            dispatch({type: types.ON_CLOSE_SNACK_BAR_HOME_VIEW})
        }, 4000)
    }
}

// Function for saving the comment
export function onSave(comment, collectionId, key) {
    return function (dispatch) {
        dispatch(onSaveCommentInitiate());
        return axios({
            method: 'post',
            url: '/comment/postCommentCollections',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                'Authorization': `bearer ${Auth.getToken()}`
            },
            data: qs.stringify({
                'collectionId': collectionId,
                'comment': comment
            })
        }).then(() => {
            dispatch(onCommentChange("", "", key));
            dispatch(onSaveCommentSuccess());
            dispatch(onOpenSnackBar());
        }).catch(() => {
            dispatch(onSaveCommentFailure())
        })
    }
}

export function onResetReducer() {
    return function (dispatch) {
        dispatch({type: types.ON_RESET_REDUCER_HOME_VIEW_READ_ONE})
    }
}
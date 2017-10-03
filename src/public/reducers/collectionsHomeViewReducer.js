import * as types from '../actions/actionTypes.js';

export default function collectionsHomeViewReducer(state = {
    comments: [{value: ''}, {value: ''}, {value: ''}, {value: ''}],
    successCommentCollections: null
}, action) {
    switch (action.type) {
        case types.READ_COLLECTIONS_HOME_INITIATED:
            return {
                ...state,
                fetching: true,
                fetched: false
            };

        case types.READ_COLLECTIONS_HOME_SUCCESS:
            return {
                ...state,
                collections: action.collections,
                fetched: true,
                fetching: false
            };

        case types.READ_COLLECTIONS_HOME_FAILURE:
            return {
                ...state,
                fetched: false,
                fetching: false
            };

        case types.ON_COMMENT_CHANGE_COLLECTIONS_HOME: {
            const newComments = state.comments.map((comment, j) => {
                if (action.key !== j) return comment;
                return {...comment, value: action.comment, collectionId: action.collectionId}
            });
            return {
                ...state,
                comments: newComments
            };
        }

        case types.ON_SAVE_COMMENT_COLLECTIONS_HOME_INITIATE:
            return {
                ...state,
            };

        case types.ON_SAVE_COMMENT_COLLECTIONS_HOME_SUCCESS:
            return {
                ...state,
                successCommentCollections: true
            };

        case types.ON_SAVE_COMMENT_COLLECTIONS_HOME_FAILURE:
            return {
                ...state,
                successCommentCollections: false
            };

        default:
            return state;
    }
}
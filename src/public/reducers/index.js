import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import collectionsHomeViewReducer from './collectionsHomeViewReducer.js';
import shouldUpdateCollectionsReducer from './shouldUpdateCollectionsReducer.js';
import manageCollectionsCreateReducer from './Collections/manageCollectionsCreateReducer.js';
import manageCollectionsCreateComponentReducer from './Collections/manageCollectionsCreateComponentReducer.js';
import manageCollectionsDeleteReducer from './Collections/manageCollectionsDeleteReducer.js';

const rootReducer = combineReducers({
    userReducer: userReducer,
    collectionsHomeViewReducer: collectionsHomeViewReducer,
    shouldUpdateCollectionsReducer: shouldUpdateCollectionsReducer,
    manageCollectionsCreateReducer: manageCollectionsCreateReducer,
    manageCollectionsCreateComponentReducer: manageCollectionsCreateComponentReducer,
    manageCollectionsDeleteReducer: manageCollectionsDeleteReducer
});

export default rootReducer
// SignUp actions

// View
export const ON_USER_INFO_CHANGE = 'ON_USER_INFO_CHANGE';
export const ON_SAVE_USER_INITIATE = 'ON_SAVE_USER_INITIATE';
export const ON_SAVE_USER_SUCCESS = 'ON_SAVE_USER_SUCCESS';
export const ON_SAVE_USER_FAILURE = 'ON_SAVE_USER_FAILURE';

// Login actions

// View
export const ON_USER_INFO_CHANGE_LOGIN = 'ON_USER_INFO_CHANGE_LOGIN';
export const ON_LOGIN_INITIATE = 'ON_LOGIN_INITIATE';
export const ON_LOGIN_SUCCESS = 'ON_LOGIN_SUCCESS';
export const ON_LOGIN_FAILURE = 'ON_LOGIN_FAILURE';

// Credentials actions

export const GET_CREDENTIALS_INITIATED = 'GET_CREDENTIALS_INITIATED';
export const GET_CREDENTIALS_SUCCESS = 'GET_CREDENTIALS_SUCCESS';
export const GET_CREDENTIALS_FAILURE = 'GET_CREDENTIALS_FAILURE';

// Like/Unlike actions

export const ON_LIKE_INITIATE = 'ON_LIKE_INITIATE';
export const ON_LIKE_SUCCESS = 'ON_LIKE_SUCCESS';
export const ON_LIKE_FAILURE = 'ON_LIKE_FAILURE';
export const ON_UNLIKE_INITIATE = 'ON_UNLIKE_INITIATE';
export const ON_UNLIKE_SUCCESS = 'ON_UNLIKE_SUCCESS';
export const ON_UNLIKE_FAILURE = 'ON_UNLIKE_FAILURE';
export const ON_LIKE_ACTION_FOR_ALL_USERS = 'ON_LIKE_ACTION_FOR_ALL_USERS';
export const ON_UNLIKE_ACTION_FOR_ALL_USERS = 'ON_UNLIKE_ACTION_FOR_ALL_USERS';
export const ON_OPEN_SNACK_BAR_LIKES = 'ON_OPEN_SNACK_BAR_LIKES';
export const ON_CLOSE_SNACK_BAR_LIKES = 'ON_CLOSE_SNACK_BAR_LIKES';

// Profile actions

// View
export const GET_PROFILE_INITIATED = 'GET_PROFILE_INITIATED';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAILURE = 'GET_PROFILE_FAILURE';
export const ON_FIRST_NAME_CHANGE = 'ON_FIRST_NAME_CHANGE';
export const ON_LAST_NAME_CHANGE = 'ON_LAST_NAME_CHANGE';
export const ON_BIRTH_DATE_CHANGE = 'ON_BIRTH_DATE_CHANGE';
export const ON_CITY_CHANGE = 'ON_CITY_CHANGE';
export const ON_COUNTRY_CHANGE = 'ON_COUNTRY_CHANGE';
export const ON_PROFESSION_CHANGE = 'ON_PROFESSION_CHANGE';
export const ON_COMPANY_NAME_CHANGE = 'ON_COMPANY_NAME_CHANGE';
export const ON_PROFILE_PICTURE_LINK_CHANGE = 'ON_PROFILE_PICTURE_LINK_CHANGE';
export const ON_PROFILE_COVER_CHANGE = 'ON_PROFILE_COVER_CHANGE';
export const ON_UPDATE_PROFILE_INITIATE = 'ON_UPDATE_INITIATE';
export const ON_UPDATE_PROFILE_CANCEL = 'ON_UPDATE_CANCEL';
export const ON_UPDATE_PROFILE_SUCCESS = 'ON_UPDATE_SUCCESS';
export const ON_UPDATE_PROFILE_FAILURE = 'ON_UPDATE_FAILURE';

// Component
export const ON_OPEN_PROFILE_PICTURE_MODAL = 'ON_OPEN_PROFILE_PICTURE_MODAL';
export const ON_CLOSE_PROFILE_PICTURE_MODAL = 'ON_CLOSE_PROFILE_PICTURE_MODAL';
export const ON_OPEN_COVER_PICTURE_MODAL = 'ON_OPEN_COVER_PICTURE_MODAL';
export const ON_CLOSE_COVER_PICTURE_MODAL = 'ON_CLOSE_COVER_PICTURE_MODAL';
export const ON_SLIDE_INDEX_PROFILE_CHANGE = 'ON_SLIDE_INDEX_PROFILE_CHANGE';
export const ON_CLOSE_SNACK_BAR = 'ON_CLOSE_SNACK_BAR'; // open event is handled by ON_UPDATE_PROFILE_SUCCESS

// Feedback actions

//View
export const ON_FEEDBACK_CHANGE = 'ON_FEEDBACK_CHANGE';
export const ON_SAVE_FEEDBACK_INITIATE = 'ON_SAVE_FEEDBACK_INITIATE';
export const ON_SAVE_FEEDBACK_SUCCESS = 'ON_SAVE_FEEDBACK_SUCCESS';
export const ON_SAVE_FEEDBACK_FAILURE = 'ON_SAVE_FEEDBACK_FAILURE';

// Collections actions

// Search Actions - Universal Action
export const ON_SEARCH_QUERY_CHANGE = 'ON_SEARCH_QUERY_CHANGE';

// Search Actions - All Collections
export const ON_SEARCH_ALL_INITIATE = 'ON_SEARCH_ALL_INITIATE';
export const ON_SEARCH_ALL_SUCCESS = 'ON_SEARCH_ALL_SUCCESS';
export const ON_SEARCH_ALL_FAILURE = 'ON_SEARCH_ALL_FAILURE';
export const GET_ALL_COLLECTION_NAMES_INITIATE = 'GET_ALL_COLLECTION_NAMES_INITIATE';
export const GET_ALL_COLLECTION_NAMES_SUCCESS = 'GET_ALL_COLLECTION_NAMES_SUCCESS';
export const GET_ALL_COLLECTION_NAMES_FAILURE = 'GET_ALL_COLLECTION_NAMES_FAILURE';

// Should Update Actions
export const SET_SHOULD_UPDATE = 'SET_SHOULD_UPDATE';
export const REMOVE_SHOULD_UPDATE = 'REMOVE_SHOULD_UPDATE';
export const SET_SHOULD_UPDATE_NEWS = 'SET_SHOULD_UPDATE_NEWS';
export const REMOVE_SHOULD_UPDATE_NEWS = 'REMOVE_SHOULD_UPDATE_NEWS';

// HomeView Read All Collections ( first 4 )
export const READ_COLLECTIONS_HOME_INITIATED = 'READ_COLLECTIONS_HOME_INITIATED';
export const READ_COLLECTIONS_HOME_SUCCESS = 'READ_COLLECTIONS_HOME_SUCCESS';
export const READ_COLLECTIONS_HOME_FAILURE = 'READ_COLLECTIONS_HOME_FAILURE';
export const ON_COMMENT_CHANGE_COLLECTIONS_HOME = 'ON_COMMENT_CHANGE_COLLECTIONS_HOME';
export const ON_SAVE_COMMENT_COLLECTIONS_HOME_INITIATE = 'ON_SAVE_COMMENT_COLLECTIONS_HOME_INITIATE';
export const ON_SAVE_COMMENT_COLLECTIONS_HOME_SUCCESS = 'ON_SAVE_COMMENT_COLLECTIONS_HOME_SUCCESS';
export const ON_SAVE_COMMENT_COLLECTIONS_HOME_FAILURE = 'ON_SAVE_COMMENT_COLLECTIONS_HOME_FAILURE';

// HomeView Read All News ( first 4 )
export const READ_NEWS_HOME_INITIATED = 'READ_NEWS_HOME_INITIATED';
export const READ_NEWS_HOME_SUCCESS = 'READ_NEWS_HOME_SUCCESS';
export const READ_NEWS_HOME_FAILURE = "READ_NEWS_HOME_FAILURE";
export const ON_COMMENT_CHANGE_NEWS_HOME = 'ON_COMMENT_CHANGE_NEWS_HOME';
export const ON_SAVE_COMMENT_NEWS_HOME_INITIATE = 'ON_SAVE_COMMENT_NEWS_HOME_INITIATE';
export const ON_SAVE_COMMENT_NEWS_HOME_SUCCESS = 'ON_SAVE_COMMENT_NEWS_HOME_SUCCESS';
export const ON_SAVE_COMMENT_NEWS_HOME_FAILURE = 'ON_SAVE_COMMENT_NEWS_HOME_FAILURE';

// HomeView ReadOne both - appears as action onl in collectionsHomeViewActions.js
export const ON_RESET_REDUCER_HOME_VIEW_READ_ONE = 'ON_RESET_REDUCER_HOME_VIEW_READ_ONE';

// Component for both Collections and News of above sections - find actions and state in news reducer for home view
export const ON_OPEN_SNACK_BAR_HOME_VIEW = 'ON_OPEN_SNACK_BAR_HOME_VIEW';
export const ON_CLOSE_SNACK_BAR_HOME_VIEW = 'ON_CLOSE_SNACK_BAR_HOME_VIEW';

// Manage Collections Create - Admin

// View
export const ON_CREATE_INITIATE_ADMIN_COLLECTIONS = 'ON_CREATE_INITIATE_ADMIN_COLLECTIONS';
export const ON_USER_ID_CHANGE_ADMIN_COLLECTIONS = 'ON_USER_ID_CHANGE_ADMIN_COLLECTIONS';
export const ON_USER_NAME_CHANGE_ADMIN_COLLECTIONS = 'ON_USER_NAME_CHANGE_ADMIN_COLLECTIONS';
export const ON_PROFILE_PICTURE_LINK_CHANGE_ADMIN_COLLECTIONS = 'ON_PROFILE_PICTURE_LINK_CHANGE_ADMIN_COLLECTIONS';
export const ON_COLLECTION_NAME_CHANGE_ADMIN_COLLECTIONS = 'ON_COLLECTION_NAME_CHANGE_ADMIN_COLLECTIONS';
export const ON_COLLECTION_DESCRIPTION_CHANGE_ADMIN_COLLECTIONS = 'ON_COLLECTION_DESCRIPTION_CHANGE_ADMIN_COLLECTIONS';
export const ON_PICTURES_ARRAY_CHANGE_ADMIN_COLLECTIONS = 'ON_PICTURES_ARRAY_CHANGE_ADMIN_COLLECTIONS';
export const ON_ADD_INPUT_FIELDS_ADMIN_COLLECTIONS = 'ON_ADD_INPUT_FIELDS_ADMIN_COLLECTIONS';
export const ON_REMOVE_INPUT_FIELDS_ADMIN_COLLECTIONS = 'ON_REMOVE_INPUT_FIELDS_ADMIN_COLLECTIONS';
export const ON_SAVE_COLLECTION_INITIATE_ADMIN_COLLECTIONS = 'ON_SAVE_COLLECTION_INITIATE_ADMIN_COLLECTIONS';
export const ON_SAVE_COLLECTION_SUCCESS_ADMIN_COLLECTIONS = 'ON_SAVE_COLLECTION_SUCCESS_ADMIN_COLLECTIONS';
export const ON_SAVE_COLLECTION_FAILURE_ADMIN_COLLECTIONS = 'ON_SAVE_COLLECTION_FAILURE_ADMIN_COLLECTIONS';
//Component
export const ON_SLIDE_INDEX_CHANGE_ADMIN_COLLECTIONS = 'ON_SLIDE_INDEX_CHANGE_ADMIN_COLLECTIONS';

// Manage Collections Delete - Admin

// View
export const ON_DELETE_INITIATE_ADMIN_COLLECTIONS = 'ON_DELETE_INITIATE_ADMIN_COLLECTIONS';
export const ON_DELETE_INITIATE_SUCCESS_ADMIN_COLLECTIONS = 'ON_DELETE_INITIATE_SUCCESS_ADMIN_COLLECTIONS';
export const ON_DELETE_INITIATE_FAILURE_ADMIN_COLLECTIONS = 'ON_DELETE_INITIATE_FAILURE_ADMIN_COLLECTIONS';
export const ON_DELETE_EXECUTE_INITIATE_ADMIN_COLLECTIONS = 'ON_DELETE_EXECUTE_INITIATE_ADMIN_COLLECTIONS';
export const ON_DELETE_EXECUTE_SUCCESS_ADMIN_COLLECTIONS = 'ON_DELETE_EXECUTE_SUCCESS_ADMIN_COLLECTIONS';
export const ON_DELETE_EXECUTE_FAILURE_ADMIN_COLLECTIONS = 'ON_DELETE_EXECUTE_FAILURE_ADMIN_COLLECTIONS';

// Manage Collections ReadAll - Admin

// View
export const READ_ALL_COLLECTIONS_INITIATED_ADMIN_COLLECTIONS = 'READ_ALL_COLLECTIONS_INITIATED_ADMIN_COLLECTIONS';
export const READ_ALL_COLLECTIONS_SUCCESS_ADMIN_COLLECTIONS = 'READ_ALL_COLLECTIONS_SUCCESS_ADMIN_COLLECTIONS';
export const READ_ALL_COLLECTIONS_FAILURE_ADMIN_COLLECTIONS = 'READ_ALL_COLLECTIONS_FAILURE_ADMIN_COLLECTIONS';
export const ON_LOAD_MORE_INITIATE_ADMIN_COLLECTIONS = 'ON_LOAD_MORE_INITIATE_ADMIN_COLLECTIONS';
export const ON_LOAD_MORE_SUCCESS_ADMIN_COLLECTIONS = 'ON_LOAD_MORE_SUCCESS_ADMIN_COLLECTIONS';
export const ON_LOAD_MORE_FAILURE_ADMIN_COLLECTIONS = 'ON_LOAD_MORE_FAILURE_ADMIN_COLLECTIONS';
export const ITERATE_LOAD_AFTER_ADMIN_COLLECTIONS = 'ITERATE_LOAD_AFTER_ADMIN_COLLECTIONS';

// Manage Collections Update - Admin

// View
export const ON_MOUNT_UPDATE_INITIATE_ADMIN_COLLECTIONS = 'ON_MOUNT_UPDATE_INITIATE_ADMIN_COLLECTIONS';
export const ON_MOUNT_UPDATE_SUCCESS_ADMIN_COLLECTIONS = 'ON_MOUNT_UPDATE_SUCCESS_ADMIN_COLLECTIONS';
export const ON_MOUNT_UPDATE_FAILURE_ADMIN_COLLECTIONS = 'ON_MOUNT_UPDATE_FAILURE_ADMIN_COLLECTIONS';
export const ON_USER_ID_CHANGE_UPDATE_ADMIN_COLLECTIONS = 'ON_USER_ID_CHANGE_UPDATE_ADMIN_COLLECTIONS';
export const ON_USER_NAME_CHANGE_UPDATE_ADMIN_COLLECTIONS = 'ON_USER_NAME_CHANGE_UPDATE_ADMIN_COLLECTIONS';
export const ON_PROFILE_PICTURE_LINK_CHANGE_UPDATE_ADMIN_COLLECTIONS = 'ON_PROFILE_PICTURE_LINK_CHANGE_UPDATE_ADMIN_COLLECTIONS';
export const ON_COLLECTION_NAME_CHANGE_UPDATE_ADMIN_COLLECTIONS = 'ON_COLLECTION_NAME_CHANGE_UPDATE_ADMIN_COLLECTIONS';
export const ON_COLLECTION_DESCRIPTION_CHANGE_UPDATE_ADMIN_COLLECTIONS = 'ON_COLLECTION_DESCRIPTION_CHANGE_UPDATE_ADMIN_COLLECTIONS';
export const ON_PICTURES_ARRAY_CHANGE_UPDATE_ADMIN_COLLECTIONS = 'ON_PICTURES_ARRAY_CHANGE_UPDATE_ADMIN_COLLECTIONS';
export const ON_ADD_INPUT_FIELDS_UPDATE_ADMIN_COLLECTIONS = 'ON_ADD_INPUT_FIELDS_UPDATE_ADMIN_COLLECTIONS';
export const ON_REMOVE_INPUT_FIELDS_UPDATE_ADMIN_COLLECTIONS = 'ON_REMOVE_INPUT_FIELDS_UPDATE_ADMIN_COLLECTIONS';
export const ON_UPDATE_COLLECTION_INITIATE_ADMIN_COLLECTIONS = 'ON_UPDATE_COLLECTION_INITIATE_ADMIN_COLLECTIONS';
export const ON_UPDATE_COLLECTION_SUCCESS_ADMIN_COLLECTIONS = 'ON_UPDATE_COLLECTION_SUCCESS_ADMIN_COLLECTIONS';
export const ON_UPDATE_COLLECTION_FAILURE_ADMIN_COLLECTIONS = 'ON_UPDATE_COLLECTION_FAILURE_ADMIN_COLLECTIONS';
// Component
export const ON_SLIDE_INDEX_CHANGE_UPDATE_ADMIN_COLLECTIONS = 'ON_SLIDE_INDEX_CHANGE_UPDATE_ADMIN_COLLECTIONS';

// Manage News Create - Admin

// View
export const ON_CREATE_INITIATE_ADMIN_NEWS = 'ON_CREATE_INITIATE_ADMIN_NEWS';
export const ON_NEWS_TITLE_CHANGE_ADMIN_NEWS = 'ON_NEWS_TITLE_CHANGE_ADMIN_NEWS';
export const ON_NEWS_COVER_LINK_CHANGE_ADMIN_NEWS = 'ON_NEWS_COVER_LINK_CHANGE_ADMIN_NEWS';
export const ON_NEWS_DESCRIPTION_CHANGE_ADMIN_NEWS = 'ON_NEWS_DESCRIPTION_CHANGE_ADMIN_NEWS';
export const ON_SAVE_NEWS_INITIATE_ADMIN_NEWS = 'ON_SAVE_NEWS_INITIATE_ADMIN_NEWS';
export const ON_SAVE_NEWS_SUCCESS_ADMIN_NEWS = 'ON_SAVE_NEWS_SUCCESS_ADMIN_NEWS';
export const ON_SAVE_NEWS_FAILURE_ADMIN_NEWS = 'ON_SAVE_NEWS_FAILURE_ADMIN_NEWS';
// Component
export const ON_SLIDE_INDEX_CHANGE_ADMIN_NEWS = 'ON_SLIDE_INDEX_CHANGE_ADMIN_NEWS';

// Manage News Delete - Admin

// View
export const ON_DELETE_INITIATE_ADMIN_NEWS = 'ON_DELETE_INITIATE_ADMIN_NEWS';
export const ON_DELETE_INITIATE_SUCCESS_ADMIN_NEWS = 'ON_DELETE_INITIATE_SUCCESS_ADMIN_NEWS';
export const ON_DELETE_INITIATE_FAILURE_ADMIN_NEWS = 'ON_DELETE_INITIATE_FAILURE_ADMIN_NEWS';
export const ON_DELETE_EXECUTE_INITIATE_ADMIN_NEWS = 'ON_DELETE_EXECUTE_INITIATE_ADMIN_NEWS';
export const ON_DELETE_EXECUTE_SUCCESS_ADMIN_NEWS = 'ON_DELETE_EXECUTE_SUCCESS_ADMIN_NEWS';
export const ON_DELETE_EXECUTE_FAILURE_ADMIN_NEWS = 'ON_DELETE_EXECUTE_FAILURE_ADMIN_NEWS';

// Manage News Update - Admin

// View
export const ON_MOUNT_UPDATE_INITIATE_ADMIN_NEWS = 'ON_MOUNT_UPDATE_INITIATE_ADMIN_NEWS';
export const ON_MOUNT_UPDATE_SUCCESS_ADMIN_NEWS = 'ON_MOUNT_UPDATE_SUCCESS_ADMIN_NEWS';
export const ON_MOUNT_UPDATE_FAILURE_ADMIN_NEWS = 'ON_MOUNT_UPDATE_FAILURE_ADMIN_NEWS';
export const ON_NEWS_TITLE_CHANGE_UPDATE_ADMIN_NEWS = 'ON_NEWS_TITLE_CHANGE_UPDATE_ADMIN_NEWS';
export const ON_NEWS_DESCRIPTION_CHANGE_UPDATE_ADMIN_NEWS = 'ON_NEWS_DESCRIPTION_CHANGE_UPDATE_ADMIN_NEWS';
export const ON_NEWS_COVER_LINK_CHANGE_UPDATE_ADMIN_NEWS = 'ON_NEWS_COVER_LINK_CHANGE_UPDATE_ADMIN_NEWS';
export const ON_UPDATE_NEWS_INITIATE_ADMIN_NEWS = 'ON_UPDATE_NEWS_INITIATE_ADMIN_NEWS';
export const ON_UPDATE_NEWS_SUCCESS_ADMIN_NEWS = 'ON_UPDATE_NEWS_SUCCESS_ADMIN_NEWS';
export const ON_UPDATE_NEWS_FAILURE_ADMIN_NEWS = 'ON_UPDATE_NEWS_FAILURE_ADMIN_NEWS';
// Component
export const ON_SLIDE_INDEX_CHANGE_UPDATE_ADMIN_NEWS = 'ON_SLIDE_INDEX_CHANGE_UPDATE_ADMIN_NEWS';

// Manage Users - Admin

// View
export const ON_FETCH_ALL_USERS_INITIATE_ADMIN = 'ON_FETCH_ALL_USERS_INITIATE_ADMIN';
export const ON_FETCH_ALL_USERS_SUCCESS_ADMIN = 'ON_FETCH_ALL_USERS_SUCCESS_ADMIN';
export const ON_FETCH_ALL_USERS_FAILURE_ADMIN = 'ON_FETCH_ALL_USERS_FAILURE_ADMIN';
export const ON_ADD_MODERATORS_INITIATE_ADMIN = 'ON_ADD_MODERATOR_INITIATE_ADMIN';
export const ON_ADD_MODERATORS_SUCCESS_ADMIN = 'ON_ADD_MODERATORS_SUCCESS_ADMIN';
export const ON_ADD_MODERATORS_FAILURE_ADMIN = 'ON_ADD_MODERATORS_FAILURE_ADMIN';
export const ON_BAN_USER_INITIATE_ADMIN = 'ON_BAN_USER_INITIATE_ADMIN';
export const ON_BAN_USER_SUCCESS_ADMIN = 'ON_BAN_USER_SUCCESS_ADMIN';
export const ON_BAN_USER_FAILURE_ADMIN = 'ON_BAN_USER_FAILURE_ADMIN';
export const ON_CHANGE_APP_MODE = 'ON_CHANGE_APP_MODE';
export const ON_SEARCH_QUERY_CHANGE_USERS_ADMIN = 'ON_SEARCH_QUERY_CHANGE_USERS_ADMIN';
export const ON_SEARCH_USERS_INITIATE_ADMIN = 'ON_SEARCH_USERS_INITIATE_ADMIN';
export const ON_SEARCH_USERS_SUCCESS_ADMIN = 'ON_SEARCH_USERS_SUCCESS_ADMIN';
export const ON_SEARCH_USERS_FAILURE_ADMIN = 'ON_SEARCH_USERS_FAILURE_ADMIN';
export const ON_GET_ROWS_USERS_ADMIN = 'ON_GET_ROWS_USERS_ADMIN';
export const ON_GET_ROWS_FOUND_USERS_ADMIN = 'ON_GET_ROWS_FOUND_USERS_ADMIN';
// Component
export const ON_OPEN_SNACK_BAR_USERS_ADMIN = 'ON_OPEN_SNACK_BAR_USERS_ADMIN';
export const ON_CLOSE_SNACK_BAR_USERS_ADMIN = 'ON_CLOSE_SNACK_BAR_USERS_ADMIN';

// Logs - Collections - Create
export const ON_FETCH_LOGS_CREATE_COLLECTIONS_INITIATE = 'ON_FETCH_LOGS_CREATE_COLLECTIONS_INITIATE';
export const ON_FETCH_LOGS_CREATE_COLLECTIONS_SUCCESS = 'ON_FETCH_LOGS_CREATE_COLLECTIONS_SUCCESS';
export const ON_FETCH_LOGS_CREATE_COLLECTIONS_FAILURE = 'ON_FETCH_LOGS_CREATE_COLLECTIONS_FAILURE';

// Logs - Collections - Delete
export const ON_FETCH_LOGS_DELETE_COLLECTIONS_INITIATE = 'ON_FETCH_LOGS_DELETE_COLLECTIONS_INITIATE';
export const ON_FETCH_LOGS_DELETE_COLLECTIONS_SUCCESS = 'ON_FETCH_LOGS_DELETE_COLLECTIONS_SUCCESS';
export const ON_FETCH_LOGS_DELETE_COLLECTIONS_FAILURE = 'ON_FETCH_LOGS_DELETE_COLLECTIONS_FAILURE';

// Logs - Collections - Update
export const ON_FETCH_LOGS_UPDATE_COLLECTIONS_INITIATE = 'ON_FETCH_LOGS_UPDATE_COLLECTIONS_INITIATE';
export const ON_FETCH_LOGS_UPDATE_COLLECTIONS_SUCCESS = 'ON_FETCH_LOGS_UPDATE_COLLECTIONS_SUCCESS';
export const ON_FETCH_LOGS_UPDATE_COLLECTIONS_FAILURE = 'ON_FETCH_LOGS_UPDATE_COLLECTIONS_FAILURE';

// Logs - Login
export const ON_FETCH_LOGS_LOGIN_INITIATE = 'ON_FETCH_LOGS_LOGIN_INITIATE';
export const ON_FETCH_LOGS_LOGIN_SUCCESS = 'ON_FETCH_LOGS_LOGIN_SUCCESS';
export const ON_FETCH_LOGS_LOGIN_FAILURE = 'ON_FETCH_LOGS_LOGIN_FAILURE';

// Logs - Sign Up
export const ON_FETCH_LOGS_SIGN_UP_INITIATE = 'ON_FETCH_LOGS_SIGN_UP_INITIATE';
export const ON_FETCH_LOGS_SIGN_UP_SUCCESS = 'ON_FETCH_LOGS_SIGN_UP_SUCCESS';
export const ON_FETCH_LOGS_SIGN_UP_FAILURE = 'ON_FETCH_LOGS_SIGN_UP_FAILURE';

// Logs - Profile Update
export const ON_FETCH_LOGS_PROFILE_UPDATE_INITIATE = 'ON_FETCH_LOGS_PROFILE_UPDATE_INITIATE';
export const ON_FETCH_LOGS_PROFILE_UPDATE_SUCCESS = 'ON_FETCH_LOGS_PROFILE_UPDATE_SUCCESS';
export const ON_FETCH_LOGS_PROFILE_UPDATE_FAILURE = 'ON_FETCH_LOGS_PROFILE_UPDATE_FAILURE';

// Logs - News - Create
export const ON_FETCH_LOGS_CREATE_NEWS_INITIATE = 'ON_FETCH_LOGS_CREATE_NEWS_INITIATE';
export const ON_FETCH_LOGS_CREATE_NEWS_SUCCESS = 'ON_FETCH_LOGS_CREATE_NEWS_SUCCESS';
export const ON_FETCH_LOGS_CREATE_NEWS_FAILURE = 'ON_FETCH_LOGS_CREATE_NEWS_FAILURE';

// Logs - News - Delete
export const ON_FETCH_LOGS_DELETE_NEWS_INITIATE = 'ON_FETCH_LOGS_DELETE_NEWS_INITIATE';
export const ON_FETCH_LOGS_DELETE_NEWS_SUCCESS = 'ON_FETCH_LOGS_DELETE_NEWS_SUCCESS';
export const ON_FETCH_LOGS_DELETE_NEWS_FAILURE = 'ON_FETCH_LOGS_DELETE_NEWS_FAILURE';

// Logs - News - Update
export const ON_FETCH_LOGS_UPDATE_NEWS_INITIATE = 'ON_FETCH_LOGS_UPDATE_NEWS_INITIATE';
export const ON_FETCH_LOGS_UPDATE_NEWS_SUCCESS = 'ON_FETCH_LOGS_UPDATE_NEWS_SUCCESS';
export const ON_FETCH_LOGS_UPDATE_NEWS_FAILURE = 'ON_FETCH_LOGS_UPDATE_NEWS_FAILURE';

// Manage Collections Create

// View
export const ON_CREATE_INITIATE = 'ON_CREATE_INITIATE';
export const ON_COLLECTION_NAME_CHANGE = 'ON_COLLECTION_NAME_CHANGE';
export const ON_COLLECTION_DESCRIPTION_CHANGE = 'ON_COLLECTION_DESCRIPTION_CHANGE';
export const ON_PICTURES_ARRAY_CHANGE = 'ON_PICTURES_ARRAY_CHANGE';
export const ON_ADD_INPUT_FIELDS = 'ON_ADD_INPUT_FIELDS';
export const ON_REMOVE_INPUT_FIELDS = 'ON_REMOVE_INPUT_FIELDS';
export const ON_SAVE_COLLECTION_INITIATE = 'ON_SAVE_COLLECTION_INITIATE';
export const ON_SAVE_COLLECTION_SUCCESS = 'ON_SAVE_COLLECTION_SUCCESS';
export const ON_SAVE_COLLECTION_FAILURE = 'ON_SAVE_COLLECTION_FAILURE';
// Component
export const ON_SLIDE_INDEX_CHANGE = 'ON_SLIDE_INDEX_CHANGE';

// Manage Collections Delete

// View
export const ON_DELETE_INITIATE = 'ON_DELETE_INITIATE';
export const ON_DELETE_INITIATE_SUCCESS = 'ON_DELETE_INITIATE_SUCCESS';
export const ON_DELETE_INITIATE_FAILURE = 'ON_DELETE_INITIATE_FAILURE';
export const ON_DELETE_EXECUTE_INITIATE = 'ON_DELETE_EXECUTE_INITIATE';
export const ON_DELETE_EXECUTE_SUCCESS = 'ON_DELETE_EXECUTE_SUCCESS';
export const ON_DELETE_EXECUTE_FAILURE = 'ON_DELETE_EXECUTE_FAILURE';

// Manage Collections ReadAll

// View
export const READ_ALL_COLLECTIONS_INITIATED = 'READ_ALL_COLLECTIONS_INITIATED';
export const READ_ALL_COLLECTIONS_SUCCESS = 'READ_ALL_COLLECTIONS_SUCCESS';
export const READ_ALL_COLLECTIONS_FAILURE = 'READ_ALL_COLLECTIONS_FAILURE';
export const ON_LOAD_MORE_INITIATE = 'ON_LOAD_MORE_INITIATE';
export const ON_LOAD_MORE_SUCCESS = 'ON_LOAD_MORE_SUCCESS';
export const ON_LOAD_MORE_FAILURE = 'ON_LOAD_MORE_FAILURE';
export const ITERATE_LOAD_AFTER = 'ITERATE_LOAD_AFTER';

// Manage Collections ReadOne

// View
export const READ_ONE_COLLECTION = 'READ_ONE_COLLECTION';
export const GET_COMMENTS_INITIATED = 'GET_COMMENTS_INITIATED';
export const GET_COMMENTS_SUCCESS = 'GET_COMMENTS_SUCCESS';
export const GET_COMMENTS_FAILURE = 'GET_COMMENTS_FAILURE';
export const ON_LOAD_MORE_COMMENTS_INITIATE = 'ON_LOAD_MORE_COMMENTS_INITIATE';
export const ON_LOAD_MORE_COMMENTS_SUCCESS = 'ON_LOAD_MORE_COMMENTS_SUCCESS';
export const ON_LOAD_MORE_COMMENTS_FAILURE = 'ON_LOAD_MORE_COMMENTS_FAILURE';
export const ITERATE_COMMENTS_LOAD_AFTER = 'ITERATE_COMMENTS_LOAD_AFTER';
export const ON_CHANGE_COMMENT_INPUT = 'ON_CHANGE_COMMENT_INPUT';
export const ON_SAVE_COMMENT_INITIATE = 'ON_SAVE_COMMENT_INITIATE';
export const ON_SAVE_COMMENT_SUCCESS = 'ON_SAVE_COMMENT_SUCCESS';
export const ON_SAVE_COMMENT_FAILURE = 'ON_SAVE_COMMENT_FAILURE';
export const GET_COMMENTS_COUNT = 'GET_COMMENTS_COUNT';
export const ON_DELETE_COMMENT_INITIATE = 'ON_DELETE_COMMENT_INITIATE';
export const ON_DELETE_COMMENT_SUCCESS = 'ON_DELETE_COMMENT_SUCCESS';
export const ON_DELETE_COMMENT_FAILURE = 'ON_DELETE_COMMENT_FAILURE';
export const ON_RESET_REDUCER_MANAGE_COLLECTIONS = 'ON_RESET_REDUCER_MANAGE_COLLECTIONS';

// Manage Collections Update

// View
export const ON_MOUNT_UPDATE_INITIATE = 'ON_MOUNT_UPDATE_INITIATE';
export const ON_MOUNT_UPDATE_SUCCESS = 'ON_MOUNT_UPDATE_SUCCESS';
export const ON_MOUNT_UPDATE_FAILURE = 'ON_MOUNT_UPDATE_FAILURE';
export const ON_COLLECTION_NAME_CHANGE_UPDATE = 'ON_COLLECTION_NAME_CHANGE_UPDATE';
export const ON_COLLECTION_DESCRIPTION_CHANGE_UPDATE = 'ON_COLLECTION_DESCRIPTION_CHANGE_UPDATE';
export const ON_PICTURES_ARRAY_CHANGE_UPDATE = 'ON_PICTURES_ARRAY_CHANGE_UPDATE';
export const ON_ADD_INPUT_FIELDS_UPDATE = 'ON_ADD_INPUT_FIELDS_UPDATE';
export const ON_REMOVE_INPUT_FIELDS_UPDATE = 'ON_REMOVE_INPUT_FIELDS';
export const ON_UPDATE_COLLECTION_INITIATE = 'ON_UPDATE_COLLECTION_INITIATE';
export const ON_UPDATE_COLLECTION_SUCCESS = 'ON_UPDATE_COLLECTION_SUCCESS';
export const ON_UPDATE_COLLECTION_FAILURE = 'ON_UPDATE_COLLECTION_FAILURE';
// Component
export const ON_SLIDE_INDEX_CHANGE_UPDATE = 'ON_SLIDE_INDEX_CHANGE_UPDATE';

// Browse Collections ReadAll

// View
export const READ_ALL_COLLECTIONS_BROWSE_INITIATED = 'READ_ALL_COLLECTIONS_BROWSE_INITIATED';
export const READ_ALL_COLLECTIONS_BROWSE_SUCCESS = 'READ_ALL_COLLECTIONS_BROWSE_SUCCESS';
export const READ_ALL_COLLECTIONS_BROWSE_FAILURE = 'READ_ALL_COLLECTIONS_BROWSE_SUCCESS';
export const ON_LOAD_MORE_BROWSE_INITIATE = 'ON_LOAD_MORE_BROWSE_INITIATE';
export const ON_LOAD_MORE_BROWSE_SUCCESS = 'ON_LOAD_MORE_BROWSE_SUCCESS';
export const ON_LOAD_MORE_BROWSE_FAILURE = 'ON_LOAD_MORE_BROWSE_FAILURE';
export const ITERATE_LOAD_AFTER_BROWSE = 'ITERATE_LOAD_AFTER_BROWSE';

// Browse Collections ReadOne

// View
export const READ_ONE_COLLECTION_BROWSE = 'READ_ONE_COLLECTION_BROWSE';
export const GET_COMMENTS_BROWSE_INITIATED = 'GET_COMMENTS_BROWSE_INITIATED';
export const GET_COMMENTS_BROWSE_SUCCESS = 'GET_COMMENTS_BROWSE_SUCCESS';
export const GET_COMMENTS_BROWSE_FAILURE = 'GET_COMMENTS_BROWSE_FAILURE';
export const ON_LOAD_MORE_COMMENTS_BROWSE_INITIATE = 'ON_LOAD_MORE_COMMENTS_BROWSE_INITIATE';
export const ON_LOAD_MORE_COMMENTS_BROWSE_SUCCESS = 'ON_LOAD_MORE_COMMENTS_BROWSE_SUCCESS';
export const ON_LOAD_MORE_COMMENTS_BROWSE_FAILURE = 'ON_LOAD_MORE_COMMENTS_BROWSE_FAILURE';
export const ITERATE_COMMENTS_LOAD_AFTER_BROWSE = 'ITERATE_COMMENTS_LOAD_AFTER_BROWSE';
export const ON_CHANGE_COMMENT_INPUT_BROWSE = 'ON_CHANGE_COMMENT_INPUT_BROWSE';
export const ON_SAVE_COMMENT_BROWSE_INITIATE = 'ON_SAVE_COMMENT_BROWSE_INITIATE';
export const ON_SAVE_COMMENT_BROWSE_SUCCESS = 'ON_SAVE_COMMENT_BROWSE_SUCCESS';
export const ON_SAVE_COMMENT_BROWSE_FAILURE = 'ON_SAVE_COMMENT_BROWSE_FAILURE';
export const GET_COMMENTS_COUNT_BROWSE = 'GET_COMMENTS_COUNT_BROWSE';
export const ON_RESET_REDUCER_BROWSE_COLLECTIONS = 'ON_RESET_REDUCER_BROWSE_COLLECTIONS';

// Browse News ReadAll

// View
export const READ_ALL_NEWS_BROWSE_INITIATED = 'READ_ALL_NEWS_BROWSE_INITIATED';
export const READ_ALL_NEWS_BROWSE_SUCCESS = 'READ_ALL_NEWS_BROWSE_SUCCESS';
export const READ_ALL_NEWS_BROWSE_FAILURE = 'READ_ALL_NEWS_BROWSE_FAILURE';
export const ON_LOAD_MORE_BROWSE_NEWS_INITIATE = 'ON_LOAD_MORE_BROWSE_NEWS_INITIATE';
export const ON_LOAD_MORE_BROWSE_NEWS_SUCCESS = 'ON_LOAD_MORE_BROWSE_NEWS_SUCCESS';
export const ON_LOAD_MORE_BROWSE_NEWS_FAILURE = 'ON_LOAD_MORE_BROWSE_NEWS_FAILURE';
export const ITERATE_LOAD_AFTER_BROWSE_NEWS = 'ITERATE_LOAD_AFTER_BROWSE_NEWS';

// Browse News ReadOne

// View
export const READ_ONE_NEWS_BROWSE_INITIATE = 'READ_ONE_NEWS_BROWSE_INITIATE';
export const READ_ONE_NEWS_BROWSE_SUCCESS = 'READ_ONE_NEWS_BROWSE_SUCCESS';
export const READ_ONE_NEWS_BROWSE_FAILURE = 'READ_ONE_NEWS_BROWSE_FAILURE';
export const GET_COMMENTS_NEWS_BROWSE_INITIATED = 'GET_COMMENTS_NEWS_BROWSE_INITIATED';
export const GET_COMMENTS_NEWS_BROWSE_SUCCESS = 'GET_COMMENTS_NEWS_BROWSE_SUCCESS';
export const GET_COMMENTS_NEWS_BROWSE_FAILURE = 'GET_COMMENTS_NEWS_BROWSE_FAILURE';
export const ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_INITIATE = 'ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_INITIATE';
export const ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_SUCCESS = 'ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_SUCCESS';
export const ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_FAILURE = 'ON_LOAD_MORE_COMMENTS_NEWS_BROWSE_FAILURE';
export const ITERATE_COMMENTS_LOAD_AFTER_NEWS_BROWSE = 'ITERATE_COMMENTS_LOAD_AFTER_NEWS_BROWSE';
export const ON_CHANGE_COMMENT_INPUT_NEWS_BROWSE = 'ON_CHANGE_COMMENT_INPUT_NEWS_BROWSE';
export const ON_SAVE_COMMENT_NEWS_BROWSE_INITIATE = 'ON_SAVE_COMMENT_NEWS_BROWSE_INITIATE';
export const ON_SAVE_COMMENT_NEWS_BROWSE_SUCCESS = 'ON_SAVE_COMMENT_NEWS_BROWSE_SUCCESS';
export const ON_SAVE_COMMENT_NEWS_BROWSE_FAILURE = 'ON_SAVE_COMMENT_NEWS_BROWSE_FAILURE';
export const GET_COMMENTS_COUNT_NEWS_BROWSE = 'GET_COMMENTS_COUNT_NEWS_BROWSE';
export const ON_DELETE_COMMENT_NEWS_INITIATE = 'ON_DELETE_COMMENT_NEWS_INITIATE';
export const ON_DELETE_COMMENT_NEWS_SUCCESS = 'ON_DELETE_COMMENT_NEWS_SUCCESS';
export const ON_DELETE_COMMENT_NEWS_FAILURE = 'ON_DELETE_COMMENT_NEWS_FAILURE';
export const ON_RESET_REDUCER_BROWSE_NEWS = 'ON_RESET_REDUCER_BROWSE_NEWS';
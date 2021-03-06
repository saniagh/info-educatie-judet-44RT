import React, {Component} from 'react'
import PropTypes from 'prop-types';
import RichTextEditor from 'react-rte';
import {stateToHTML} from 'draft-js-export-html';
import {convertToRaw} from 'draft-js';
import {connect} from 'react-redux';
import Create from '../../../components/Admin/Collections/Main Components/Create.jsx';
import * as createActions from '../../../actions/Admin/Collections/manageCollectionsCreateActionsAdmin.js';
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';
import LoadingIndicator from "../../../components/Loading Indicator/LoadingIndicator.jsx";
import {Chip} from 'material-ui';
import {smoothScroll} from '../../MainApp/functions.js';

let createHandler = function (dispatch) {
    let getInitialState = function (collectionDescription, pictureDescription) {
        dispatch(createActions.onCreateInitiate(collectionDescription, pictureDescription))
    };

    let onUserIdChange = function (userId) {
        dispatch(createActions.onUserIdChange(userId))
    };

    let onUserNameChange = function (userName) {
        dispatch(createActions.onUserNameChange(userName))
    };

    let onProfilePictureLinkChange = function (profilePictureLink) {
        dispatch(createActions.onProfilePictureLinkChange(profilePictureLink))
    };

    let onCollectionNameChange = function (collectionName) {
        dispatch(createActions.onCollectionNameChange(collectionName))
    };

    let onCollectionDescriptionChange = function (collectionDescription, __html) {
        dispatch(createActions.onCollectionDescriptionChange(collectionDescription, __html))
    };

    let onPicturesArrayChange = function (pictures) {
        dispatch(createActions.onPicturesArrayChange(pictures))
    };

    let onAddInputField = function (pictures, pictureDescription) {
        dispatch(createActions.onAddInputField(pictures, pictureDescription))
    };

    let onRemoveInputField = function (pictures, index) {
        dispatch(createActions.onRemoveInputField(pictures, index))
    };

    let onSave = function (userId, userName, profilePictureLink, collectionName, collectionDescriptionRaw, pictures, tags) {
        dispatch(createActions.onSaveCollection(userId, userName, profilePictureLink, collectionName, collectionDescriptionRaw, pictures, tags))
    };

    return {
        onUserIdChange,
        onUserNameChange,
        onProfilePictureLinkChange,
        getInitialState,
        onCollectionNameChange,
        onCollectionDescriptionChange,
        onPicturesArrayChange,
        onAddInputField,
        onRemoveInputField,
        onSave
    }
};

class CreateView extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);

        this.state = {
            chipInput: '',
            chips: [],
            mappedChips: ''
        }
    };

    componentDidMount() {
        this.handlers.getInitialState(RichTextEditor.createEmptyValue(), RichTextEditor.createEmptyValue());
    }

    onUserIdChange = (e) => {
        this.handlers.onUserIdChange(e.target.value);
    };

    onUserNameChange = (e) => {
        this.handlers.onUserNameChange(e.target.value);
    };

    onProfilePictureLinkChange = (e) => {
        this.handlers.onProfilePictureLinkChange(e.target.value);
    };

    onCollectionNameChange = (e) => {
        this.handlers.onCollectionNameChange(e.target.value);
    };

    onCollectionDescriptionChange = (value) => {
        this.handlers.onCollectionDescriptionChange(value, stateToHTML(value.getEditorState().getCurrentContent()));
    };

    getHTML = () => {
        let editorState = this.props.UIState.collectionDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let __html = stateToHTML(contentState);
        if (__html.search("/script") === -1 && __html.search("script") === -1)
            return {__html: __html};
    };

    handlePicturesNameChange = (i) => (e) => {
        const newPictures = this.props.UIState.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureName: e.target.value};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handlePicturesLinkChange = (i) => (e) => {
        const newPictures = this.props.UIState.pictures.map((picture, j) => {
            if (i !== j) return picture;
            return {...picture, pictureLink: e.target.value};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handlePicturesDescriptionChange = (i) => (value) => {
        const newPictures = this.props.UIState.pictures.map((picture, j) => {
            if (i !== j) return picture;

            let editorState = value.getEditorState();
            let contentState = editorState.getCurrentContent();
            let rawContentState = window.rawContentState = convertToRaw(contentState);
            return {...picture, pictureDescription: value, pictureDescriptionRaw: JSON.stringify(rawContentState)};
        });
        this.handlers.onPicturesArrayChange(newPictures);
    };

    handleAddPictures = (i) => () => {
        this.handlers.onAddInputField(this.props.UIState.pictures, RichTextEditor.createEmptyValue());
    };

    handleRemovePictures = (i) => () => {
        this.handlers.onRemoveInputField(this.props.UIState.pictures, i);
    };

    onChipInputChange = (e) => {
        this.setState({
            chipInput: e.target.value
        })
    };

    onDeleteTag = (value) => {
        let currentChips = this.state.chips;
        let chipToDelete;
        if (currentChips) {
            for (let i = 0; i < currentChips.length; i++)
                if (currentChips[i].value === value) {
                    chipToDelete = i;
                    break;
                }
        }
        currentChips.splice(chipToDelete, 1);
        const mappedChips = currentChips.map((data, j) => {
            return <Chip key={j}
                         onRequestDelete={() => this.onDeleteTag(data.value)}
                         style={{cursor: "pointer", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"}}
                         labelStyle={{maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"}}>
                {data.value}
            </Chip>;
        });
        this.setState({
            chips: currentChips,
            mappedChips: mappedChips
        });
        localStorage.setItem("tags", JSON.stringify(currentChips));
    };

    onAddTag = (e) => {
        if (e.key === 'Enter') {

            let newChips = this.state.chips.concat({value: e.target.value});
            const mappedChips = newChips.map((data, i) => {
                return <Chip key={i}
                             onRequestDelete={() => this.onDeleteTag(data.value)}
                             style={{cursor: "pointer", maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"}}
                             labelStyle={{maxWidth: "100%", overflow: "hidden", textOverflow: "ellipsis"}}>
                    {data.value}
                </Chip>;
            });
            this.setState({
                chipInput: '',
                mappedChips: mappedChips,
                chips: newChips
            });
            localStorage.setItem("tags", JSON.stringify(newChips));
        }
    };

    onSave = () => {
        smoothScroll();
        // Convert editorState to contentState and then "HTML-ize" it
        let editorState = this.props.UIState.collectionDescription.getEditorState();
        let contentState = editorState.getCurrentContent();
        let rawContentState = window.rawContentState = convertToRaw(contentState);

        const userId = this.props.UIState.userId;
        const userName = this.props.UIState.userName;
        const profilePictureLink = this.props.UIState.profilePictureLink;

        const collectionName = this.props.UIState.collectionName;
        const collectionDescriptionRaw = JSON.stringify(rawContentState);
        const pictures = JSON.stringify(this.props.UIState.pictures);

        const tags = JSON.stringify(this.state.chips);

        this.handlers.onSave(userId, userName, profilePictureLink, collectionName, collectionDescriptionRaw, pictures, tags);
    };

    render() {
        document.title = "Create collections - Admin Controlled";
        if (this.props.credentials.admin === true)
            return (
                <Create
                    adminId={this.props.params._id}
                    userId={this.props.UIState.userId}
                    onUserIdChange={this.onUserIdChange}
                    userName={this.props.UIState.userName}
                    onUserNameChange={this.onUserNameChange}
                    profilePictureLink={this.props.UIState.profilePictureLink}
                    onProfilePictureLinkChange={this.onProfilePictureLinkChange}
                    collectionName={this.props.UIState.collectionName}
                    onCollectionNameChange={this.onCollectionNameChange}
                    collectionDescription={this.props.UIState.collectionDescription}
                    onCollectionDescriptionChange={this.onCollectionDescriptionChange}
                    __html={this.props.UIState.__html}
                    getHTML={this.getHTML}
                    pictures={this.props.UIState.pictures}
                    handlePicturesNameChange={this.handlePicturesNameChange}
                    handlePicturesLinkChange={this.handlePicturesLinkChange}
                    handlePicturesDescriptionChange={this.handlePicturesDescriptionChange}
                    handleAddPictures={this.handleAddPictures}
                    handleRemovePictures={this.handleRemovePictures}
                    onSave={this.onSave}
                    message={this.props.UIState.message}
                    successCreation={this.props.UIState.successCreation}
                    errors={this.props.UIState.errors}
                    pictureNameError={this.props.UIState.pictureNameError}
                    pictureDescriptionError={this.props.UIState.pictureDescriptionError}
                    pictureLinkError={this.props.UIState.pictureLinkError}
                    chipInput={this.state.chipInput}
                    chips={this.state.chips}
                    mappedChips={this.state.mappedChips}
                    onChipInputChange={this.onChipInputChange}
                    onAddTag={this.onAddTag}
                    onDeleteTag={this.onDeleteTag}
                />);
        else if (this.props.credentials.admin === false) return <NotAuthorizedView/>;
        else if (this.props.credentials.fetching === true) return <LoadingIndicator/>;
    }
}

CreateView.propTypes = {
    credentials: React.PropTypes.shape({
        admin: PropTypes.bool,
        fetched: PropTypes.bool,
        fetching: PropTypes.bool
    }),
    UIState: React.PropTypes.shape({
        userId: PropTypes.string,
        userName: PropTypes.string,
        profilePictureLink: PropTypes.string,
        collectionName: PropTypes.string,
        collectionDescription: PropTypes.object,
        pictures: PropTypes.array,
        successCreation: PropTypes.bool,
        errors: PropTypes.object,
        pictureNameError: PropTypes.array,
        pictureLinkError: PropTypes.array,
        pictureDescriptionError: PropTypes.array,
        message: PropTypes.string
    })
};

const credentials = (state) => {
    if (state.userReducer.fetching === true)
        return {
            fetching: true,
            fetched: false,
            admin: null
        };
    else if (state.userReducer.data) {
        return {
            fetching: false,
            fetched: true,
            admin: state.userReducer.data.admin
        }
    }
    else return {
            fetched: true,
            fetching: false,
            admin: false
        }
};

const UIState = (state) => {
    if (state.manageCollectionsCreateReducerAdmin) {
        const statePath = state.manageCollectionsCreateReducerAdmin;
        return {
            userId: statePath.userId,
            userName: statePath.userName,
            profilePictureLink: statePath.profilePictureLink,
            collectionName: statePath.collectionName,
            collectionDescription: statePath.collectionDescription,
            __html: statePath.__html,
            pictures: statePath.pictures,
            successCreation: statePath.successCreation,
            errors: statePath.errors,
            pictureNameError: statePath.pictureNameError,
            pictureLinkError: statePath.pictureLinkError,
            pictureDescriptionError: statePath.pictureDescriptionError,
            message: statePath.message
        }
    }
};

const mapStateToProps = (state) => ({
    credentials: credentials(state),
    UIState: UIState(state)
});

export default connect(mapStateToProps)(CreateView)
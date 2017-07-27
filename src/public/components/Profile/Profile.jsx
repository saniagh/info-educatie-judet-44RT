import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import * as profileActions from '../../actions/Profile/profileActions.js'
import {
    Tabs,
    Tab,
    Card,
    ListItem,
    List,
    Dialog,
    RaisedButton,
    TextField,
    DatePicker,
    CardMedia,
    CardTitle,
    CardText,
    Snackbar
} from 'material-ui';
import SwipeableViews from 'react-swipeable-views';

import LoadingIndicator from '../Loading Indicator/LoadingIndicator.jsx';

import ImageCameraRoll from 'material-ui/svg-icons/image/camera-roll';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import NotFoundView from '../../containers/Error/NotFoundView.jsx';

let createHandler = function (dispatch) {
    let openProfilePictureModal = function () {
        dispatch(profileActions.openProfilePictureModal())
    };

    let closeProfilePictureModal = function () {
        dispatch(profileActions.closeProfilePictureModal())
    };

    let openProfileCoverModal = function () {
        dispatch(profileActions.openProfileCoverModal())
    };

    let closeProfileCoverModal = function () {
        dispatch(profileActions.closeProfileCoverModal())
    };

    let onSlideIndexChange = function (slideIndex) {
        dispatch(profileActions.onSlideIndexChange(slideIndex))
    };

    let closeSnackBar = function () {
        dispatch(profileActions.closeSnackBar())
    };

    return {
        openProfilePictureModal,
        closeProfilePictureModal,
        openProfileCoverModal,
        closeProfileCoverModal,
        onSlideIndexChange,
        closeSnackBar
    }
};

class Profile extends Component {
    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    componentDidMount() {
        window.addEventListener("hashchange", this.onLinkChange)
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.onLinkChange);
    }

    onLinkChange = () => {
        this.closeProfilePictureModal(true);
        this.closeProfileCoverModal(true);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.openSnackBar === true) {
            setTimeout(() => this.handlers.closeSnackBar(), 4000)
        }
    }

    openProfilePictureModal = () => {
        this.handlers.openProfilePictureModal();
    };

    closeProfilePictureModal = (backButton) => {
        this.handlers.closeProfilePictureModal();
        if (backButton === false) {
            this.props.router.goBack();
        }
    };

    openProfileCoverModal = () => {
        this.handlers.openProfileCoverModal();
    };

    closeProfileCoverModal = (backButton) => {
        this.handlers.closeProfileCoverModal();
        if (backButton === false) {
            this.props.router.goBack();
        }
    };

    onSlideIndexChange = (value) => {
        this.handlers.onSlideIndexChange(value)
    };

    combineFunctionsProfilePicture = () => {
        this.props.onCancelEdit();
        this.closeProfilePictureModal(false);
    };

    combineFunctionsProfileCover = () => {
        this.props.onCancelEdit();
        this.closeProfileCoverModal(false);
    };

    addDefaultPicture = (e) => {
        e.target.src = "http://hdimages.org/wp-content/uploads/2017/03/placeholder-image4.jpg"
    };

    render() {
        const actions1 = [
            <RaisedButton
                label="Cancel"
                buttonStyle={{backgroundColor: "#eb7077"}}
                labelStyle={{color: "#ffffff"}}
                onTouchTap={() => {
                    this.closeProfilePictureModal(false);
                    this.props.onCancelEdit();
                }}
            />,
            <RaisedButton
                label="Save"
                onTouchTap={() => {
                    this.closeProfilePictureModal(false);
                    this.props.onSave();
                }}
                buttonStyle={{backgroundColor: "#9b9b9b"}}
                labelStyle={{color: "#ffffff"}}
            />,
        ];

        const actions2 = [
            <RaisedButton
                label="Cancel"
                buttonStyle={{backgroundColor: "#eb7077"}}
                labelStyle={{color: "#ffffff"}}
                onTouchTap={() => {
                    this.closeProfileCoverModal(false);
                    this.props.onCancelEdit();
                }}
            />,
            <RaisedButton
                label="Save"
                buttonStyle={{backgroundColor: "#9b9b9b"}}
                labelStyle={{color: "#ffffff"}}
                onTouchTap={() => {
                    this.closeProfileCoverModal(false);
                    this.props.onSave();
                }}
            />
        ];

        const DateTimeFormat = global.Intl.DateTimeFormat;

        const date = new Date(this.props.profile.birthDate);

        const formattedDate =
            <div>
                {date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
            </div>;

        return (
            <div className="parallax-profile">
                <div className="top-bar-spacing"/>
                {this.props.profile.fetchedProfile === true && this.props.profile.fetchingProfile === false ?
                    <Card className="container-profile"
                          style={{backgroundColor: 'whitesmoke', boxShadow: 'transparent'}}>
                        <Card className="cover-container"
                              style={{backgroundColor: 'whitesmoke', boxShadow: 'transparent'}}>
                            <CardMedia
                                className="force-no-overlay-background"
                                overlay=
                                    {
                                        <Card style={{backgroundColor: 'whitesmoke', boxShadow: 'transparent'}}>
                                            <CardMedia className="force-profile-picture-width">
                                                <img onError={this.addDefaultPicture}
                                                     className="profile-picture"
                                                     style={{borderRadius: "50%"}}
                                                     src={this.props.profile.profilePictureLink ? this.props.profile.profilePictureLink : "/images/img9.jpg"}/>
                                                <Dialog
                                                    autoDetectWindowHeight={false}
                                                    repositionOnUpdate={false}
                                                    style={{paddingTop: 0}}
                                                    title="Change profile picture"
                                                    actions={actions1}
                                                    modal={false}
                                                    open={this.props.openProfilePicture}
                                                    onRequestClose={() => this.combineFunctionsProfilePicture(false)}
                                                    autoScrollBodyContent={true}
                                                >
                                                    <CardMedia>
                                                        <img onError={this.addDefaultPicture}
                                                             style={{borderRadius: "50%", maxHeight: 600}}
                                                             src={this.props.profile.profilePictureLink ? this.props.profile.profilePictureLink : "/images/img9.jpg"}/>
                                                    </CardMedia>
                                                    <TextField
                                                        floatingLabelText="Profile picture link"
                                                        value={this.props.profile.profilePictureLink}
                                                        onChange={this.props.profile.ownUser ? this.props.onProfilePictureLinkChange : null}
                                                        style={{width: "100%"}}
                                                        inputStyle={{color: "#000000"}}
                                                        floatingLabelStyle={{color: "#000000"}}
                                                        underlineFocusStyle={{borderColor: "#000000"}}
                                                    />
                                                </Dialog>
                                            </CardMedia>
                                        </Card>
                                    }>
                                <img onError={this.addDefaultPicture}
                                     style={{height: "auto !important"}}
                                     src={this.props.profile.profileCover ? this.props.profile.profileCover : "/images/img9.jpg"}/>
                                <Dialog
                                    title="Change cover picture"
                                    autoDetectWindowHeight={false}
                                    repositionOnUpdate={false}
                                    style={{paddingTop: 0}}
                                    actions={actions2}
                                    modal={false}
                                    open={this.props.openCoverPicture}
                                    onRequestClose={() => this.combineFunctionsProfileCover(false)}
                                    autoScrollBodyContent={true}
                                >
                                    <CardMedia>
                                        <img onError={this.addDefaultPicture}
                                             style={{borderRadius: "50%"}}
                                             src={this.props.profile.profileCover ? this.props.profile.profileCover : "/images/img9.jpg"}/>
                                    </CardMedia>
                                    <TextField
                                        type="text"
                                        floatingLabelText="Cover picture link"
                                        value={this.props.profile.profileCover}
                                        onChange={this.props.profile.ownUser ? this.props.onProfileCoverChange : null}
                                        style={{width: "100%"}}
                                        inputStyle={{color: "#000000"}}
                                        floatingLabelStyle={{color: "#000000"}}
                                        underlineFocusStyle={{borderColor: "#000000"}}
                                    />
                                </Dialog>
                            </CardMedia>
                            <Card style={{backgroundColor: 'transparent', boxShadow: 'none'}}>
                                <CardTitle>
                                    {this.props.profile.firstName ?
                                        <div className="profile-header">
                                            {this.props.profile.firstName}
                                            <br/> {"@" + this.props.profile.userName}</div>
                                        :
                                        <div className="profile-header">{this.props.profile.userName}</div>}
                                </CardTitle>
                                <CardText>
                                    <Tabs onChange={this.onSlideIndexChange}
                                          value={this.props.slideIndex}
                                          inkBarStyle={{color: "red", backgroundColor: "red"}}
                                          tabItemContainerStyle={{backgroundColor: "#000000"}}
                                          style={{opacity: 0.8}}
                                    >
                                        <Tab icon={<ImageCameraRoll/>} value={0} onTouchTap={this.props.onCancelEdit}/>
                                        <Tab icon={<ActionAccountBox/>} value={1} onTouchTap={this.props.onCancelEdit}/>
                                        {this.props.profile.ownUser ?
                                            <Tab icon={<ActionSettings/>} value={2}/>
                                            :
                                            null
                                        }
                                    </Tabs>
                                    {this.props.profile.ownUser ?
                                        <SwipeableViews index={this.props.slideIndex}
                                                        onChangeIndex={this.onSlideIndexChange}
                                                        animateHeight={true}
                                        >
                                            <div>
                                                <div>
                                                    {this.props.profile.rows1 ? this.props.profile.rows1 : null}
                                                </div>
                                                <div className="mobile-whitespace-fill-profile">
                                                    {this.props.profile.rows2 ? this.props.profile.rows2 : null}
                                                </div>
                                            </div>
                                            <div>
                                                <List>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.firstName}</div>}
                                                              secondaryText="First name"/>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.lastName}</div>}
                                                              secondaryText="Last name"/>
                                                    <ListItem disabled={true} primaryText={formattedDate}
                                                              secondaryText="Birthday"/>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.profession}</div>}
                                                              secondaryText="Job"/>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.companyName}</div>}
                                                              secondaryText="Company name"/>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.city}</div>}
                                                              secondaryText="Lives in"/>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.country}</div>}
                                                              secondaryText="Located in"/>
                                                </List>
                                            </div>
                                            <div>
                                                <List>

                                                    <ListItem disabled={true}
                                                              primaryText={<RaisedButton label="Edit profile picture"
                                                                                         onTouchTap={ () => {
                                                                                             this.openProfilePictureModal(false);
                                                                                             this.props.router.push(`/profile/${this.props.profile.userName}#`);
                                                                                         }}
                                                                                         style={{opacity: 0.8}}
                                                                                         buttonStyle={{backgroundColor: "#000000"}}
                                                                                         labelStyle={{color: "#ffffff"}}
                                                              />}
                                                    />

                                                    <ListItem disabled={true}
                                                              primaryText={<RaisedButton label="Edit profile cover"
                                                                                         onTouchTap={() => {
                                                                                             this.openProfileCoverModal(false);
                                                                                             this.props.router.push(`/profile/${this.props.profile.userName}#`);
                                                                                         }}
                                                                                         style={{opacity: 0.8}}
                                                                                         buttonStyle={{backgroundColor: "#000000"}}
                                                                                         labelStyle={{color: "#ffffff"}}
                                                              />}
                                                    />

                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="First name"
                                                                             value={this.props.profile.firstName}
                                                                             onChange={this.props.onFirstNameChange}
                                                                             errorText={this.props.profile.errors.firstName}
                                                                             inputStyle={{color: "#000000"}}
                                                                             floatingLabelStyle={{color: "#000000"}}
                                                                             underlineFocusStyle={{borderColor: "#000000"}}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="Last name"
                                                                             value={this.props.profile.lastName}
                                                                             onChange={this.props.onLastNameChange}
                                                                             errorText={this.props.profile.errors.lastName}
                                                                             inputStyle={{color: "#000000"}}
                                                                             floatingLabelStyle={{color: "#000000"}}
                                                                             underlineFocusStyle={{borderColor: "#000000"}}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <DatePicker
                                                                      autoOk={true}
                                                                      hintText={formattedDate ? formattedDate : "Your birthday"}
                                                                      firstDayOfWeek={0}
                                                                      formatDate={new DateTimeFormat('en-US', {
                                                                          day: 'numeric',
                                                                          month: 'long',
                                                                          year: 'numeric',
                                                                      }).format}
                                                                      onChange={this.props.onBirthDateChange}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="Job"
                                                                             value={this.props.profile.profession}
                                                                             onChange={this.props.onProfessionChange}
                                                                             errorText={this.props.profile.errors.profession}
                                                                             inputStyle={{color: "#000000"}}
                                                                             floatingLabelStyle={{color: "#000000"}}
                                                                             underlineFocusStyle={{borderColor: "#000000"}}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="Company name"
                                                                             value={this.props.profile.companyName}
                                                                             onChange={this.props.onCompanyNameChange}
                                                                             errorText={this.props.profile.errors.companyName}
                                                                             inputStyle={{color: "#000000"}}
                                                                             floatingLabelStyle={{color: "#000000"}}
                                                                             underlineFocusStyle={{borderColor: "#000000"}}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="City"
                                                                             value={this.props.profile.city}
                                                                             onChange={this.props.onCityChange}
                                                                             errorText={this.props.profile.errors.city}
                                                                             inputStyle={{color: "#000000"}}
                                                                             floatingLabelStyle={{color: "#000000"}}
                                                                             underlineFocusStyle={{borderColor: "#000000"}}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <TextField floatingLabelText="Country"
                                                                             value={this.props.profile.country}
                                                                             onChange={this.props.onCountryChange}
                                                                             errorText={this.props.profile.errors.country}
                                                                             inputStyle={{color: "#000000"}}
                                                                             floatingLabelStyle={{color: "#000000"}}
                                                                             underlineFocusStyle={{borderColor: "#000000"}}/>}
                                                    />
                                                    <ListItem disabled={true}
                                                              primaryText={
                                                                  <RaisedButton
                                                                      label="Save changes"
                                                                      style={{opacity: 0.8}}
                                                                      buttonStyle={{backgroundColor: "#000000"}}
                                                                      labelStyle={{color: "#ffffff"}}
                                                                      onTouchTap={this.props.onSave}/>}
                                                    />
                                                </List>
                                            </div>
                                        </SwipeableViews>
                                        :
                                        <SwipeableViews index={this.props.slideIndex}
                                                        onChangeIndex={this.onSlideIndexChange}
                                                        animateHeight={true}
                                        >
                                            <div>
                                                <div>
                                                    {this.props.profile.rows1 ? this.props.profile.rows1 : null}
                                                </div>
                                                <div className="mobile-whitespace-fill-profile">
                                                    {this.props.profile.rows2 ? this.props.profile.rows2 : null}
                                                </div>
                                            </div>
                                            <div>
                                                <List>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.firstName}</div>}
                                                              secondaryText="First name"/>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.lastName}</div>}
                                                              secondaryText="Last name"/>
                                                    <ListItem disabled={true} primaryText={formattedDate}
                                                              secondaryText="Birthday"/>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.profession}</div>}
                                                              secondaryText="Job"/>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.companyName}</div>}
                                                              secondaryText="Company name"/>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.city}</div>}
                                                              secondaryText="Lives in"/>
                                                    <ListItem disabled={true} primaryText={<div
                                                        className="dialog-break-word">{this.props.profile.country}</div>}
                                                              secondaryText="Located in"/>
                                                </List>
                                            </div>
                                        </SwipeableViews>
                                    }
                                </CardText>
                            </Card>
                        </Card>
                    </Card>
                    :
                    null
                }
                {this.props.profile.fetchingProfile === true && this.props.profile.fetchedProfile === false ?
                    <LoadingIndicator/>
                    : null
                }
                {this.props.profile.fetchingProfile === false && this.props.profile.fetchedProfile === false ?
                    <NotFoundView/>
                    :
                    null
                }
                {this.props.profile.fetchingProfile === false && this.props.profile.fetchedProfile === true && this.props.profile.successStatus === false ?
                    <Snackbar message="An error has occurred"
                              open={this.props.openSnackBar}
                              autoHideDuration={6000}
                              onRequestClose={() => this.handlers.closeSnackBar()}/>
                    : null
                }
                {this.props.profile.fetchingProfile === false && this.props.profile.fetchedProfile === true && this.props.profile.successStatus === true ?
                    <Snackbar message="Success! Please relog!"
                              open={this.props.openSnackBar}
                              autoHideDuration={6000}
                              onRequestClose={() => this.handlers.closeSnackBar()}/>
                    : null
                }
            </div>
        );
    }
}

Profile.propTypes = {
    openProfilePicture: PropTypes.bool,
    openCoverPicture: PropTypes.bool,
    slideIndex: PropTypes.number,
    openSnackBar: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        openProfilePicture: state.profileReducer.openProfilePicture,
        openCoverPicture: state.profileReducer.openCoverPicture,
        slideIndex: state.profileReducer.slideIndex,
        openSnackBar: state.profileReducer.openSnackBar
    }
};

export default connect(mapStateToProps)(Profile)
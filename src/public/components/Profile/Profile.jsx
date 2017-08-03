import React, {Component} from 'react';
import {RaisedButton, TextField, Snackbar, Card} from 'material-ui';

class Profile extends Component {
    render() {
        return (
            <Card>
                <div className="top-bar-spacing"/>
                <TextField value={this.props.profilePictureLink}
                           onChange={this.props.onProfilePictureLinkChange}
                           errorText={this.props.errors && this.props.errors.profilePictureLink ? this.props.errors.profilePictureLink : null}
                           floatingLabelText="Profile picture link"/>
                <RaisedButton label="Save"
                              primary={true}
                              onTouchTap={this.props.onSave}/>

                <Snackbar message={this.props.message}
                          open={this.props.success ? this.props.success : false}
                            autoHideDuration={5000}/>

            </Card>
        )
    }
}

export default Profile
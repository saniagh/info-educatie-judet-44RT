import React, {Component} from 'react';
import {RaisedButton, TextField, Snackbar, Card, CardMedia, CardHeader, CardActions} from 'material-ui';

class Profile extends Component {
    render() {
        return (
            <Card style={{height: document.body.scrollHeight, minWidth: document.body.clientWidth, padding: 30}}
                  className="background-home">
                <div className="top-bar-spacing"/>
                <div style={{display: "flex", flex: 1, justifyContent: "center"}}>
                    <Card style={{padding: 20}}>
                        <CardHeader title="Edit picture"
                                    avatar={this.props.profilePictureLink}/>
                        <TextField value={this.props.profilePictureLink}
                                   onChange={this.props.onProfilePictureLinkChange}
                                   errorText={this.props.errors && this.props.errors.profilePictureLink ? this.props.errors.profilePictureLink : null}
                                   floatingLabelText="Profile picture link"/>
                        <CardMedia style={{maxHeight: 400, width: "auto"}}>
                            <img src={this.props.profilePictureLink}
                                 style={{maxHeight: 400, width: "auto"}}
                                 alt="/images/eu.jpg"/>
                        </CardMedia>
                        <CardActions>
                            <RaisedButton label="Save"
                                          primary={true}
                                          onTouchTap={this.props.onSave}/>
                        </CardActions>
                    </Card>
                </div>


                <Snackbar message="Success! Please relog."
                          open={this.props.success ? this.props.success : false}
                          autoHideDuration={5000}/>

            </Card>
        )
    }
}

export default Profile
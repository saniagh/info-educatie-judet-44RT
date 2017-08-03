import React, {Component} from 'react';
import Auth from '../../modules/Auth.js';
import axios from 'axios';
import qs from 'qs';

import Profile from '../../components/Profile/Profile.jsx';

class ProfileView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            profilePictureLink: "",
            message: "",
            success: null,
            errors: {}
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: '/profile/profile',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`
            }
        }).then((response) => {
            this.setState({
                profilePictureLink: response.data.profilePictureLink
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    onProfilePictureLinkChange = (e) => {
        this.setState({
            profilePictureLink: e.target.value
        })
    };

    onSave = () => {
        axios({
            method: 'post',
            url: '/profile/profilePicture',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                'profilePictureLink': this.state.profilePictureLink
            })
        }).then((response) => {
            this.setState({
                success: true,
                message: response.data.message
            })
        }).catch((err) => {
            this.setState({
                success: false,
                message: err.data.message,
                errors: err.data.errors
            })
        });
    };

    render() {
        return <Profile
            success={this.state.success}
            message={this.state.message}
            profilePictureLink={this.state.profilePictureLink}
            onProfilePictureLinkChange={this.onProfilePictureLinkChange}
            onSave={this.onSave}
        />
    }

}

export default ProfileView;
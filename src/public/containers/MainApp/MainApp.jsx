import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ScrollButton from './ScrollToTopButton.jsx'
import Header from '../../components/MainApp Partials/Header.jsx';
import Footer from '../../components/MainApp Partials/Footer.jsx';

class MainApp extends Component {
    render() {

        if (this.props.location.pathname !== '/collections#') {
            return (

                <div>
                    <Header
                        profilePictureLink={this.props.profilePictureLink}
                        userId={this.props.userId}
                        userName={this.props.userName}
                        isAdmin={this.props.admin}/>
                    {this.props.children}
                    <ScrollButton/>
                    <Footer isAdmin={this.props.admin}
                            userId={this.props.userId}/>
                </div>
            )
        }
        else return (
            <div>
                <Header
                    profilePictureLink={this.props.profilePictureLink}
                    userId={this.props.userId}
                    userName={this.props.userName}
                    isAdmin={this.props.admin}/>
                {this.props.children}
                <ScrollButton/>
                <Footer isAdmin={this.props.admin}
                        userId={this.props.userId}/>
            </div>
        )
    }
}

MainApp.propTypes = {
    userId: PropTypes.string,
    userName: PropTypes.string,
    profilePictureLink: PropTypes.string,
    isAdmin: PropTypes.bool,
    children: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    if (state.userReducer.fetching === true) {
        return {
            guest: false
        }
    }
    else if (state.userReducer.data) {
        const response = state.userReducer.data;
        return {
            userId: response.userId,
            userName: response.userName,
            profilePictureLink: response.profilePictureLink,
            admin: response.admin,
            guest: false
        };
    }
    else if (state.userReducer.fetched === false)
        return {
            guest: true
        };
}

export default connect(mapStateToProps)(MainApp);
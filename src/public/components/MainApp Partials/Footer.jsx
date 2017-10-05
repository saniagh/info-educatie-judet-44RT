import React from 'react';
import {Link} from 'react-router';
import {CardMedia} from 'material-ui';

import Auth from '../../modules/Auth.js';

const Footer = ({isAdmin, userId}) => (
    <footer className="footer">
        <ul className="footer-list">
            <li className="footer-item">
                <div className="footer-item-content first-child">
                    <h3>Quick navigation</h3>
                    <ul className="footer-list links">
                        <li className="footer-item">
                            <i className="material-icons md-18 white1000"
                               style={{position: "relative", top: 3, opacity: "0.6"}}>&#xE315;</i>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li className="footer-item">
                            <i className="material-icons md-18 white1000"
                               style={{position: "relative", top: 3, opacity: "0.6"}}>&#xE315;</i>
                            <Link to={'/collections'}>All Collections</Link>
                        </li>
                        {Auth.isUserAuthenticated() ?
                                <li className="footer-item">
                                    <i className="material-icons md-18 white1000"
                                       style={{position: "relative", top: 3, opacity: "0.6"}}>&#xE315;</i>
                                    <Link to={'/manage'}>My Collections</Link>
                                </li>
                            :
                            null
                        }
                        {Auth.isUserAuthenticated() ?
                            <li className="footer-item">
                                <i className="material-icons md-18 white1000"
                                   style={{position: "relative", top: 3, opacity: "0.6"}}>&#xE315;</i>
                                <Link to={'/profile'}>My Profile</Link>
                            </li>
                            :
                            null
                        }
                        {isAdmin ?
                            <li className="footer-item">
                                <i className="material-icons md-18 white1000"
                                   style={{position: "relative", top: 3, opacity: "0.6"}}>&#xE315;</i>
                                <Link to={`/admin/${userId}`}>Site Administration</Link>
                            </li>
                            :
                            null
                        }
                        {isAdmin ?
                            <li className="footer-item">
                                <i className="material-icons md-18 white1000"
                                   style={{position: "relative", top: 3, opacity: "0.6"}}>&#xE315;</i>
                                <Link to={`/admin/${userId}/users`}>Manage Users</Link>
                            </li>
                            :
                            null
                        }
                        {isAdmin ?
                            <li className="footer-item">
                                <i className="material-icons md-18 white1000"
                                   style={{position: "relative", top: 3, opacity: "0.6"}}>&#xE315;</i>
                                <Link to={`/collections`}>Manage Collections</Link>
                            </li>
                            :
                            null
                        }
                        {isAdmin ?
                            <li className="footer-item">
                                <i className="material-icons md-18 white1000"
                                   style={{position: "relative", top: 3, opacity: "0.6"}}>&#xE315;</i>
                                <Link to={`/news`}>Manage Articles</Link>
                            </li>
                            :
                            null
                        }
                        {isAdmin ?
                            <li className="footer-item">
                                <i className="material-icons md-18 white1000"
                                   style={{position: "relative", top: 3, opacity: "0.6"}}>&#xE315;</i>
                                <Link to={`/admin/${userId}/logs`}>Logs</Link>
                            </li>
                            :
                            null
                        }
                    </ul>
                </div>
            </li>
            <li className="footer-item">
                <div className="footer-item-content last-child">
                    <div className="header-logo">
                        <CardMedia>
                            <img src="/images/logo-inverted.png" style={{maxWidth: 300, maxHeight: 350}}/>
                        </CardMedia>
                    </div>
                </div>
            </li>
        </ul>
    </footer>
);

export default Footer;
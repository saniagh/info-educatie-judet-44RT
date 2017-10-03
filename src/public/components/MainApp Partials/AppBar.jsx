import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {} from 'material-ui';
import * as searchActions from '../../actions/AppBar/searchActions.js';
import {
    Avatar,
    ListItem,
    Divider,
    List,
    AutoComplete,
    Toolbar,
    ToolbarGroup,
    CardMedia,
    Drawer
} from 'material-ui';
import ImageCollections from 'material-ui/svg-icons/image/collections';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import AVLibraryBooks from 'material-ui/svg-icons/av/library-books';
import ActionAnnouncement from 'material-ui/svg-icons/action/announcement';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionPermContactCalendar from 'material-ui/svg-icons/action/perm-contact-calendar';
import ActionSearch from 'material-ui/svg-icons/action/search';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Auth from '../../modules/Auth';

let createHandler = function (dispatch) {

    let onSearchQueryChange = function (searchQuery) {
        dispatch(searchActions.onSearchQueryChange(searchQuery))
    };

    let searchAllCollections = function (searchQuery) {
        dispatch(searchActions.onSearchAll(searchQuery))
    };

    return {
        onSearchQueryChange,
        searchAllCollections
    }
};

class AppBarPersonal extends Component {

    constructor(props, context) {
        super(props, context);

        this.handler = createHandler(this.props.dispatch);

        this.state = {
            isMobileMenuOpened: false,
            isCollectionsDropDownVisible: false,
            isSiteAdministrationDropDownVisible: false
        }
    }

    onClickMobileMenuButton = () => {
        this.setState({
            isMobileMenuOpened: !this.state.isMobileMenuOpened
        })
    };

    onMouseEnterCollectionsButton = () => {
        this.setState({
            isCollectionsDropDownVisible: true
        })
    };

    onMouseLeaveCollectionsButton = () => {
        this.setState({
            isCollectionsDropDownVisible: false
        })
    };

    onMouseEnterSiteAdministrationButton = () => {
        this.setState({
            isSiteAdministrationDropDownVisible: true
        })
    };

    onMouseLeaveSiteAdministrationButton = () => {
        this.setState({
            isSiteAdministrationDropDownVisible: false
        })
    };

    onSearchQueryChange = (e) => {
        this.handler.onSearchQueryChange(e.target.value)
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSearch();
        }
    };

    onSearch = () => {
        this.handler.searchAllCollections(this.props.searchFunction.searchQuery);
        this.context.router.push(`/search/${this.props.searchFunction.searchQuery}`)
    };

    render() {
        return (
            <div style={this.state.isMobileMenuOpened ? {height: 506} : {height: 215}}>
                <header id="masthead"
                        role="banner"
                        className="header">
                    <div className="header-logo">
                        <CardMedia onTouchTap={() => this.context.router.push('/')} style={{cursor: "pointer"}}>
                            <img src="/images/logo-inverted.png" style={{width: 150, height: 125}}/>
                        </CardMedia>
                    </div>

                    <div className="header-navigation">
                        <div className="search-container">
                            <form role="search" className="search-form">
                                <label>
                                    <input type="search"
                                           className="search-input"
                                           placeholder="Search..."
                                           value={this.props.searchFunction.searchQuery}
                                           onKeyDown={this.handleKeyPress}
                                           onChange={this.onSearchQueryChange}/>
                                </label>
                            </form>
                        </div>
                    </div>
                </header>
                <nav className="site-navigation" role="navigation">
                    <div className="nav-container">
                        <ul className="nav-list">
                            <li className="nav-row">
                                <Link to={`/`}
                                      className="nav-item"
                                      activeClassName="active-link-className">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-row"
                                onMouseEnter={this.onMouseEnterCollectionsButton}
                                onMouseLeave={this.onMouseLeaveCollectionsButton}>
                                <Link to={`/collections`}
                                      className="nav-item"
                                      activeClassName="active-link-className">
                                    Collections
                                </Link>
                                {this.state.isCollectionsDropDownVisible ?
                                    <span>
                                        {Auth.isUserAuthenticated() ?
                                            <Link to={`/collections`}
                                                  className="nav-item-drop-down"
                                                  style={this.props.isAdmin === true ? {top: 53, left: 343} : {
                                                      top: 53,
                                                      left: 444
                                                  }}
                                                  activeClassName="active-link-className">
                                                All Collections
                                            </Link>
                                            :
                                            <Link to={`/collections`}
                                                  className="nav-item-drop-down"
                                                  style={{top: 53, left: 446}}
                                                  activeClassName="active-link-className">
                                                All Collections
                                            </Link>
                                        }

                                        {Auth.isUserAuthenticated() ?
                                            <Link to={`/manage`}
                                                  className="nav-item-drop-down"
                                                  style={this.props.isAdmin === true ? {
                                                      top: 100,
                                                      left: 343
                                                  } : {top: 100, left: 444}}
                                                  activeClassName="active-link-className">
                                                My Collections
                                            </Link>
                                            :
                                            null
                                        }
                                    </span>
                                    :
                                    null}
                            </li>
                            {Auth.isUserAuthenticated() ?
                                null
                                :
                                <li className="nav-row">
                                    <Link to={`/login`}
                                          className="nav-item"
                                          activeClassName="active-link-className">
                                        Login
                                    </Link>
                                </li>
                            }
                            {Auth.isUserAuthenticated() ?
                                null
                                :
                                <li className="nav-row">
                                    <Link to={`/signup`}
                                          className="nav-item"
                                          activeClassName="active-link-className">
                                        Register
                                    </Link>
                                </li>
                            }
                            {Auth.isUserAuthenticated() ?
                                <li className="nav-row">
                                    <Link to={`/profile/${this.props.userName}`}
                                          className="nav-item"
                                          activeClassName="active-link-className">
                                        Profile
                                    </Link>
                                </li>
                                :
                                null
                            }
                            {this.props.isAdmin === true ?
                                <li className="nav-row"
                                    onMouseEnter={this.onMouseEnterSiteAdministrationButton}
                                    onMouseLeave={this.onMouseLeaveSiteAdministrationButton}>
                                    <Link to={`/admin/${this.props.userId}`}
                                          className="nav-item"
                                          activeClassName="active-link-className">
                                        Site Administration
                                    </Link>
                                    {this.state.isSiteAdministrationDropDownVisible ?
                                        <span>
                                            <Link to={`/admin/${this.props.userId}/users`}
                                                  className="nav-item-drop-down"
                                                  style={{top: 53, left: 573, minWidth: 200}}
                                                  activeClassName="active-link-className">
                                                Users Management
                                            </Link>
                                            <Link to={`/collections`}
                                                  className="nav-item-drop-down"
                                                  style={{top: 100, left: 573, minWidth: 200}}
                                                  activeClassName="active-link-className">
                                                Manage all collections
                                            </Link>
                                            <Link to={`/news`}
                                                  className="nav-item-drop-down"
                                                  style={{top: 149, left: 573, minWidth: 200}}
                                                  activeClassName="active-link-className">
                                                Manage articles
                                            </Link>
                                            <Link to={`/admin/${this.props.userId}/logs`}
                                                  className="nav-item-drop-down"
                                                  style={{top: 199, left: 573, minWidth: 200}}
                                                  activeClassName="active-link-className">
                                                Logs
                                            </Link>
                                        </span>
                                        :
                                        null
                                    }
                                </li>
                                :
                                null
                            }
                            {Auth.isUserAuthenticated() ?
                                <li className="nav-row">
                                    <Link to={`/logout`}
                                          className="nav-item"
                                          activeClassName="active-link-className">
                                        Logout
                                    </Link>
                                </li>
                                :
                                null
                            }
                        </ul>
                    </div>
                </nav>
                <nav className="mobile-navigation">
                    <div className="mobile-container"
                         style={this.state.isMobileMenuOpened ? {height: "auto"} : {height: 40}}>
                        <div className="mobile-menu-icon-wrap">
                            <i className="material-icons white1000"
                               onTouchEnd={this.onClickMobileMenuButton}>&#xE5D2;</i>
                        </div>
                        <div className="mobile-menu"
                             style={this.state.isMobileMenuOpened ? {
                                 opacity: 1,
                                 top: 0,
                                 zIndex: 1,
                                 position: "static"
                             } : {zIndex: -1}}>
                            <ul className="mobile-list">
                                <li className="mobile-row">
                                    <Link to={`/`}
                                          className="nav-item"
                                          activeClassName="active-link-className-mobile"
                                          onClick={this.onClickMobileMenuButton}>
                                        Home
                                    </Link>
                                </li>
                                <li className="mobile-row">
                                    <Link to={`/collections`}
                                          className="nav-item"
                                          activeClassName="active-link-className-mobile"
                                          onClick={this.onClickMobileMenuButton}>
                                        Collections
                                    </Link>
                                </li>
                                {Auth.isUserAuthenticated() ?
                                    null
                                    :
                                    <li className="mobile-row">
                                        <Link to={`/login`}
                                              className="nav-item"
                                              activeClassName="active-link-className-mobile"
                                              onClick={this.onClickMobileMenuButton}>
                                            Login
                                        </Link>
                                    </li>
                                }
                                {Auth.isUserAuthenticated() ?
                                    null
                                    :
                                    <li className="mobile-row">
                                        <Link to={`/signup`}
                                              className="nav-item"
                                              activeClassName="active-link-className-mobile"
                                              onClick={this.onClickMobileMenuButton}>
                                            Register
                                        </Link>
                                    </li>
                                }
                                {Auth.isUserAuthenticated() ?
                                    <li className="mobile-row">
                                        <Link to={`/manage`}
                                              className="nav-item"
                                              activeClassName="active-link-className-mobile"
                                              onClick={this.onClickMobileMenuButton}>
                                            Management
                                        </Link>
                                    </li>
                                    :
                                    null
                                }
                                {Auth.isUserAuthenticated() ?
                                    <li className="mobile-row">
                                        <Link to={`/profile/${this.props.userName}`}
                                              className="nav-item"
                                              activeClassName="active-link-className-mobile"
                                              onClick={this.onClickMobileMenuButton}>
                                            Profile
                                        </Link>
                                    </li>
                                    :
                                    null
                                }
                                {this.props.isAdmin === true ?
                                    <li className="mobile-row">
                                        <Link to={`/admin/${this.props.userId}`}
                                              className="nav-item"
                                              activeClassName="active-link-className-mobile"
                                              onClick={this.onClickMobileMenuButton}>
                                            Administration
                                        </Link>
                                    </li>
                                    :
                                    null
                                }
                                {Auth.isUserAuthenticated() ?
                                    <li className="mobile-row">
                                        <Link to={`/logout`}
                                              className="nav-item"
                                              activeClassName="active-link-className-mobile"
                                              onClick={this.onClickMobileMenuButton}>
                                            Logout
                                        </Link>
                                    </li>
                                    :
                                    null
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

AppBarPersonal.propTypes = {
    allCollections: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};

AppBarPersonal.contextTypes = {
    router: PropTypes.object.isRequired
};

const allCollections = (state) => {
    if (state.collectionNamesReducer.fetching === true) {
        return {
            fetchingOwnCollections: true,
            allCollections: []
        }
    }
    else if (state.collectionNamesReducer.collections) {
        const response = state.collectionNamesReducer.collections.data.collections;
        let allCollections = Object.keys(response).map((key) => {
            return response[key].collectionName
        });
        return {
            allCollections: allCollections
        }
    }
    else if (state.collectionNamesReducer.fetched === false) {
        return {
            fetchedOwnCollections: false,
            fetchingOwnCollections: false
        }
    }
};

const searchFunction = (state) => {
    return {
        searchQuery: state.searchReducer.searchQuery,
        allCollections: state.searchReducer.allCollections,
        message: state.searchReducer.message
    }
};

const mapStateToProps = (state) => ({
    allCollections: allCollections(state),
    searchFunction: searchFunction(state)
});

export default connect(mapStateToProps)(AppBarPersonal)

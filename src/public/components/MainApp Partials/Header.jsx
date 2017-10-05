import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as searchActions from '../../actions/AppBar/searchActions.js';
import {CardMedia} from 'material-ui';
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

class Header extends Component {

    constructor(props, context) {
        super(props, context);

        this.handler = createHandler(this.props.dispatch);

        this.state = {
            isMobileMenuOpened: false,
            isCollectionsDropDownVisible: false,
            isSiteAdministrationDropDownVisible: false,
            isCollectionsDropDownVisibleMobile: false,
            isSiteAdministrationDropDownVisibleMobile: false,
            userAgentIsMobile: false
        }
    }

    componentDidMount() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            this.setState({userAgentIsMobile: true})
        }
    }

    onClickMobileMenuButton = () => {
        this.setState({
            isMobileMenuOpened: !this.state.isMobileMenuOpened
        })
    };

    onClickCollectionsButton = () => {
        this.setState({
            isCollectionsDropDownVisibleMobile: !this.state.isCollectionsDropDownVisibleMobile
        })
    };

    onClickSiteAdministrationButton = () => {
        this.setState({
            isSiteAdministrationDropDownVisibleMobile: !this.state.isSiteAdministrationDropDownVisibleMobile
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
            <div>
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
                                    <span>
                                        <i className="material-icons"
                                           style={{
                                               fontSize: 16,
                                               position: "relative",
                                               top: 3,
                                               paddingRight: 3
                                           }}>&#xE88A;</i>
                                        Home
                                    </span>
                                </Link>
                            </li>
                            <li className="nav-row"
                                onMouseEnter={this.onMouseEnterCollectionsButton}
                                onMouseLeave={this.onMouseLeaveCollectionsButton}>
                                <Link to={`/collections`}
                                      className="nav-item"
                                      activeClassName="active-link-className">
                                    <span>
                                        <i className="material-icons"
                                           style={{
                                               fontSize: 16,
                                               position: "relative",
                                               top: 3,
                                               paddingRight: 3
                                           }}>&#xE3B6;</i>
                                        Collections
                                    </span>
                                </Link>
                                {this.state.isCollectionsDropDownVisible ?
                                    <span>
                                        {Auth.isUserAuthenticated() ?
                                            <Link to={`/collections`}
                                                  className="nav-item-drop-down"
                                                  style={this.props.isAdmin === true ? {top: 53, left: 316} : {
                                                      top: 53,
                                                      left: 425
                                                  }}
                                                  activeClassName="active-link-className"
                                                  onClick={this.onMouseLeaveCollectionsButton}>
                                                <span>
                                                        <i className="material-icons"
                                                           style={{
                                                               fontSize: 16,
                                                               position: "relative",
                                                               top: 2,
                                                               paddingRight: 3
                                                           }}>&#xE411;</i>
                                                    All Collections
                                                </span>
                                            </Link>
                                            :
                                            <Link to={`/collections`}
                                                  className="nav-item-drop-down"
                                                  style={{top: 53, left: 426}}
                                                  activeClassName="active-link-className"
                                                  onClick={this.onMouseLeaveCollectionsButton}>
                                                <span>
                                                        <i className="material-icons"
                                                           style={{
                                                               fontSize: 16,
                                                               position: "relative",
                                                               top: 2,
                                                               paddingRight: 3
                                                           }}>&#xE411;</i>
                                                    All Collections
                                                </span>
                                            </Link>
                                        }

                                        {Auth.isUserAuthenticated() ?
                                            <Link to={`/manage`}
                                                  className="nav-item-drop-down"
                                                  style={this.props.isAdmin === true ? {
                                                      top: 100,
                                                      left: 316
                                                  } : {top: 100, left: 425}}
                                                  activeClassName="active-link-className"
                                                  onClick={this.onMouseLeaveCollectionsButton}>
                                                <span>
                                                        <i className="material-icons"
                                                           style={{
                                                               fontSize: 16,
                                                               position: "relative",
                                                               top: 2,
                                                               paddingRight: 3
                                                           }}>&#xE869;</i>
                                                    My Collections
                                                </span>
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
                                        <span>
                                                        <i className="material-icons"
                                                           style={{
                                                               fontSize: 16,
                                                               position: "relative",
                                                               top: 2,
                                                               paddingRight: 3
                                                           }}>&#xE895;</i>
                                                    Login
                                        </span>
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
                                        <span>
                                                        <i className="material-icons"
                                                           style={{
                                                               fontSize: 16,
                                                               position: "relative",
                                                               top: 2,
                                                               paddingRight: 3
                                                           }}>&#xE150;</i>
                                                    Register
                                        </span>
                                    </Link>
                                </li>
                            }
                            {Auth.isUserAuthenticated() ?
                                <li className="nav-row">
                                    <Link to={`/profile/${this.props.userName}`}
                                          className="nav-item"
                                          activeClassName="active-link-className">
                                        <span>
                                        <i className="material-icons"
                                           style={{
                                               fontSize: 16,
                                               position: "relative",
                                               top: 2,
                                               paddingRight: 3
                                           }}>&#xE853;</i>
                                        Profile
                                    </span>
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
                                        <span>
                                                        <i className="material-icons"
                                                           style={{
                                                               fontSize: 16,
                                                               position: "relative",
                                                               top: 2,
                                                               paddingRight: 3
                                                           }}>&#xE8B8;</i>
                                                    Site Administration
                                        </span>
                                    </Link>
                                    {this.state.isSiteAdministrationDropDownVisible ?
                                        <span>
                                            <Link to={`/admin/${this.props.userId}/users`}
                                                  className="nav-item-drop-down"
                                                  style={{top: 53, left: 583, minWidth: 200}}
                                                  activeClassName="active-link-className"
                                                  onClick={this.onMouseLeaveSiteAdministrationButton}>
                                                <span>
                                                        <i className="material-icons"
                                                           style={{
                                                               fontSize: 16,
                                                               position: "relative",
                                                               top: 2,
                                                               paddingRight: 3
                                                           }}>&#xE851;</i>
                                                    Manage Users
                                                </span>
                                            </Link>
                                            <Link to={`/collections`}
                                                  className="nav-item-drop-down"
                                                  style={{top: 100, left: 583, minWidth: 200}}
                                                  activeClassName="active-link-className"
                                                  onClick={this.onMouseLeaveSiteAdministrationButton}>
                                                <span>
                                                        <i className="material-icons"
                                                           style={{
                                                               fontSize: 16,
                                                               position: "relative",
                                                               top: 2,
                                                               paddingRight: 3
                                                           }}>&#xE162;</i>
                                                    Manage Collections
                                                </span>
                                            </Link>
                                            <Link to={`/news`}
                                                  className="nav-item-drop-down"
                                                  style={{top: 149, left: 583, minWidth: 200}}
                                                  activeClassName="active-link-className"
                                                  onClick={this.onMouseLeaveSiteAdministrationButton}>
                                                <span>
                                                        <i className="material-icons"
                                                           style={{
                                                               fontSize: 16,
                                                               position: "relative",
                                                               top: 3,
                                                               paddingRight: 3
                                                           }}>&#xE85A;</i>
                                                    Manage Articles
                                                </span>
                                            </Link>
                                            <Link to={`/admin/${this.props.userId}/logs`}
                                                  className="nav-item-drop-down"
                                                  style={{top: 199, left: 583, minWidth: 200}}
                                                  activeClassName="active-link-className"
                                                  onClick={this.onMouseLeaveSiteAdministrationButton}>
                                                <span>
                                                        <i className="material-icons"
                                                           style={{
                                                               fontSize: 16,
                                                               position: "relative",
                                                               top: 2,
                                                               paddingRight: 3
                                                           }}>&#xE873;</i>
                                                    Logs
                                                </span>
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
                                        <span>
                                                        <i className="material-icons"
                                                           style={{
                                                               fontSize: 16,
                                                               position: "relative",
                                                               top: 2,
                                                               paddingRight: 3
                                                           }}>&#xE879;</i>
                                                    Logout
                                                </span>
                                    </Link>
                                </li>
                                :
                                null
                            }
                        </ul>
                    </div>
                </nav>
                <nav className="mobile-navigation">
                    <div className={this.state.isMobileMenuOpened ? "mobile-container open" : "mobile-container"}>
                        <div className="mobile-menu-icon-wrap">
                            <i className="material-icons white1000 md-24"
                               style={{cursor: "pointer", textDecoration: "none"}}
                               onTouchEnd={this.state.userAgentIsMobile ? this.onClickMobileMenuButton : null}
                                onClick={this.state.userAgentIsMobile ? null : this.onClickMobileMenuButton}>&#xE5D2;</i>
                        </div>
                        <div className="mobile-menu"
                             style={this.state.isMobileMenuOpened ? {
                                 opacity: 1} : {}}>
                            <ul className="mobile-list">
                                <li className="mobile-row">
                                    <Link to={`/`}
                                          className="nav-item"
                                          activeClassName="active-link-className-mobile"
                                          onClick={this.onClickMobileMenuButton}>
                                        <i className="material-icons"
                                           style={{fontSize: 16, position: "relative", top: 3}}>&#xE88A;</i>
                                        <span style={{position: "relative", left: 3}}>
                                                Home
                                            </span>
                                    </Link>
                                </li>
                                <li className="mobile-row">
                                    <span style={{display: "flex", justifyContent: "space-between", flex: 1}}>
                                        <Link to={`/collections`}
                                              className="nav-item"
                                              activeClassName="active-link-className-mobile"
                                              onClick={this.onClickMobileMenuButton}>
                                        <i className="material-icons"
                                           style={{fontSize: 16, position: "relative", top: 3}}>&#xE3B6;</i>
                                            <span style={{position: "relative", left: 3}}>
                                                Collections
                                            </span>
                                        </Link>
                                        {this.state.isCollectionsDropDownVisibleMobile ?
                                            <i className={this.state.isCollectionsDropDownVisibleMobile ? "material-icons redish1000" : "material-icons"}
                                               style={{position: "relative", top: 5, right: 30, cursor: "pointer"}}
                                               onClick={this.onClickCollectionsButton}>&#xE313;</i>
                                            :
                                            <i className={this.state.isCollectionsDropDownVisibleMobile ? "material-icons redish1000" : "material-icons"}
                                               style={{position: "relative", top: 5, right: 30, cursor: "pointer"}}
                                               onClick={this.onClickCollectionsButton}>&#xE315;</i>
                                        }
                                        </span>
                                </li>
                                {this.state.isCollectionsDropDownVisibleMobile ?
                                    <span>
                                        <li className="mobile-row">
                                            <Link to={`/collections`}
                                                  className="nav-item"
                                                  style={{padding: "5px 0 5px 0"}}
                                                  activeClassName="active-link-className-mobile"
                                                  onClick={() => {
                                                      this.onClickMobileMenuButton();
                                                      this.onClickCollectionsButton()
                                                  }}>
                                                <i className="material-icons"
                                                   style={{padding: "5px 0 5px 60px", fontSize: 16}}>&#xE411;</i>
                                            <span style={{position: "absolute", left: 112, bottom: 8}}>
                                                All Collections
                                            </span>
                                            </Link>
                                        </li>
                                        {Auth.isUserAuthenticated() ?
                                            <li className="mobile-row">
                                                <Link to={`/manage`}
                                                      className="nav-item"
                                                      style={{padding: "5px 0 5px 0"}}
                                                      activeClassName="active-link-className-mobile"
                                                      onClick={() => {
                                                          this.onClickMobileMenuButton()
                                                      }}>
                                                    <i className="material-icons"
                                                       style={{padding: "5px 0 5px 60px", fontSize: 16}}>&#xE869;</i>
                                                    <span style={{position: "absolute", left: 112, bottom: 8}}>
                                                My Collections
                                            </span>
                                                </Link>
                                            </li>
                                            :
                                            null
                                        }
                                    </span>
                                    : null}

                                {Auth.isUserAuthenticated() ?
                                    null
                                    :
                                    <li className="mobile-row">
                                        <Link to={`/login`}
                                              className="nav-item"
                                              activeClassName="active-link-className-mobile"
                                              onClick={this.onClickMobileMenuButton}>
                                            <i className="material-icons"
                                               style={{fontSize: 16, position: "relative", top: 3}}>&#xE895;</i>
                                            <span style={{position: "relative", left: 3}}>
                                                Login
                                            </span>
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
                                            <i className="material-icons"
                                               style={{fontSize: 16, position: "relative", top: 3}}>&#xE150;</i>
                                            <span style={{position: "relative", left: 3}}>
                                                Register
                                            </span>
                                        </Link>
                                    </li>
                                }

                                {Auth.isUserAuthenticated() ?
                                    <li className="mobile-row">
                                        <Link to={`/profile/${this.props.userName}`}
                                              className="nav-item"
                                              activeClassName="active-link-className-mobile"
                                              onClick={this.onClickMobileMenuButton}>
                                            <i className="material-icons"
                                               style={{fontSize: 16, position: "relative", top: 3}}>&#xE853;</i>
                                            <span style={{position: "relative", left: 3}}>
                                                Profile
                                            </span>
                                        </Link>
                                    </li>
                                    :
                                    null
                                }
                                {this.props.isAdmin === true ?
                                    <li className="mobile-row">
                                        <span style={{display: "flex", justifyContent: "space-between", flex: 1}}>
                                            <Link to={`/admin/${this.props.userId}`}
                                                  className="nav-item"
                                                  activeClassName="active-link-className-mobile"
                                                  onClick={this.onClickMobileMenuButton}>
                                                <i className="material-icons"
                                                   style={{fontSize: 16, position: "relative", top: 3}}>&#xE8B8;</i>
                                            <span style={{position: "relative", left: 3}}>
                                                Site Administration
                                            </span>
                                        </Link>
                                            {this.state.isSiteAdministrationDropDownVisibleMobile ?
                                                <i className={this.state.isSiteAdministrationDropDownVisibleMobile ? "material-icons redish1000" : "material-icons"}
                                                   style={{position: "relative", top: 5, right: 30}}
                                                   onClick={this.onClickSiteAdministrationButton}>&#xE313;</i>
                                                :
                                                <i className={this.state.isSiteAdministrationDropDownVisibleMobile ? "material-icons redish1000" : "material-icons"}
                                                   style={{position: "relative", top: 5, right: 30}}
                                                   onClick={this.onClickSiteAdministrationButton}>&#xE315;</i>
                                            }
                                        </span>
                                    </li>
                                    :
                                    null
                                }
                                {this.props.isAdmin === true && this.state.isSiteAdministrationDropDownVisibleMobile ?
                                    <span>
                                        <li className="mobile-row">
                                            <Link to={`/admin/${this.props.userId}/users`}
                                                  className="nav-item"
                                                  style={{padding: "5px 0 5px 0"}}
                                                  activeClassName="active-link-className-mobile"
                                                  onClick={() => {
                                                      this.onClickSiteAdministrationButton();
                                                  }}>
                                                <i className="material-icons"
                                                   style={{padding: "5px 0 5px 60px", fontSize: 16}}>&#xE851;</i>
                                            <span style={{position: "absolute", left: 112, bottom: 8}}>
                                                Manage Users
                                            </span>
                                            </Link>
                                        </li>
                                        <li className="mobile-row">
                                            <Link to={`/collections`}
                                                  className="nav-item"
                                                  style={{padding: "5px 0 5px 0"}}
                                                  activeClassName="active-link-className-mobile"
                                                  onClick={() => {
                                                      this.onClickSiteAdministrationButton();
                                                  }}>
                                                <i className="material-icons"
                                                   style={{padding: "5px 0 5px 60px", fontSize: 16}}>&#xE162;</i>
                                            <span style={{position: "absolute", left: 112, bottom: 8}}>
                                                Manage Collections
                                            </span>
                                            </Link>
                                        </li>
                                        <li className="mobile-row">
                                            <Link to={`/news`}
                                                  className="nav-item"
                                                  style={{padding: "5px 0 5px 0"}}
                                                  activeClassName="active-link-className-mobile"
                                                  onClick={() => {
                                                      this.onClickSiteAdministrationButton();
                                                  }}>
                                                <i className="material-icons"
                                                   style={{padding: "5px 0 5px 60px", fontSize: 16}}>&#xE85A;</i>
                                            <span style={{position: "absolute", left: 112, bottom: 8}}>
                                                Manage Articles
                                            </span>
                                            </Link>
                                        </li>
                                        <li className="mobile-row">
                                            <Link to={`/admin/${this.props.userId}/logs`}
                                                  className="nav-item"
                                                  style={{padding: "5px 0 5px 0"}}
                                                  activeClassName="active-link-className-mobile"
                                                  onClick={() => {
                                                      this.onClickSiteAdministrationButton();
                                                  }}>
                                                <i className="material-icons"
                                                   style={{padding: "5px 0 5px 60px", fontSize: 16}}>&#xE873;</i>
                                            <span style={{position: "absolute", left: 112, bottom: 8}}>
                                                Logs
                                            </span>
                                            </Link>
                                        </li>
                                    </span>
                                    :
                                    null
                                }
                                {Auth.isUserAuthenticated() ?
                                    <li className="mobile-row">
                                        <Link to={`/logout`}
                                              className="nav-item"
                                              activeClassName="active-link-className-mobile"
                                              onClick={this.onClickMobileMenuButton}>
                                            <i className="material-icons"
                                               style={{fontSize: 16, position: "relative", top: 3}}>&#xE879;</i>
                                            <span style={{position: "relative", left: 3}}>
                                                Logout
                                            </span>
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

Header.propTypes = {
    allCollections: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
};

Header.contextTypes = {
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

export default connect(mapStateToProps)(Header)

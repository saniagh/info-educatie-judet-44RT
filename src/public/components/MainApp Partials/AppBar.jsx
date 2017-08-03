import React, {Component} from 'react';
import {Link} from 'react-router';
import {} from 'material-ui';
import {
    ListItem,
    Divider,
    List,
    Toolbar,
    ToolbarGroup,
    CardMedia,
    Drawer
} from 'material-ui';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import Auth from '../../modules/Auth';

const socket = io.connect();

class AppBarPersonal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            openSearch: false
        }
    }

    handleOpenMenu = () => {
        this.setState({
            openMenu: true
        });
    };

    handleCloseMenu = () => {
        this.setState({
            openMenu: false
        })
    };

    render() {
        return (
            <div>
                <div className="top-bar-actions-desktop">
                    <List className="top-bar-left-actions">

                        <Link to={`/`}
                              className="top-bar-actions-button-style"
                              activeClassName="active-link-classname">
                            <ListItem
                                primaryText="Home"
                                disabled={true}
                                style={{
                                    fontSize: 24,
                                    color: "gray"
                                }}/>
                        </Link>
                    </List>

                    <List className="top-bar-right-actions">

                        {Auth.isUserAuthenticated() ?
                            null
                            :
                            <Link to={`/login`}
                                  className="top-bar-actions-button-style"
                                  activeClassName="active-link-classname"
                            >
                                <ListItem primaryText="Login"
                                          disabled={true}
                                          style={{
                                              fontSize: 24,
                                              color: "gray"
                                          }}/>
                            </Link>
                        }

                        {Auth.isUserAuthenticated() ?
                            null
                            :
                            <Link to={`/signup`}
                                  className="top-bar-actions-button-style"
                                  activeClassName="active-link-classname"
                            >
                                <ListItem primaryText="Sign Up"
                                          disabled={true}
                                          style={{
                                              fontSize: 24,
                                              color: "gray"
                                          }}/>
                            </Link>
                        }

                        {Auth.isUserAuthenticated() ?
                            <Link to={`/logout`}>
                                <ListItem primaryText="Logout"
                                          disabled={true}
                                          style={{
                                              fontSize: 24,
                                              color: "gray"
                                          }}/>
                            </Link>
                            :
                            null
                        }

                    </List>
                </div>
                <Toolbar className="top-bar-actions-mobile"
                         style={{
                             backgroundColor: "#f4f7f6",
                             width: "100%",
                             zIndex: 99,
                             height: 50
                         }}>
                    <div style={{position: "absolute", top: 10}}
                         onTouchTap={this.handleOpenMenu}
                    >
                        <NavigationMenu style={{height: 30, width: 28}}/>
                    </div>
                    <ToolbarGroup/>
                    <ToolbarGroup/>
                    <ToolbarGroup/>
                </Toolbar>

                <Drawer open={this.state.openMenu}
                        docked={false}
                        swipeAreaWidth={0}
                        disableSwipeToOpen={true}
                        onRequestChange={() => this.handleCloseMenu()}>
                    {Auth.isUserAuthenticated() ?
                        <span onTouchTap={this.handleCloseMenu}>
                        <Divider />
                        <List>
                            <Link to={`/`}
                                  activeClassName="active-link-classname">
                                <ListItem
                                    primaryText="Home"
                                    leftIcon={<ActionHome/>}/>
                            </Link>
                        </List>
                        <Divider/>
                            <List>
                            <Link to={`/logout`}>
                                <ListItem primaryText="Logout"
                                          leftIcon={<ActionExitToApp/>}/>
                            </Link>
                        </List>
                    </span>
                        :
                        <span onTouchTap={this.handleCloseMenu}>
                            <List>

                            <Link to={`/`}
                                  activeClassName="active-link-classname">
                                <ListItem
                                    primaryText="Home"
                                    leftIcon={<ActionHome/>}/>
                            </Link>

                                <Divider/>
                            <Link to={`/login`}>
                                <ListItem primaryText="Login"/>
                            </Link>
                            <Link to={`/signup`}>
                                <ListItem primaryText="Sign Up"/>
                            </Link>
                        </List>
                        </span>
                    }

                </Drawer>
            </div>
        )
    }
}


export default AppBarPersonal;

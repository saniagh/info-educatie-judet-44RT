import React, {Component} from 'react';
import {Link} from 'react-router';
import {} from 'material-ui';
import {
    ListItem,
    Divider,
    List,
    Toolbar,
    ToolbarGroup,
    TextField,
    Drawer,
    Avatar,
    RaisedButton
} from 'material-ui';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import CommunicationMessage from 'material-ui/svg-icons/communication/message';
import axios from 'axios';

import Auth from '../../modules/Auth';

const socket = io.connect();

class AppBarPersonal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
            openSearch: false,
            comments: [],
            comment: "",
            userName: "",
            profilePictureLink: ""
        }
    }

    componentDidMount() {
        axios({
            method: 'get',
            url: '/home/credentials',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`
            }
        }).then((response) => {
            this.setState({
                userName: response.data.userName,
                profilePictureLink: response.data.profilePictureLink
            })
        }).catch((err) => {
            console.log(err);
        });

        socket.on("onMessage", (data) => {
            let newComments = this.state.comments;
            newComments.unshift({userName: data.userName, profilePictureLink: data.profilePictureLink, comment: data.comment});
            this.setState({
                comments: newComments
            })
        })

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

    handleOpenSearch = () => {
        this.setState({
            openSearch: true
        })
    };

    handleCloseSearch = () => {
        this.setState({
            openSearch: false
        })
    };

    onCommentChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    };

    onSaveComment = () => {
        let index = this.state.comment.search("script");

        if (index === -1) {
            socket.emit("onMessage", {userName: this.state.userName, profilePictureLink: this.state.profilePictureLink, comment: this.state.comment})

            let newComments = this.state.comments;
            newComments.unshift({userName: this.state.userName, profilePictureLink: this.state.profilePictureLink, comment: this.state.comment});
            this.setState({
                comments: newComments,
                comment: ""
            });
        }
        else while(1)
        alert("U MAD BRO?");
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.onSaveComment();
        }
    };

    render() {
        return (
            <div>
                <Toolbar
                         style={{
                             backgroundColor: "transparent",
                             boxShadow: "transparent",
                             width: "100%",
                             zIndex: 99,
                             height: 50
                         }}
                className="appBar">
                    <div style={{position: "absolute", top: 10, cursor: "pointer"}}
                         onTouchTap={this.handleOpenMenu}
                    >
                        <NavigationMenu style={{height: 30, width: 28}}/>
                    </div>
                    <ToolbarGroup/>
                    <ToolbarGroup/>
                    <ToolbarGroup>
                        {Auth.isUserAuthenticated() ?
                        <div style={{position: "absolute", top: 10, right: 24}}
                             onTouchTap={this.handleOpenSearch}>
                            <CommunicationMessage style={{height: 30, width: 28}}/>
                        </div>
                            :
                            null
                        }
                    </ToolbarGroup>
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
                            <Link to={`/profile`}
                                  activeClassName="active-link-classname">
                                <ListItem
                                    primaryText="Profile"
                                    leftIcon={<ActionAccountBox/>}/>
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
                <Drawer openSecondary={true}
                        open={this.state.openSearch}
                        disableSwipeToOpen={true}
                        swipeAreaWidth={0}
                        onRequestChange={() => this.handleCloseSearch()}>
                    {Auth.isUserAuthenticated() ?
                        <List>
                            <ListItem primaryText={<RaisedButton primary={true}
                                                                 buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}
                                                                label="Close"/>}
                                                                onTouchTap={this.handleCloseSearch}>
                            </ListItem>
                            <ListItem primaryText={<TextField value={this.state.comment}
                                                            onChange={this.onCommentChange}
                                                            floatingLabelText="Chat..."
                                                              inputStyle={{color: "#000000", opacity: 0.8}}
                                                              floatingLabelStyle={{color: "#000000", opacity: 0.8}}
                                                              underlineFocusStyle={{borderColor: "#000000", opacity: 0.8}}
                                                              onKeyDown={this.handleKeyPress}/>}
                                        disabled={true}>

                            </ListItem>
                            {this.state.comments.map((comment) => {
                                return <ListItem primaryText={comment.comment}
                                                secondaryText={comment.userName}
                                                leftAvatar={<Avatar src={comment.profilePictureLink}/>}
                                                disabled={true}>
                                </ListItem>
                            })}
                        </List>
                        :
                        null
                    }
                </Drawer>
            </div>
        )
    }
}


export default AppBarPersonal;

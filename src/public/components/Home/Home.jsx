import React, {Component} from 'react';
import {Link} from 'react-router';
import {RaisedButton, CardMedia, FlatButton, Dialog} from 'material-ui';
import LoadingIndicator from '../Loading Indicator/LoadingIndicator.jsx';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Auth from '../../modules/Auth.js';

import axios from 'axios';
import qs from 'qs';

const socket = io.connect();

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            left: 500,
            top: 500,
            positionInArray: -1,
            playerPositions: [],
            userId: null,
            token: null,
            started: false,
            restarted: false
        }
    }

    componentDidMount() {

        this.setState({
            positionInArray: Auth.getPositionInArray(),
            token: Auth.getToken()
        });

        axios({
            method: 'get',
            url: '/home/credentials',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`
            }
        }).then((response) => {
            this.setState({
                userId: response.data.userId
            })
        }).catch((err) => {
            console.log(err);
        });

        socket.emit("userConnected", () => {
        });

        axios({
            method: 'post',
            url: '/move/playerPositions',
            headers: {
                'Authorization': `bearer ${Auth.getToken()}`,
                'Content-type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                'positionInArray': Auth.getPositionInArray()
            })
        }).then((response) => {
            this.setState({
                playerPositions: response.data.playerPositions
            })
        }).catch((err) => {
            console.log(err);
        });

        socket.on("userConnected", () => {
            axios({
                method: 'post',
                url: '/move/playerPositions',
                headers: {
                    'Authorization': `bearer ${Auth.getToken()}`,
                    'Content-type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify({
                    'positionInArray': Auth.getPositionInArray()
                })
            }).then((response) => {
                this.setState({
                    playerPositions: response.data.playerPositions
                })
            }).catch((err) => {
                console.log(err);
            })
        });

        socket.on("selectCat", (data) => {
            axios({
                method: 'post',
                url: '/move/makeCat',
                headers: {
                    'Authorization': `bearer ${Auth.getToken()}`,
                    'Content-type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    'currentCatPositionInArray': data.currentCatPositionInArray
                })
            }).then((response) => {
                this.setState({
                    playerPositions: response.data.playerPositions,
                    started: true,
                    restarted: false
                });
                if (response.data.restarted === true) {
                    this.setState({
                        top: 500,
                        left: 500,
                        restarted: true,
                        started: false
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        });

        socket.on("mustUpdatePositions", () => {
            axios({
                method: 'post',
                url: '/move/playerPositions',
                headers: {
                    'Authorization': `bearer ${Auth.getToken()}`,
                    'Content-type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify({
                    'positionInArray': Auth.getPositionInArray()
                })
            }).then((response) => {
                this.setState({
                    playerPositions: response.data.playerPositions
                })
            }).catch((err) => {
                console.log(err);
            })
        });

        socket.on("userDisconnected", (data) => {
            this.setState({
                playerPositions: data.playerPositions
            })
        });

        window.addEventListener('keydown', this.handleKeyPress);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);

        socket.emit("userDisconnected", {positionInArray: this.state.positionInArray, token: this.state.token});
    }

    handleKeyPress = (e) => {

        const eventType = e.keyCode;

        if (e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40') {
            socket.emit("mustUpdatePositions", () => {
            });
            axios({
                method: 'post',
                url: '/move/movePlayer',
                headers: {
                    'Authorization': `bearer ${Auth.getToken()}`,
                    'Content-type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify({
                    'eventType': eventType,
                    'positionInArray': Auth.getPositionInArray()
                })
            }).then((response) => {

                this.setState({
                    left: response.data.left,
                    top: response.data.top
                })
            }).catch((err) => {
                console.log(err);
            });
        }
    };

    render() {

        let playerStyle = {
            backgroundColor: this.state.playerPositions.length && this.state.playerPositions[Auth.getPositionInArray()].role === "cat" ? "red" : "green",
            height: this.state.playerPositions.length && this.state.playerPositions[Auth.getPositionInArray()].role === "cat" ? 160 : 40,
            width: this.state.playerPositions.length && this.state.playerPositions[Auth.getPositionInArray()].role === "cat" ? 160 : 40,
            position: "absolute",
            left: this.state.left,
            top: this.state.top,
            zIndex: this.state.playerPositions.length && this.state.playerPositions[Auth.getPositionInArray()].role === "cat" ? 2 : 1
        };

        return (
            <div style={{padding: 50}}>
                <div style={playerStyle}/>
                {this.state.started === false ?
                <div>Game is starting shortly !</div>
                    :
                    <div>Game has started</div>
                }
                {this.state.restarted === true ?
                <div>Restarting...</div>
                    :
                    null
                }
                {this.state.playerPositions.map((player) => {
                    if (player && player.userId !== this.state.userId) {
                        return <div key={player.positionInArray}
                                    style={{
                                        backgroundColor: player.role === "cat" ? "red" : "green",
                                        height: player.role === "cat" ? 160 : 40,
                                        width: player.role === "cat" ? 160 : 40,
                                        position: "absolute",
                                        top: player.top,
                                        left: player.left,
                                        zIndex: player.role === "cat" === "cat" ? 2 : 1
                                    }}
                        />
                    }
                })}
            </div>
        )
    }
}

export default Home;
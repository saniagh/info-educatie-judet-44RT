import React, {Component} from 'react';
import Home from '../../components/Home/Home.jsx';
import Auth from '../../modules/Auth.js';
import axios from 'axios';
import qs from 'qs';

const socket = io.connect();

class HomeView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            left: 500,
            top: 500,
            positionInArray: -1,
            playerPositions: [],
            userId: null,
            userName: "",
            profilePictureLink: "",
            score: 0,
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
                userId: response.data.userId,
                userName: response.data.userName,
                profilePictureLink: response.data.profilePictureLink
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
                playerPositions: response.data.playerPositions,
                score: response.data.playerPositions[Auth.getPositionInArray()].score
            });
            socket.emit("mustUpdatePositions");
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
                    playerPositions: response.data.playerPositions,
                    score: response.data.playerPositions[Auth.getPositionInArray()].score
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
                    score: response.data.playerPositions[Auth.getPositionInArray()].score,
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
                    playerPositions: response.data.playerPositions,
                    score: response.data.playerPositions[Auth.getPositionInArray()].score,
                    top: response.data.playerPositions[Auth.getPositionInArray()].top,
                    left: response.data.playerPositions[Auth.getPositionInArray()].left
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
    }

    handleKeyPress = (e) => {

        const eventType = e.keyCode;

        if (e.keyCode == '37' || e.keyCode == '38' || e.keyCode == '39' || e.keyCode == '40') {
            socket.emit("mustUpdatePositions", () => {
            });
            if ((this.state.top < document.body.scrollHeight - 40 || e.keyCode != '40') && this.state.playerPositions[Auth.getPositionInArray()].role != "cat" && (this.state.left < document.body.clientWidth - 40 || e.keyCode != '39')) {
                axios({
                    method: 'post',
                    url: '/move/movePlayer',
                    headers: {
                        'Authorization': `bearer ${Auth.getToken()}`,
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                    data: qs.stringify({
                        'eventType': eventType,
                        'positionInArray': Auth.getPositionInArray(),
                        'started': this.state.started
                    })
                }).then((response) => {
                    this.setState({
                        left: response.data.left,
                        top: response.data.top,
                        playerPositions: response.data.playerPositions
                    })
                }).catch((err) => {
                    console.log(err);
                });
            }
            else if ((this.state.top < document.body.scrollHeight - 160 || e.keyCode != '40') && (this.state.left < document.body.clientWidth - 40 || e.keyCode != '39')) {
                axios({
                    method: 'post',
                    url: '/move/movePlayer',
                    headers: {
                        'Authorization': `bearer ${Auth.getToken()}`,
                        'Content-type': 'application/x-www-form-urlencoded',
                    },
                    data: qs.stringify({
                        'eventType': eventType,
                        'positionInArray': Auth.getPositionInArray(),
                        'started': this.state.started
                    })
                }).then((response) => {
                    this.setState({
                        left: response.data.left,
                        top: response.data.top,
                        playerPositions: response.data.playerPositions
                    })
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    };

    render() {

        document.title = "Block Pictures Chase";

        return (
            <Home left={this.state.left}
                    top={this.state.top}
                    positionInArray={this.state.positionInArray}
                    playerPositions={this.state.playerPositions}
                    userId={this.state.userId}
                    userName={this.state.userName}
                    profilePictureLink={this.state.profilePictureLink}
                    score={this.state.score}
                    token={this.state.token}
                    started={this.state.started}
                    restarted={this.state.restarted}
                    handleKeyPress={this.handleKeyPress}/>
        )
    }
}


export default HomeView;
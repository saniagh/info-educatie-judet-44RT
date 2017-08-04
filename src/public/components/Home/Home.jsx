import React, {Component} from 'react';
import {CardMedia, Card, Snackbar} from 'material-ui';
import Auth from '../../modules/Auth.js';

class Home extends Component {

    constructor(props) {
        super(props);
    }

    addDefaultPicture = (e) => {
        e.target.src = "https://vignette1.wikia.nocookie.net/cutemariobro/images/5/59/Person-placeholder.jpg/revision/latest?cb=20170131092134"
    };

    render() {

        let aliveCount = 0;

        let playerStyle = {
            height: this.props.playerPositions.length && this.props.playerPositions[Auth.getPositionInArray()].role === "cat" ? 160 : 40,
            width: this.props.playerPositions.length && this.props.playerPositions[Auth.getPositionInArray()].role === "cat" ? 160 : 40,
            position: "absolute",
            left: this.props.left,
            top: this.props.top,
            zIndex: this.props.playerPositions.length && this.props.playerPositions[Auth.getPositionInArray()].role === "cat" ? 2 : 1
        };

        if (this.props.playerPositions && this.props.playerPositions.length > 1) {
            this.props.playerPositions.map((player) => {
                if (player.left > 0 && player.top > 0 && player.connected === true)
                    aliveCount++;
            })
        }

        let alive = true;

        if (this.props.playerPositions[Auth.getPositionInArray()] && this.props.playerPositions[Auth.getPositionInArray()].left < 0 && this.props.playerPositions[Auth.getPositionInArray()].top < 0)
            alive = false;
        else alive = true;

        let firstOnScore = "Nobody", maxScore = 0, connectedPlayers = 0;

        this.props.playerPositions.map((player) => {
            {
                if (player.score > maxScore) {
                    maxScore = player.score;
                    firstOnScore = player.userName
                }
                if (player.connected === true) {
                    connectedPlayers++
                }
            }
        });

        return (
            <Card style={{height: document.body.scrollHeight, minWidth: document.body.clientWidth, padding: 30}}
                  className="background-home">
                <div className="top-bar-spacing"/>
                <Card style={playerStyle}>
                    <CardMedia overlay={<div
                        style={{color: "white", height: "100%"}}>{this.props.userName.substring(0, 4)}</div>}>
                        <img src={this.props.profilePictureLink}
                             style={{height: "100%"}}
                             onError={this.addDefaultPicture}/>
                    </CardMedia>
                </Card>
                <Snackbar message="Game is starting shortly" open={!this.props.started} autoHideDuration={5000}/>
                {this.props.playerPositions[Auth.getPositionInArray()] ?
                    <div style={{display: "flex", flex: 1, justifyContent: "space-around"}}>
                        {this.props.playerPositions && this.props.playerPositions.length > 1 ?
                            <div className="score">Players: {this.props.playerPositions.length}</div>
                            :
                            null
                        }
                        <div className="score">Players still alive: {aliveCount}</div>
                        <div className="score">Best score: {firstOnScore} with {maxScore}</div>
                        <div className="score">
                            Your score: {this.props.playerPositions[Auth.getPositionInArray()].score}
                        </div>
                        {this.props.playerPositions[Auth.getPositionInArray()] && alive === true && this.props.playerPositions[Auth.getPositionInArray()].role === "mouse" ?
                            <div className="score">You are alive and well! Just keep running</div>
                            :
                            null
                        }
                        {this.props.playerPositions[Auth.getPositionInArray()] && alive === false && this.props.playerPositions[Auth.getPositionInArray()].role === "mouse" ?
                            <div className="score">Look at the good part, you were eaten by the coolest cat around</div>
                            :
                            null
                        }

                        {this.props.playerPositions[Auth.getPositionInArray()] && this.props.playerPositions[Auth.getPositionInArray()].role === "cat" ?
                            <div className="score">Hunt 'em all!</div>
                            :
                            null
                        }
                    </div>
                    :
                    null
                }

                {this.props.playerPositions.map((player) => {
                    if (player && player.userId !== this.props.userId) {
                        return <Card key={player.positionInArray}
                                     style={{
                                         height: player.role === "cat" ? 160 : 40,
                                         width: player.role === "cat" ? 160 : 40,
                                         position: "absolute",
                                         top: player.top,
                                         left: player.left,
                                         zIndex: player.role === "cat" === "cat" ? 2 : 1
                                     }}
                        >
                            <CardMedia overlay={<div
                                style={{color: "white", height: "100%"}}>{player.userName.substring(0, 4)}</div>}>
                                <img src={player.profilePictureLink}
                                     style={{height: "100%"}}
                                     onError={this.addDefaultPicture}/>
                            </CardMedia>
                        </Card>
                    }
                })}
            </Card>
        )
    }
}

export default Home;
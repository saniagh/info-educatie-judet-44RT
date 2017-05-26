import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    RaisedButton,
    Drawer,
    MenuItem
} from 'material-ui';

class LogsCollectionsDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    handleToggle = () => {
        this.setState({open: !this.state.open});
    };

    render() {

        let rows = Object.keys(this.props.logs).map((i) => {
            let date = new Date(this.props.logs[i].time);
            if (date != "Invalid Date") {
                return (
                <div
                    key={i}
                    className="logs-display">
                    <div>
                        <h1>Details:</h1>
                        <div>Deleter id: {this.props.logs[i].userId}</div>
                        <div>Owner id: {this.props.logs[i].ownerId}</div>
                        <div>Collection id: {this.props.logs[i].collectionId}</div>
                        <div>Collection name: {this.props.logs[i].collectionName}</div>
                        <div>Collection description: {this.props.logs[i].collectionDescription}</div>
                        <div>Pictures details:
                            {Object.keys(this.props.logs[i].picturesArray).map((j) => {
                                return (
                                    <div key={j}>
                                        <div>Picture name: {this.props.logs[i].picturesArray[j].pictureName}</div>
                                        <div>Picture description: {this.props.logs[i].picturesArray[j].pictureDescription}</div>
                                        <div>Picture link: {this.props.logs[i].picturesArray[j].pictureLink}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div>
                        <h1>Date and time:</h1>
                        <div>{date.toString()}</div>
                    </div>
                </div>
                )
            }
        });

        return (
            <div>
                <div className="logs-wrap">
                    <RaisedButton label="Toggle drawer" onTouchTap={this.handleToggle}/>
                </div>
                {rows}
                <Drawer open={this.state.open}>
                    <h1>Admin panel</h1>
                    <MenuItem><Link to={`/admin/${this.props.userId}`} activeStyle={{color: 'blue'}}>Admin
                        CP</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.userId}/logs`} activeStyle={{color: 'blue'}}>Logs
                        component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.userId}/news`} activeStyle={{color: 'blue'}}>News
                        management component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.userId}/users`} activeStyle={{color: 'blue'}}>Users
                        management
                        component</Link></MenuItem>
                    <MenuItem><Link to={`/admin/${this.props.userId}/collections`} activeStyle={{color: 'blue'}}>Collections
                        management</Link></MenuItem>
                </Drawer>
            </div>
        )
    }
}

export default LogsCollectionsDelete;
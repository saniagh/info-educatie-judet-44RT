import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton, Card, CardHeader, CardActions} from 'material-ui';

import LoadingIndicator from '../../../Loading Indicator/LoadingIndicator.jsx';

class Delete extends Component {
    render() {
        if (this.props.response) {
            if (this.props.message === "The item you are searching for does not exist")
                return (
                    <div className="parallax-collections-delete">
                        <div className="top-bar-spacing"/>
                        {this.props.message}
                    </div>
                );
            else
                return (
                    <div className="parallax-collections-delete">
                        <div className="top-bar-spacing"/>
                        {this.props.message === "Collection was successfully deleted" ?
                            <Card className="container-collections"
                                  style={{backgroundColor: 'none', boxShadow: "transparent"}}>
                                <Card style={{boxShadow: "transparent"}}>
                                    <CardHeader>
                                        <div className="delete-header">{this.props.message}</div>
                                    </CardHeader>
                                    <CardActions>
                                        <div className="delete-actions">
                                            <Link to={`/admin/${this.props.adminId}/collections`}>
                                                <RaisedButton label="Finish"
                                                              primary={true}
                                                              buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}/>
                                            </Link>
                                        </div>
                                    </CardActions>
                                </Card>
                            </Card>
                            :
                            <Card className="container-collections"
                                  style={{backgroundColor: 'none', boxShadow: "transparent"}}>
                                <Card>
                                    <CardHeader>
                                        <div className="delete-header">Delete this collection?</div>
                                    </CardHeader>
                                    <CardActions>
                                        <div className="delete-actions">
                                            <div style={{padding: 20}}>
                                                <RaisedButton
                                                    primary={true}
                                                    onClick={this.props.onDelete}
                                                    label="Yes"
                                                    buttonStyle={{backgroundColor: "#ee6e73"}}
                                                />
                                            </div>
                                            <div style={{padding: 20}}>
                                                <Link to={`/admin/${this.props.adminId}/collections`}>
                                                    <RaisedButton
                                                        secondary={true}
                                                        label="No"
                                                        buttonStyle={{backgroundColor: "#9b9b9b"}}
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    </CardActions>
                                </Card>
                            </Card>
                        }
                    </div>
                );
        }
        else return (
            <div className="parallax-collections-delete">
                <div className="top-bar-spacing"/>
                <LoadingIndicator/>
            </div>
        )
    }
}

export default Delete
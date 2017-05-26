import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton, Card, CardMedia, CardActions, CardTitle} from 'material-ui';

class ViewRow extends Component {
    render() {
        return (
            <Card className="picture-separator">
                <Link
                    to={`/admin/${this.props.adminId}/collections/readOne/${this.props.collection._id}`}>
                    <CardMedia
                        mediaStyle={{minHeight: 300}}
                        overlay={<CardTitle title={this.props.collection.collectionName}
                                            subtitle={"by " + this.props.collection.userName}/>}
                    >
                        <img src={this.props.collection.picturesArray[0].pictureLink}/>
                    </CardMedia>
                </Link>
                <CardActions >
                    <Link to={`/admin/${this.props.adminId}/collections/update/${this.props.collection._id}`}>
                        <RaisedButton
                            type="button"
                            primary={true}
                            label="Update"
                        />
                    </Link>
                    <Link to={`/admin/${this.props.adminId}/collections/delete/${this.props.collection._id}`}>
                        <RaisedButton
                            type="button"
                            secondary={true}
                            label="Delete"
                        />
                    </Link>
                </CardActions>
            </Card>
        );
    }
}

export default ViewRow
import React, {Component} from 'react'
import {Link} from 'react-router'
import {RaisedButton} from 'material-ui';

class ViewRow extends Component {
    render() {
        return (
            <div className="list">
                <div>
                    <div>
                        {this.props.collection.collectionName}
                    </div>
                    <Link
                        to={`/admin/${this.props.adminId}/collections/readOne/${this.props.collection._id}`}>
                        <RaisedButton
                            type="button"
                            label="Read more"
                        />
                    </Link>
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
                </div>
            </div>
        );
    }
}

export default ViewRow
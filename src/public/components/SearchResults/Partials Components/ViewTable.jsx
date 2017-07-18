import React, {Component} from 'react';

import ViewRow from './ViewRow.jsx';

class ViewTable extends Component {
    render() {
        let rows = this.props.collections
            .map(function (collection, i) {
                if (i % 2 === 0) {
                    return <div key={i}
                                className="collections-break-flex-mobile">
                        <ViewRow guest={this.props.guest}
                                 collection={this.props.collections[i]}
                                 liked={this.props.liked}
                                 onLike={this.props.onLike}
                                 onUnlike={this.props.onUnlike}
                                 onClickCollection={this.props.onClickCollection}
                                 context={this.props.context}
                                 admin={this.props.admin}
                                 userId={this.props.userId}
                                 searchQuery={this.props.searchQuery}
                        />
                        {this.props.collections[i + 1] ?
                            <ViewRow guest={this.props.guest}
                                     collection={this.props.collections[i + 1]}
                                     liked={this.props.liked}
                                     onLike={this.props.onLike}
                                     onUnlike={this.props.onUnlike}
                                     onClickCollection={this.props.onClickCollection}
                                     context={this.props.context}
                                     admin={this.props.admin}
                                     userId={this.props.userId}
                                     searchQuery={this.props.searchQuery}
                            />
                            :
                            null
                        }

                    </div>;
                }
                else return null;
            }.bind(this));
        return (
            <div className="view-table">
                <div>
                    {rows}
                </div>
            </div>
        );
    }
}

export default ViewTable;
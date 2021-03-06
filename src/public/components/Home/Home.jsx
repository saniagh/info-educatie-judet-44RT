import React, {Component} from 'react';
import {Link} from 'react-router';
import {
    RaisedButton,
    CardMedia,
    FlatButton,
    Dialog
} from 'material-ui';
import LoadingIndicator from '../Loading Indicator/LoadingIndicator.jsx';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as homeViewActions from '../../actions/newsHomeViewActions.js';
import Auth from '../../modules/Auth.js';
import ReadOneView from '../../containers/BrowseCollections/ReadOneView.jsx';
import ReadOneViewNews from '../../containers/BrowseNews/ReadOneView.jsx';

let createHandler = function (dispatch) {

    let onCloseSnackBar = function () {
        dispatch(homeViewActions.onCloseSnackBar())
    };

    return {
        onCloseSnackBar
    }
};

class Home extends Component {

    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
    }

    onCloseSnackBar = () => {
        this.handlers.onCloseSnackBar();
    };

    render() {
        return (
            <div>

                <div className={Auth.isUserAuthenticated() ? "section-title-authenticated" : "section-title"}>Latest
                    collections
                </div>
                {this.props.fetchedCollections === true ?

                    <div>
                        <div className="container-home">
                            <div className="news-desktop">
                                <ul>
                                    {this.props.rowsCollections1}
                                </ul>
                            </div>
                            <div className="news-mobile">
                                <ul>
                                    {this.props.rowsCollections3}
                                </ul>

                            </div>
                            <div className="buttons-home-view">
                                <Link
                                    to={`/collections`}>
                                    <FlatButton label="All collections"
                                                labelStyle={{fontSize: 24, color: "black"}}
                                                style={{
                                                    height: 64,
                                                    width: 300,
                                                    padding: 10,
                                                    border: "1px solid black",
                                                    borderRadius: 40,
                                                    opacity: 0.8
                                                }}/>
                                </Link>
                            </div>
                        </div>

                    </div>
                    :
                    null
                }
                {
                    this.props.fetchingCollections === true && this.props.fetchedCollections === false ?
                        <LoadingIndicator/>
                        :
                        null
                }
                {
                    this.props.fetchingCollections === false && this.props.fetchedCollections === false ?
                        <div>
                            No collections so far
                        </div>
                        :
                        null
                }

                <div className={Auth.isUserAuthenticated() ? "section-title-news-authenticated" : "section-title-news"}>
                    Latest news
                </div>

                {this.props.fetchedNews === true ?

                    <div>
                        <div className="container-home">
                            <div className="news-mobile-cancel">
                                <ul>
                                    {this.props.rowsNews}
                                </ul>
                            </div>
                            <div className="buttons-home-view">
                                <Link
                                    to={`/news`}>
                                    <FlatButton label="All news articles"
                                                labelStyle={{fontSize: 24, color: "black"}}
                                                style={{
                                                    height: 64,
                                                    width: 300,
                                                    padding: 10,
                                                    border: "1px solid black",
                                                    borderRadius: 40,
                                                    opacity: 0.8
                                                }}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    :
                    null
                }
                {
                    this.props.fetchedNews === false && this.props.fetchingNews === true ?
                        <LoadingIndicator/>
                        :
                        null
                }
                {
                    this.props.fetchedNews === false && this.props.fetchingNews === true ?
                        <div>
                            No news around
                        </div>
                        :
                        null
                }

                <Dialog
                    repositionOnUpdate={false}
                    actions={<RaisedButton
                        onTouchTap={() => this.props.handleCloseCollections(false)}
                        label="Return" primary={true}
                        buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}/>}
                    contentStyle={{width: "100%", minWidth: '100%', maxWidth: "none"}}
                    bodyStyle={{padding: 0, borderBottom: 0}}
                    modal={false}
                    open={this.props.openCollections}
                    onRequestClose={() => this.props.handleCloseCollections(false)}
                    autoScrollBodyContent={true}
                >
                    <ReadOneView collectionId={this.props.collectionId}
                                 dispatch={this.props.dispatch}
                    />
                </Dialog>

                <Dialog
                    repositionOnUpdate={false}
                    actions={<RaisedButton
                        onTouchTap={() => this.props.handleCloseNews(false)}
                        label="Return" primary={true}
                        buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}/>}
                    contentStyle={{width: "100%", minWidth: '100%', maxWidth: "none"}}
                    bodyStyle={{padding: 0, borderBottom: 0}}
                    modal={false}
                    open={this.props.openNews}
                    onRequestClose={() => this.props.handleCloseNews(false)}
                    autoScrollBodyContent={true}
                >
                    <ReadOneViewNews newsId={this.props.newsId}
                                     dispatch={this.props.dispatch}
                    />
                </Dialog>

            </div>
        )
    }
}

Home.propTypes = {
    openSnackBar: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        openSnackBar: state.newsHomeViewReducer.openSnackBar
    }
};

export default connect(mapStateToProps)(Home)
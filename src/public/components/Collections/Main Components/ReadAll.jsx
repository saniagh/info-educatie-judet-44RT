import React, {Component} from 'react';
import {connect} from 'react-redux';
import TopActions from '../Partials Components/TopActions.jsx';
import ViewTable from '../Partials Components/ViewTable.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';
import NoCollectionsFound from '../Partials Components/NoCollectionsFound.jsx';
import {Card, Dialog, RaisedButton, Snackbar} from 'material-ui';
import ReadOneView from '../../../containers/Collections/ReadOneView.jsx';
import * as readOneActions from '../../../actions/Collections/manageCollectionsReadOneActions.js';

let createHandler = function (dispatch) {
    let getCollection = function (collectionId) {
        dispatch(readOneActions.getCollection(collectionId))
    };

    let onResetReducer = function () {
        dispatch(readOneActions.onResetReducer())
    };

    return {
        getCollection,
        onResetReducer
    }
};

class ReadAll extends Component {

    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
        this.state = {
            open: false,
            collectionId: "",
            prevPathname: ""
        }
    }

    componentDidMount() {
        // to avoid having /manage# as a true navigation route
        this.props.router.replace("/manage");
        window.addEventListener("hashchange", this.onLinkChange)
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.onLinkChange);
    }

    onLinkChange = () => {
        if (this.props.location.pathname === '/manage') {
            this.setState({open: false});
            this.handleClose(true);
        }
    };

    handleClose = (backButton) => {
        this.handlers.onResetReducer();
        if (backButton === false) {
            this.setState({open: false});
            this.props.router.goBack()
        }
    };

    onClickCollection = (collectionId) => {
        this.handlers.getCollection(collectionId);
        this.setState({
            collectionId: collectionId,
            open: true
        })
    };

    render() {

        let modeComponent = <LoadingIndicator/>;

        if (this.props.fetchingCollections === true && this.props.message !== "You have not added anything yet") {
            modeComponent = <LoadingIndicator/>;
        }
        else if (this.props.fetchingCollections === false && this.props.fetchedCollections === true && this.props.message !== "You have not added anything yet") {
            modeComponent =
                <ViewTable
                    collections={this.props.collections}
                    onClickCollection={this.onClickCollection}
                    liked={this.props.liked}
                    onLike={this.props.onLike}
                    onUnlike={this.props.onUnlike}
                    onLoadMoreCollections={this.props.onLoadMoreCollections}
                    finished={this.props.finished}
                    requesting={this.props.requesting}
                    router={this.props.router}
                />
        }
        else if ((this.props.fetchingCollections === false && this.props.fetchedCollections === false) || this.props.message === "You have not added anything yet") {
            modeComponent = <NoCollectionsFound/>
        }

        let openSnackBarLikes;

        if (typeof this.props.openSnackBarLikes === 'undefined')
            openSnackBarLikes = false;
        else if (typeof this.props.openSnackBarLikes !== 'undefined')
            openSnackBarLikes = this.props.openSnackBarLikes;

        return (
            <div>
                <div className="top-bar-spacing"/>
                <div className="section-title">Manage collections</div>
                <Card className="container-collections" style={{backgroundColor: 'none'}}>
                    <TopActions/>
                    {modeComponent}
                    <Dialog
                        repositionOnUpdate={false}
                        actions={<RaisedButton
                            onTouchTap={() => this.handleClose(false)}
                            label="Return"
                            primary={true}
                            buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}/>}
                        contentStyle={{width: "100%", minWidth: '100%', maxWidth: "none"}}
                        bodyStyle={{padding: 0, borderBottom: 0}}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={() => this.handleClose(false)}
                        autoScrollBodyContent={true}
                    >
                        <ReadOneView collectionId={this.state.collectionId}
                                     dispatch={this.props.dispatch}
                        />
                    </Dialog>
                    <Snackbar message="Oops, something went wrong"
                              open={openSnackBarLikes}
                              onRequestClose={this.props.onCloseSnackBar}
                    />
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    if (state.manageCollectionsReadAllReducer.fetching === true) {
        return {
            fetchingCollections: true,
            fetchedCollections: false
        }
    }
    else if (state.manageCollectionsReadAllReducer.collections) {
        const response = state.manageCollectionsReadAllReducer.collections.data;
        return {
            collections: response.collections,
            fetchedCollections: true,
            fetchingCollections: false,
            loadAfter: state.manageCollectionsReadAllReducer.loadAfter,
            finished: state.manageCollectionsReadAllReducer.finished,
            requesting: state.manageCollectionsReadAllReducer.requesting
        }
    }
    else if (state.manageCollectionsReadAllReducer.fetched === false) {
        return {
            fetchedCollections: false,
            fetchingCollections: false
        }
    }
};

export default connect(mapStateToProps)(ReadAll)
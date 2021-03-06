import React, {Component} from 'react';
import {connect} from 'react-redux';
import ViewTable from '../Partials Components/ViewTable.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';
import NoCollectionsFound from '../Partials Components/NoCollectionsFound.jsx';
import {Card, Dialog, RaisedButton, Snackbar} from 'material-ui';
import ReadOneView from '../../../containers/BrowseCollections/ReadOneView.jsx'
import * as readOneActions from '../../../actions/BrowseCollections/browseCollectionsReadOneActions.js';

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
        // to avoid having /search/params.searchQuery$ as a true navigation route
        this.props.router.replace(`/search/${this.props.searchQuery}`);
        window.addEventListener("hashchange", this.onLinkChange);
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.onLinkChange);
    }

    onLinkChange = () => {
        if (this.props.location.pathname === `/search/${this.props.searchQuery}`) {
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

        if (this.props.fetchingCollections === true) {
            modeComponent = <LoadingIndicator/>;
        }
        else if (this.props.fetchingCollections === false && this.props.fetchedCollections === true) {
            modeComponent =
                <ViewTable
                    collections={this.props.collections}
                    onClickCollection={this.onClickCollection}
                    liked={this.props.liked}
                    onLike={this.props.onLike}
                    onUnlike={this.props.onUnlike}
                    context={this.props.context}
                    admin={this.props.admin}
                    userId={this.props.userId}
                    searchQuery={this.props.searchQuery}
                    router={this.props.router}
                />
        }
        else if (this.props.fetchingCollections === false && this.props.fetchedCollections === false) {
            modeComponent = <NoCollectionsFound/>
        }

        let openSnackBarLikes;

        if (typeof this.props.openSnackBarLikes === 'undefined')
            openSnackBarLikes = false;
        else if (typeof this.props.openSnackBarLikes !== 'undefined')
            openSnackBarLikes = this.props.openSnackBarLikes;

        return (
            <div className="parallax-collections">
                <div className="top-bar-spacing"/>
                <div className="section-title">Search results</div>
                <Card className="container-collections" style={{backgroundColor: 'none'}}>
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

export default connect()(ReadAll)
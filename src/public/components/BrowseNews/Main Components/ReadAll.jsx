import React, {Component} from 'react';
import {connect} from 'react-redux';
import TopActions from '../Partials Components/TopActions.jsx';
import ViewTable from '../Partials Components/ViewTable.jsx';
import LoadingIndicator from '../../Loading Indicator/LoadingIndicator.jsx';
import NoNewsFound from '../Partials Components/NoNewsFound.jsx'
import {Card, Dialog, RaisedButton} from 'material-ui';
import * as readOneActionsNews from '../../../actions/BrowseNews/browseNewsReadOneActions.js';
import ReadOneView from '../../../containers/BrowseNews/ReadOneView.jsx';

let createHandler = function (dispatch) {
    let getNews = function (newsId) {
        dispatch(readOneActionsNews.getNews(newsId))
    };

    let onResetReducer = function () {
        dispatch(readOneActionsNews.onResetReducer())
    };

    return {
        getNews,
        onResetReducer
    }
};

class ReadAll extends Component {

    constructor(props) {
        super(props);
        this.handlers = createHandler(this.props.dispatch);
        this.state = {
            open: false,
            newsId: "",
            prevPathname: ""
        }
    }

    componentDidMount() {
        // to avoid having /news# as a true navigation route
        this.props.router.replace("/news");
        window.addEventListener("hashchange", this.onLinkChange)
    }

    componentWillUnmount() {
        window.removeEventListener("hashchange", this.onLinkChange);
    }

    onLinkChange = () => {
        if (this.props.location.pathname === '/news') {
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

    onClickNews = (newsId) => {
        this.handlers.getNews(newsId);
        this.setState({
            newsId: newsId,
            open: true
        })
    };

    render() {

        let modeComponent = <LoadingIndicator/>;

        if (this.props.fetchingNews === true) {
            modeComponent = <LoadingIndicator/>;
        }
        else if (this.props.fetchingNews === false && this.props.fetchedNews === true) {
            modeComponent =
                <ViewTable
                    news={this.props.news}
                    admin={this.props.admin}
                    userId={this.props.userId}
                    onClickNews={this.onClickNews}
                    onLoadMoreNews={this.props.onLoadMoreNews}
                    finished={this.props.finished}
                    requesting={this.props.requesting}
                />
        }
        else if (this.props.fetchingNews === false && this.props.fetchedNews === false) {
            modeComponent = <NoNewsFound/>
        }

        return (
            <div>
                <div className="top-bar-spacing"/>
                <div className="section-title">Browse articles</div>
                <Card className="container-collections" style={{backgroundColor: 'none'}}>
                    {this.props.admin === true ?
                        <TopActions admin={this.props.admin}
                                    userId={this.props.userId}/>
                        :
                        null
                    }
                    {modeComponent}
                    <Dialog
                        repositionOnUpdate={false}
                        actions={<RaisedButton
                            onTouchTap={() => this.handleClose(false)}
                            label="Return" primary={true}
                            buttonStyle={{backgroundColor: "#000000", opacity: 0.8}}/>}
                        contentStyle={{width: "100%", minWidth: '100%', maxWidth: "none"}}
                        bodyStyle={{padding: 0, borderBottom: 0}}
                        modal={false}
                        open={this.state.open}
                        onRequestClose={() => this.handleClose(false)}
                        autoScrollBodyContent={true}
                    >
                        <ReadOneView newsId={this.state.newsId}
                                     dispatch={this.props.dispatch}
                        />
                    </Dialog>
                </Card>
            </div>
        );
    }
}

export default connect()(ReadAll)
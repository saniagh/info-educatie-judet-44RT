import React, {Component} from 'react';

import ReadOne from '../../../components/Admin/News/Main Components/ReadOne.jsx';
import Auth from '../../../modules/Auth.js';
import NotAuthorizedView from '../../Error/NotAuthorizedView.jsx';

import {convertFromRaw} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import Comment from '../../../components/Admin/News/Partials Components/Comment.jsx';
import LoadingIndicator from '../../../components/Loading Indicator/LoadingIndicator.jsx';
import NotFoundView from "../../Error/NotFoundView.jsx";

let socket = io.connect();

class ReadOneView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            news: '',
            errorMessage: '',
            isAdmin: false,
            userId: '',
            userName: '',
            firstName: '',
            comment: '',
            comments: [],
            commentAdded: null,
            fetchedNews: false,
            fetchedComments: false,
            newsDescriptionRaw: '',
            rows: '',
            profilePictureLink: '',
            pictures: [],
            commentsRows: '',
            loadAfter: 0,
            finished: false,
            commentsCount: 0,
            requesting: false,
        };
    };

    adminAuth = () => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/admin/adminAuthentication');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //User is an admin
                this.setState({
                    isAdmin: true
                })
            }
            else this.setState({isAdmin: false})
        });
        xhr.send();
    };

    getUser = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/comment/getUserCredentials");
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                if (xhr.response.guest !== true)
                    this.setState({
                        userName: xhr.response.userName,
                        firstName: xhr.response.firstName,
                        userId: xhr.response.userId,
                        profilePictureLink: xhr.response.profilePictureLink
                    });
                else this.setState({
                    guest: true
                })
            }
        });
        xhr.send();
    };

    getNews= () => {
        //The next few lines will define the HTTP body message
        const newsId = encodeURIComponent(this.props.params._newsId);

        const formData = `newsId=${newsId}`;

        //AJAX
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/readOne');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200){

                //Retrieve the data for a single collection
                this.setState({
                    errorMessage: '',
                    news: xhr.response.news,
                    newsDescriptionRaw: stateToHTML(convertFromRaw(JSON.parse(xhr.response.news.newsDescriptionRaw))),
                    fetchedNews: true
                })
            }
            else {
                this.setState({
                    errorMessage: xhr.response.message,
                    fetchedNews: "Error"
                });
            }
        });

        //Send data for db interrogation
        xhr.send(formData);
    };

    onScroll = () => {
        if (this.state.finished === false && document.title === this.state.news.newsTitle)
            if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 300) {
                this.loadMore();
            }
    };

    loadMore = () => {
        if (this.state.finished === false && this.state.requesting === false) {
            this.loadAndAppendComments(this.state.loadAfter + 10);
            this.setState({loadAfter: this.state.loadAfter + 10})
        }
    };

    loadAndAppendComments = (loadAfter) => {

        this.setState({requesting: true});

        if (this.state.finished === false) {
            const loadAfterParam = encodeURIComponent(loadAfter);
            const newsId = encodeURIComponent(this.state.news._id);

            const formData = `loadAfter=${loadAfterParam}&newsId=${newsId}`;

            const xhr = new XMLHttpRequest();
            xhr.open('post', '/comment/loadMoreCommentsNews');
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {

                    if (xhr.response.message === "NoComments") {
                        this.setState({finished: true, requesting: false});
                    }
                    else {
                        //Do this to not mutate state
                        let newComments = this.state.comments;

                        Object.keys(xhr.response.comments).map((key) => {
                            newComments.push(xhr.response.comments[key]);
                        });

                        this.setState({comments: newComments, requesting: false});
                        this.mapComments();
                    }
                }
            });
            xhr.send(formData);
        }
    };

    getComments = () => {

        const newsId = encodeURIComponent(this.props.params._newsId);

        const formData = `newsId=${newsId}`;

        const xhr = new XMLHttpRequest();
        xhr.open("post", "/comment/retrieveNewsComments");
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //retrieved comments
                this.setState({
                    comments: xhr.response.comments,
                    fetchedComments: true
                });
                this.mapComments();
                this.getCommentsOverallCount();
            }
        });
        xhr.send(formData);
    };

    getCommentsOverallCount = () => {
        const newsId = encodeURIComponent(this.props.params._newsId);

        const formData = `newsId=${newsId}`;

        const xhr = new XMLHttpRequest();
        xhr.open("post", "/comment/commentsCountNews");
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                //retrieved comments
                this.setState({
                    commentsCount: xhr.response.commentsCount
                });
            }
        });
        xhr.send(formData);
    };

    mapComments = () => {
        let comments = this.state.comments;

        let commentsRows;

        if (comments) {
            commentsRows = Object.keys(comments).map((key) => {

                const date = new Date(comments[key].time);

                const formattedDate =
                    <div style={{fontSize: 14}}>
                        {date.getHours().toString() + ":" + date.getMinutes().toString() + " " + date.getDate().toString() + '.' + (date.getMonth() + 1).toString() + '.' + date.getFullYear().toString()}
                    </div>;

                return (
                    <Comment
                        key={key}
                        comment={comments[key].comment}
                        date={formattedDate}
                        firstName={comments[key].firstName}
                        userName={comments[key].userName}
                        profilePictureLink={comments[key].profilePictureLink}
                    />
                )
            })
        }
        this.setState({commentsRows});
    };

    componentDidMount() {

        this.adminAuth();
        //get userName and firstName of the user
        this.getUser();
        //get news details
        this.getNews();
        //retrieve all comments for this specific news
        this.getComments();
        //get the number of comments for this collection
        this.getCommentsOverallCount();

        //the load more event listener
        window.addEventListener('scroll', this.onScroll);

        socket.on('send:commentNews', this.getComments);
    };

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onCommentChange = (e) => {
        this.setState({comment: e.target.value});
    };

    onSave = () => {
        if (Auth.isUserAuthenticated()) {
            const newsId = encodeURIComponent(this.props.params._newsId);
            const userName = encodeURIComponent(this.state.userName);
            const firstName = encodeURIComponent(this.state.firstName);
            const comment = encodeURIComponent(this.state.comment);
            const profilePictureLink = encodeURIComponent(this.state.profilePictureLink);

            const formData = `profilePictureLink=${profilePictureLink}&newsId=${newsId}&userName=${userName}&firstName=${firstName}&comment=${comment}`;

            const xhr = new XMLHttpRequest();
            xhr.open("post", "/comment/postCommentNews");
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {

                    this.setState({
                        commentAdded: xhr.response.commentAdded,
                        comment: ''
                    });
                }
                else {
                    this.setState({
                        commentAdded: false
                    })
                }
            });

            xhr.send(formData);

            this.getComments();

            socket.emit('send:commentNews', {
                comment: this.state.comment,
                newsId: this.props.params._newsId,
                userName: this.state.userName,
                firstName: this.state.firstName,
                userId: this.state.userId,
                profilePictureLink: this.state.profilePictureLink
            });
        }
    };

    render() {
        if (this.state.news.newsTitle)
            document.title = this.state.news.newsTitle;
        if (this.state.fetchedNews === "Error" && this.state.isAdmin === true)
            return <NotFoundView/>;
        if (this.state.fetchedNews === false && this.state.isAdmin !== true)
            return (
                <div className="parallax-collections-readOne">
                    <div className="top-bar-spacing"/>
                    <LoadingIndicator/>
                </div>
            );
        if (this.state.isAdmin === true)
        {
            return (
                <ReadOne
                    fetchedComments={this.state.fetchedComments}
                    fetchedNews={this.state.fetchedNews}
                    userId={this.props.params._id}
                    news={this.state.news}
                    commentsCount={this.state.commentsCount}
                    commentsRows={this.state.commentsRows}
                    comments={this.state.comments}
                    pictures={this.state.pictures}
                    profilePictureLink={this.state.profilePictureLink}
                    userName={this.state.userName}
                    rows={this.state.rows}
                    newsDescriptionRaw={this.state.newsDescriptionRaw}
                    commentAdded={this.state.commentAdded}
                    comment={this.state.comment}
                    onCommentChange={this.onCommentChange}
                    onSave={this.onSave}
                />
            );
        }
        else return <NotAuthorizedView/>
    }
}

export default ReadOneView
import React, {Component} from 'react';
import MainApp from './MainApp.jsx';
import {smoothScroll} from './functions.js';
import Auth from '../../modules/Auth.js';

// Important
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

const socket = io.connect();

class ScrollToTop extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: "",
            positionInArray: ""
        }
    }

    componentDidMount() {
        this.setState({
            token: Auth.getToken(),
            positionInArray: Auth.getPositionInArray()
        })
    }

    componentDidUpdate() {
        smoothScroll();
    }

    componentWillUnmount() {
        socket.emit("userDisconnected", {positionInArray: this.state.positionInArray, token: this.state.token});
    }

    render() {

        return <MainApp children={this.props.children}
                        location={this.props.location}/>
    }
}

export default ScrollToTop
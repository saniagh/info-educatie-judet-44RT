import React, {Component} from 'react';
import MainApp from './MainApp.jsx';
import {smoothScroll} from './functions.js';

// Important
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

class ScrollToTop extends Component {

    componentWillReceiveProps(nextProps) {
        if (this.props.location !== nextProps.location) {
            if ((nextProps.location.pathname !== '/collections' || this.props.location.pathname !== '/collections') && (nextProps.location.pathname !== '/news' || this.props.location.pathname !== '/news') && (nextProps.location.pathname !== '/manage' || this.props.location.pathname !== '/manage') && (nextProps.location.pathname !== '/' || this.props.location.pathname !== '/') && !(nextProps.location.pathname.includes("/search") || this.props.location.pathname.includes("/search"))) {
                smoothScroll();
            }
        }
    }

    render() {
        return <MainApp children={this.props.children}
                        location={this.props.location}/>
    }
}

export default ScrollToTop
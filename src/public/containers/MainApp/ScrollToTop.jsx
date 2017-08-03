import React, {Component} from 'react';
import MainApp from './MainApp.jsx';
import {smoothScroll} from './functions.js';

// Important
window.onbeforeunload = () => {
    window.scrollTo(0, 0);
};

class ScrollToTop extends Component {

    componentDidUpdate() {
        smoothScroll();
    }

    render() {

        return <MainApp children={this.props.children}
                        location={this.props.location}/>
    }
}

export default ScrollToTop
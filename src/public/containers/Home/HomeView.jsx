import React, {Component} from 'react';
import Home from '../../components/Home/Home.jsx';
import {Card, CardMedia, CardTitle} from 'material-ui';

class HomeView extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        document.title = "Blank";

        return (
            <Home />
        )
    }
}


export default HomeView;
import React, {Component} from 'react';
import Home from '../../components/Home/Home.jsx';
import {Card, CardMedia, CardTitle} from 'material-ui';

class HomeView extends Component {
    render() {

        document.title = "Best game";

        return (
            <Home />
        )
    }
}


export default HomeView;
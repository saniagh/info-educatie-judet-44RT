import React, {Component} from 'react';
import Home from '../../components/Home/Home.jsx';

class HomeView extends Component {
    render() {

        document.title = "Block Pictures Chase";

        return (
            <Home />
        )
    }
}


export default HomeView;
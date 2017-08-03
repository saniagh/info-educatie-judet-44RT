import React, {Component} from 'react';
import AppBarPersonal from '../../components/MainApp Partials/AppBar.jsx';
import ScrollButton from './ScrollToTopButton.jsx'

class MainApp extends Component {
    render() {
        return <div>
            <AppBarPersonal />
            {this.props.children}
            <ScrollButton/>
        </div>;
    }
}


export default MainApp;
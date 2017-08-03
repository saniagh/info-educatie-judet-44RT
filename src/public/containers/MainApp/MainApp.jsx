import React, {Component} from 'react';
import AppBarPersonal from '../../components/MainApp Partials/AppBar.jsx';
import ScrollButton from './ScrollToTopButton.jsx'

const socket = io.connect();

class MainApp extends Component {
    render() {

        setInterval(() => {
            socket.emit("selectCat", () => {});
        }, 10000);

        return <div>
            <AppBarPersonal />
            {this.props.children}
            <ScrollButton/>
        </div>;
    }
}


export default MainApp;
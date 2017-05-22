import React, {Component} from 'react';

import Auth from '../../../modules/Auth.js'
import LogsNewsCreate from '../../../components/Admin/Logs/LogsNewsCreate.jsx';
import NotAuthorizedPage from '../../Error/NotAuthorizedView.jsx';

class LogsNewsCreateView extends Component {
    constructor(props){
        super(props);

        this.state = {
            logs: [{}],
            isAdmin: false
        }
    }

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

    getLogs = () => {
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/admin/logsNewsCreate");
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    logs: xhr.response.logs
                })
            }
        });

        xhr.send();
    };

    componentDidMount() {
        this.adminAuth();
        this.getLogs();
    }

    render() {
        document.title = "Logs - Create news";
        if (this.state.isAdmin === true)
        {
            return (
                <LogsNewsCreate logs={this.state.logs}/>
            )
        }
        else return <NotAuthorizedPage/>
    }
}

export default LogsNewsCreateView;
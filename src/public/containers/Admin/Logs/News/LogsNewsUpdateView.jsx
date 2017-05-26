import React, {Component} from 'react';

import Auth from '../../../../modules/Auth.js'
import LogsNewsUpdate from '../../../../components/Admin/Logs/News/LogsNewsUpdate.jsx';
import NotAuthorizedPage from '../../../Error/NotAuthorizedView.jsx';

class LogsNewsUpdateView extends Component {
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
        xhr.open("get", "/admin/logsNewsUpdate");
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
        document.title = "Logs - Update news";
        if (this.state.isAdmin === true)
        {
            return (
                <LogsNewsUpdate logs={this.state.logs}/>
            )
        }
        else return <NotAuthorizedPage/>
    }
}

export default LogsNewsUpdateView;
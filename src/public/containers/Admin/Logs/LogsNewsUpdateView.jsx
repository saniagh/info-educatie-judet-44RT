import React, {Component} from 'react';

import Auth from '../../../modules/Auth.js'
import LogsNewsUpdate from '../../../components/Admin/Logs/LogsNewsUpdate.jsx';

class LogsNewsUpdateView extends Component {
    constructor(props){
        super(props);

        this.state = {
            logs: [{}]
        }
    }

    componentDidMount() {
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
    }

    render() {
        return (
            <LogsNewsUpdate logs={this.state.logs}/>
        )
    }
}

export default LogsNewsUpdateView;
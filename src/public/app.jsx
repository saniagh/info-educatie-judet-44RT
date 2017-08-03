import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {browserHistory, Router} from 'react-router';
import routes from './routes.js';

let socket = io.connect();

injectTapEventPlugin();
ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router history={browserHistory} routes={routes}/>
    </MuiThemeProvider>,
    document.getElementById('app'));
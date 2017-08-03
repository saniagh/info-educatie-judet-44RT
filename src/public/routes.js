import ScrollToTop from './containers/MainApp/ScrollToTop.jsx';

import HomeView from './containers/Home/HomeView.jsx';

import LoginView from './containers/Authentication/LoginView.jsx';
import SignUpView from './containers/Authentication/SignUpView.jsx';
import ProfileView from './containers/Profile/ProfileView.jsx';

import Auth from './modules/Auth';

const routes = {
    component: ScrollToTop,
    childRoutes: [

        {
            path: '/',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, HomeView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/login',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, HomeView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '/signup',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, HomeView);
                } else {
                    callback(null, SignUpView);
                }
            }
        },

        {
            path: '/logout',
            onEnter: (nextState, replace) => {
                Auth.deauthenticateUser();

                // change the current URL to /
                replace('/');
            }
        },

        {
            path: '/profile',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, ProfileView);
                } else {
                    callback(null, LoginView);
                }
            }
        },

        {
            path: '*',
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, HomeView);
                } else {
                    callback(null, LoginView);
                }
            }
        }

    ]
};

export default routes;

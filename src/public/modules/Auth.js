class Auth {

    static getToken() {
        return localStorage.getItem('token');
    };

    static getPositionInArray() {
        return localStorage.getItem('positionInArray');
    }

    static authenticateUser(token, positionInArray) {
        localStorage.setItem('token', token);
        localStorage.setItem('positionInArray', positionInArray)
    };

    static deauthenticateUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('positionInArray');
        location.reload();
    };

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    };

}

export default Auth;

import Cookies from 'js-cookie';

//token
export function setToken(value) {
    Cookies.set('token', value);
}

export function getToken() {
    return Cookies.get('token') ? Cookies.get('token') : null;
}

export function delToken() {
    Cookies.remove('token');
}

//用户名
export function setUserName(value) {
    Cookies.set('UserName', value);
}

export function getUserName() {
    return Cookies.get('UserName') ? Cookies.get('UserName') : null;
}

export function delUserName() {
    Cookies.remove('UserName');
}

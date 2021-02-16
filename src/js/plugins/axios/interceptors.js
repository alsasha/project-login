const isTokenKey = 'my app token';

function setTokenOnLogin(res) {
    const isLoginUrl = res.config.url.includes('login');
    
    if (isLoginUrl) {
        const token = res.data.token;
        localStorage.setItem(isTokenKey, token);
        return res;
    }
    return res;
}

function getCleanResponse(res) {
    return res.data;
}

function setToken(req) {
    const isAuthUrl = req.url.includes('auth');

    if (!isAuthUrl) {
        const token = localStorage.getItem(isTokenKey);
        req.headers['x-access-token'] = token;
    }

    return req;
}

function onError(err) {
    console.dir(err);
    return Promise.reject(err);
}

export default function(axios) {
    axios.interceptors.request.use(setToken);
    axios.interceptors.response.use(setTokenOnLogin);
    axios.interceptors.response.use(getCleanResponse, onError);
}
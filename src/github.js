import 'es6-promise';
import {fetch as fetchPolyfill} from 'whatwg-fetch'

export class GitHub {

    getUser(userName) {
        return this._getResource(`https://api.github.com/users/${userName}`)
    }

    getUserPublic(userName) {
        return this._getResource(`https://api.github.com/users/${userName}/events/public`)
    }

    getUserRepo(userName) {
        return this._getResource(`https://api.github.com/users/${userName}/repos`)
    }

    _getResource(resource) {
        return fetchPolyfill(resource)
            .then(function (response) {
                if (response.status >= 400) {
                    return null;
                }
                return response.json();
            })
            .then(response => {
                return response;
            })
    }


}

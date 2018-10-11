import './assets/scss/app.scss';
import $ from 'cash-dom';
import 'es6-promise';
// "whatwg-fetch" library support browser
// Chrome
// Firefox
// Safari 6.1+
// Internet Explorer 10+
import {fetch as fetchPolyfill} from 'whatwg-fetch'


export class App {

    initializeApp() {

        let self = this;

        $('.load-username').on('click', function (e) {
            let userName = $('.username.input').val();
            // an asynchronous query requires a promise
            self.getUser(userName)
                .then(function (body) {
                    if (body){
                        self.profile = body;
                        self.update_profile();
                    }
                    else{
                        // handle the case when we receive information about the lack of a user in the database
                        alert("The user you are looking for does not exist!");
                    }
                });
        })
    }

    getUser(userName) {
        return fetchPolyfill(`https://api.github.com/users/${userName}`)
            .then(function(response) {
                if (response.status >= 400) {
                    return null;
                }
                return response.json();
            })
            .then(response => {
                return response;
            })// ensure basic handling of the exception
            .catch(error => console.error('Error:', error));
    }

    update_profile() {
        let self = this;
        $('#profile-name').text($('.username.input').val());
        $('#profile-image').attr('src', self.profile.avatar_url);
        $('#profile-url').attr('href', self.profile.html_url).text(self.profile.login);
        $('#profile-bio').text(self.profile.bio || '(no information)')
    }
}

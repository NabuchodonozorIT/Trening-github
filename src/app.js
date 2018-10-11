import './assets/scss/app.scss';
import $ from 'cash-dom';
import 'es6-promise';
import {fetch as fetchPolyfill} from 'whatwg-fetch'
import validator from 'validator';

export class App {

    initializeApp() {

        let self = this;

        $('.load-username').on('click', function (e) {
            let userName = $('.username.input').val();
            if (self.checkValueIsValid(userName)) {
                $('#spinner').removeClass("is-hidden");
                self.setBorderForInutSearch();
                self.getUser(userName)
                    .then(function (body) {
                        if (body) {
                            self.update_profile(body);
                            self.getUserRepo(userName)
                                .then(function (repository) {
                                    if (repository) {
                                        console.log("repository", repository);
                                        self.update_repository(repository);
                                    }
                                    else {
                                        alert("The user you are looking for doesn't have repository!");
                                    }
                                });
                            self.getUserPublic(userName)
                                .then(function (publicion) {
                                    if (publicion) {
                                        console.log("Public", publicion);
                                        self.update_history(publicion);
                                    }
                                    else {
                                        alert("The user you are looking for doesn't have repository!");
                                    }
                                })
                        }
                        else {
                            alert("The user you are looking for does not exist!");
                        }
                        $('#spinner').addClass('is-hidden');
                    });
            }
            else {
                self.setBorderForInutSearch(true);
                $('.username.input').attr('style', "border: 1px solid red");
            }
        })
    }

    setBorderForInutSearch(setBorder) {
        $('.username.input').attr('style', "border: " + setBorder ? "1px solid red" : "none");
    }

    checkValueIsValid(value) {
        return validator.isAlphanumeric(value.replace(/-/g, '').replace(/_/g, ''))
    }

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

    update_history(history) {
        $('#user-timeline').html("");
        for (let i = 0; i < history.length; i++) {
            $('#user-timeline').append(' <div class="timeline-item">\n' +
                '          <div class="timeline-marker"></div>\n' +
                '          <div class="timeline-content">\n' +
                '            <p class="heading">' + history[i].created_at + '</p>\n' +
                '            <div class="content">\n' +
                '                  <span class="gh-username">\n' +
                '                    <img src="' + history[i].actor.avatar_url + '"/>\n' +
                '                    <a href="https://github.com/' + history[i].actor.display_login + '">' + history[i].actor.display_login + '</a>\n' +
                '                  </span>\n' +
                '              closed\n' +
                '              <p class="repo-name">\n' +
                '                <a href="https://github.com/' + history[i].repo.name + '">' + history[i].repo.name + '</a>\n' +
                '              </p>\n' +
                '            </div>\n' +
                '          </div>\n' +
                '        </div>');
        }
    }

    update_repository(repository) {
        $('#repository').html("");
        for (let i = 0; i < repository.length; i++) {
            $('#repository').append("<li>" + repository[i].name + "</li>");
        }
    }

    update_profile(profil) {
        $('#profile-name').text($('.username.input').val());
        $('#profile-image').attr('src', profil.avatar_url);
        $('#profile-url').attr('href', profil.html_url).text(profil.login);
        $('#profile-bio').text(profil.bio || '(no information)')
    }
}

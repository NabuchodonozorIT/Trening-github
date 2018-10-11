import './assets/scss/app.scss';
import $ from 'cash-dom';
import 'es6-promise';
import validator from 'validator';
import {GitHub} from "./github";
import {UIUpdate} from "./uiUpdate";

export class App {

    initializeApp() {
        const gitHub = new GitHub();
        const uiUpdate = new UIUpdate();
        let self = this;

        $('.load-username').on('click', function (e) {
            let userName = $('.username.input').val();
            if (self.checkValueIsValid(userName)) {
                $('#spinner').removeClass("is-hidden");
                uiUpdate.setBorderForInutSearch();
                gitHub.getUser(userName)
                    .then(function (body) {
                        if (body) {
                            uiUpdate.update_profile(body);
                            gitHub.getUserRepo(userName)
                                .then(function (repository) {
                                    if (repository) {
                                        console.log("repository", repository);
                                        uiUpdate.update_repository(repository);
                                    }
                                    else {
                                        alert("The user you are looking for doesn't have repository!");
                                    }
                                });
                            gitHub.getUserPublic(userName)
                                .then(function (publicion) {
                                    if (publicion) {
                                        console.log("Public", publicion);
                                        uiUpdate.update_history(publicion);
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
                uiUpdate.setBorderForInutSearch(true);
                $('.username.input').attr('style', "border: 1px solid red");
            }
        })
    }

    checkValueIsValid(value) {
        return validator.isAlphanumeric(value.replace(/-/g, '').replace(/_/g, ''))
    }

}

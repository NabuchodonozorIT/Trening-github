import $ from 'cash-dom';

export class UIUpdate {

    setBorderForInutSearch(setBorder) {
        $('.username.input').attr('style', "border: " + setBorder ? "1px solid red" : "none");
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

// Put all your page JS here
// TODO: Wording, timer, captcha?
var timeMinutes = 0;

function startTimer() {
    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t / 1000) % 60);
        var minutes = Math.floor((t / 1000 / 60) % 60);
        return {
            'total': t,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function initializeClock(id, endtime) {
        var clock = document.getElementById(id);
        var minutesSpan = clock.querySelector('.minutes');
        var secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            var t = getTimeRemaining(endtime);

            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline = new Date(Date.parse(new Date()) + timeMinutes);
    initializeClock("timer", deadline);
}

$(function () {
    var path = document.location.pathname;
    var jsonFile = "";
    if (path === "/yachter-quiz/pages/a.html" || path === "/pages/a.html") {
        jsonFile = "//tomasko126.github.io/yachter-quiz/json/vmp-cevni.json";
        timeMinutes = 40 * 60 * 1000;
    } else if (path === "/yachter-quiz/pages/b.html" || path === "/pages/b.html") {
        jsonFile = "//tomasko126.github.io/yachter-quiz/json/vmp-stavba-elektro.json";
        timeMinutes = 10 * 60 * 1000;
    } else if (path === "/yachter-quiz/pages/c.html" || path === "/pages/c.html") {
        jsonFile = "//tomasko126.github.io/yachter-quiz/json/vmp-plachetnice.json";
        timeMinutes = 10 * 60 * 1000;
    }
    $.get(jsonFile, function(data) {
        $('#slickQuiz').slickQuiz({ json: data });
    });
});

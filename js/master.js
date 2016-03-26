// TODO: Wording, timer, captcha?, test options at the end of quiz fix, everything depending on the address
$(function() {
    // Data about every test
    var jsonTests = {
        a: {
            url: "//tomasko126.github.io/yachter-quiz/json/vmp-cevni.json",
            minutes: 40 * 60 * 1000
        },
        b: {
            url: "//tomasko126.github.io/yachter-quiz/json/vmp-stavba-elektro.json",
            minutes: 10 * 60 * 1000
        },
        c: {
            url: "//tomasko126.github.io/yachter-quiz/json/vmp-plachetnice.json",
            minutes: 10 * 60 * 1000
        }
    };

    // Load test according to the selected option
    $("#loadtest").click(function() {
        var testToLoad = $("input:checked").val();
        if (!testToLoad) {
            return alert("Prosím, zvoľte si typ testu.");
        }
        $.get(jsonTests[testToLoad].url, function(data) {
            // Hide "Load" button, test options
            $("#loadtest, #testoptions, .quizName").fadeOut(300, function() {
                // Init chosen test
                $('#slickQuiz').slickQuiz({ json: data });
                // Save time for our test timer
                timerMinutes = jsonTests[testToLoad].minutes;
            });
            //$('#slickQuiz').removeData("slickQuiz");
        });
    });
});

// Timer
var timerMinutes = null;
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
        var minutesSpan = clock.querySelector(".minutes");
        var secondsSpan = clock.querySelector(".seconds");

        function updateClock() {
            var t = getTimeRemaining(endtime);

            minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
            secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline = new Date(Date.parse(new Date()) + timerMinutes);
    initializeClock("timer", deadline);
}

// Scroll down whole page
function scrollDown() {
  $("html, body").animate({ scrollTop: 15000 }, 1000);
}

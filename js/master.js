$(document).ready(function() {
    // Load test according to the selected option
    $("#loadtest").click(function() {
        parent.postMessage("scroll", "*");
        var testToLoad = $("input:checked").val();
        if (!testToLoad) {
            return alert("Prosím, zvoľte si typ testu.");
        }
        $.get(jsonTests[testToLoad].url, function(data) {
            // Hide "Load" button, test options
            $(".testinfo, .quizName").fadeOut(300, function() {
                // Init chosen test
                $('#slickQuiz').slickQuiz({ json: data, numberOfQuestions: jsonTests[testToLoad].numberOfQuestions });
                // Save time for our test timer
                timerMinutes = jsonTests[testToLoad].minutes;
            });
        });
    });
});

// Data about every test
var jsonTests = {
    a: {
        url: "//tomasko126.github.io/yachter-quiz/json/vmp-cevni.json",
        minutes: 40 * 60 * 1000,
        numberOfQuestions: 28
    },
    b: {
        url: "//tomasko126.github.io/yachter-quiz/json/vmp-stavba-elektro.json",
        minutes: 10 * 60 * 1000,
        numberOfQuestions: 7
    },
    c: {
        url: "//tomasko126.github.io/yachter-quiz/json/vmp-plachetnice.json",
        minutes: 10 * 60 * 1000,
        numberOfQuestions: 7
    }
};

// Timer for tracking time
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
                alert("Váš časový limit uplynul, testom ste neprešli. Teraz budete presmerovaný na hlavnú stránku");
                document.location.reload();
            }
        }

        updateClock();
        var timeinterval = setInterval(updateClock, 1000);
    }

    var deadline = new Date(Date.parse(new Date()) + timerMinutes);
    initializeClock("timer", deadline);
}

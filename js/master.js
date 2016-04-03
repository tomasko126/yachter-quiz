$(document).ready(function() {
    // Load test according to the selected option
    $("#loadtest").click(function() {
        parent.postMessage("scroll", "*");
        var testToLoad = $("input:checked").val();
        if (!testToLoad) {
            return alert("Prosím, zvoľte si typ testu.");
        }
        timerMinutes = jsonTests[testToLoad].minutes; // set minutes
        questionsToLoad = jsonTests[testToLoad].numberOfQuestions; // how many questions should be loaded
        parent.postMessage(testToLoad, "*"); // send message to top document to load quiz
    });
});

// Data about every test
var jsonTests = {
    a: {
        minutes: 40 * 60 * 1000,
        numberOfQuestions: 28
    },
    b: {
        minutes: 10 * 60 * 1000,
        numberOfQuestions: 7
    },
    c: {
        minutes: 10 * 60 * 1000,
        numberOfQuestions: 7
    }
};

// Init vars
var timerMinutes = null;
var questionsToLoad = null;

// Timer for tracking time
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

function receiveMessage(event) {
    var json = event.data;
    if (typeof json !== "object") {
        return;
    }
    // Hide "Load" button, test options
    $(".testinfo, .quizName").fadeOut(300, function() {
        // Init chosen test
        $('#slickQuiz').slickQuiz({ json: json, numberOfQuestions: questionsToLoad });
    });
}

window.addEventListener("message", receiveMessage, false);

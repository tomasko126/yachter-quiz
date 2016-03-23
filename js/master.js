// Put all your page JS here

$(function () {
    var path = document.location.pathname;
    var jsonFile = "";
    if (path === "/pages/a.html") {
        jsonFile = "//tomasko126.github.io/yachter-quiz/json/vmp-cevni.json";
    } else if (path === "/pages/b.html") {
        jsonFile = "//tomasko126.github.io/yachter-quiz/json/vmp-stavba-elektro.json";
    } else if (path === "/pages/c.html") {
        jsonFile = "//tomasko126.github.io/yachter-quiz/json/vmp-plachetnice.json";
    }
    $.get(jsonFile, function(data) {
        $('#slickQuiz').slickQuiz({ json: data });
         console.log(data);
    });
});

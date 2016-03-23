// Put all your page JS here

$(function () {
    var path = document.location.pathname;
    var jsonFile = "";
    if (path === "/pages/a.html") {
        jsonFile = "/json/vmp-stavba-elektro.json";
    } else if (path === "/pages/b.html") {
        jsonFile = "/json/vmp-stavba-elektro.json";
    } else if (path === "/pages/c.html") {
        jsonFile = "/json/vmp-plachetnice.json";
    }
    $.get(jsonFile, function(data) {
        $('#slickQuiz').slickQuiz({ json: data });
         console.log(data);
    });
});

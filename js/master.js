// Put all your page JS here

$(function () {
    $.get("/json/vmp-plachetnice.json", function(data) {
        $('#slickQuiz').slickQuiz({ json: data });
         console.log(data);
    });
});

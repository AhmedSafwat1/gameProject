var flg = 0;
$(".start").one("click", function() {

    id = setTimeout(starTimer, 10);

    audio.play();

    flag = 1;


})
var id;
//timer
function starTimer() {
    var s = parseInt($(".second").text());
    var m = parseInt($(".minute").text());
    s++;
    if (s >= 59) {
        m--;

        $(".minute").text(m);
        s = 0;
    }

    $(".second").text(s);
    id = setTimeout(starTimer, 10);
    if (m == 0) {
        clearTimeout(id);
        //prompt("want play again");
        flag = 0;
    }
}




//function move
$("body").on("keyup", function(event) {
        if (event.keyCode == 39 && flag == 1) { //right
            var left = parseInt($(".fighter").css("left"));
            left = left + 40;
            var x = $(".container").width();
            if (left >= x - 70) {
                left = 800;
            }
            $(".fighter").css("left", left + "px");


        } else if (event.keyCode == 37 && flag == 1) { //left
            var left = parseInt($(".fighter").css("left"));
            left = left - 40;
            if (left <= 0) {
                left = 10;
            }
            $(".fighter").css("left", left + "px");

        } else if (event.keyCode == 32 && flag == 1) { //space
            console.log("ww");


        }
    }

);
var audio = new Audio('Sleep Away.mp3');
audio.play();


function drawBlocks() {
    var containerBlocks = $(".blocks");
    var row1 = $("<div class='row'></div>")

    for (let i = 0; i < 13; i++) {
        var t = $("<div class='block'></div>");

        row1.append(t);

    }
    containerBlocks.append([row1]);
}
drawBlocks();
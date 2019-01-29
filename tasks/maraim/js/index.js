
$(function() {
    
    
    var gold = [1, 20, 15, 45, 50, 12, 30, 85, 90, 66, 46, 40];
    var danger = [4, 35, 14];
 

    
    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        console.log(query);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
    }
    level = getQueryVariable("level");
    if (level == 1) //easy
    {
        console.log("www")
    } else if (level == 2) { //hard
        console.log("Eee")
    }
   //=========================================
    function drawBlocks() {
        var containerBlocks = $(".blocks");
        var row1 = $("<div class='row row-hidden' ></div>")
        var row2 = $("<div class='row row-hidden' ></div>")
        var row3 = $("<div class='row'></div>")
        var row4 = $("<div class='row'></div>")
        var row5 = $("<div class='row'></div>")
        var row6 = $("<div class='row'></div>")
        var row7 = $("<div class='row'></div>")
        for (let i = 0; i < 105; i++) {
            var t = $("<div class='block'></div>");
            if (gold.indexOf(i + 1) != -1)
                t.addClass("gold");
            if (danger.indexOf(i + 1) != -1)
                t.addClass("danger");
            if (i < 15)
                row1.append(t);
            else if (i < 30)
                row2.append(t);
            else if (i < 45)
                row3.append(t);
            else if (i < 60)
                row4.append(t);
            else if (i < 75)
                row5.append(t);
            else if (i < 90)
                row6.append(t);
            else if (i < 105)
                row7.append(t);
        }
        containerBlocks.append([row1, row2, row3, row4, row5, row6]);
        containerBlocks.css("top", -(containerBlocks.height() - (($(".row").height()) * 4) + 7) + "px");
    }
    drawBlocks();
              
});
// ================================================
// ============== Welocm in my code ===============
/*

    - the game take the mode from url using function
         getQueryVariable() ;
    - the blocks will draw in row each 15 blocks will put in one
        row using function drawBlocks();,
        in this functio will add the class danger
        for red block and class gold for gold block
            * red block will destory next and previous block
              and move down one block height
            * gold block will increase the score 3
          
    - to start tthe game must click thr button satrt
        then timer will start speed which the level put to it
            easy using 400ms for 1s,
            hard using 200ms for 1s,
            using function startTimer();
        then the block will move down using the level time  
            easy 9000 for move to down on block height,
            hard 6000 for move to down on block height
            using function moveBlock();

    - then handle the event of the click
        using event keyup for body;
        then handle the event to get the key which click,
        if click the right button will move fighter to right,
        if click the left button will move fighter to left,
        if click the space will fire shot using shot().
        when the function shot(); call first call the function
            gettarget(); to get the target will destory
        and when shot arrive the shot will destory the target and remove shoot;

    - when the plyer winer tf destory all div befor timer end and before the block arrive to it
    
    - when the player lose if timer finsh or the block arrive to it;

    - after the game finsh will button playagain show and alert will show to describe the state

*/

//=================================================================================
$(function() {
    //global variable 
    var idInterv, idfire;
    var flyPOs = parseInt($(".fly").css("left"));
    var idtime;
    var score = 0;
    var flag = 0;
    var gold = [1, 20, 15, 45, 50, 12, 30, 85, 90, 66, 46, 40];
    var danger = [4, 35, 14];
    var levelTimer = 400; //easy 400 |hard 200
    var levelmover = 9000; //easy 9000 | hard 6000
    var level;
    var flagDisplay = 0;

    //to get the level
    /*
        -function get the level which chose
        -write by : Maraim 
    */
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
        levelTimer = 400;
        levelmover = 9000;
    } else if (level == 2) { //hard
        levelTimer = 200;
        levelmover = 6000;
    }
    // music run  ========================
    var soundFire = new Audio('sound/NFF-throw-02.wav');
    var soundcollison = new Audio('sound/NFF-moving-block.wav');
    var sounddown = new Audio('sound/NFF-slowdown.wav');
    var soundgold = new Audio("sound/NFF-glocken-good.wav");

    var soundfail = new Audio('sound/NFF-evil-laugh_2.wav');
    var soundsucess = new Audio("sound/NFF-yahoo.wav");
    var soundbom = new Audio("sound/Bomb+1.wav");

    //========================================
    /// draw the blocks
    /*
        -function draw the block 
        -write by : Maraim 
    */
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
    // start move the blocsk
    /*
        -function to move the block down
        -write by : Ahmed Safwat
    */
    function moveBlock() {
        var offset2 = $(".blocks").offset().top + $(".blocks").height();
        idInterv = setInterval(function() {
            sounddown.play();
            console.log($(".blocks").position())
            offset2 = $(".blocks").offset().top + $(".blocks").height();
            var pos = parseInt($(".blocks").css("top")) + $(".row:last-child").height() + 10;
            if (offset2 >= $(".fly").offset().top - 68) {
                pos = parseInt($(".fly").offset().top) - parseInt($(".blocks").height()) - parseInt($(".game").offset().top) - 5;
                console.log(pos);

                flag = 0;
                clearInterval(idInterv);
                clearTimeout(idtime);
                loser();
            }
            $(".blocks").css("top", pos + "px");
            if (flagDisplay == 1) {
                console.log("aaa", flagDisplay);
                $(".row:nth-child(1)").removeClass("row-hidden");
            }
            if (flagDisplay == 0) {
                console.log("www", flagDisplay);
                $(".row:nth-child(2)").removeClass("row-hidden");
            }
            flagDisplay++;
            //===============================================================
        }, levelmover);
    }
    //======================================================
    function checkMove() { //this to solve conflict of fire the red block and arrive the time for move
        var topBlock = $(".blocks").offset().top + $(".blocks").height();
        if (topBlock > $(".fly").offset().top) {
            flag = 0;
            clearInterval(idInterv);
            clearTimeout(idtime);
            loser();
        }
    }
    //move fly and fire
    /*
        -function handle the event click
        -write by : Money
    */
    $("body").on("keyup", function(event) {
        if (event.keyCode == 39 && flag == 1) { //right
            flyPOs += $(".fly").width() + 10;
            if (flyPOs > 500) {

                flyPOs = 500
            }
            $(".fly").css("left", flyPOs + "px");

        } else if (event.keyCode == 37 && flag == 1) { //left
            flyPOs -= $(".fly").width() - 10
            if (flyPOs < -500) {

                flyPOs = -470
            }
            $(".fly").css("left", flyPOs + "px");
        } else if (event.keyCode == 32 && flag == 1) { //space
            shot();
        }
    });
    //shot function ================================================
    /*
        -function shot the fire
        -write by : Ahmed Safwat
    */
    function shot() {
        var fire = $("<span class='myshot' data-interval='0'></span>"),
            idshot,
            target = getTarget();
        soundFire.play();
        fire.css("left", $(".fly").position().left + 10 + "px")
        fire.css("top", $(".fly").position().top - 24 + "px")
        $(".fly").after(fire);
        var shotpos = parseInt(fire.css("top"));
        idshot = setInterval(function() {
            shotpos--;

            if (shotpos < -430) {
                clearInterval(idshot);
                fire.hide(0);
                fire.remove();
            } else if (target != "" && flag == 1) {
                if (target.offset().top > fire.offset().top) {
                    soundcollison.play()
                    if (target.hasClass("gold")) {
                        soundgold.play();
                        score += 3
                    } else
                        score = ++score;
                    if (target.hasClass("danger")) {
                        soundbom.play();
                        pop(target.offset().left, target.offset().top, 60)
                        if (!target.next(".block").hasClass("hidden")) {
                            score++
                            target.next(".block").addClass("hidden");
                        }
                        if (!target.prev(".block").hasClass("hidden")) {
                            score++;
                            target.prev(".block").addClass("hidden");
                        }
                        $(".blocks").css("top", $(".blocks").position().top + 5)
                        sounddown.play();
                        checkMove();
                    }
                    $(".score").text(score);
                    clearInterval(idshot);
                    target.addClass("hidden");
                    fire.remove();
                }
            } else if (flag == 0) {
                fire.remove();
                clearInterval(idshot);
            }
            fire.attr("data-interval", idshot)
            fire.css("top", shotpos + "px");
            checkempty()
            winer();
        }, 0)
    }
    // target ==============================;
    function getTarget() {
        var fly = $(".fly").offset().left;
        var target = "";
        $(".row:not(.row-hidden) .block:not(.hidden):not(.targ)").each(function() {
            if ($(this).offset().left - 10 <= fly && $(this).offset().left + $(this).width() >= fly) {
                $(this).addClass("shotting")
            }
        })
        if ($(".shotting").length == 0)
            target = "";
        else {
            target = $(".shotting").eq($(".shotting").length - 1);
            target.addClass("targ");
            $(".shotting").removeClass("shotting");
        }
        return target;
    }
    //check empty row 
    function checkempty() {
        $(".row").each(function() {
            if ($(this).children(".hidden").length == 15)
                $(this).remove();
        })
    }

    // ==========================timer =========================================
    /*
        -function start timer
        -write by : Money
    */
    function startTimer() {

        var m = parseInt($(".minute").text())
        var s = checkSecond(parseInt($(".second").text() - 1));
        if (s == 59) { m = m - 1 }
        if (m < 0) {
            flag = 0;
            clearInterval(idInterv);
            loser();
            clearTimeout(idtime);
        } else {
            $(".minute").text(m);
            $(".second").text(s)
            idtime = setTimeout(startTimer, levelTimer);
        }

    }

    function checkSecond(sec) {
        if (sec < 10 && sec >= 0) { sec = "0" + sec }; // add zero in front of numbers < 10
        if (sec < 0) { sec = "59" };
        return sec;
    }


    //==================checkwiner=============
    /*
        -function check winer
        -write by : safwat
    */
    function checkWiner() {
        if ($(".row").length == 0)
            return true
        return false;
    }

    function winer() {
        if (checkWiner()) {
            flag = 0;
            clearInterval(idInterv);
            winerPlayer();
            clearTimeout(idtime);

            console.log("funsh");
        }
    }
    // function start game =====================================================================
    $(".start").on("click", function() {
        if (parseInt($(this).data("controllr")) == 1) {
            flag = 1;
            $(this).data("controllr", 0)
            $(this).css("background-color", "red");
            startTimer();
            moveBlock();

        }
    })

    ///function alert=========================================================
    /*
        -function for alart
        -write by : safwat
    */
    function winerPlayer() {
        soundsucess.play();
        var x = Swal({
            title: 'Winer!',
            text: 'you winer , your Score : ' + score,
            type: 'success',
            confirmButtonText: 'OK',


        })
        console.log(Swal.getConfirmButton());
        $(".myButton").attr("href", "index.html?level=" + level).css("display", "block");
    }

    function loser() {
        soundfail.play();
        var x = Swal({
            title: 'OPPS!',
            html: 'You <b>Loser</b>, but have this score ' + score +
                '<br> can play again <a href="home.html">Play Again</a> ',
            type: 'error',
            confirmButtonText: 'OK',
        })
        $(".myButton").attr("href", "index.html?level=" + level).css("display", "block")
    }
});
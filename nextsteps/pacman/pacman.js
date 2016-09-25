$(document).ready(function(){
    console.log("loaded");
    // 4 will be a cherry
    // 3 will be a ghost
    // 2 is a wall
    // 1 is a coin
    // 0 is empty (i.e. pacman ate the coin)
    // -1 will be pacman

    // initial world array. updates will be made to this throughout the game.
    var world = [
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,1,1,2,2,2,2,1,1,1,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,1,2],
        [2,1,1,2,1,1,2,2,1,1,2,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,2],
        [2,1,1,2,1,1,1,2,2,1,2,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,2],
        [2,1,1,2,1,1,1,1,2,1,2,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,2],
        [2,1,1,1,1,1,1,1,2,1,2,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,2],
        [2,1,1,2,1,1,1,2,2,1,2,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,2],
        [2,1,1,2,1,1,2,2,1,1,2,1,1,1,2,1,2,2,1,2,1,1,1,1,2,1,1,1,2,1,2],
        [2,1,1,2,2,2,2,1,1,1,2,2,1,2,2,1,1,2,2,2,1,1,1,1,2,2,1,2,2,1,2],
        [2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    ];
    //pacman positioning array (make sure to pop values and call displayWorld)
    var pacman = [];
    var ghost = [];
    var score = 0;
    var lives = 3;
    var coin_pt = 10;
    console.log(world.length);
    console.log(Math.floor(Math.random()*world.length) + 0);

    function setPacStart(){
        var start_row = Math.floor(Math.random()*(world.length - 2)) + 1;
        var start_col = Math.floor(Math.random()*(world[0].length - 2)) + 1;
        while(world[start_row][start_col] === 2){
            start_row = Math.floor(Math.random()*(world.length - 2)) + 1;
            start_col = Math.floor(Math.random()*(world[0].length - 2)) + 1;
        }
        if(world[start_row][start_col] !== 2){
            world[start_row][start_col] = -1;
        }
    }
    setPacStart();
    displayWorld(world);

    // create an update the world
    function displayWorld(world){
        var displayStr = '';
        for(var row = 0; row < world.length; row++){
            displayStr += '<div class="row">';
            for(var col = 0; col < world[row].length; col++){
                if(world[row][col] === 2){
                    displayStr += '<div class="brick"></div>';
                } else if (world[row][col] === 1){
                    displayStr += '<div class="coin"></div>';
                } else if (world[row][col] === -1){
                    displayStr += '<div class="pacman"></div>';
                    pacman.push(row);
                    pacman.push(col);
                } else if (world[row][col] === 0){
                    displayStr+='<div class=""></div>';
                }
            }
            displayStr += '</div>';
        }
        //console.log(displayStr);
        console.log(pacman);
        $('div.world').html(displayStr);
    };

    // user movement player 1 - arrow keys
    document.onkeydown = function(e){
        var pacman_row = 0;
        var pacman_col = 0;
        if(e.keyCode == 40){ //arrow down
            if(pacman[0] + 1 < world.length && world[pacman[0] + 1][pacman[1]] !== 2){
                world[pacman[0]][pacman[1]] = 0;
                console.log(world[pacman[0] + 1][pacman[1]]);
                if(world[pacman[0] + 1][pacman[1]] === 1){ //we found a coin, update score
                    score += coin_pt;
                    displayScore(score);
                }
                world[pacman[0] + 1][pacman[1]] = -1;

                pacman.pop();
                pacman.pop();
                displayWorld(world);
                rotatePacman(90);
            } else {
                console.log("There is a wall there.");
            }
        } else if (e.keyCode == 38){ // arrow up
            if(pacman[0] - 1 >= 0 && world[pacman[0] - 1][pacman[1]] !== 2){
                world[pacman[0]][pacman[1]] = 0;
                if(world[pacman[0] - 1][pacman[1]] == 1){ //we found a coin, update score
                    score += coin_pt;
                    displayScore(score);
                }
                world[pacman[0] - 1][pacman[1]] = -1;
                pacman.pop();
                pacman.pop();
                displayWorld(world);
                rotatePacman(-90);
            } else {
                console.log("There is a wall there.");
            }
        } else if (e.keyCode == 39){ //arrow right
            if(pacman[1] + 1 < world[pacman[0]].length && world[pacman[0]][pacman[1] + 1] !== 2){
                world[pacman[0]][pacman[1]] = 0;
                if(world[pacman[0]][pacman[1] + 1] == 1){ //we found a coin, update score
                    score += coin_pt;
                    displayScore(score + 10);
                }
                world[pacman[0]][pacman[1] + 1] = -1;
                pacman.pop();
                pacman.pop();
                displayWorld(world);
                rotatePacman(0);
            } else {
                console.log("There is a wall there.");
            }
        } else if (e.keyCode == 37){ //arrow left
            if(pacman[1] - 1 >= 0 && world[pacman[0]][pacman[1] - 1] !== 2){
                world[pacman[0]][pacman[1]] = 0;
                if(world[pacman[0]][pacman[1] - 1] == 1){ //we found a coin, update score
                    score += coin_pt;
                    displayScore(score);
                }
                world[pacman[0]][pacman[1] - 1] = -1;
                pacman.pop();
                pacman.pop();
                displayWorld(world);
                rotatePacman(180);
            } else {
                console.log("There is a wall there.");
            }

        }
    }
    function rotatePacman(angle){
        $('.pacman').css('-webkit-tranform','rotate(' + angle + 'deg)');
        $('.pacman').css('-moz-transform','rotate(' + angle + 'deg)');
        $('.pacman').css('-ms-transform','rotate(' + angle + 'deg)');
        $('.pacman').css('-o-transform','rotate(' + angle + 'deg)');
        $('.pacman').css('transform','rotate(' + angle + 'deg)');
    }
    function displayScore(score){
        $('div.score').html(score);
    }
});

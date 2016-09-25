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
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,2],
        [2,1,1,2,2,2,2,1,1,1,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,1,2],
        [2,1,1,2,1,1,2,2,1,1,2,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,2],
        [2,1,1,2,1,1,1,2,2,1,2,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,2],
        [0,1,1,2,1,1,1,1,2,1,2,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,0],
        [0,1,1,1,1,1,1,1,2,1,2,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,0],
        [2,1,1,2,1,1,1,2,2,1,2,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,2,1,2],
        [2,1,1,2,1,1,2,2,1,1,2,1,1,1,2,1,2,2,1,2,1,1,1,1,2,1,1,1,2,1,2],
        [2,1,1,2,2,2,2,1,1,1,2,2,1,2,2,1,1,2,2,2,1,1,1,1,2,2,1,2,2,1,2],
        [2,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
    ];
    //pacman positioning array (make sure to pop values and call displayWorld)
    var pacman = {
        id : -1,
        row : 0,
        col : 0,
    };
    var ghost1 = {
        id : 3,
        row : 0,
        col : 0,
        stored_id : 0,
    };
    var ghost_status = 0; //0 will be standard, 1 will be eatable, -1 will be dead
    var score = 0;
    var lives = 3;
    var coin_pt = 10;
    var cherry_pt = 50;
    var ghost_pt = 200;

    function setPacStart(){
        var start_row = Math.floor(Math.random()*(world.length - 2)) + 1;
        var start_col = Math.floor(Math.random()*(world[0].length - 2)) + 1;
        while(!checkSpawn(world[start_row][start_col])){
            start_row = Math.floor(Math.random()*(world.length - 2)) + 1;
            start_col = Math.floor(Math.random()*(world[0].length - 2)) + 1;
        }
        if(checkSpawn(world[start_row][start_col])){
            world[start_row][start_col] = -1;
            pacman.row = start_row;
            pacman.col = start_col;
        }
    }

    function setGhostStart(){
        var start_row = Math.floor(Math.random()*(world.length - 2)) + 1;
        var start_col = Math.floor(Math.random()*(world[0].length - 2)) + 1;
        var delta_col = Math.abs(pacman.col - start_col);
        while(checkSpawn(world[start_row][start_col]) === false || delta_col < 4){
            start_row = Math.floor(Math.random()*(world.length - 2)) + 1;
            start_col = Math.floor(Math.random()*(world[0].length - 2)) + 1;
            delta_col = Math.abs(pacman.col - start_col);
        }
        if(checkSpawn(world[start_row][start_col]) == true && delta_col >= 4){
            world[start_row][start_col] = 3;
            ghost1.row = start_row;
            ghost1.col = start_col;
        }
    }
    function checkSpawn(value){
        if(value !== 2 && value !== 4 && value !== -1 && value !== 0){
            return true;
        }else{
            return false;
        }
    }
    setPacStart();
    setGhostStart();
    displayWorld(world);

    // create an update the world
    function displayWorld(world){
        var displayStr = '';
        for(var row = 0; row < world.length; row++){
            displayStr += '<div class="row">';
            for(var col = 0; col < world[row].length; col++){
                if (world[row][col] === 4){
                   displayStr += '<div class="cherry"></div>';
                } else if (world[row][col] === 3){
                   displayStr += '<div class="ghost"></div>';
                } else if(world[row][col] === 2){
                    displayStr += '<div class="brick"></div>';
                } else if (world[row][col] === 1){
                    displayStr += '<div class="coin"></div>';
                } else if (world[row][col] === 0){
                    displayStr +='<div class=""></div>';
                } else if (world[row][col] === -1){
                    displayStr += '<div class="pacman"></div>';
                }
            }
            displayStr += '</div>';
        }
        //console.log(displayStr);
        //console.log(pacman);
        $('div.world').html(displayStr);
    };

    // user movement player 1 - arrow keys
    document.onkeydown = function(e){
        if(e.keyCode == 40){ //arrow down
            if(pacman.row + 1 < world.length && world[pacman.row + 1][pacman.col] !== 2){ // verify we can move and have not reached the end
                if(world[pacman.row + 1][pacman.col] === 1 || world[pacman.row +1][pacman.col] === 4){
                    updateScore(world[pacman.row + 1][pacman.col]);
                } else if(world[pacman.row + 1][pacman.col] === 3){
                    //we've hit a ghost so do stuff
                    ghostHit();
                }
                moveDown(pacman);
            } else if (pacman.row === world.length - 1){
                superMoveDown(pacman);
            }
        } else if (e.keyCode == 38){ // arrow up
            if(pacman.row - 1 >= 0 && world[pacman.row - 1][pacman.col] !== 2){
                if(world[pacman.row - 1][pacman.col] == 1 || world[pacman.row - 1][pacman.col] === 4){
                    updateScore(world[pacman.row - 1][pacman.col]);
                } else if(world[pacman.row - 1][pacman.col] === 3){
                    //we've hit a ghost so do stuff
                    ghostHit();
                }
                moveUp(pacman);
            } else if (pacman.row === 0){
                superMoveUp(pacman);
            }
        } else if (e.keyCode == 39){ //arrow right
            if(pacman.col + 1 < world[pacman.row].length && world[pacman.row][pacman.col + 1] !== 2){
                if(world[pacman.row][pacman.col + 1] == 1 || world[pacman.row][pacman.col + 1] === 4){
                    updateScore(world[pacman.row][pacman.col + 1]);
                } else if(world[pacman.row][pacman.col + 1] === 3){
                    //we've hit a ghost so do stuff
                    ghostHit();
                }
                moveRight(pacman);
            } else if (pacman.col === world[pacman.row].length - 1){
                superMoveRight(pacman);
            }
        } else if (e.keyCode == 37){ //arrow left
            if(pacman.col - 1 >= 0 && world[pacman.row][pacman.col - 1] !== 2){
                if(world[pacman.row][pacman.col - 1] == 1 || world[pacman.row][pacman.col - 1] === 4){ //we found a coin, update score
                    updateScore(world[pacman.row][pacman.col - 1]);
                } else if(world[pacman.row][pacman.col - 1] === 3){
                    //we've hit a ghost so do stuff
                    ghostHit();
                }
                moveLeft(pacman);
            }  else if (pacman.col === 0){
                superMoveLeft(pacman);
            }
        }
    }

    function ghostHit(){
        if(ghost_status === 1){ // we can eat the ghost!
            console.log("ghost eaten");
            updateScore(3);
        } else if (ghost_status === 0) { // aw crap we lost a life, respawn if not at 0
            world[pacman.row][pacman.col] = 0;
            world[ghost1.row][ghost1.col] = 0;
            setPacStart();
            setGhostStart();
            displayWorld(world);
            loseLife();
        }
    }

    function loseLife(){
        lives -= 1;
        if(lives < 1){
            //display game over;

        } else{
            //respawn pacman
            $('.lives').html("Lives: " + lives);
        }
    }
    // move up
    function moveUp(creature){
        world[creature.row][creature.col] = 0;
        var prev_id = 0;
        if(creature.id === 3){
            prev_id = creature.stored_id;
            creature.stored_id = world[creature.row - 1][creature.col];
            world[creature.row][creature.col] = prev_id;
        }
        world[creature.row - 1][creature.col] = creature.id;
        creature.row -= 1;
        displayWorld(world);
        if(creature.id === -1){
            rotatePacman(-90);
        }
    }

    // move creature from bottom to top
    function superMoveUp(creature){
        world[world.length - 1][creature.col] = creature.id;
        world[0][creature.col] = 0;
        creature.row = world.length - 1;
        displayWorld(world);
        if(creature.id === -1){
            rotatePacman(-90);
        }
    }

    // move down
    function moveDown(creature){
        world[creature.row][creature.col] = 0;
        var prev_id = 0;
        if(creature.id === 3){
            prev_id = creature.stored_id;
            creature.stored_id = world[creature.row + 1][creature.col];
            world[creature.row][creature.col] = prev_id;
        }
        world[creature.row + 1][creature.col] = creature.id;
        creature.row += 1;
        displayWorld(world);
        if(creature.id === -1){
            rotatePacman(90);
        }
    }

    // move creature from top to bottom
    function superMoveDown(creature){
        world[0][creature.col] = creature.id;
        world[world.length - 1][creature.col] = 0;
        creature.row = 0;
        displayWorld(world);
        if(creature.id === -1){
            rotatePacman(90);
        }
    }

    // move creature left
    function moveLeft(creature){
        world[creature.row][creature.col] = 0;
        var prev_id = 0;
        if(creature.id === 3){
            prev_id = creature.stored_id;
            creature.stored_id = world[creature.row][creature.col - 1];
            world[creature.row][creature.col] = prev_id;
        }
        world[creature.row][creature.col - 1] = creature.id;
        creature.col -= 1;
        displayWorld(world);
        if(creature.id === -1){
            rotatePacman(180);
        }
    }

    // move creature from left to far right
    function superMoveLeft(creature){
        world[creature.row][world[creature.row].length - 1] = creature.id;
        world[creature.row][0] = 0;
        creature.col = world[creature.row].length - 1;
        displayWorld(world);
        if(creature.id === -1){
            rotatePacman(180);
        }
    }

    // move creature right
    function moveRight(creature){
        world[creature.row][creature.col] = 0;
        var prev_id = 0;
        if(creature.id === 3){
            prev_id = creature.stored_id;
            creature.stored_id = world[creature.row][creature.col + 1];
            world[creature.row][creature.col] = prev_id;
        }
        world[creature.row][creature.col + 1] = creature.id;
        creature.col += 1;
        displayWorld(world);
        if(creature.id === -1){
            rotatePacman(0);
        }
    }

    // moves the creature from right side of map to left
    function superMoveRight(creature){
        world[pacman.row][0] = -1;
        world[pacman.row][pacman.col] = 0;
        pacman.col = 0;
        displayWorld(world);
        rotatePacman(0);
    }

    function edible(){
        ghost_status = 1;
        $('.ghost').css("background", "url('images/ghost-blue.gif') no-repeat center");
        $('.ghost').css('background-size', '16px 16px');
    };
    function rotatePacman(angle){
        $('.pacman').css('-webkit-tranform','rotate(' + angle + 'deg)');
        $('.pacman').css('-moz-transform','rotate(' + angle + 'deg)');
        $('.pacman').css('-ms-transform','rotate(' + angle + 'deg)');
        $('.pacman').css('-o-transform','rotate(' + angle + 'deg)');
        $('.pacman').css('transform','rotate(' + angle + 'deg)');
    };

    function updateScore(value){
        if(value === 1){
            score += coin_pt;
        } else if(value === 4){
            score += cherry_pt;
            edible();
        } else if(value === 3){
            score += ghost_pt;
            world[ghost1.row][ghost1.col] = 0;
            setGhostStart();
            displayWorld(world);
        }
        $('div.score').html(score);
    };
});

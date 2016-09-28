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
    var resetWorld = [
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
        cr_id : -1,
        row : 0,
        col : 0,
        active : true,
        target : "#pacman",
    };

    var pacman2 = {
        cr_id : -2,
        row : 0,
        col : 0,
        active : false,
        target : "#pacman2",
    }

    var ghost1 = {
        cr_id : 5,
        row : 0,
        col : 0,
        stored_id : 1,
        movement_counter: 0,
        direction : 0,
    };
    var ghost2 = {
        cr_id : 6,
        row : 0,
        col : 0,
        stored_id : 1,
        movement_counter: 0,
        direction : 0,
    }
    var ghost_status = 0; //0 will be standard, 1 will be eatable, -1 will be dead
    var score = 0;
    var lives = 3;
    var coin_pt = 10;
    var cherry_pt = 50;
    var ghost_pt = 200;

    function setPacStart(player){
        var start_row = Math.floor(Math.random()*(world.length - 2)) + 1;
        var start_col = Math.floor(Math.random()*(world[0].length - 2)) + 1;
        while(!checkSpawn(world[start_row][start_col])){
            start_row = Math.floor(Math.random()*(world.length - 2)) + 1;
            start_col = Math.floor(Math.random()*(world[0].length - 2)) + 1;
        }
        if(checkSpawn(world[start_row][start_col])){
            console.log("Spawning player: " + player.cr_id)
            world[start_row][start_col] = player.cr_id;
            player.row = start_row;
            player.col = start_col;
        }
    }

    function setGhostStart(ghost_num){
        var start_row = Math.floor(Math.random()*(world.length - 2)) + 1;
        var start_col = Math.floor(Math.random()*(world[0].length - 2)) + 1;
        var delta_col = Math.abs(pacman.col - start_col);
        while(!checkSpawn(world[start_row][start_col]) || delta_col < 4){
            start_row = Math.floor(Math.random()*(world.length - 2)) + 1;
            start_col = Math.floor(Math.random()*(world[0].length - 2)) + 1;
            delta_col = Math.abs(pacman.col - start_col);
        }
        if(checkSpawn(world[start_row][start_col]) && delta_col >= 4){
            console.log("Col delta: " + delta_col);
            console.log("Spawning ghost: " + ghost_num.cr_id)
            world[start_row][start_col] = ghost_num.cr_id;
            ghost_num.row = start_row;
            ghost_num.col = start_col;
        }
    }
    function checkSpawn(value){
        if(value > 1 || value < 0){
            return false;
        }else{
            return true;
        }
    }
    setPacStart(pacman);
    setGhostStart(ghost1);
    displayWorld(world);

    // create an update the world
    function displayWorld(world){
        var displayStr = '';
        for(var row = 0; row < world.length; row++){
            displayStr += '<div class="row">';
            for(var col = 0; col < world[row].length; col++){
                if (world[row][col] === 4){
                   displayStr += '<div class="cherry"></div>';
               } else if (world[row][col] > 4 && ghost_status === 0){
                   displayStr += '<div id="ghost1" class="ghost"></div>';
               } else if (world[row][col] > 4 && ghost_status === 1){
                    displayStr += '<div id="ghost1" class="ghostEdible"></div>';
                 } else if(world[row][col] === 2){
                    displayStr += '<div class="brick"></div>';
                } else if (world[row][col] === 1){
                    displayStr += '<div class="coin"></div>';
                } else if (world[row][col] === 0){
                    displayStr +='<div class=""></div>';
                } else if (world[row][col] === -1){
                    displayStr += '<div id="pacman" class="pacman"></div>';
                } else if (world[row][col] === -2){
                    displayStr += '<div id="pacman2" class="pacman2"></div>';
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
        // add player 2 if key pressed
        if((e.keyCode == 65 || e.keyCode == 87 || e.keyCode == 83 || e.keyCode == 68) && pacman2.active === false){
            setPacStart(pacman2);
            pacman2.active = true;
            displayWorld(world);
        }
        if(e.keyCode == 40){ //arrow down
            if(pacman.row + 1 < world.length && world[pacman.row + 1][pacman.col] !== 2){ // verify we can move and have not reached the end
                if(world[pacman.row + 1][pacman.col] === 1 || world[pacman.row +1][pacman.col] === 4){
                    updateScore(world[pacman.row + 1][pacman.col]);
                } else if(world[pacman.row + 1][pacman.col] > 4){
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
                } else if(world[pacman.row - 1][pacman.col] > 4){
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
                } else if(world[pacman.row][pacman.col + 1] > 4){
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
                } else if(world[pacman.row][pacman.col - 1] > 4){
                    //we've hit a ghost so do stuff
                    ghostHit();
                }
                moveLeft(pacman);
            }  else if (pacman.col === 0){
                superMoveLeft(pacman);
            }
        } else if(e.keyCode == 65){ // a keyCode//arrow left
            if(pacman2.col - 1 >= 0 && world[pacman2.row][pacman2.col - 1] !== 2){
                if(world[pacman2.row][pacman2.col - 1] == 1 || world[pacman2.row][pacman2.col - 1] === 4){ //we found a coin, update score
                    updateScore(world[pacman2.row][pacman2.col - 1]);
                } else if(world[pacman2.row][pacman2.col - 1]  > 4){
                    //we've hit a ghost so do stuff
                    ghostHit();
                }
                moveLeft(pacman2);
            }  else if (pacman2.col === 0){
                superMoveLeft(pacman2);
            }

        } else if(e.keyCode == 87){ // arrow up
            if(pacman2.row - 1 >= 0 && world[pacman2.row - 1][pacman2.col] !== 2){
                if(world[pacman2.row - 1][pacman2.col] == 1 || world[pacman2.row - 1][pacman2.col] === 4){
                    updateScore(world[pacman2.row - 1][pacman2.col]);
                } else if(world[pacman2.row - 1][pacman2.col]  > 4){
                    //we've hit a ghost so do stuff
                    ghostHit();
                }
                moveUp(pacman2);
            } else if (pacman2.row === 0){
                superMoveUp(pacman2);
            }

        } else if(e.keyCode == 83){//arrow down
            if(pacman2.row + 1 < world.length && world[pacman2.row + 1][pacman2.col] !== 2){ // verify we can move and have not reached the end
                if(world[pacman2.row + 1][pacman2.col] === 1 || world[pacman2.row +1][pacman2.col] === 4){
                    updateScore(world[pacman2.row + 1][pacman2.col]);
                } else if(world[pacman2.row + 1][pacman2.col]  > 4){
                    //we've hit a ghost so do stuff
                    ghostHit();
                }
                moveDown(pacman2);
            } else if (pacman2.row === world.length - 1){
                superMoveDown(pacman2);
            }

        } else if(e.keyCode == 68){//arrow right
            if(pacman2.col + 1 < world[pacman2.row].length && world[pacman2.row][pacman2.col + 1] !== 2){
                if(world[pacman2.row][pacman2.col + 1] == 1 || world[pacman2.row][pacman2.col + 1] === 4){
                    updateScore(world[pacman2.row][pacman2.col + 1]);
                } else if(world[pacman2.row][pacman2.col + 1]  > 4){
                    //we've hit a ghost so do stuff
                    ghostHit();
                }
                moveRight(pacman2);
            } else if (pacman2.col === world[pacman2.row].length - 1){
                superMoveRight(pacman2);
            }

        }
    }

    //setInterval(function(){
    //    ghostMove(ghost1);
    //    if(lives < 1){
    //        clearInterval();
    //    }
    //},500);

    function ghostMove(ghost_num){
        // movement: 1 = left; 2 = right; 3 = up; 4 = down
        if(ghost_num.movement_counter < 1){
            // var prev = ghost_num.direction;
            var direction = Math.floor(Math.random()*4) + 1;
            // while(prev === direction){
            //     direction = Math.floor(Math.random()*4) + 1;
            // }
            //console.log("new direction: " + direction);
            ghost_num.direction = direction;
            ghost_num.movement_counter = 5;
        }
        if(ghost_num.direction == 4 && checkDown(ghost_num,[0,2])){
            ghost_num.movement_counter -= 1;
            moveDown(ghost_num);
        } else if(ghost_num.direction == 3 && checkUp(ghost_num,[0,2])){
            ghost_num.movement_counter -= 1;
            moveUp(ghost_num);
        } else if(ghost_num.direction == 2 && checkRight(ghost_num,[0,2])){
            ghost_num.movement_counter -= 1;
            moveRight(ghost_num);
        } else if(ghost_num.direction == 1 && checkLeft(ghost_num,[0,2])){
            ghost_num.movement_counter -= 1;
            moveLeft(ghost_num);
        } else{
            ghost_num.movement_counter = 0;
        }
    };

    function checkDown(creature,arr){
        var check = true;
        for(var i = 0; i < arr.length; i++){
            if(world[creature.row + 1][creature.col] === arr[i] || creature.row + 1 > world.length - 1){
                check = false;
                creature.movement_counter = 0;
                break;
            }
        }
        return check;
    }
    function checkUp(creature,arr){
        var check = true;
        for(var i = 0; i < arr.length; i++){
            if(world[creature.row - 1][creature.col] === arr[i] || creature.row - 1 < 0){
                check = false;
                creature.movement_counter = 0;
                break;
            }
        }
        return check;
    }
    function checkLeft(creature,arr){
        var check = true;
        for(var i = 0; i < arr.length; i++){
            if(world[creature.row][creature.col - 1] === arr[i] || creature.col - 1 < 0){
                check = false;
                creature.movement_counter = 0;
                break;
            }
        }
        return check;
    }
    function checkRight(creature,arr){
        var check = true;
        for(var i = 0; i < arr.length; i++){
            if(world[creature.row][creature.col + 1] === arr[i] || creature.col + 1 > world[creature.row].length){
                check = false;
                creature.movement_counter = 0;
                break;
            }
        }
        return check;
    }

    function ghostHit(){
        if(ghost_status === 1){ // we can eat the ghost!
            updateScore(3);
        } else if (ghost_status === 0) { // aw crap we lost a life, respawn if not at 0
            world[pacman.row][pacman.col] = 0;
            world[pacman2.row][pacman2.col] = 0;
            world[ghost1.row][ghost1.col] = 0;
            setPacStart(pacman);
            setGhostStart(ghost1);
            displayWorld(world);
            loseLife();
        }
    }

    function loseLife(){
        lives -= 1;
        if(lives < 1){
            //display game over;
            alert("Game Over!");
            gameOver();
        } else{
            //respawn pacman
            $('.lives').html("Lives: " + lives);
        }
    }
    // move up
    function moveUp(creature){
        world[creature.row][creature.col] = 0;
        var prev_id = 0;
        if(creature.cr_id > 4){

            prev_id = creature.stored_id;
            creature.stored_id = world[creature.row - 1][creature.col];
            if(world[creature.row - 1][creature.col] == -1){
                ghostHit();
            }
            world[creature.row][creature.col] = prev_id;
        }
        world[creature.row - 1][creature.col] = creature.cr_id;
        creature.row -= 1;
        displayWorld(world);
        if(creature.cr_id < 0){
            console.log("Move up -" + creature.target);
            rotatePacman(creature,-90);
        }
    }

    // move creature from bottom to top
    function superMoveUp(creature){
        world[world.length - 1][creature.col] = creature.cr_id;
        world[0][creature.col] = 0;
        creature.row = world.length - 1;
        displayWorld(world);
        if(creature.cr_id < 0){
            rotatePacman(creature,-90);
        }
    }

    // move down
    function moveDown(creature){
        world[creature.row][creature.col] = 0;
        var prev_id = 0;
        if(creature.cr_id > 4){
            prev_id = creature.stored_id;
            creature.stored_id = world[creature.row + 1][creature.col];
            if(world[creature.row + 1][creature.col] == -1){
                ghostHit();
            }
            world[creature.row][creature.col] = prev_id;
        }
        world[creature.row + 1][creature.col] = creature.cr_id;
        creature.row += 1;
        displayWorld(world);
        if(creature.cr_id < 0){
            rotatePacman(creature,90);
        }
    }

    // move creature from top to bottom
    function superMoveDown(creature){
        world[0][creature.col] = creature.cr_id;
        world[world.length - 1][creature.col] = 0;
        creature.row = 0;
        displayWorld(world);
        if(creature.cr_id < 0){
            rotatePacman(creature,90);
        }
    }

    // move creature left
    function moveLeft(creature){
        world[creature.row][creature.col] = 0;
        var prev_id = 0;
        if(creature.cr_id > 4){
            prev_id = creature.stored_id;
            creature.stored_id = world[creature.row][creature.col - 1];
            if(world[creature.row][creature.col - 1] == -1){
                ghostHit();
            }
            world[creature.row][creature.col] = prev_id;
        }
        world[creature.row][creature.col - 1] = creature.cr_id;
        creature.col -= 1;
        displayWorld(world);
        if(creature.cr_id < 0){
            rotatePacman(creature,180);
        }
    }

    // move creature from left to far right
    function superMoveLeft(creature){
        world[creature.row][world[creature.row].length - 1] = creature.cr_id;
        world[creature.row][0] = 0;
        creature.col = world[creature.row].length - 1;
        displayWorld(world);
        if(creature.cr_id < 0){
            rotatePacman(creature,180);
        }
    }

    // move creature right
    function moveRight(creature){
        world[creature.row][creature.col] = 0;
        var prev_id = 0;
        if(creature.cr_id > 4){
            prev_id = creature.stored_id;
            creature.stored_id = world[creature.row][creature.col + 1];
            if(world[creature.row][creature.col + 1] == -1){
                ghostHit();
            }
            world[creature.row][creature.col] = prev_id;
        }
        world[creature.row][creature.col + 1] = creature.cr_id;
        creature.col += 1;
        displayWorld(world);
        if(creature.cr_id < 0){
            rotatePacman(creature,0);
        }
    }

    // moves the creature from right side of map to left
    function superMoveRight(creature){
        world[pacman.row][0] = -1;
        world[pacman.row][pacman.col] = 0;
        pacman.col = 0;
        displayWorld(world);
        rotatePacman(creature,0);
    }

    function edible(){
        ghost_status = 1;
        displayWorld(world);
        setTimeout(function(){
            ghost_status = 0;
            displayWorld(world);
        },6000);
    };
    function rotatePacman(creature,angle){
        $(creature.target).css('transform','rotate(' + angle + 'deg)');
        $(creature.target).css('-webkit-tranform','rotate(' + angle + 'deg)');
        $(creature.target).css('-moz-transform','rotate(' + angle + 'deg)');
        $(creature.target).css('-ms-transform','rotate(' + angle + 'deg)');
        $(creature.target).css('-o-transform','rotate(' + angle + 'deg)');
    };

    function updateScore(value){
        if(score > 2210){
            alert("You Won!");
            gameOver();
        }

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
    function gameOver(){
        $('.lives').html("Lives: 3");
        $('.score').html("0");
        world = resetWorld;
        setPacStart(pacman);
        setGhostStart(ghost1);
        displayWorld(world);
    }
});

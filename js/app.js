//Entity Function...Entity can be player or an enemy
var Entity = function(sprite,x,y) {
    // The image/sprite for our entities, this uses
    // a helper we've provided to easily load images
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};

// Draw the Entity on the screen, required method for game
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function() {
    var sprite = 'images/enemy-bug.png',
        x = 0,
        random = Math.floor(Math.random() * 3) + 1,
        y = random * 75;

    Entity.call(this,sprite,x,y);
    this.speed = 5;
};

Enemy.prototype = Object.create(Entity.prototype);
//setting Enemys constructor to Enemy
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var random;
    //Bug goes out of canvas....so reset its position to initial position
    if(this.x > 5 * 101){
        this.x = 0;
        // Get a random integer betwwen 1 and 3 to decide the bugs row on stones
        random = Math.floor(Math.random() * 3) + 1;
        this.y = random * 75;
    }else{
        var playerColumn = player.getPlayerColumn();
        //Get a random integer between 1 and 600 to multiply with dt to get speed.
        random = Math.floor(Math.random() * 600) + 1;
        this.speed = (random * dt);
        this.x += this.speed;
        //check for collison with the player
        // only if the player is on the stone rows (row 1 to row 3)
        //i.e. if the playerColumn is either 0,1 or 2
        //if player is one the grass or reached water, we don't need to check for collison
        if(playerColumn >= 0 && playerColumn < 3){
            allEnemies.forEach(function(enemy) {
                enemy.checkCollisions();
            });
        }
    }
};

Enemy.prototype.checkCollisions = function() {
    var enemyX = this.x, 
        enemyY = this.y, 
        playerX = player.x;
    // the y coordinate of the enemy in the rows starting from first stone row to last stone row are
    // 75,150,225
    //for all stone rows if we substract 75 from y coordinate of the enemys location and divide by 75 we get
    //0,1,2   
    var enemyHeight = (enemyY - 75) / 75;
    var playerColumn = player.getPlayerColumn();

    //check if the player and an enemy are in the same row and same column
    if((enemyHeight === playerColumn) && (enemyX >= playerX - 40) && (enemyX <= playerX + 30)){
        console.log("Collison!!!!!");
        player.score = 0;
        player.reset();
    }
};

// Player Function
var Player = function() {
    var sprite = 'images/char-boy.png',
        x = 2 * 101,
        y = 5 * 80;

    Entity.call(this,sprite,x,y);
    this.score = 0;
};

Player.prototype = Object.create(Entity.prototype);
//setting Players constructor to Player
Player.prototype.constructor = Player;

// Update the player's score
Player.prototype.update = function() {
    document.getElementById('score').value = this.score;
};

//Get the column number on which player is currently present
Player.prototype.getPlayerColumn = function(){
    // var playerColumn = (player.y - 68) / 83;
    // return playerColumn;
    // the y coordinate of the player in the rows starting from water row to last grass row are
    // -15,68,151,234,317,400
    //if we player is at the water row we will return -1 as player column
    //otherwise for all other rows if we substract 83 from y coordinate of the players location and divide by 83
    // for all the rows from first stone row to last grass row we get
    //0,1,2,3,4
    return (this.y >= 68) ? ((this.y - 68) / 83) : -1;
};

// HandleInput method- move the player according to user input
Player.prototype.handleInput = function(key) {
    var currX = this.x,
        currY = this.y,
        newX = currX,
        newY = currY,
        win = false;
    
    if(key === 'up'){
        // get new y coordinate of the player if its in the first row of the stones and set win to true
        if(currY <= 68){
            //win...reset
            newY = currY - 83;
            win = true;
        }else{
            newY = currY - 83;
        }
    } else if(key === 'right'){
        // get new x coordinate of the player if its not in the last column of the canvas
        if(currX < 4 * 101){
            newX = currX + 101;
        }
    } else if(key === 'left'){
        // get new x coordinate of the player if its not in the first column of the canvas
        if(currX >= 83){
            newX = currX - 101;
        }
    } else if(key === 'down'){
        // get new y coordinate of the player if its not in the last row of the canvas
        if(currY < 4*82){
            newY = currY + 83;
        }
    }

    this.x = newX;
    this.y = newY;
    if(win == true){
        this.win();
    }
};

//This resets the game
Player.prototype.reset = function() {
    this.x = 2 * 101;
    this.y = 5 * 80;
};

// Now instantiate your objects.
//instantiate Enemy objects
var enemy1 = new Enemy(),
    enemy2 = new Enemy(),
    enemy3 = new Enemy(),
    enemy4 = new Enemy();

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1,enemy2,enemy3,enemy4];
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//This is used to increment and update the score, reset the game after Player wins the game
Player.prototype.win = function() {
    this.score += 10;
    this.update();
    this.reset();
};




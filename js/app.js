// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 505) {
    	var enemyIndex = allEnemies.indexOf(this);
    	allEnemies.splice(enemyIndex, 1);
    	var rand = yaxis[Math.floor(Math.random() * yaxis.length)]; //choosing a random starting lane
 		allEnemies.push(new Enemy(-101, rand)); 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y) {
	this.x = x;
    this.y = y;
	this.sprite = 'images/char-boy.png'
};

Player.prototype.update = function(dt) {
	if (this.x < (allEnemies[1].x || allEnemies[2].x || allEnemies[3].x) + 101 &&
 		this.x + 101 > (allEnemies[1].x || allEnemies[2].x || allEnemies[3].x) &&
 		this.y < (allEnemies[1].y || allEnemies[2].y || allEnemies[3].y) + 83 &&
 		83 + this.y > (allEnemies[1].y || allEnemies[2].y || allEnemies[3].y)) {
    // collision detected!
//not working correctly. maybe because bugs' position in array changes each time a new bug is created?
	console.log("Hit");
	}
	if (this.x < 0 || this.x > 404) {
		this.x = 202;
		this.y = 400;
	}
	if (this.y < 60 || this.y > 392) {
		this.x = 202;
		this.y = 392;
	}

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {
   if (direction == 'up') {
   		this.y = this.y - 83;
   	} else if (direction == 'down') {
   		this.y = this.y + 83;
   	} else if (direction == 'left') {
   		this.x = this.x - 101;
   	} else if (direction == 'right') {
   		this.x = this.x + 101;
   	}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(202, 392);


var yaxis = [60, 143, 226]; //possible y axes for enemies
var allEnemies = [];


while (allEnemies.length < 3) { 
	var rand = yaxis[Math.floor(Math.random() * yaxis.length)]; //choosing a random starting lane
 	allEnemies.push(new Enemy(-101, rand)); 
 };



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

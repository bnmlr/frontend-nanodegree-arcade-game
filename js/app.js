// Enemies class
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = Math.floor(Math.random() * (500 - 50 + 1)) + 50;
    this.sprite = 'images/enemy-bug.png';
};

// Method updates enemy's position and detects collisions
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // Multiplies speed by the dt parameter
    // tol ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //Generates a new enemy every time one goes off the canvas
    if (this.x > 505) {
    	var enemyIndex = allEnemies.indexOf(this);
    	allEnemies.splice(enemyIndex, 1);
    	var rand = yaxis[Math.floor(Math.random() * yaxis.length)]; 
 		allEnemies.push(new Enemy(-101, rand)); 
    }
    //Collision detection; sends player back to start on collision
    if (this.x < player.x + 75 &&
 		this.x + 75 > player.x &&
 		this.y < player.y + 83 &&
 		83 + this.y > player.y) 
 		{
		player.x = 202;
		player.y = 392;
	}
};

// Draws the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player class
var Player = function(x, y) {
	this.x = x;
    this.y = y;
	this.sprite = 'images/char-boy.png';
};

//Method detects player's location to determine win
Player.prototype.update = function() {
	if (this.y < 60) {
		this.x = 202;
		this.y = 392;
	}

};

//Method draws player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Method handles keyboard input and moves player
Player.prototype.handleInput = function(direction) {
   if (direction == 'up') {
   		this.y = this.y - 83;
   	} else if (direction == 'down' &&
   				this.y < 392) {
   		this.y = this.y + 83;
   	} else if (direction == 'left' &&
   			this.x > 0) {
   		this.x = this.x - 101;
   	} else if (direction == 'right' &&
   			this.x < 404) {
   		this.x = this.x + 101;
   	}
};

// Instantiate player objects
var player = new Player(202, 392);

//Possible y axes for enemies
var yaxis = [60, 143, 226];
var allEnemies = [];

//Loop instantiates enemies and puts them into array
while (allEnemies.length < 3) { 
	var rand = yaxis[Math.floor(Math.random() * yaxis.length)]; //choosing a random starting lane
 	allEnemies.push(new Enemy(-101, rand));
 }

// This listens for key presses and sends the keys to your
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
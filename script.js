const gameHeight = 500;
const gameWidth = 5000;

class Obstacle {
    constructor() {
        this.x = Math.floor(Math.random() * gameWidth-50);
        this.y = Math.floor(Math.random() * gameHeight-50);
        this.width = 50;
        this.height = 50;

        this.div = document.createElement('div');
        this.div.style.width = `${this.width}px`;
        this.div.style.height = `${this.height}px`;
        this.div.style.backgroundColor = 'blue';
        this.div.style.position = 'absolute';
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;
        level.div.appendChild(this.div);
    }

    // removes the obstacle from the level
    death() {
        level.div.removeChild(this.div);
    }
}

class Player {
    constructor() {
        this.x = gameWidth / 2;
        this.y = gameHeight / 2;
        this.x_velocity = 0;
        this.y_velocity = 0;
        this.width = 50;
        this.height = 50;
        this.speed = 1;
        this.left = false;
        this.right = false;
        this.up = false;
        this.down = false;
        this.isJumping = false;
        this.div = document.getElementById('player');
    }

    characterLoop() {
        this.movement();
        this.physics();
        this.colisions();
        this.updatePlayerPos();
    }

    // handles the movement of the character
    movement() {
        if (this.up && !this.isJumping) {
            this.y_velocity -= 40;
            this.isJumping = true;
        }
        
        if (this.left) {
            this.x_velocity -= this.speed;
        }

        if (this.right) {
            this.x_velocity += this.speed;
        }

        this.x += this.x_velocity;
        this.y += this.y_velocity;
    }

    physics() {
        this.y_velocity += 1.75; // gravity
        this.x_velocity *= 0.9; // friction
        this.y_velocity *= 0.9; // friction
    }

    colisions() {
        // colision detection with obstacles
        obstacleArray.forEach(obs => {
            if (colision(this.div.getBoundingClientRect(), obs.div.getBoundingClientRect())) {
                this.colisionSide(this.div.getBoundingClientRect(), obs.div.getBoundingClientRect(), obs);
            }
        });

        // colision detection with floor
        if (this.y > gameHeight - this.height) {
            this.isJumping = false;
            this.y = gameHeight - this.height;
            this.y_velocity = 0;
        }
        
        if (this.x_velocity < 0.1 && this.x_velocity > -0.1) this.x_velocity = 0;

        if (this.x < 3) {
            this.x = 3;
            this.x_velocity = 0;
        }

        if (this.x > gameWidth - this.width) {
            this.x = gameWidth - this.width;
            this.x_velocity = 0;
        }
    }
    // moves the character in the level
    updatePlayerPos() { 
        this.div.style.left = `${this.x}px`;
        this.div.style.top = `${this.y}px`;

        // moves the camera
        this.updateCameraPos(this);
    }

    updateCameraPos(player) {
        if (player.x < 500) {
            level.div.style.left = '0px';
        } else {
            level.div.style.left = `${-player.x + 500}px`;
        }
    }
    
    // checks the what side of the object the coliision is happening
    colisionSide(obj1Rect, obj2Rect, obs) {
        let vectorX = (obj1Rect.left + obj1Rect.width / 2) - (obj2Rect.left + obj2Rect.width / 2);
        let vectorY = (obj1Rect.top + obj1Rect.height / 2) - (obj2Rect.top + obj2Rect.height / 2);

        if (Math.abs(vectorY) > Math.abs(vectorX)) {
            if (vectorY > 0) { 
                // bottom
                obs.death();
                this.y_velocity = 0;
                this.y = obs.y + obs.height;
            } else { 
                // top
                this.isJumping = false;
                this.y_velocity = 0;
                this.y = obs.y - obs.height;
            }
        } else {
            if (vectorX > 0) {
                // left
                this.x_velocity = 0;
                this.x = obs.x + obs.width;
            } else {
                // right
                this.x_velocity = 0;
                this.x = obs.x - obs.width;
            }
        }
    }

    // checks the key pressed
    keyListener(event) {
        let key_state = (event.type === 'keydown') ? true : false;
            switch(event.key) {
                case 'a':
                    this.left = key_state;
                    break;
                case 'd':
                    this.right = key_state;
                    break;
                case 'w':
                    this.up = key_state;
                    break;
            }
    }
}


class Level {
    constructor() {
        // game window
        this.div = document.getElementById('gameWindow');
        this.div.style.height = `${gameHeight}px`;
        this.div.style.width = `${gameWidth}px`;

        // camera
        this.camera = document.getElementsByClassName('camera')[0];
        this.camera.style.height = `500px`;
        this.camera.style.width = `1000px`;
    }
}

const colision = (obj1, obj2) => obj1.left < obj2.right &&
    obj1.right > obj2.left &&
    obj1.top < obj2.bottom &&
    obj1.bottom > obj2.top;

let level = new Level();
let player = new Player();
let obstacleArray = [new Obstacle()];


// event listeners
window.addEventListener('keydown', (event) => {
    player.keyListener(event);
});

window.addEventListener('keyup', (event) => {
    player.keyListener(event);
});


//fps counter
let prevTime= Date.now();
let frames = 0;
let fpsMeter = document.getElementById('fps');
fpsMeter.style.color = 'lightgreen';

// game loop
function gameLoop() {
    const time = Date.now();
    frames++;
    if (time - prevTime >= 1000) {
        fpsMeter.innerHTML = `FPS: ${frames}`;
        frames = 0;
        prevTime = time;
    }
    player.characterLoop();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

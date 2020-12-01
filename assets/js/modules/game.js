class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1400;
        this.canvas.height = 700;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000 / 60;

        this.background = new Background(this.ctx);
        this.soldier = new Soldier(this.ctx, 50, 500);

        this.zombies = [
            // new ZombieB(this.ctx, this.soldier.x + 700, 475),
            // new ZombieA(this.ctx, this.soldier.x + 200, 475),
        ];

        

        this.drawCount = 0;

    }

    onKeyEvent(event) {
       this.soldier.onKeyEvent(event); 
    }

    addRandomZombieA() {
        if(++this.drawCount % Math.floor((Math.random() * 1000)) === 0) {
            const zombie = new ZombieA(this.ctx, -147, 475);
            this.zombies.push(zombie);
            this.drawCount = 0;
        }
    }

    addRandomZombieB() {
        if(++this.drawCount % Math.floor((Math.random() * 1000)) === 0) {
            const zombie = new ZombieB(this.ctx, this.canvas.width + 147, 475);
            this.zombies.push(zombie);
            this.drawCount = 0;
        }

    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.checkCollisions();
                this.addRandomZombieA();
                this.addRandomZombieB();
                
            }, this.fps);
        }

        
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // this.zombies = this.zombies.filter(zombie => )
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    move() {
        this.soldier.move();
        this.zombies.forEach(zombie => zombie.move());
    }


    draw() {
        this.background.draw();
        this.zombies.forEach(zombie => zombie.draw());
        this.soldier.draw();
    }
    
    checkCollisions() {
        for (let i = 0; i < this.zombies.length; i++) {
            let zombie = this.zombies[i];
            for (let j = 0; j < this.soldier.bullets.length; j++) {
                let bullet = this.soldier.bullets[j];
                if (zombie.collidesWith(bullet)) {
                   this.zombies.splice(i, 1);
                   this.soldier.bullets.splice(j, 1);
                   break;
                }
            }
        }

    }
}
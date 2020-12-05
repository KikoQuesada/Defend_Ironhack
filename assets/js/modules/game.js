class Game {

    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = 1400;
        this.canvas.height = 700;
        this.ctx = this.canvas.getContext('2d');

        this.drawIntervalId = undefined;
        this.fps = 1000 / 60;

        this.background = new Background(this.ctx);
        this.soldier = new Soldier(this.ctx, 650, 500);

        this.endPanel = new Endpanel(this.ctx, 400, 300);

        this.zombies = [
        ];

        
        this.deadEnemies = 0;
        this.drawCount = 0;
        this.survivors = 1;
        

    }

    onKeyEvent(event) {
       this.soldier.onKeyEvent(event); 
    }

    addRandomZombieA() {
        if(++this.drawCount % Math.floor((Math.random() * 1000)) === 0) {
            const zombie = new ZombieA(this.ctx, -147, 480);
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
                this.killSurvivor();
                this.endGame();
                
            }, this.fps);
        }

        
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

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

        this.ctx.save();
        this.ctx.font = '50px zombies';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(`Supervivientes: ${this.survivors}`, 30, 50);
        this.ctx.restore();        
        
        this.ctx.save();
        this.ctx.font = '50px zombies';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(`Zombies eliminados: ${this.deadEnemies}`, 670, 50);
        this.ctx.restore();
    }
    
    checkCollisions() {
        for (let i = 0; i < this.zombies.length; i++) {
            let zombie = this.zombies[i];
            for (let j = 0; j < this.soldier.bullets.length; j++) {
                let bullet = this.soldier.bullets[j];
                if (zombie.collidesWith(bullet) && !zombie.isDying) {
                    zombie.isDying = true;
                    setTimeout(() => this.zombies.splice(i, 1), 600);
                    this.soldier.bullets.splice(j, 1);
                    this.deadEnemies += 1;
                    break;
                }
            }
        }

    }

    killSurvivor() {
        for (let k = 0; k < this.zombies.length; k++) {
            let zombie = this.zombies[k];
            if (zombie.x === 420 || zombie.x === 850) {
                this.zombies.splice(k, 1);
                this.survivors -= 1;
                break;
            }
        }
    }

    endGame() {
        if (this.survivors === 0) {
            this.stop();
            this.endPanel.draw();
        }
    }
}
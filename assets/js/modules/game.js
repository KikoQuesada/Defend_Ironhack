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
    }

    onKeyEvent(event) {
       this.soldier.onKeyEvent(event); 
    }


    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
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
    }


    draw() {
        this.background.draw();
        this.soldier.draw();
    }
}


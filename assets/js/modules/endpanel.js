class Endpanel {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.img = new Image();
        this.img.src = 'assets/img/end-game.png';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
            this.img.width = 600;
            this.img.height = 250;
            this.width = 600;
            this.height = 250;
        };
    }

    isReady() {
        return this.img.isReady;
    }

    draw() {
        if(this.img.isReady) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }
}
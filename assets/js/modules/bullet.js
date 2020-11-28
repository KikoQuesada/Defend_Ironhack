class Bullet {

    constructor(ctx, x, y, orientation) {
        this.ctx = ctx;
        this.x = x;
        this.vx = BULLET_SPEED;
        this.y = y;
        this.orientation = false;

        this.sprite = new Image();
        this.sprite.src = './img/bullet-sprite.png';
        this.sprite.isReady = false;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.width = 15;
            this.height = 10;
        };
    }

    draw() {
        this.ctx.drawImage(
            this.sprite,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    move() {
        this.orientation ? this.x -= this.vx : this.x += this.vx;
    }
}
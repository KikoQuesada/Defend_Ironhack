class Soldier {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.vx = 0;
        this.y = y;
        this.vy = 0;

        this.sprite = new Image();
        this.sprite.src = './img/Soldier-Sprite.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 2;
        this.sprite.verticalFrames = 2;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 1;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        };

        this.movement = {
            right: false,
            down: false,
            left: false,
            up: false
        };
    }

    onKeyEvent(event) {
        const state = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_D:
                this.movement.right = state;
                break;
            case KEY_S:
                this.movement.down = state;
                break;
            case KEY_A:
                this.movement.left = state;
                break;
            case KEY_W:
                this.movement.up = state;
                break;
        }
    }

    draw() {
        if(this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.frameWidth * this.sprite.horizontalFrameIndex,
                this.sprite.frameHeight * this.sprite.verticalFrameIndex,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }

    move() {
        if(this.movement.right) {
            this.vx = SPEED;
        } else if (this.movement.left) {
            this.vx = -SPEED;
        } else if (this.movement.up) {
            this.vy = -SPEED;
        } else if (this.movement.down) {
            this.vy = SPEED;
        } else {
            this.vx = 0;
            this.vy = 0;
        }

        this.x += this.vx;
        this.y += this.vy;
    }
}
class Soldier {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.maxX = (this.ctx.canvas.width - 130);
        this.minX = 10;
        this.vx = 0;
        this.y = y;
        this.maxY = this.ctx.canvas.height;

        this.sprite = new Image();
        this.sprite.src = './img/soldier-sprite.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 4;
        this.sprite.verticalFrames = 4;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 2;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        };        

        this.movement = {
            right: false,
            left: false,
        };

        this.drawCount = 0;
    }

    onKeyEvent(event) {
        const state = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_D:
                this.sprite.verticalFrameIndex = 2;
                this.movement.right = state;
                break;
            case KEY_A:
                this.sprite.verticalFrameIndex = 3;
                this.sprite.horizontalFrameIndex = 0;
                this.movement.left = state;
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

            this.drawCount++;
            this.animate();
        }
    }

    move() {
        if(this.movement.right) {
            this.vx = SPEED;
        } else if (this.movement.left) {
            this.vx = -SPEED;
        } else {
            this.vx = 0;
            this.vy = 0;
        }

        this.x += this.vx;

        if(this.x >= this.maxX) {
            this.x = this.maxX;
        } else if (this.x <= this.minX) {
            this.x = this.minX;
        }
    }

    animate() {
        if(this.movement.right) {
            this.animateSprite(2, 0, 4, 10);
        } else if (this.movement.left) {
            this.animateSprite(3, 0, 4, 10);
        } else {
            this.resetAnimation();
        }
    }

    resetAnimation() {
            this.sprite.horizontalFrameIndex = 0;
            this.sprite.verticalFrameIndex = 2;
    }

    animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
        if (this.sprite.verticalFrameIndex != initialVerticalIndex) {
            this.sprite.verticalFrameIndex = initialVerticalIndex;
            this.sprite.horizontalFrameIndex = initialHorizontalIndex;
        } else if (this.drawCount % frequency === 0) {
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % maxHorizontalIndex;
            this.drawCount = 0;
        }
    }
}
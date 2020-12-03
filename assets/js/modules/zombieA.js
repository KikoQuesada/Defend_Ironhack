class ZombieA {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.vx = 1;
        this.y = y;

        this.sprite = new Image();
        this.sprite.src = './img/zombieA-sprite-right.png';
        this.sprite.isReady = false;
        this.sprite.horizontalFrames = 3;
        this.sprite.verticalFrames = 2;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width/this.sprite.horizontalFrames); 
            this.sprite.frameHeight = Math.floor(this.sprite.height/this.sprite.verticalFrames);
            this.width = this.sprite.frameWidth;
            this.height = this.sprite.frameHeight;
        };

        this.drawCount = 0;
    }

    isReady() {
        return this.sprite.isReady;
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
        this.x += this.vx;
    }

    animate() {
        this.animateSprite(0, 0, 3, 20);
    }

    animateSprite(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
        if (this.sprite.verticalFrameIndex !== initialVerticalIndex) {
            this.sprite.verticalFrameIndex = initialVerticalIndex;
            this.sprite.horizontalFrameIndex = initialHorizontalIndex;
        } else if (this.drawCount % frequency === 0) {
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % maxHorizontalIndex;
            this.drawCount = 0;
        }
    }

    deadAnimate(initialVerticalIndex, initialHorizontalIndex, maxHorizontalIndex, frequency) {
        if (this.sprite.verticalFrameIndex !== initialVerticalIndex) {
            this.sprite.verticalFrameIndex = initialVerticalIndex;
            this.sprite.horizontalFrameIndex = initialHorizontalIndex;
        } else if (this.drawCount % frequency === 0) {
            this.sprite.horizontalFrameIndex = (this.sprite.horizontalFrameIndex + 1) % maxHorizontalIndex;
            this.drawCount = 0;
        }
    }

    

    collidesWith(element) {
        return this.x < element.x + element.width && 
        this.x + this.width > element.x &&
        this.y < element.y + element.height &&
        this.y + this.height > element.y;
    }
}
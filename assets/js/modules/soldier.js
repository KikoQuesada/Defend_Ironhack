class Soldier {

    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.maxX = (this.ctx.canvas.width - 130);
        this.minX = 10;
        this.vx = 0;
        this.y = y;
        this.maxY = this.ctx.canvas.height;
        this.isLookingToRight = true;

        this.sprite = new Image();
        this.sprite.src = 'assets/img/soldier-sprite.png';
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

        this.shoot = new Audio('./assets/sounds/shoot.wav');


        this.canFire = true;
        this.bullets = [];
    }

    isReady() {
        return this.sprite.isReady;
    }

    onKeyEvent(event) {
        const state = event.type === 'keydown';
        switch (event.keyCode) {
            case KEY_D:
                this.isLookingToRight = true;
                this.movement.right = state;
                break;
            case KEY_A:
                this.isLookingToRight = false;
                this.movement.left = state;
                break;
            case KEY_SPACE:
                this.shoot.play();
                if (this.canFire && event.type === 'keydown') {
                    this.animateFire();  
                    if (this.isLookingToRight) {
                    this.bullets.push(new Bullet(this.ctx, this.x + this.width, this.y + 30, true));
                    } else {
                    this.bullets.push(new Bullet(this.ctx, this.x - this.width, this.y + 30, false));
                    }
                    this.canFire = false;
                    setTimeout(() => this.canFire = true, 600);
                }
                break;
        }
    }
    
    clear() {
        this.bullets = this.bullets.filter(bullet => bullet.x <= this.ctx.canvas.width);
    }

    draw() {
        if(this.sprite.isReady) {
            if(!this.canFire) {
                this.ctx.drawImage(
                    this.sprite,
                    this.sprite.frameWidth * this.sprite.horizontalFrameIndex,
                    this.sprite.frameHeight * this.sprite.verticalFrameIndex,
                    this.sprite.frameWidth + FIRE_WIDTH,
                    this.sprite.frameHeight,
                    this.x,
                    this.y,
                    this.width + FIRE_WIDTH,
                    this.height
                );
            } else {
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
            this.bullets.forEach(bullet => bullet.draw());
            this.drawCount++;
            this.animate();
        }
    }

    move() {

        if (!this.canFire) {
            this.vx = 0;
        }
        else if (this.movement.right) {
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

        this.bullets.forEach(bullet => bullet.move());
    }

    animate() {
        if (!this.canFire) {
          this.animateFire();
        } else if (this.movement.right) {
          this.animateSprite(2, 0, 4, 5);
        } else if (this.movement.left) {
          this.animateSprite(3, 0, 4, 5);
        } else {
          this.resetAnimation();
        }
      }

      animateFire() {
        if (this.isLookingToRight) {
          this.sprite.verticalFrameIndex = 1;
          this.sprite.horizontalFrameIndex = 0;
        } else {
          this.sprite.verticalFrameIndex = 0;
          this.sprite.horizontalFrameIndex = 0;
        }
      }

    resetAnimation() {
            this.sprite.horizontalFrameIndex = 0;
            if (this.isLookingToRight) {
                this.sprite.verticalFrameIndex = 2;
            } else {
                this.sprite.verticalFrameIndex = 3;
            }
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
}
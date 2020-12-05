class Background {

    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;

        this.img = new Image();
        this.img.src = 'assets/img/Background.jpg';
        this.img.isReady = false;
        this.img.onload = () => {
            this.img.isReady = true;
            this.img.width = this.ctx.canvas.width;
            this.img.height = this.ctx.canvas.height;
            this.width = this.ctx.canvas.width;
            this.height = this.ctx.canvas.height;
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
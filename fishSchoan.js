class Fish {
    constructor(image, x, y, ratio, baseWidth) {
        this.img = new Image();
        this.img.src = image;
        this.ratio = ratio;
        this.x = x;
        this.y = y;
        this.width = baseWidth * ratio;
        this.height = this.width * (57 / 84);
        this.speed = 4;
        this.status = true;
    }
}
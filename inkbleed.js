class Drip {
    constructor(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.startR = r;
      this.maxSpeed = map(r, 1, 10, 1, 6);
    }
    
    update() {
      this.y += map(this.r, this.startR, 0, this.maxSpeed, 0);
      this.x += random(-0.5, 0.5);
      this.r -= 0.05;
    }
    
    draw() {
      let a = map(this.r, this.startR, 0, 100, 0);
      fill(0, a);
      circle(this.x, this.y, this.r * 2);
    }
  }
class Raindrop {
    constructor() {
      this.reset(); // initiates drops with same function used to reset them once they've fallen
    }
  
    reset() {
      this.x = random(0, width);
      this.y = random(-height, 0); // starts raindrops slightly above canvas, so the fall into canvas instead of just appearing somewhere near/at the top
      this.size = random(1.5,8); // size of raindrop
      // this line takes larger/closer drops and re-randomizes them to maybe become further drops
      // really there should by way more drops in the background, i should distribute the size of drops not randomly but based on a exponential function with a higher probability of being small, but I don't feel like doing that within the time limit...
      if(this.size > 3){  this.size = random(1.5,8) }
      this.speed = this.size / .5; // speed at which raindopw falls
      this.dropThickness = floor(this.size/3.8);
      if(this.dropThickness < 1){ this.dropThickness = 1; }
    }
  
  
    // moves the raindrop down based on it's size & speed, which creates the illusion of debth
    fall() {
      this.y += this.speed;
    }
  
    // draws the raindrop
    draw() {
      strokeWeight(this.dropThickness);
      stroke(rainColor);
      line(this.x, this.y, this.x, this.y - this.size * 2);
    }
  
    // returns true if full length of raindrop has exited the bottom of the screen
    hasFallen() {
      let answer = false;
      if (this.y - this.size > height) {
        answer = true;
      }
      return answer;
    }  
}
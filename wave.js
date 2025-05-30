class Wave {
    constructor(speed) {
     
        this.speed = speed;
        this.offset = 0;
      

    }

    update(){
        this.offset += this.speed
    }

   display() {
  noFill();
  stroke(255, 255, 255, 200);
  strokeWeight(6);

  beginShape();
  for (let x = 0; x < width; x += 1) { // 고정 간격으로 증가
    let y = height / 2 + sin(x * 0.05 + this.offset) * 100 + cos(x * 0.03 + this.offset) * 50;
    vertex(x, y);
  }
  endShape();

  stroke(255, 255, 255, 100);
  strokeWeight(10);

  beginShape();
  for (let x = 0; x < width; x += 1) { // 고정 간격으로 증가
    let y = height / 2 + sin(x * 0.07 + this.offset) * 80 + cos(x * 0.05 + this.offset) * 40;
    vertex(x, y);
  }
  endShape();
}
}


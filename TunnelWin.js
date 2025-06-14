class TunnelWin {
  constructor(numRings, depth) {
    this.numRings = numRings;
    this.depth = depth;
    this.rings = [];
    this.aniTime = null;
    
    this.runTime = null;




    // ㄷ자 개체 초기화 (깊이값 분포)
    for (let i = 0; i < this.numRings; i++) {
      let z = map(i, 0, this.numRings, this.depth, 0);
      this.rings.push({
        size: 400,
        z: z
      });
    }

    // 문 정보
    this.door = {
      size: 100,
      z: this.depth
    };

  }

  update() {
    if (this.runTime===null) this.runTime = millis();
    for (let ring of this.rings) {
      let dz = (this.depth + 50 - ring.z) * 0.0024; //터널속도(0.01)
      ring.z -= dz;

    }

    let dz = (this.depth + 50 - this.door.z) * 0.0024; //터널속도(0.01)
    this.door.z -= dz;




  }

  display() {
    // 화면 초기화
    noStroke();
    fill(174, 197, 218); // 터널 배경색
    rect(width/2, height/2, 1280, 720);
    noFill();
    strokeWeight(3);

    // 문 크기 및 위치 계산
    let doorScale = map(this.door.z, this.depth, 0, 0.05, 1.0);
    let doorW = this.door.size * 4 * doorScale * (720 / 1280);
    let doorH = this.door.size * 4 * doorScale;
    let doorY = height / 2 + doorH / 2; // 문 아랫 y좌표

    // 바닥 세로 그리드 그리기
    strokeWeight(1)
    stroke(10);
    let numLines = 9;
    for (let i = -numLines / 2; i <= numLines / 2; i++) {
      let x = i * 40;  // 그리드 간격
      let startZ = 0.01;
      let endZ = this.depth;

      // z값에 따라 선의 시작점, 끝점 계산
      let startScale = map(startZ, this.depth, 0, 0.2, 3.0);
      let endScale = map(endZ, this.depth, 0, 0.2, 3.0);

      let startX = x * startScale;
      let endX = x * endScale;

      let startY = height / 2 + (this.rings[0].size * startScale * (720 / 1280)) / 2;
      let endY = height / 2 + (this.rings[0].size * endScale * (720 / 1280)) / 2;


      line(width / 2 + startX, startY, width / 2 + endX, endY);
    }

    // ㄷ자 개체들
    for (let ring of this.rings) {
      let brightness = 0;
      stroke(brightness);

      let scaleFactor = map(ring.z, this.depth, 0, 0.2, 3.0);
      let w = ring.size * scaleFactor;
      let h = ring.size * scaleFactor * (720 / 1280);

      push();
      translate(width / 2, height / 2);
      rectMode(CENTER);

      line(-w / 2, -h / 2, w / 2, -h / 2);    // 윗 변
      line(-w / 2, -h / 2, -w / 2, h / 2);    // 왼쪽 변
      line(w / 2, -h / 2, w / 2, h / 2);      // 오른쪽 변

      pop();
    }

    // 문 그리기
    let doorBrightness = 255;
    fill(doorBrightness);
    noStroke();

    push();
    translate(width / 2, height / 2);
    rectMode(CENTER);
    rect(0, 10, doorW, doorH);  // y좌표 10으로 살짝 올려서 자연스럽게 보정
    pop();

    stroke(0);
    strokeWeight(2);
    fill(0);
    textSize(25);
    textFont(font2);
    

    if (millis() - this.runTime > 0 && millis() - this.runTime < 4000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 650, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("모든 색이 옅어지고, 풍경은 조용히 멈춰 섭니다.", width / 2, height - 150);
    } else if (millis() - this.runTime > 4000 && millis() - this.runTime < 9000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 750, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("겨울은 차갑고 고요하지만, 그 안에도 미세한 움직임과 온기가 숨어 있습니다.", width / 2, height - 150);
    } else if (millis() - this.runTime > 9000 && millis() - this.runTime < 14000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 750, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("쌓인 눈 위에 발자국을 남기며, 언제나 곁을 지켜준 웃음소리가 들려옵니다.", width / 2, height - 150);
    } else if (millis() - this.runTime > 14000 && millis() - this.runTime < 19000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 700, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("이번 터널에서는, 말없이 당신을 따뜻하게 했던 순간들을 떠올려봅니다.", width / 2, height - 150)
    }

    let alpha = 0;
    if (doorScale >= 1.0) {
      alpha = map(doorScale, 1.0, 1.2, 0, 600);
      alpha = constrain(alpha, 0, 255);

    }

    if (alpha > 0) {
      background(255, alpha)
    }



    if (alpha >= 255 && this.aniTime === null) {
      this.aniTime = millis();

    }

    if (this.aniTime !== null && millis() - this.aniTime >= 1000) {

      stageScene = 'illu';
      
    }

  }
}

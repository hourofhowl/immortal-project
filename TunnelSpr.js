class TunnelSpr {
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
      let dz = (this.depth + 50 - ring.z) * 0.0019;
      ring.z -= dz;

    }

    let dz = (this.depth + 50 - this.door.z) * 0.0019;
    this.door.z -= dz;




  }

  drawGradientBackground() {
  let c1 = color(255, 240, 150); // 위쪽 연노랑
  let c2 = color(247, 176, 45);  // 아래쪽 진노랑
  for (let y = 0; y <= height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(0, y, width, y);
  }
}

  display() {
    this.drawGradientBackground();
    // 화면 초기화
    noStroke();
    // fill(247, 176, 45); // 터널 배경색
    // rect(width/2, height/2, 1280, 720);
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

    stroke(255);
    strokeWeight(2);
    fill(255);
    textSize(25);
    textFont(font2);
    

    if (millis() - this.runTime > 0 && millis() - this.runTime < 3500) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 500, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("겨울이 지나고, 다시 바람이 부드러워졌습니다.", width / 2, height - 150);
    } else if (millis() - this.runTime > 3500 && millis() - this.runTime < 9000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 980, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("아직은 차가운 공기 속에서도, 작은 새싹이 고개를 들고, 어느새 개나리가 자라나기 시작합니다.", width / 2, height - 150);
    } else if (millis() - this.runTime > 9000 && millis() - this.runTime < 14000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 680, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("누군가의 손이 스치듯, 설레는 온기가 당신 곁에 머무릅니다.", width / 2, height - 150);
    } else if (millis() - this.runTime > 14000 && millis() - this.runTime < 19000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 580, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("이제 우리는, 당신 안으로 천천히 들어가 보려 합니다.", width / 2, height - 150);
    } else if(millis() - this.runTime > 19000 && millis() - this. runTime < 24000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 650, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("봄이라는 터널의 입구에서, 당신의 감각을 하나씩 열어볼까요?", width/2, height -150);
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

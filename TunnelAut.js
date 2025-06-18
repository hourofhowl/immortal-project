class TunnelAut {
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
  let c1 = color(255, 120, 50);
  let c2 = color(135, 54, 16);
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
    

    if (millis() - this.runTime > 0 && millis() - this.runTime < 5000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 740, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("한껏 달아올랐던 감정은 서서히 가라앉고, 바람은 조금씩 선선해집니다.", width / 2, height - 150);
    } else if (millis() - this.runTime > 5000 && millis() - this.runTime < 10000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 800, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("떨어지는 낙엽처럼, 마음속 어딘가에 쌓여 있던 기억들이 하나둘 떠오릅니다.", width / 2, height - 150);
    } else if (millis() - this.runTime > 10000 && millis() - this.runTime < 15000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 750, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("오랜 시간 곁을 지켜온 존재들이, 그 기억 속에서 조용히 고개를 듭니다.", width / 2, height - 150);
    } else if (millis() - this.runTime > 15000 && millis() - this.runTime < 20000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 820, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("이번 터널은, 지나온 시간들을 되짚으며 내면 깊숙한 곳을 들여다보는 길입니다.", width / 2, height - 150)
    } else if (millis() - this.runTime > 20000 && millis() - this.runTime < 24000) {
      rectMode(CENTER);
      noStroke();
      fill(0, 70);
      rect(width/2, height-160, 350, 50);
      stroke(255);
      strokeWeight(2);
      fill(255);
      text("당신의 가을은 어떤 색이었나요?", width / 2, height - 150)
    }

    let alpha = 0;
    if (doorScale >= 1.0) {
      alpha = map(doorScale, 1.0, 1.2, 0, 600);
      alpha = constrain(alpha, 0, 255);

    }

   tint(255, 255 - alpha); // 디졸브가 올라오면 이미지가 사라짐
    imageMode(CORNER);
    image(autumnbarImg, 0, 0);
    noTint();

    // 터널 끝나기 전까지 이동하는 원
    if (this.runTime !== null) {
      let moveDuration = 24000; // 터널 종료 전까지
      let progress = constrain((millis() - this.runTime) / moveDuration, 0, 1);

      let circleX = lerp(538.5, 741.5, progress);
      let circleY = 72.5;

      push();
      translate(circleX, circleY);
      noStroke();
      fill(255, 45, 49, 255 - alpha); // 디졸브에 맞춰 투명도 감소
      ellipseMode(CENTER);
      ellipse(0, 0, 15, 15); // 반지름 7.5
      pop();
    }


        // 🌑 디졸브 효과를 배경에 적용
    /*if (alpha > 0) {
      fill(0, alpha);
      noStroke();
      rect(0, 0, width, height);
    }*/


    if (alpha >= 255 && this.aniTime === null) {
      this.aniTime = millis();

    }

    if (this.aniTime !== null && millis() - this.aniTime >= 1000) {

      stageScene = 'illu';
      
    }
  }
}

const GEMINI_API_KEY = 'AIzaSyCrZCoVlHR1njeO15_k4qARL1rRyL9PRqc'
let myInput;
let geminiCalled = false;

let seasonX, seasonY;
     let xPlus = true;
     let xSpeed = 0.1

let title;
let font1, font2, font3, font4;
let anim = [];
let tunnel;
let endTime = null;
let current = 0;
let state = 'start';
let spring = [], summer = [], autumn = [], winter = [];
let stage = 0;
let answer1 = [], answer2 = [], answer3 = [], answer4 = [], answer5 = [], answer6 = [];
let noticeTime = null;
let seasonQuestion = 1;
let personal = [];
let interlude;
let blobs = [];
let step = 0;
let dice = [];
let randomDice = 0;
let main = [];
let texture = [];
let tk;
let qrguide;
let a, b, c, d, e;
let input = false;
let name = "";
let nameInput;
let date = "";
let dateInput;
let currentRect = 0;
let tkColor;
let t;
let next=false;

let countA_1 = 0, countA_2 = 0, countA_3 = 0, countA_4 = 0, countA_5 = 0;
let countB_1 = 0, countB_2 = 0, countB_3 = 0, countB_4 = 0, countB_5 = 0;
let countC_1 = 0, countC_2 = 0, countC_3 = 0, countC_4 = 0, countC_5 = 0;
let countD_1 = 0, countD_2 = 0, countD_3 = 0, countD_4 = 0, countD_5 = 0;
let countE_1 = 0, countE_2 = 0, countE_3 = 0, countE_4 = 0, countE_5 = 0;

let wave;
let waveSpeed = 0;

let geminiInput = "";
let emotions = "";
let touch = '';
let smell = '';
let ear = '';
let taste = '';
let geminiOutput = '';


function preload() {
  title = loadImage("title/Intro_Title.png");
  font1 = loadFont("Press_Start_2P/PressStart2P-Regular.ttf");
  // for (let i =0; i < 32; i++){
  //   anim[i] = loadImage("assets/tunnel_"+i+".png");
  // }

  for (let i = 1; i < 6; i++) {
    spring[i] = loadImage("spring/q1_" + i + ".png");
  }
  for (let i = 1; i < 6; i++) {
    summer[i] = loadImage("summer/q2_" + i + ".png");
  }
  for (let i = 1; i < 6; i++) {
    autumn[i] = loadImage("autumn/q3_" + i + ".png");
  }
  for (let i = 1; i < 6; i++) {
    winter[i] = loadImage("winter/q4_" + i + ".png");
  }
  font2 = loadFont("Noto_Sans_KR/NotoSansKR-VariableFont_wght.ttf");
  for (let i = 1; i < 4; i++) {
    personal[i] = loadImage("fq/fq_" + i + ".png");
  }
  interlude = loadImage("fq/Interlude.png")
  for (let i = 1; i < 7; i++) {
    dice[i] = loadImage("dice/tk_dice" + i + ".png");
  }
  for (let i = 1; i < 6; i++) {
    main[i] = loadImage("main_image/tk_pattern" + i + ".png");
  }
  for (let i = 1; i < 6; i++) {
    texture[i] = loadImage("texture_new/tk_texture" + i + ".png");
  }
  tk = loadImage("ticket/tk_fixed.png");
  qrguide = loadImage("ticket/tk_qrguide.png");
  font3 = loadFont("ticket/name_Pretendard-Medium.otf");
  font4 = loadFont("ticket/date_SometypeMono-Medium.ttf")
}

function setup() {
  createCanvas(1280, 720);
  tunnel = new Tunnel(8, 800); // 단위 개수, 깊이
  wave = new Wave(waveSpeed);
  randomDice = int(random(0, 2));
  seasonX = width/2 
  seasonY = height/2


  noStroke();

  for (let i = 0; i < 4; i++) {
    blobs.push(new showBlob(random(width), random(height), random(150, 250), random(1000), random(0.0001, 0.0004), color(0, 100, 255, 30), color(200, 255, 255, 10)));
  }
     
  //이름 입력란
  nameInput = createInput();
  nameInput.position(width / 2 - 310, height / 2 + 20);
  nameInput.style('font-size', '35px');
  nameInput.size(485, 65);
  nameInput.style('text-align', 'center');
  nameInput.style('border', 'none');
  nameInput.style('outline', 'none');
  nameInput.style('background-color', 'transparent');
  nameInput.style('color', 'white');
  nameInput.hide();

  nameInput.input(() => {
    if (nameInput.value().length > 10) {
      nameInput.value(nameInput.value().substring(0, 10));
    }
  });
  nameInput.changed(() => {
    name = nameInput.value();
    nameInput.hide();
    input = false;
    if (name.trim() !== "") {
      step = 2;
    }
  });

  //날짜 입력란
  dateInput = createInput();
  dateInput.position(width / 2 - 310, height / 2 + 20);
  dateInput.style('font-size', '35px');
  dateInput.size(485, 65);
  dateInput.style('text-align', 'center');
  dateInput.style('border', 'none');
  dateInput.style('outline', 'none');
  dateInput.style('background-color', 'transparent');
  dateInput.style('color', 'white');
  dateInput.hide();

  dateInput.input(() => {
    if (dateInput.value().length > 2) {
      dateInput.value(dateInput.value().substring(0, 2));
    }
  });
  dateInput.changed(() => {
    date = dateInput.value();
    dateInput.hide();
    input = false;
    if (date.trim() !== "") {
      step = 3;
    }
  });
}

function draw() {
  background(220);
  if (state == 'start') {
    start();
  } else if (state == 'anim') {
    tunnel.update(); // 이동 속도
    tunnel.display();
  } else if (state == 'notice') {
    notice();
    if (noticeTime !== null && millis() - noticeTime > 8000) {
      state = 'question';
    }
  } else if (state == 'question') {
    question();
  } else if (state == 'question2') {
    question2();
    if (currentRect > 9) {
      state = 'ticket';
    }
  } else if (state == 'ticket') {
    ticket();
  }
}

//시작화면
function start() {
  imageMode(CENTER);
  image(title, width / 2, height / 2);

  textFont(font1);
  textSize(18);
  textAlign(CENTER);
  if (floor(millis() / 500) % 2 == 0) {
    fill(250);
    text("Press Any Key To Start", width / 2, height/2+50);
  }
}


// 스테이지 전환

function keyPressed() {
  if (state == 'start') {
    state = 'anim';


  } else if (state == 'anim') {
    state = 'notice';
  }
  else if (state == 'notice') {
    state = 'question';
  } else if (state == 'question2') {
    if (input && keyCode === BACKSPACE) {
      name = name.slice(0, -1);
    }
    if (input && keyCode === ENTER) {
      input = false;
    }

  }
}

//안내사항
function notice() {
  noStroke();
  background(0);
  textFont(font2);
  textSize(30);
  fill(255);
  text("결과물은 작품의 알고리즘을 거쳐 이미지화됩니다.", width / 2, height / 2 - 30);
  text("점, 선, 면, 그리고 다채로운 색채로 표현되는 당신의 감각세계를 감상해보세요.", width / 2, height / 2 + 30);
}


//질문
function question() {
  background(0);
  imageMode(CENTER)
  rectMode(CENTER);
  noStroke();

 if (xPlus == true) {
        seasonX+=xSpeed
        if (seasonX >= width/2 + 50) xPlus = false;
      }
      if (xPlus == false){
        seasonX -=xSpeed
        if(seasonX <=width/2 -50 ) xPlus = true;
      }
    


  switch (stage) {
    case 0:
      image(spring[seasonQuestion], seasonX, seasonY);
      if (seasonQuestion == 1) {
        if (mouseX < width / 2 + 115 && mouseX > width / 2 - 115 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) { //부드럽게 스며든다
          fill(255, 70);
          rect(width/2, height/2+15 , 230, 50);
        } else if (mouseX < 1200 && mouseX > 970 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(1085, height / 2 + 15, 230, 50);
        } else if (mouseX < 310 && mouseX > 80 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(195, height / 2 + 15, 230, 50);
        }
      }
      if (seasonQuestion == 2) {
        if (mouseX < width / 2 - 225 && mouseX > width / 2 - 345 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(width / 2 - 285, height / 2, 120, 50);
        } else if (mouseX < width / 2 + 320 && mouseX > width / 2 + 200 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(width / 2 + 260, height / 2, 120, 50);
        }
      }
      if (seasonQuestion == 3) {
        if (mouseX < 390 && mouseX > 250 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(320, height / 2, 140, 50);
        } else if (mouseX < 1003 && mouseX > 863 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(933, height / 2, 140, 50);
        }
      }
      if (seasonQuestion == 4) {
        if (mouseX < 500 && mouseX > 160 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(330, height / 2, 340, 50);
        } else if (mouseX < 1142 && mouseX > 802 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(972, height / 2, 340, 50);
        }
      }
      if (seasonQuestion == 5) {
        if (mouseX < 812 && mouseX > 492 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(652, height / 2, 320, 50);
        } else if (mouseX < 1236 && mouseX > 916 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(1076, height / 2, 320, 50);
        } else if (mouseX < 378 && mouseX > 158 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(218, height / 2, 320, 50);
        }
      }
      break;
    case 1:
      image(summer[seasonQuestion], seasonX, seasonY);
      if (seasonQuestion == 1) {
        if (mouseX < 455 && mouseX > 235 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(345, height / 2 + 15, 220, 50);
        } else if (mouseX < 1000 && mouseX > 780 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(890, height / 2 + 15, 220, 50);
        }
      }
      if (seasonQuestion == 2) {
        if (mouseX < 798 && mouseX > 498 && mouseY > height / 2 + 5 && mouseY < height / 2 + 55) {
          fill(255, 70);
          rect(648, height / 2 + 30, 300, 50);
        } else if (mouseX < 1195 && mouseX > 895 && mouseY > height / 2 + 5 && mouseY < height / 2 + 55) {
          fill(255, 70);
          rect(1045, height / 2 + 30, 300, 50);
        } else if (mouseX < 370 && mouseX > 70 && mouseY > height / 2 - 20 && mouseY < height / 2 + 50) {
          fill(255, 70);
          rect(220, height / 2 + 30, 300, 100);
        }
      }
      if (seasonQuestion == 3) {
        if (mouseX < 475 && mouseX > 255 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(365, height / 2 + 15, 220, 50);
        } else if (mouseX < 1030 && mouseX > 810 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(920, height / 2 + 15, 220, 50);
        }
      }
      if (seasonQuestion == 4) {
        if (mouseX < 481 && mouseX > 241 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(361, height / 2 + 15, 240, 50);
        } else if (mouseX < 1044 && mouseX > 804 && mouseY > height / 2 + 5 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(924, height / 2 + 15, 240, 50);
        }
      }
      if (seasonQuestion == 5) {
        if (mouseX < 425 && mouseX > 335 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(380, height / 2 + 15, 90, 50);
        } else if (mouseX < 898 && mouseX > 808 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(853, height / 2 + 15, 90, 50);
        }
      }
      break;
    case 2:
      image(autumn[seasonQuestion], seasonX, seasonY);
      if (seasonQuestion == 1) {
        if (mouseX < 815 && mouseX > 495 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(655, height / 2 + 15, 320, 50);
        } else if (mouseX < 1230 && mouseX > 910 && mouseY > height / 2 + 5 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(1070, height / 2 + 15, 320, 50);
        } else if (mouseX < 374 && mouseX > 154 && mouseY > height / 2 - 20 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(214, height / 2 + 15, 320, 50);
        }
      }
      if (seasonQuestion == 2) {
        if (mouseX < 762 && mouseX > 482 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(622, height / 2 + 15, 280, 50);
        } else if (mouseX < 1170 && mouseX > 890 && mouseY > height / 2 + 5 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(1030, height / 2 + 15, 280, 50);
        } else if (mouseX < 365 && mouseX > 85 && mouseY > height / 2 - 20 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(225, height / 2 + 15, 280, 50);
        }
      }
      if (seasonQuestion == 3) {
        if (mouseX < 485 && mouseX > 265 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(375, height / 2 + 15, 220, 50);
        } else if (mouseX < 1040 && mouseX > 820 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(930, height / 2 + 15, 220, 50);
        }
      }
      if (seasonQuestion == 4) {
        if (mouseX < 537 && mouseX > 157 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(347, height / 2 + 15, 380, 50);
        } else if (mouseX < 1101 && mouseX > 721 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(911, height / 2 + 15, 380, 50);
        }
      }
      if (seasonQuestion == 5) {
        if (mouseX < 465 && mouseX > 305 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(385, height / 2 + 15, 160, 50);
        } else if (mouseX < 998 && mouseX > 838 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(918, height / 2 + 15, 160, 50);
        }
      }
      break;
    case 3:
      image(winter[seasonQuestion], seasonX, seasonY);
      if (seasonQuestion == 1) {
        if (mouseX < 450 && mouseX > 210 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(330, height / 2 + 15, 240, 50);
        } else if (mouseX < 1100 && mouseX > 860 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(980, height / 2 + 15, 240, 50);
        }
      }
      if (seasonQuestion == 2) {
        if (mouseX < 710 && mouseX > 510 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(610, height / 2 + 15, 200, 50);
        } else if (mouseX < 1140 && mouseX > 940 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(1040, height / 2 + 15, 200, 50);
        } else if (mouseX < 317 && mouseX > 117 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          fill(255, 70);
          rect(217, height / 2 + 15, 200, 50);
        }
      }
      if (seasonQuestion == 3) {
        if (mouseX < 435 && mouseX > 335 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(385, height / 2 + 15, 100, 50);
        } else if (mouseX < 920 && mouseX > 820 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(870, height / 2 + 15, 100, 50);
        }
      }
      if (seasonQuestion == 4) {
        if (mouseX < 435 && mouseX > 335 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(385, height / 2 + 15, 100, 50);
        } else if (mouseX < 920 && mouseX > 820 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(870, height / 2 + 15, 100, 50);
        }
      }
      if (seasonQuestion == 5) {
        if (mouseX < 455 && mouseX > 195 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(325, height / 2 + 15, 260, 50);
        } else if (mouseX < 1096 && mouseX > 836 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          fill(255, 70);
          rect(966, height / 2 + 15, 260, 50);
        }
      }
      break;
    default:
  }
}

function mouseClicked() {
  if (state == 'question') {
    if (stage == 0) {
      let select = null;
      if (seasonQuestion == 1) {
        if (mouseX < width / 2 + 115 && mouseX > width / 2 - 115 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = ['a', 'd'];
          answer1.push(select);
        } else if (mouseX < 1200 && mouseX > 970 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'c';
          answer1.push(select);
        } else if (mouseX < 310 && mouseX > 80 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = ['b', 'c'];
          answer1.push(select);
        }
      }
      if (seasonQuestion == 2) {
        if (mouseX < width / 2 - 225 && mouseX > width / 2 - 345 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = ['d', 'e'];
          answer2.push(select);
        } else if (mouseX < width / 2 + 320 && mouseX > width / 2 + 200 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = ['a', 'b', 'c'];
          answer2.push(select);
        }
      }
      if (seasonQuestion == 3) {
        if (mouseX < 390 && mouseX > 250 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = 'a';
          answer3.push(select);
        } else if (mouseX < 1003 && mouseX > 863 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = 'b';
          answer3.push(select);
        }
      }
      if (seasonQuestion == 4) {
        if (mouseX < 500 && mouseX > 160 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = 'b';
          answer4.push(select);
        } else if (mouseX < 1142 && mouseX > 802 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = 'a';
          answer4.push(select);
        }
      }
      if (seasonQuestion == 5) {
        if (mouseX < 812 && mouseX > 492 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = 50;
          answer5.push(select);
        } else if (mouseX < 1236 && mouseX > 916 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = 0;
          answer5.push(select);
        } else if (mouseX < 378 && mouseX > 158 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = 100;
          answer5.push(select);
        }
      }

      if (select !== null) {
        seasonQuestion++;

        if (seasonQuestion > 5) {
          stage = 1;
          state = 'question';
          seasonQuestion = 1;
        }
      }
    } else if (stage == 1) {
      let select = null;
      if (seasonQuestion == 1) {
        if (mouseX < 455 && mouseX > 235 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'b';
          answer1.push(select);
        } else if (mouseX < 1000 && mouseX > 780 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'd';
          answer1.push(select);
        }
      }
      if (seasonQuestion == 2) {
        if (mouseX < 798 && mouseX > 498 && mouseY > height / 2 + 5 && mouseY < height / 2 + 55) {
          select = 'e';
          answer2.push(select);
        } else if (mouseX < 1195 && mouseX > 895 && mouseY > height / 2 + 5 && mouseY < height / 2 + 55) {
          select = ['a', 'b'];
          answer2.push(select);
        } else if (mouseX < 370 && mouseX > 70 && mouseY > height / 2 - 20 && mouseY < height / 2 + 50) {
          select = ['c', 'd'];
          answer2.push(select);
        }
      }
      if (seasonQuestion == 3) {
        if (mouseX < 475 && mouseX > 255 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'b';
          answer3.push(select);
        } else if (mouseX < 1030 && mouseX > 810 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'a';
          answer3.push(select);
        }
      }
      if (seasonQuestion == 4) {
        if (mouseX < 481 && mouseX > 241 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'a';
          answer4.push(select);
        } else if (mouseX < 1044 && mouseX > 804 && mouseY > height / 2 + 5 && mouseY < height / 2 + 40) {
          select = 'b';
          answer4.push(select);
        }
      }
      if (seasonQuestion == 5) {
        if (mouseX < 425 && mouseX > 335 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 100;
          answer5.push(select);
        } else if (mouseX < 898 && mouseX > 808 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 0;
          answer5.push(select);
        }
      }

      if (select !== null) {
        seasonQuestion++;

        if (seasonQuestion > 5) {
          stage = 2;
          state = 'question';
          seasonQuestion = 1;
        }
      }
    } else if (stage == 2) {
      let select = null;
      if (seasonQuestion == 1) {
        if (mouseX < 815 && mouseX > 495 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = ['b', 'd'];
          answer1.push(select);
        } else if (mouseX < 1230 && mouseX > 910 && mouseY > height / 2 + 5 && mouseY < height / 2 + 40) {
          select = 'a';
          answer1.push(select);
        } else if (mouseX < 374 && mouseX > 154 && mouseY > height / 2 - 20 && mouseY < height / 2 + 40) {
          select = ['a', 'c'];
          answer1.push(select);
        }
      }
      if (seasonQuestion == 2) {
        if (mouseX < 762 && mouseX > 482 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = ['b', 'e'];
          answer2.push(select);
        } else if (mouseX < 1170 && mouseX > 890 && mouseY > height / 2 + 5 && mouseY < height / 2 + 40) {
          select = ['c', 'd'];
          answer2.push(select);
        } else if (mouseX < 365 && mouseX > 85 && mouseY > height / 2 - 20 && mouseY < height / 2 + 40) {
          select = 'a';
          answer2.push(select);
        }
      }
      if (seasonQuestion == 3) {
        if (mouseX < 485 && mouseX > 265 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'a';
          answer3.push(select);
        } else if (mouseX < 1040 && mouseX > 820 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'b';
          answer3.push(select);
        }
      }
      if (seasonQuestion == 4) {
        if (mouseX < 537 && mouseX > 157 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'a';
          answer4.push(select);
        } else if (mouseX < 1101 && mouseX > 721 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'b';
          answer4.push(select);
        }
      }
      if (seasonQuestion == 5) {
        if (mouseX < 465 && mouseX > 305 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 100;
          answer5.push(select);
        } else if (mouseX < 998 && mouseX > 838 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 0;
          answer5.push(select);
        }
      }

      if (select !== null) {
        seasonQuestion++;

        if (seasonQuestion > 5) {
          stage = 3;
          state = 'question';
          seasonQuestion = 1;
        }
      }
    } else if (stage == 3) {
      let select = null;
      if (seasonQuestion == 1) {
        if (mouseX < 450 && mouseX > 210 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = ['a', 'c'];
          answer1.push(select);
        } else if (mouseX < 1100 && mouseX > 860 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = ['b', 'd'];
          answer1.push(select);
        }
      }
      if (seasonQuestion == 2) {
        if (mouseX < 710 && mouseX > 510 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = 'b';
          answer2.push(select);
        } else if (mouseX < 1140 && mouseX > 940 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = ['d', 'e'];
          answer2.push(select);
        } else if (mouseX < 317 && mouseX > 117 && mouseY > height / 2 - 25 && mouseY < height / 2 + 25) {
          select = ['a', 'c'];
          answer2.push(select);
        }
      }
      if (seasonQuestion == 3) {
        if (mouseX < 435 && mouseX > 335 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'a';
          answer3.push(select);
        } else if (mouseX < 920 && mouseX > 820 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'b';
          answer3.push(select);
        }
      }
      if (seasonQuestion == 4) {
        if (mouseX < 435 && mouseX > 335 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'a';
          answer4.push(select);
        } else if (mouseX < 920 && mouseX > 820 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 'b';
          answer4.push(select);
        }
      }
      if (seasonQuestion == 5) {
        if (mouseX < 455 && mouseX > 195 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 100;
          answer5.push(select);
        } else if (mouseX < 1096 && mouseX > 836 && mouseY > height / 2 - 10 && mouseY < height / 2 + 40) {
          select = 0;
          answer5.push(select);
        }
      }

      if (select !== null) {
        seasonQuestion++;

        if (seasonQuestion > 5) {
          console.log("✅ state:", state);
          currentRect = 0;
          state = 'question2';
          select = null;
          endTime = millis();
          seqsonQuestion = 1;
          step = 0;
        }
      }
    }
  }
  if (state == 'question2') {
    if (step == 0) {
      console.log("now in seasonQ");
      if (endTime != null && millis() - endTime > 500) {
        let select = null;
        if (mouseX < width / 2 + 255 && mouseX > width / 2 - 255 && mouseY < 314 && mouseY > 252) {
          select = "spring";
        } else if (mouseX < width / 2 + 255 && mouseX > width / 2 - 255 && mouseY < 410 && mouseY > 345) {
          select = "summer";
        } else if (mouseX < width / 2 + 255 && mouseX > width / 2 - 255 && mouseY < 502 && mouseY > 437) {
          select = "autumn";
        } else if (mouseX < width / 2 + 255 && mouseX > width / 2 - 255 && mouseY < 595 && mouseY > 530) {
          select = 'winter';
        }
        if (select != null) {
          answer6.push(select);
          step = 1
        }
      }
    }
    if (step == 1) {
      if (mouseX > width / 2 - 310 && mouseX < width / 2 + 175 &&
        mouseY > height / 2 + 20 && mouseY < height / 2 + 85) {
        nameInput.show();
        nameInput.value(name);
        nameInput.elt.focus();
        input = true;
           if(mouseX<948&&mouseX>854&&mouseY<444&&mouseY>382){
                next=true;
           }
      } else {
        nameInput.hide();
        input = false;
      }
    }
    if (step == 2) {
      if (mouseX > width / 2 - 310 && mouseX < width / 2 + 175 &&
        mouseY > height / 2 + 45 && mouseY < height / 2 + 110) {
        dateInput.show();
        dateInput.value(date);
        dateInput.elt.focus();
        input = true;
           if(mouseX<948&&mouseX>854&&mouseY<444&&mouseY>382){
                next=true;
           }
      } else {
        dateInput.hide();
        input = false;
      }
    }
  }
  console.log("A1=" + answer1);
  console.log('A2=' + answer2);
  console.log('A3=' + answer3);
  console.log('A4=' + answer4);
  console.log('A5=' + answer5);
  console.log('A6=' + answer6);
  console.log('name=' + name);
  console.log('date=' + date);
}

function question2() {
  background(0);
  for (let b of blobs) {
    b.update();
    b.display();
  }

  imageMode(CENTER);
  rectMode(CENTER);
  switch (step) {
    case 0:
      image(personal[1], width / 2, height / 2);
      if (mouseX < width / 2 + 255 && mouseX > width / 2 - 255 && mouseY < 314 && mouseY > 252) {
        fill(255, 70);
        rect(width / 2, 283, 510, 65, 20);
      } else if (mouseX < width / 2 + 255 && mouseX > width / 2 - 255 && mouseY < 410 && mouseY > 345) {
        fill(255, 70);
        rect(width / 2, 377.5, 510, 65, 20);
      } else if (mouseX < width / 2 + 255 && mouseX > width / 2 - 255 && mouseY < 502 && mouseY > 437) {
        fill(255, 70);
        rect(width / 2, 469.5, 510, 65, 20);
      } else if (mouseX < width / 2 + 255 && mouseX > width / 2 - 255 && mouseY < 595 && mouseY > 530) {
        fill(255, 70);
        rect(width / 2, 562.5, 510, 65, 20);
      }
      break;
    case 1:
      image(personal[2], width / 2, height / 2);
      if (!input) {
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        text(name, 572.5, 412.5);
      }
     if(mouseX<948&&mouseX>854&&mouseY<444&&mouseY>382){
          fill(255, 70);
          noStroke();
          rect(901, 413,94, 62);
     }
     if(next){
      next=false;
      break;
     }
    case 2:
      image(personal[3], width / 2, height / 2);
      if (!input) {
        fill(255);
        noStroke();
        textAlign(CENTER, CENTER);
        text(date, 572.5, 437.5);
      }
      if(mouseX<948&&mouseX>854&&mouseY<444&&mouseY>382){
          fill(255, 70);
          noStroke();
          rect(901, 413,94, 62);
      }
      if(next){
       next=false;
       break;
      }
    case 3:
      image(interlude, width / 2, height / 2);
      if (frameCount % 100 == 0 && currentRect < 10) {
        currentRect++;
      }
      for (i = 0; i < currentRect; i++) {
        x = 535 + i * 25;
        y = 480;
        stroke(255);
        strokeWeight(3);
        noFill();
        rect(x, y, 20);
      }

      break;

    default:
  }
}

class showBlob {
  constructor(x, y, br, no, s, c1, c2) {
    this.x = x;
    this.y = y;
    this.br = br
    this.no = no
    this.s = s;
    this.c1 = c1;
    this.c2 = c2;

    this.rxRatio = random(1.0, 1.4);
    this.ryRatio = random(0.7, 1.2);
  }
  update() {
    this.x = map(noise(this.no), 0, 1, this.br / 2, width - this.br / 2);
    this.y = map(noise(this.no + 1000), 0, 1, this.br / 2, height - this.br / 2);
    this.no += this.s;
  }
  display() {
    push();
    translate(this.x, this.y);
    noStroke();
    for (let r = this.br; r > 0; r -= 10) {
      let inter = map(r, 0, this.br, 0, 1);
      fill(lerpColor(this.c1, this.c2, inter));
      let rx = r * this.rxRatio;
      let ry = r * this.ryRatio;
      ellipse(0, 0, rx * 2.5, ry * 2.5);
    }
    pop();
  }
}

function ticket() {
  background(0, 70);


  //1. 배경 모션(청각_answer4)
  for (let i = 0; i < answer4.length; i++) {
    if (answer4[i] == 'a') {
      countA_4++
    } else if (answer4[i] == 'b') {
      countB_4++
    }

  }
  if (countA_4 > countB_4) {
    waveSpeed = 0.01
    ear = '숲속의 고요';
  } else if (countA_4 == countB_4) {
    waveSpeed = 0.04
    if (randomDice == 0) { ear = '숲속의 고요' } else { ear = '신호의 파동' }
  } else if (countA_4 < countB_4) {
    waveSpeed = 0.07
    ear = '신호의 파동';
  }
  wave.speed = waveSpeed;
  wave.update();
  wave.display();

  //2. 티켓 형태와 배경색(계절_answer6, 감정_answer5)
  for (let i = 0; i < 4; i++) {
    tkColor += answer5[i]
    if (0 < tkColor < 250) {
      t = 100;
    } else if (300 < tkColor < 400) {
      t = 200;
    }
  }
  if (answer6 == "spring") {
    fill(255, 188, 84, t);
    if (t = 100) { emotions = "은은한 봄바람" } else { emotions = '봄날의 햇살' }
  } else if (answer6 == "summer") {
    fill(48, 252, 255, t);
    if (t = 100) { emotions = "고요한 밤바다" } else { emotions = '푸르른 파도' }
  } else if (answer6 == "autumn") {
    fill(253, 35, 1, t);
    if (t = 100) { emotions = "잔잔한 가을바람" } else { emotions = '붉은 노을빛' }
  } else if (answer6 == "winter") {
    fill(238, 246, 255, t);
    if (t = 100) { emotions = "깊은 겨울 밤결" } else { emotions = '눈부신 서리' }
  }


  strokeWeight(1);
  stroke(0);
  rectMode(CORNER);
  rect(250, 225.5-35, 780, 270);

  //3. 티켓 질감(후각_answer2)
  for (let i = 0; i < answer2.length; i++) {
    if (answer2[i] == 'a') {
      countA_2++
    } else if (answer2[i] == 'b') {
      countB_2++
    } else if (answer2[i] == 'c') {
      countC_2++
    } else if (answer2[i] == 'd') {
      countD_2++
    } else if (answer2[i] == 'e') {
      countE_2++
    }

  }
  let arrayQ2 = [countA_2, countB_2, countC_2, countD_2, countE_2];
  let maxQ2 = Math.max(...arrayQ2)
  if (countA_2 >= maxQ2) {
    image(texture[1], width / 2, height / 2-35);
    smell = '조약돌';

  } else if (countB_2 >= maxQ2) {
    image(texture[2], width / 2, height / 2-35);
    smell = '모래';
  } else if (countC_2 >= maxQ2) {
    image(texture[3], width / 2, height / 2-35);
    smell = '나무';

  } else if (countD_2 >= maxQ2) {
    image(texture[4], width / 2, height / 2-35);
    smell = '물결';

  } else if (countE_2 >= maxQ2) {
    image(texture[5], width / 2, height / 2-35);
    smell = '별';

  }

  //4. 메인 이미지(촉각_answer1)
  for (let i = 0; i < answer1.length; i++) {
    if (answer1[i] == 'a') {
      countA_1++
    } else if (answer1[i] == 'b') {
      countB_1++
    } else if (answer1[i] == 'c') {
      countC_1++
    } else if (answer1[i] == 'd') {
      countD_1++
    } else if (answer1[i] == 'e') {
      countE_1++
    }

  }
  let arrayQ1 = [countA_1, countB_1, countC_1, countD_1, countE_1];
  let maxQ1 = Math.max(...arrayQ1)
  if (countA_1 >= maxQ1) {
    image(main[1], width / 2, height / 2);
    touch = '몽글몽글 피어오른';

  } else if (countB_1 >= maxQ1) {
    image(main[2], width / 2, height / 2);
    touch = '꿈결처럼 얽힌';

  } else if (countC_1 >= maxQ1) {
    image(main[3], width / 2, height / 2);
    touch = '고요히 돋아난';

  } else if (countD_1 >= maxQ1) {
    image(main[4], width / 2, height / 2);
    touch = '살랑이는';
  } else if (countE_1 >= maxQ1) {
    image(main[5], width / 2, height / 2);
    touch = '나지막이 깔린';
  }
  //5. 주사위(미각_answer3)
  for (let i = 0; i < answer3.length; i++) {
    if (answer3[i] == 'a') {
      countA_3++
    } else if (answer3[i] == 'b') {
      countB_3++
    }

  }
  if (countA_3 > countB_3) {
    if (randomDice == 0) {
      image(dice[5], width / 2, height / 2);
    } else { image(dice[6], width / 2, height / 2); }
    taste = '그것을 기꺼이 끌어안는 품';
  }

  if (countA_3 < countB_3) {
    if (randomDice == 0) {
      image(dice[1], width / 2, height / 2);
    } else { image(dice[2], width / 2, height / 2); }
    taste = '그로부터 담담하게 자리잡은 돌벽';
  }

  if (countA_3 == countB_3) {
    if (randomDice == 0) {
      image(dice[3], width / 2, height / 2);
      taste = '그것을 기까이 끌어안는 품';
    } else {
      image(dice[4], width / 2, height / 2);
      taste = '그로부터 담담하게 자리잡은 돌벽';
    }
  }

  if (geminiCalled == false) { gemini() }

  //주관식 답변 결과
  textAlign(CENTER);
  stroke(0);
  strokeWeight(1);
  fill(50);
  textSize(16);
  textFont(font3);
  text(name, 404, 387-35);
  textFont(font4);
  textSize(18);
  text(date, 556, 468-35);
  textAlign(CENTER);
  text(geminiInput,width/2,600);


  textFont(font3);
  textAlign(LEFT)
  text(geminiOutput, 272, 432-35);




  //마지막에 티켓 고정이미지, qr 안내
  image(tk, width / 2, height / 2);
  image(qrguide, width / 2, height / 2)
}

function gemini() {

  //gemini

  geminiInput = "당신의 세계에선 " + emotions + " 속 " + touch + " " + smell + " 이/가 느껴져요. 또한, " + ear + ", " + taste + "을/를 가졌군요. "
  generateContent(geminiInput, function (responseText) {

    console.log("Sketch.js에서 받은 Gemini 응답:", responseText);
    geminiOutput = responseText


  });

  geminiCalled = true;



}


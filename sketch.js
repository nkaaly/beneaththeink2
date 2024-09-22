let build1;
let build2;
let build3;
let sky;
let ground;
let book;
let symbol;
let frame;
let lyra, ronan, a, e, lyraWhite;
let scale = 1; //default for image scaling
let title;
let titleFont;
let bodyFont;
let diaryFont;
let textColor = (219, 219, 219);
let textBodySize = 16;
let displayStoryHeading = false;
let displayStoryText = false;
let displayStoryImg = false;
let displayDiaryInstruction = false;
let rectFill = false;
let page;
let pageBlack;
let displayDiary = false;
let introPageFront,
  introPageBot,
  page1Front,
  page1Bot,
  page2Front,
  page2Bot,
  page3Front,
  page3Bot,
  page4Bot;
let park, cabin;
let lyraSmall, clip;
let inspectBoxW = 200;
let inspectBoxH = 150;
let inspectMode = false;
let pageNum = 1;
let arrowLX;
let arrowLY;
let arrowRX;
let arrowRY;

var dragging = false;
var rollover = false; // Is the mouse over the element?
var x, y, w, h; // Location and size
var offsetX, offsetY; // Mouseclick offset

var dragging2 = false;
var rollover2 = false;
var x2, y2, w2, h2;
var offsetX2, offsetY2;

let music;
let musicOn, musicOff;
let musicX, musicY, musicWidth, musicHeight;
let pageFlip;
let modeOn, modeOff;

let drips = [];
let s = 15;
let inkLayer; // New layer for the ink drips
let dripDelay = 20; // Number of frames between each drip (60 frames = ~1 second at 60fps)
let dripTimer = 0; // Timer to control the delay

let rainColor;
let rain = [];
const numOfDrops = 1000; // total number of raindrops

let amp;
let waveLayer;

let grain;

let displaySplashScreen = true;
let splashOpacity = 255;
let fadeSpeed = 5;

function preload() {
  build1 = loadImage("element/home build 1.png");
  build2 = loadImage("element/home build 2.png");
  build3 = loadImage("element/home build 3.png");
  sky = loadImage("element/home sky.png");
  ground = loadImage("element/home ground.png");
  book = loadImage("element/home book.png");
  symbol = loadImage("element/symbol.png");
  frame = loadImage("element/home frame.png");
  lyra = loadImage("element/lyra.png");
  ronan = loadImage("element/ronan.png");
  a = loadImage("element/a.png");
  e = loadImage("element/e.png");
  lyraWhite = loadImage("element/lyra white.png");
  page = loadImage("element/paper.png");
  pageBlack = loadImage("element/paper black.png");
  introPageFront = loadImage("element/journal/intro page.png");
  introPageBot = loadImage("element/journal/intro page hidden.png");
  lyraSmall = loadImage("element/journal/lyra small pic.png");
  clip = loadImage("element/journal/paper clip.png");
  page1Front = loadImage("element/journal/page1.png");
  page1Bot = loadImage("element/journal/page1 hidden.png");
  page2Front = loadImage("element/journal/page2.png");
  page2Bot = loadImage("element/journal/page2 hidden.png");
  park = loadImage("element/journal/park.png");
  cabin = loadImage("element/journal/cabin.png");
  page3Front = loadImage("element/journal/page3.png");
  page3Bot = loadImage("element/journal/page3 hidden.png");
  page4Bot = loadImage("element/journal/page4 hidden.png");

  titleFont = loadFont("fonts/Cactus Regular copy.otf");
  bodyFont = loadFont("fonts/DenkOne-Regular.ttf");
  diaryFont = loadFont("fonts/Kalam-Regular.ttf");

  music = loadSound("music/Subtotem.MP3");
  musicOn = loadImage("element/music on.png");
  musicOff = loadImage("element/music off.png");
  pageFlip = loadSound("music/page flip.MP3");
  modeOn = loadSound("music/mode on.MP3");
  modeOff = loadSound("music/mode off.MP3");
}

function setup() {
  createCanvas(1512, 857);
  arrowLX = 80;
  arrowLY = height / 2;
  arrowRX = 1420;
  arrowRY = height / 2;

  // Starting location of park/cabin sketches
  x = 770;
  y = 270;

  // Dimensions of park/cabin sketches
  w = 0.36 * width;
  h = (0.36 * park.height * width) / park.width;

  // Starting location of lyra small
  x2 = 1100;
  y2 = 110;

  // Dimensions of lyra small
  w2 = 0.1 * width;
  h2 = (0.1 * lyraSmall.height * width) / lyraSmall.width;

  //music
  musicX = width - 143;
  musicY = 50;
  musicWidth = 40;
  musicHeight = 40;

  //inkbleed
  inkLayer = createGraphics(width, height); // Create a separate graphics layer for ink
  //dripTimer = dripDelay;

  //rain
  rainColor = color(textColor, 80);
  for (let i = 0; i < numOfDrops; i++) {
    rain[i] = new Raindrop();
  }

  //wave
  waveLayer = createGraphics(1900, 1000); // Create the layer where the waves will be drawn
  amp = new p5.Amplitude();
  for (i = 0; i < 10; i++) {
    eval("leWave" + i + "=createleWave(" + i + ");");
  }

  //grain
  createFilmGrain(0, 0, width, height, 100, 3, 0.1);
}

function draw() {
  //CLIPPING MASK
  drawingContext.save();

  parallax();

  if (inspectMode) {
    inspectBox();
  }

  drawingContext.clip();
  parallax(); //bottom image
  symbolFunc();
  purpleOverlay();
  drawingContext.restore();

  rainFunc();

  image(inkLayer, 0, 0);
  inkDrip();

  //BLACK FRAME
  image(frame, 0, 0, (scale * build3.width * height) / build3.height, scale * height); //fit height 100%

  //TEXT
  titleFunc();
  fill(0);
  stroke(textColor);
  strokeWeight(1);
  rect(147, height / 1.151, 55, 30, 10);
  noStroke();
  fill(textColor);
  textSize(textBodySize);
  textFont(bodyFont);
  text("Press   Space   to continue", 100, height / 1.12);

  if (displayDiary) {
    //CLIPPING MASK
    push();
    drawingContext.save();
    fill(0);
    rect(0, 0, width * 2, height * 2);
    text(" "); //idk why but if i delete this the pages aint working properly

    if (pageNum >= 1 && pageNum < 5) {rainFunc();}
    if (pageNum == 1) {diaryPageBlack(), introPageFrontFunc(), lyraSmallFunc(), clipFunc();}
    if (pageNum >= 2) {diaryPage();}
    if (pageNum == 2) {page1FrontFunc();}
    if (pageNum == 3) {page2FrontFunc(), parkFunc();}
    if (pageNum == 4) {page3FrontFunc();}
    if (pageNum == 5) {image(waveLayer, 0, 0), wave(), diaryPage();}

    if (inspectMode) {inspectBox();}

    drawingContext.clip();
    fill(0);
    rect(0, 0, width * 2, height * 2);
    if (pageNum >= 1 && pageNum < 5) {rainFunc();}
    if (pageNum == 1) {diaryPageBlack(), introPageBotFunc(), lyraSmallFunc(), clipFunc();}
    if (pageNum >= 2) {diaryPage();}
    if (pageNum == 2) {page1BotFunc();}
    if (pageNum == 3) {page2BotFunc(), cabinFunc();}
    if (pageNum == 4) {page3BotFunc();}
    if (pageNum == 5) {
      image(waveLayer, 0, 0);
      wave();
      diaryPageBlack(), page4BotFunc();
    }
    purpleOverlay();
    drawingContext.restore();
    pop();
  }

  //MENU
  menu();

  //MUSIC
  if (music.isPlaying()) {
    image(musicOn, musicX, musicY, musicWidth, musicHeight);
  } else {
    image(musicOff, musicX, musicY, musicWidth, musicHeight);
  }

  //DIARY INSTRUCTION
  if (displayDiaryInstruction) {
    diaryInstruction();
  }

  //STORY
  if (rectFill) {
    push();
    fill(0, 0, 0, 200);
    rect(0, 0, width, height);
    pop();
  }

  if (displayStoryHeading) {
    push();
    textAlign(CENTER);
    textSize(94);
    textFont(titleFont);
    text("THE STORY", width / 2, 120);
    pop();
  }

  if (displayStoryText) {
    push();
    let storyTextOneX = 350;
    let storyTextOneY = 200;
    let storyTextTwoX = 250;
    let storyTextTwoY = 500;
    let storyTextThreeX = 1150;
    let storyTextThreeY = 300;
    let storyTextFourX = 1250;
    let storyTextFourY = 580;
    textFont(bodyFont);
    textSize(textBodySize);
    textAlign(CENTER);
    //text 1
    push();
    fill(0);
    strokeWeight(1);
    stroke(textColor);
    line(storyTextOneX, storyTextOneY, storyTextTwoX, storyTextTwoY);
    rectMode(CENTER);
    rect(storyTextOneX, storyTextOneY + 63, 300, 200);
    pop();
    text(
      "In the quiet town of Willow Creek, a\nhigh school girl named Lyra vanishes\nwithout a trace. The town is left in\nshock, but as days turn into weeks,\nhope begins to fade. The police are at\na loss, but there’s one clue they’ve\noverlooked: Lyra’s journal, hidden\ncarefully beneath her bed.",
      storyTextOneX,
      storyTextOneY
    );

    //text 2
    push();
    fill(0);
    strokeWeight(1);
    stroke(textColor);
    rectMode(CENTER);
    rect(storyTextTwoX, storyTextTwoY + 63, 300, 200);
    pop();
    text(
      "You are Detective Ronan, called in\nwhen the case runs cold. Her diary\nseems typical, but your instincts tell\nyou there’s something more lurking\nbetween the lines. As you decode\nthe entries, you begin to suspect\nthat Lyra’s disappearance is tied to\na mysterious death a decade ago. ",
      storyTextTwoX,
      storyTextTwoY
    );

    //text 3
    push();
    fill(0);
    strokeWeight(1);
    stroke(textColor);
    line(storyTextThreeX, storyTextThreeY, storyTextFourX, storyTextFourY);
    rectMode(CENTER);
    rect(storyTextThreeX, storyTextThreeY + 54, 300, 175);
    pop();
    text(
      "This isn’t just a missing person’s case\n—it’s something darker, something\nthat someone doesn’t want you to find.\nWith the journal as your only lead,\nyou must dig deeper, and unravel a\nweb of lies woven into the very fabric\nof this small town. ",
      storyTextThreeX,
      storyTextThreeY
    );

    //text 4
    push();
    fill(0);
    strokeWeight(1);
    stroke(textColor);
    rectMode(CENTER);
    rect(storyTextFourX, storyTextFourY + 45, 240, 150);
    pop();
    text(
      "But beware—the closer you\nget to the truth, the more\ndangerous the hunt becomes.\nSomeone, or something, is\ndetermined to keep Lyra’s\nsecrets buried forever. ",
      storyTextFourX,
      storyTextFourY
    );
    pop();
  }

  if (displayStoryImg) {
    let scaleSmall = 0.35;
    push();
    angleMode(DEGREES);
    imageMode(CENTER);

    push();
    translate(random(649, 650), random(599, 600));
    rotate(-21);
    image(
      a,
      0,
      0,
      (scaleSmall * a.width * height) / a.height,
      scaleSmall * height
    );
    pop();

    push();
    translate(random(874, 875), random(529, 530));
    rotate(20);
    image(
      e,
      0,
      0,
      (scaleSmall * e.width * height) / e.height,
      scaleSmall * height
    );
    pop();

    push();
    translate(random(627, 628), random(369, 370));
    rotate(-6);
    image(
      lyra,
      0,
      0,
      (scaleSmall * lyra.width * height) / lyra.height,
      scaleSmall * height
    );
    pop();

    push();
    translate(random(879, 880), random(299, 300));
    rotate(9);
    image(
      ronan,
      0,
      0,
      (scaleSmall * ronan.width * height) / ronan.height,
      scaleSmall * height
    );
    pop();

    push();
    translate(width / 2, random(449.5, 450));
    blendMode(DIFFERENCE);
    image(
      lyraWhite,
      0,
      0,
      ((scaleSmall * lyraWhite.width * height) / lyraWhite.height) * 1.7,
      scaleSmall * height * 1.7
    );
    pop();

    pop();
  }

  //spash scrn
  /* if(displaySplashScreen) {
    splashScreen();
  } */
  if (displaySplashScreen) {
    splashOpacity = min(splashOpacity + fadeSpeed, 255);
    fill(20, splashOpacity);
    rect(0, 0, width, height);
    image(inkLayer, 0, 0);
    inkDrip();
    splashScreen();
  } else {
    splashOpacity = max(splashOpacity - fadeSpeed, 0);
    fill(20, splashOpacity);
    rect(0, 0, width, height);
    splashScreen();
  }

  if (splashOpacity === 0 && !displaySplashScreen) {
    displaySplashScreen = false;
  }

  //grain
  updateGrain();
  displayGrain();
}

//SPLASH SCREEN
function splashScreen() {
  push();
  /* fill(textColor, splashOpacity);
  rect(0, 0, width, height); */
  fill(textColor, splashOpacity);
  textSize(textBodySize);
  textFont(bodyFont);
  textAlign(CENTER);
  text("Use headphone for best experience.", width / 2, height / 2);
  text("");
  pop();
}

//INSPECT BOX
function inspectBox() {
  push();
  strokeWeight(1);
  stroke(255, 0, 0);
  rectMode(CENTER);
  rect(mouseX, mouseY, inspectBoxW, inspectBoxH);
  pop();
}

function purpleOverlay() {
  push();
  blendMode(SOFT_LIGHT);
  fill(0, 0, 255, 100);
  rect(0, 0, width, height);
  pop();
}

//HOMEPAGE
function parallax() {
  push();
  image(
    sky,
    0,
    0,
    (scale * build3.width * height) / build3.height,
    scale * height
  );
  groundFunc();
  build1Func();
  build2Func();
  bookFunc();
  build3Func();
  pop();
}

function groundFunc() {
  push();
  translate(map(mouseX, 0, width, 5, -5), 0);

  push();
  image(
    ground,
    0,
    0,
    (scale * build3.width * height) / build3.height,
    scale * height
  );
  pop();

  pop();
}

function build1Func() {
  push();
  translate(map(mouseX, 0, width, 5, -5), 0);

  push();
  image(
    build1,
    0,
    0,
    (scale * build3.width * height) / build3.height,
    scale * height
  );
  pop();

  pop();
}

function build2Func() {
  push();
  translate(map(mouseX, 0, width, 10, -10), 0);

  push();
  image(
    build2,
    0,
    0,
    (scale * build3.width * height) / build3.height,
    scale * height
  );
  pop();

  pop();
}

function build3Func() {
  push();
  translate(map(mouseX, 0, width, 15, -15), 0);

  push();
  image(
    build3,
    0,
    0,
    (scale * build3.width * height) / build3.height,
    scale * height
  );
  pop();

  pop();
}

function bookFunc() {
  push();
  translate(map(mouseX, 0, width, 20, -20), 0);

  push();
  image(
    book,
    0,
    0,
    (scale * build3.width * height) / build3.height,
    scale * height
  );
  pop();

  pop();
}

function symbolFunc() {
  push();
  translate(map(mouseX, 0, width, 20, -20), 0);

  push();
  image(
    symbol,
    0,
    0,
    (scale * symbol.width * height) / symbol.height,
    scale * height
  );
  pop();

  pop();
}

//INK
function inkDrip() {
  inkLayer.frameRate(45);
  // Add drip only if enough time has passed (using dripTimer)
  if (dripTimer <= 0) {
    drips.push(new Drip(random(0, width), 0, random(5, 10)));
    dripTimer = dripDelay; // Reset the timer
  } else {
    dripTimer--; // Decrease the timer
  }

  // Update and draw all drips in the inkLayer
  for (let i = drips.length - 1; i >= 0; i--) {
    drips[i].update();
    if (drips[i].r < 0) {
      drips.splice(i, 1);
      continue;
    }
    drips[i].draw(inkLayer); // Draw on the inkLayer
  }
}

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
    this.r -= 0.03;
  }

  draw(layer) {
    let a = map(this.r, this.startR, 0, 100, 0);
    layer.fill(0, a);
    layer.noStroke();
    layer.ellipse(this.x, this.y, this.r * 2);
  }
}

//RAIN
function rainFunc() {
  for (let drop of rain) {
    drop.fall();
    drop.draw();
    if (drop.hasFallen()) {
      drop.reset();
    }
  }
}

function titleFunc() {
  fill(textColor);
  noStroke();
  textSize(94);
  textFont(titleFont);
  text("BENEATH", 100, height / 1.4);
  text("THE INK", 100, height / 1.2);
}

function menu() {
  textSize(23);
  text("ESC", 100, 80);
}

//DIARY
function diaryPage() {
  image(
    page,
    140,
    75,
    ((scale * page.width * height) / page.height) * 0.8,
    scale * height * 0.8
  );
}

function diaryPageBlack() {
  image(
    pageBlack,
    140,
    75,
    ((scale * page.width * height) / page.height) * 0.8,
    scale * height * 0.8
  );
}

let diaryTextLX = 210;
let diaryTextScale = 0.71;

function introPageFrontFunc() {
  image(
    introPageFront,
    diaryTextLX,
    250,
    0.45 * diaryTextScale * width,
    (0.45 * diaryTextScale * introPageFront.height * width) /
      introPageFront.width
  );
}

function introPageBotFunc() {
  image(
    introPageBot,
    diaryTextLX,
    250,
    0.45 * diaryTextScale * width,
    (0.45 * diaryTextScale * introPageBot.height * width) / introPageBot.width
  );
}

function clipFunc() {
  image(
    clip,
    1200,
    50,
    0.07 * diaryTextScale * width,
    (0.07 * diaryTextScale * clip.height * width) / clip.width
  );
}

function lyraSmallFunc() {
  // Is mouse over object
  if (mouseX > x2 && mouseX < x2 + w2 && mouseY > y2 && mouseY < y2 + h2) {
    rollover2 = true;
  } else {
    rollover2 = false;
  }

  // Adjust location if being dragged
  if (dragging2) {
    x2 = mouseX + offsetX2;
    y2 = mouseY + offsetY2;
  }

  image(lyraSmall, x2, y2, w2, h2);
}

function page1FrontFunc() {
  image(
    page1Front,
    diaryTextLX,
    230,
    diaryTextScale * width,
    (diaryTextScale * page1Front.height * width) / page1Front.width
  );
}

function page1BotFunc() {
  image(
    page1Bot,
    diaryTextLX,
    230,
    diaryTextScale * width,
    (diaryTextScale * page1Bot.height * width) / page1Bot.width
  );
}

function page2FrontFunc() {
  image(
    page2Front,
    diaryTextLX,
    200,
    diaryTextScale * width,
    /* 1.028* */ (diaryTextScale * page2Front.height * width) / page2Front.width
  );
}

function page2BotFunc() {
  image(
    page2Bot,
    diaryTextLX,
    200,
    diaryTextScale * width,
    (diaryTextScale * page2Bot.height * width) / page2Bot.width
  );
}

//DRAGGING
function parkFunc() {
  // Is mouse over object
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } else {
    rollover = false;
  }

  // Adjust location if being dragged
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }
  image(park, x, y, w, h);
}

function cabinFunc() {
  // Is mouse over object
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } else {
    rollover = false;
  }

  // Adjust location if being dragged
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }
  image(cabin, x, y, w, h);
}

function page3FrontFunc() {
  image(
    page3Front,
    diaryTextLX,
    220,
    diaryTextScale * width,
    (diaryTextScale * page3Front.height * width) / page3Front.width
  );
}

function page3BotFunc() {
  image(
    page3Bot,
    diaryTextLX,
    220,
    diaryTextScale * width,
    (diaryTextScale * page3Bot.height * width) / page3Bot.width
  );
}

function page4BotFunc() {
  image(
    page4Bot,
    random(diaryTextLX - 48, diaryTextLX - 47),
    random(100, 101),
    1.05 * diaryTextScale * width,
    (1.05 * diaryTextScale * page4Bot.height * width) / page4Bot.width
  );
}

function diaryInstruction() {
  let diaryInstructY = 820;
  let buttonY = diaryInstructY - 22;
  push();
  fill(0);
  stroke(textColor);
  strokeWeight(1);
  rect(95, buttonY, 30, 30, 10);
  rect(137, buttonY, 30, 30, 10);

  rect(661, buttonY, 30, 30, 10);
  rect(704, buttonY, 30, 30, 10);

  rect(1312, buttonY, 55, 30, 10);

  textSize(textBodySize);

  noStroke();
  fill(textColor);
  textAlign(LEFT);
  text("A         D     to toggle inspection mode", 105, diaryInstructY);
  textAlign(CENTER);
  text("W        S     to adjust sizes", width / 2, diaryInstructY);
  //textAlign(RIGHT);
  text("Enter    to exit", 1370, diaryInstructY);

  textSize(60);
  push();
  if (dist(mouseX, mouseY, arrowLX, arrowLY) <= 30) {
    fill(255, 0, 0);
  }
  text("<", arrowLX, arrowLY);
  pop();
  if (dist(mouseX, mouseY, arrowRX, arrowRY) <= 30) {
    fill(255, 0, 0);
  }
  text(">", arrowRX, arrowRY);
  pop();
}

//WAVE
function wave() {
  waveLayer.frameRate(15);
  let vol = amp.getLevel();
  let volumeLevel = round(map(vol, 0, 0.3, 10, 60));
  for (i = 0; i < 10; i++) {
    eval("updateleWave(leWave" + i + ");");
  }
}

function createleWave(i) {
  let leWave = {};
  leWave.xspacing = 15; // Distance between each horizontal location
  leWave.w = width + 13; // Width of entire wave
  leWave.theta = 0.0; // Start angle at 0
  leWave.amplitude = 32.0; // Height of wave
  leWave.period = 100.0; // How many pixels before the wave repeats
  leWave.dx = (TWO_PI / leWave.period) * leWave.xspacing;
  leWave.yvalues = new Array(floor(leWave.w / leWave.xspacing));
  leWave.x = random(5);
  leWave.r = random(5);
  leWave.y = random(-500, 0);
  leWave.r1 = random(255);
  leWave.g1 = random(60);
  leWave.b1 = random(100);
  return leWave;
}

function updateleWave(leWave) {
  leWave.theta += 0.08;

  // Calculate y values based on the tan function
  let x = leWave.theta;
  angleMode(RADIANS);
  for (let i = 0; i < leWave.yvalues.length; i++) {
    leWave.yvalues[i] = tan(x) * leWave.amplitude + leWave.y;
    x += leWave.dx + leWave.x;
  }

  waveLayer.noStroke();

  // Randomly switch between red and black for flickering effect
  let flickerColor = random() > 0.5 ? color(200, 0, 10) : color(0);
  waveLayer.fill(flickerColor);

  // Draw the blocks onto the wave layer
  for (let x = 0; x < leWave.yvalues.length; x++) {
    waveLayer.ellipse(
      x * leWave.xspacing,
      height / 2 + leWave.yvalues[x],
      leWave.r + random(10)
    );
  }
}

//GRAIN
function updateGrain() {
  grain.update();
}

function displayGrain() {
  grain.display();
}

function createFilmGrain(x, y, w, h, patternSize, sampleSize, patternAlpha) {
  grain = new FilmGrainEffect(
    x,
    y,
    w,
    h,
    patternSize,
    sampleSize,
    patternAlpha
  );
}

//KEY CONTROL
function keyPressed() {
  if (displaySplashScreen == false) {
    if (keyCode === ESCAPE) {
      displayStoryHeading = true;
      displayStoryText = true;
      displayStoryImg = true;
      rectFill = true;
    }

    if (key == " ") {
      displayDiary = true;
      displayDiaryInstruction = true;
      pageNum = 1;
    } else if (keyCode === ENTER) {
      displayDiary = false;
      displayDiaryInstruction = false;

      drips = []; // Clear the drips array
      inkLayer.clear(); // Clear the ink graphics layer to start fresh
    }

    if (pageNum != 5) {
      waveLayer.clear();
    }

    if (key == "a" || key == "A") {
      inspectMode = true;
      modeOn.play();
    } else if (key == "d" || key == "D") {
      inspectMode = false;
      modeOff.play();
    }

    if (key == "w" || key == "W") {
      inspectBoxW = inspectBoxW + 50;
      inspectBoxH = inspectBoxH + 50;
    }

    if (key == "s" || (key == "S" && inspectBoxW > 100 && inspectBoxH > 50)) {
      inspectBoxW = inspectBoxW - 50;
      inspectBoxH = inspectBoxH - 50;
    }

    if (displayDiary == true) {
      if (keyCode === RIGHT_ARROW && pageNum < 5) {
        pageNum++;
        pageFlip.play();
        console.log("pageNum" + pageNum);
      }

      if (keyCode === LEFT_ARROW && pageNum > 1) {
        pageNum--;
        pageFlip.play();
        console.log("pageNum" + pageNum);
      }
    }
  }
}

function keyReleased() {
  if (keyCode === ESCAPE) {
    displayStoryHeading = false;
    displayStoryText = false;
    displayStoryImg = false;
    rectFill = false;
  }
}

function mousePressed() {
  if (splashOpacity === 255) {
    music.loop();
    displaySplashScreen = false;
    drips = []; // Clear the drips array
    inkLayer.clear();
  }

  if (displayDiary == true) {
    if (dist(mouseX, mouseY, arrowLX, arrowLY) <= 30 && pageNum > 1) {
      pageNum--;
      console.log("pageNum" + pageNum);
      pageFlip.play();
    } else if (dist(mouseX, mouseY, arrowRX, arrowRY) <= 30 && pageNum < 5) {
      pageNum++;
      console.log("pageNum" + pageNum);
      pageFlip.play();
    }
  }

  if (dist(mouseX, mouseY, musicX, musicY) <= 50) {
    if (music.isPlaying()) {
      music.stop();
    } else {
      music.loop();
    }
  }

  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;

    offsetX = x - mouseX;
    offsetY = y - mouseY;
  }

  if (mouseX > x2 && mouseX < x2 + w2 && mouseY > y2 && mouseY < y2 + h2) {
    dragging2 = true;

    offsetX2 = x2 - mouseX;
    offsetY2 = y2 - mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
  dragging2 = false;
}

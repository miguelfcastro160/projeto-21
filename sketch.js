//Declare a variável para PLAY e END
var PLAY = 1;
var END = 0;
//inicialize o valor para a variável
var score;
//Atribua o valor de gameState como PLAY
var gameState = PLAY;
var bow;
var arrow;
var bowImage, arrowImage, green_balloonImage, red_balloonImage, pink_balloonImage, blue_balloonImage, backgroundImage;
var redB, pinkB, greenB, blueB, select_balloon;

var arrows;


function preload() {

  backgroundImage = loadImage("background0.png");

  arrowImage = loadImage("arrow0.png");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
}

function setup() {
  createCanvas(500, 500);

  //crie o fundo
  scene = createSprite(0, 0, 450, 450);
  scene.addImage(backgroundImage);
  scene.scale = 2.5;

  // criando arco para a flecha
  bow = createSprite(480, 220, 20, 50);
  bow.addImage(bowImage);
  bow.scale = 1;

  redB = new Group
  blueB = new Group
  greenB = new Group
  pinkB = new Group

  arrows = new Group();

  score = 0;
}

function draw() {
  background(0);
  //Adicione a condição de texto para exibir a pontuação.

  select_balloon = Math.round(random(1, 4));

  gameStateHandle();

  createBallon();

  gameStateHandle();

  distroyBow();

  distroyBallon();

  drawSprites();

  text("Pontuação: " + score, 400, 50);

  if (gameState === END) {
    textSize(20);
    text("Fim de Jogo precione F para reiniciar", 50, 250);
  }
}

function gameStateHandle() {
  if (gameState === PLAY) {
    // solo em movimento
    scene.velocityX = -3;

    if (scene.x < 0) {
      scene.x = scene.width / 2;
    }

    //arco em movimento
    bow.y = World.mouseY;

    // soltar flecha quando a tecla espaço for pressionada
    if (keyDown("z")) {
      createArrow();
    }
  } else if (gameState === END) {
    scene.velocityX = 0;
    text("Fim de Jogo precione F para reiniciar", 100, 250);
    if (keyDown("f"))
      reset()
  }
}

function createBallon() {
  if (World.frameCount % 100 == 0) {
    switch (select_balloon) {
      case 1: redBalloon();
        break;
      case 2: blueBalloon();
        break;
      case 3: pinkBalloon();
        break;
      case 4: greenBalloon();
        break;
      default: break;
    }
  }
}

function redBalloon() {
  var red = createSprite(0, Math.round(random(20, 370)), 10, 10);
  red.addImage(red_balloonImage);
  red.velocityX = +(3 + 3 * score / 20);
  red.lifetime = 200;
  red.scale = 0.1;
  redB.add(red);
}

function blueBalloon() {
  var blue = createSprite(0, Math.round(random(20, 370)), 10, 10);
  blue.addImage(blue_balloonImage);
  blue.velocityX =  +(3 + 3 * score / 20);;
  blue.lifetime = 200;
  blue.scale = 0.1;
  blueB.add(blue);
}

function greenBalloon() {
  var green = createSprite(0, Math.round(random(20, 370)), 10, 10);
  green.addImage(green_balloonImage);
  green.velocityX =  +(3 + 3 * score / 20);;
  green.lifetime = 200;
  green.scale = 0.1;
  greenB.add(green);
}

function pinkBalloon() {
  var pink = createSprite(0, Math.round(random(20, 370)), 10, 10);
  pink.addImage(pink_balloonImage);
  pink.velocityX =  +(3 + 3 * score / 20);;
  pink.lifetime = 200;
  pink.scale = 1;
  pinkB.add(pink);
}

function createArrow() {
  arrow = createSprite(480, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.x = 480;
  arrow.y = bow.y;
  arrow.velocityX = -4;
  arrow.lifetime = 100;
  arrow.scale = 0.3;
  arrows.add(arrow);
}

function distroyBallon() {
  if (redB.isTouching(arrows)) {
    redB.destroyEach();
    score = score + Math.round(frameCount / 60);
  } else if (blueB.isTouching(arrows)) {
    blueB.destroyEach();
    score = score + Math.round(frameCount / 60);
  } else if (greenB.isTouching(arrows)) {
    greenB.destroyEach();
    score = score + Math.round(frameCount / 60);
  } else if (pinkB.isTouching(arrows)) {
    pinkB.destroyEach();
    score = score + Math.round(frameCount / 60);
  }
}

function distroyBow() {
  if (redB.isTouching(bow)) {
    gameState = END;
  } else if (blueB.isTouching(bow)) {
    gameState = END
  } else if (greenB.isTouching(bow)) {
    gameState = END
  } else if (pinkB.isTouching(bow)) {
    gameState = END
  }
}
function reset() {
  gameState = PLAY

  score = 0

  redB.destroyEach()
  blueB.destroyEach()
  pinkB.destroyEach()
  greenB.destroyEach()

}
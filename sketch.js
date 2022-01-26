var PLAY = 1;
var END = 0;
var gameState = PLAY;
var stars = 0;
var score = 0;

var rocket, rocket_image;
var astroid_image, astroidG;
var star_image, starG;
var backgroundImg;


function preload(){
    backgroundImg = loadImage("baground.png");
    rocket_image = loadImage("rocket.png");
    astroid_image = loadImage("astroid.png");
    star_image = loadImage("star.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    backgroundImg.velocityX = -(6 + 3*score/100);

    rocket = createSprite(200,500,10,10);
    rocket.addImage(rocket_image);
    rocket.scale = 0.5;

    astroidG = new Group();
    starG = new Group();
}

function draw() {
    background(backgroundImg);

    console.log(rocket.x)
    textSize(20);
    fill("white")
    text("Stars: "+ stars,30,50);

    fill("white")
    text("Score: "+ score,30,80);

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        rocket.x = World.mouseX;

        createAstroid();
        createStar();

        if(rocket.isTouching(starG)){
            stars = stars + 1;
            starG.destroyEach();
        }
        else if(rocket.isTouching(astroidG)){
            astroidG.destroyEach();
            gameState = END;
        }
    }

    if(gameState===END){
        textSize(50);
        fill("white")
        text("Game Over",150,300);
    }


drawSprites();
}


function createAstroid() {
    if (World.frameCount % 100 == 0) {
    var astroid = createSprite(Math.round(random(windowWidth),40, 10, 10));
    astroid.addImage(astroid_image);
    astroid.scale=0.12;
    astroid.velocityY = 3;
    astroid.lifetime = 400;
    astroidG.add(astroid);
    }
  }

  function createStar() {
    if (World.frameCount % 150 == 0) {
    var star = createSprite(Math.round(random(windowWidth),40, 10, 10));
    star.addImage(star_image);
    star.velocityY = 3;
    star.scale = 0.12;
    star.lifetime = 400;
    starG.add(star);
    }
  }
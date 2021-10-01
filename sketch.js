var PLAY = 1;
var END = 0;
var gameState = PLAY;

var potato, potato_running, potato_collided, potato_jumping;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score=0;

var gameOver, restart;



function preload(){
  potato_running =   loadImage("potato.png");
  potato_collided = loadImage("potatoFries.png");
  potato_jumping = loadImage("potatojet.png");
  
  groundImage = loadImage("marble.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
}

function setup() {
    background("lightblue");
    createCanvas(windowWidth, windowHeight);

  potato = createSprite(50,height-70,20,50);
  
  
  potato.addAnimation("running", potato_running);
  potato.addAnimation("collided", potato_collided);
  potato.addAnimation("jumping", potato_jumping);
  potato.scale = 0.1;
  
  ground = createSprite(500,786,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(500,200);
  gameOver.addImage(gameOverImg);


  
  restart = createSprite(600,400);
  restart.addImage(restartImg);
 
  
  gameOver.scale = 0.25;
  restart.scale = 0.25;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(width/2,height-10,width,20);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
  
    if(touches.length>0 || keyDown("space") && potato.y >= height-140) {
      potato.velocityY = -10;
      touches = [];
      potato.changeAnimation("jumping",potato_jumping);
    }
  
    potato.velocityY = potato.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    potato.collide(invisibleGround);
    spawnObstacles();
  
    if(obstaclesGroup.isTouching(potato)){
        gameState = END;
        potato.changeImage(potato_collided);
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    ground.velocityX = 0;
    potato.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    potato.changeImage("collided",potato_collided);
    
 
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,600,10,40); 
  
    obstacle.velocityX = -(6 + 3*score/100);
    

    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      
    }
    
       
    obstacle.scale = 0.20;
    obstacle.lifetime = 300;
 
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  potato.changeAnimation("running",potato_running);
  
 
  
  score = 0;
  
}
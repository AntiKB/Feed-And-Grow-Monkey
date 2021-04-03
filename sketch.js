var PLAY = 1;
var END = 0;
var GameState = PLAY;

var Monkey , MonkeyRunning;

var Ground;

var Banana , BananaImage;
var Obstacle , ObstacleImage;

var BananaGroup , ObstacleGroup;

var Score;
function preload(){
  MonkeyRunning = loadAnimation("Monkey1.png","Monkey2.png","Monkey3.png","Monkey4.png","Monkey5.png","Monkey6.png","Monkey7.png","Monkey8.png","Monkey9.png");
  
  BananaImage = loadImage("Banana.png");
  ObstacleImage = loadImage("Obstacle.png");
}

function setup() { 
  createCanvas(600,600);
  
  Monkey = createSprite(100,150,50,50);
  Monkey.addAnimation("MonkeyDash",MonkeyRunning);
  Monkey.scale = 0.1;
  
  Ground = createSprite(300,600,600,40);
  Ground.x = Ground.width/2;
  
  BananaGroup = createGroup();
  ObstacleGroup = createGroup();
  
  Monkey.setCollider("rectangle",50,50);
  
  Score = 0;
}

function draw() {
  background(200);
  
  text("Growth: "+ Score,275,20);
  
  if(GameState == PLAY){
    Ground.velocityX = -(1 - Score/10);
    if(Ground.x < 300){
      Ground.x = Ground.width/2;
    }
    if(Monkey.isTouching(BananaGroup)){
      Score = Score + 1;
      BananaGroup[0].destroy();
    }
    if(keyDown("SPACE") && Monkey.y >= 540){
      Monkey.velocityY = -10;
    }
    Monkey.velocityY = Monkey.velocityY + 0.25;
    Monkey.collide(Ground);
    
    spawnObstacles();
    spawnBananas();
    
    if(Monkey.isTouching(ObstacleGroup)){
      GameState = END;
    }
  }
  if(GameState == END){
      Ground.velocity = 0;
      Monkey.velocity = 0;
      
      ObstacleGroup.setLifetimeEach(-1);
      BananaGroup.setLifetimeEach(-1);  
      
      ObstacleGroup.setVelocityXEach(0);
      BananaGroup.setVelocityXEach(0);
  }
  drawSprites();
}

function spawnObstacles(){
  if(frameCount % 80 == 0){
    var Obstacle = createSprite(750,560,20,20);
    Obstacle.velocityX = -(5 - Score/10);
    Obstacle.addImage(ObstacleImage);
    Obstacle.scale = 0.1;
    Obstacle.lifetime = 200;
    Obstacle.setCollider("circle",0,0,200);
    Obstacle.depth = Monkey.depth;
    ObstacleGroup.add(Obstacle);
  }
}

function spawnBananas(){
  if(frameCount % 80 == 0){
    var Banana = createSprite(750,400,20,20);
    Banana.addImage(BananaImage);
    Banana.scale = 0.1;
    Banana.velocityX = -(5 - Score/10);
    Banana.lifetime = 200;
    Banana.depth = Monkey.depth;
    BananaGroup.add(Banana);
  }
}
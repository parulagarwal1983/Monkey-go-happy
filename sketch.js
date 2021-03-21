
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,backgroundImage;
var foodGroup, obstaclesGroup
var score
var InvisiblegroundImage;
var survivalTime = 0;
var score = 0; 

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
 
  backgroundImage = loadImage("background.jpg");
  groundImage = loadImage("ground.jpg");
  
}



function setup() {
  
  createCanvas(600,500);
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
    
  monkey = createSprite(80,400,20,20);
  monkey.addAnimation("running monkey",monkey_running);
  monkey.scale = 0.1
  
  Invisibleground = createSprite(250,485,600,35);
  Invisibleground.addImage(groundImage);
  Invisibleground.velocityX = -6
  Invisibleground.visible = true;
  
  Invisibleground = createSprite(250,485,600,35);
  Invisibleground.addImage(groundImage);
  Invisibleground.velocityX = -6
}


function draw() {

  background(200);
  
  if(Invisibleground.x < 0){
    Invisibleground.x = Invisibleground.width/2
  }
  
  monkey.velocityY = monkey.velocityY + 1
  
  if(keyDown("space") && monkey.y > 150){
    monkey.velocityY = -10;
  }
  
  survivalTime = survivalTime + Math.round(getFrameRate()/40)
  
  console.log(getFrameRate());
  
  spawnbananas();
  
  spawnStones();
  
  monkey.collide(Invisibleground);
  
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score = score + 1;
  }
  
  if(monkey.isTouching(obstaclesGroup)){
    obstaclesGroup.destroyEach();
    score = 0;
    survivalTime = 0;
  }
  
  drawSprites();
  
  textSize(17)
  text("Survival Time : " +survivalTime,420,40)
  text("Eaten Bananas : " +score,420,80)
}

function spawnbananas(){
  
  if(frameCount % 80 === 0){
    banana = createSprite(Math.round(random(300,600)),Math.round(random(160,450)),10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1
    banana.velocityX = Invisibleground.velocityX
    banana.lifetime = 180
    
    foodGroup.add(banana);
 }
  }

function spawnStones(){
  
    if(frameCount % 200 === 0){
    stone = createSprite(600,450,10,10);
    stone.addImage(stoneImage);
    stone.scale = 0.1
    stone.velocityX = Invisibleground.velocityX
    stone.lifetime = 180
    
    obstaclesGroup.add(stone);
  }
}
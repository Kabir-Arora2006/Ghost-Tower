var tower, towerImage;
var door, doorImage, doorGroups;
var climber, climberImage, climberGroups;
var ghost, ghostImage;
var invisSprite, invisSpriteGroups; 
var GameState = "PLAY";
//var GameState = "END"
var GameplaySound;

function preload(){
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  ghostImage = loadImage("ghost-standing.png")
  GameplaySound = loadSound("spooky.wav")
  
}

function setup(){
  createCanvas(600, 700)
  //tower velocity 
  tower = createSprite(300,350,600,700);
  tower.addImage("tower",towerImage)
  tower.velocityY = 3;
  
  doorGroups = new Group();
  climberGroups = new Group();
  invisSpriteGroups = new Group();
  
  
  //ghost sprite and velocity
  ghost = createSprite(300,350);
  ghost.addImage("ghost",ghostImage);
  ghost.scale = 0.4
  
  GameplaySound.loop()
  
}

function draw(){
  background("black")
  
  if(tower.y > 600){
    tower.y = 350
  }
if (GameState === "PLAY"){
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3
  }
 if(keyDown("right_arrow")){
    ghost.x = ghost.x+3
  }
  if(keyDown("space")){
    ghost.velocityY = -3
}
  ghost.velocityY = ghost.velocityY + 0.2
  
  if(climberGroups.isTouching(ghost)){
    ghost.velocityY = 0
  }
  if(invisSpriteGroups.isTouching(ghost)||ghost.y > 700||ghost.y < 0){
    ghost.destroy();
    GameState = "END"
  }
  spawnDoor();
  drawSprites();  
}
  if(GameState === "END"){
    textSize(50)
    text("GAME OVER", 170,350)
    
  }
}
function spawnDoor(){
  if (frameCount % 150 === 0){
  door = createSprite(200,0)
  door.addImage("door",doorImage) 
  climber = createSprite(200,60)
  climber.addImage("climber",climberImage);
  invisSprite = createSprite(200,60);
  invisSprite.width = climber.width;
  invisSprite.height = 4
  door.x = Math.round(random(200,400))
    door.velocityY = 3
    climber.x = door.x
    climber.velocityY = 3
    invisSprite.x = door.x
    invisSprite.velocityY = 3
    ghost.depth = door.depth
    ghost.depth = ghost.depth+1
    door.lifetime = 700; 
    climber.lifetime = 700;
  doorGroups.add(door)
  climberGroups.add(climber)
  invisSpriteGroups.add(invisSprite)
    
  invisSprite.visible = false
} 
}
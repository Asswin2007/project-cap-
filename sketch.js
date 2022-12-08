 var path;
var player1,player2,player3;
 var pathImg,mainRacerImg1,mainRacerImg2;

var enemy1CG,enemy2CG,enemy3CG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;


var hero,heroImg;
var enemy1,enemyImg1;
var enemy2,enemyImgg;
var enemy3,enemyImggg;


function preload(){
   pathImg = loadImage("Road.png");
 
   cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");

  obstacleImage = loadImage("obstacle1.png");
  obstacleImage2 = loadImage("obstacle3.png");

  heroImg = loadImage("hero.png");
  enemyImg1 = loadImage("enemybike1.png");
  enemyImgg = loadImage("enemybike2.png");
  enemyImggg = loadImage("enemybike3.png");

}

function setup(){
  
createCanvas(1200,300);

path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;


hero  = createSprite(70,150);
hero.addImage(heroImg);
hero.scale=0.3;
  



hero.setCollider("rectangle",0,0,250,200,0);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
enemy1CG = new Group();
enemy2CG = new Group();
enemy3CG = new Group();
  


}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,1000,290);
  fill("red");
  text("do not touch bike ",200,30);
  fill("yellow")
  text("Gain  more point by reaching distance ",100,290)
  fill("cyan")
  text("it is a race",60,30);
  fill("#fc03c6");
  text("if you touch the bike,you will lose",500,30)
  fill("#03ff20")
   text("if you are lose ,you will restart",600,290);
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   hero.y = World.mouseY;
  
   edges= createEdgeSprites();
   hero .collide(edges);
  
  
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      enemy1();
    } else if (select_oppPlayer == 2) {
      enemy2();
    } else if (select_oppPlayer == 3) {
      enemy3();;
    }

    }
  
  }
  
   if(enemy1CG.isTouching(hero)){
     gameState = END;
     player1.velocityY = 0;
     
    }
    
    if(enemy2CG.isTouching(hero)){
      gameState = END;
      player2.velocityY = 0;
    }
    
    if(enemy3CG.isTouching(hero)){
      gameState = END;
      player3.velocityY = 0;
     
    }

  else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press 'r' to Restart the game!", 500,200);
  
    path.velocityX = 0;
    hero.velocityY = 0;
   
  
    enemy1CG.setVelocityXEach(0);
    enemy1CG.setLifetimeEach(-1);
  
    enemy2CG.setVelocityXEach(0);
    enemy2CG.setLifetimeEach(-1);
  
    enemy3CG.setVelocityXEach(0);
    enemy3CG.setLifetimeEach(-1);

     if(keyDown("r")) {
       reset();
     }
}
 }

function enemy1(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.4;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addImage(enemyImg1);
        player1.setLifetime=170;
        enemy1CG.add(player1);
}

function enemy2(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.4;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addImage(enemyImgg);
        player2.setLifetime=170;
        enemy2CG.add(player2);
}

function enemy3(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.4;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addImage(enemyImggg);
        player3.setLifetime=170;
        enemy3CG.add(player3);
        
       
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  
  enemy1CG.destroyEach();
  enemy2CG.destroyEach();
  enemy3CG.destroyEach();
  
  distance = 0;
 }

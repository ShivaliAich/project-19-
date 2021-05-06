var monkey , banana,rock,monkeyAnim ,groundAnim, ground ,PLAY=0, gamestate = PLAY,bananaIMG,obstacleIMG,obstacleGroup,score=0,bgImg,bg,foodGroup,END=1,collidedIMG,gameoverIMG,restartIMG, restart, gameover;

function preload() {
  monkeyAnim=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png");
  //groundAnim = loadAnimation("ground2.png");
  bananaIMG = loadImage("banana.png");
  obstacleIMG = loadImage("stone.png");
  bgImg = loadImage("jungle.jpg");
  collidedIMG = loadAnimation("collided.png");
  gameoverIMG = loadImage("Gameover.PNG");
  restartIMG = loadImage("restart.jpg");
}


function setup() {
  createCanvas(600, 400);
  bg = createSprite(300,200,600,400);
  bg.addAnimation("jungle",bgImg);
  bg.scale = 1.16;
  bg.setVelocity(-4,0);
  monkey = createSprite(100,330,20,20);
  monkey.addAnimation("running",monkeyAnim);
   monkey.addAnimation("stop",collidedIMG,);
  monkey.scale = 0.2;
  //monkey.debug = true;
  monkey.setCollider("circle",0,0,200);
  ground = createSprite(300,385,600,10);
  ground.setVelocity(-3,0);
  ground.visible = false;
  obstacleGroup = new Group();
  foodGroup = new Group();
  gameover = createSprite(400,70,50,50);
  gameover.addAnimation("gameover",gameoverIMG);
  gameover.scale = 0.2;
  gameover.visible = false;
}

function draw() {
  //edges = createEdgeSprites;
 // monkey.collide(edge(4))
  
  background("white");
  if(gamestate === PLAY){
    if(ground.x <0) 
      ground.x =ground.width/2;
    if(bg.x<0)
    bg.x = bg.width/2;   
  if(keyDown("space") && monkey.y>315){
    monkey.velocityY = -12;
  }
    monkey.velocityY = monkey.velocityY+(0.5);
  
    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach(); 
      score++;
    }
      switch (score){
        case 5 :
          monkey.scale = 0.3;
          break;
          case 10:
          monkey.scale = 0.4;
          break;
          case 15:
          monkey.scale = 0.5;
          break;
          case 20:
          monkey.scale = 0.6;
          break;
          default:
          monkey.scale = 0.2;
      
    }
  
    if(monkey.isTouching(obstacleGroup)){
      monkey.scale = 0.2;
      monkey.changeAnimation("stop",collidedIMG);
      gamestate = END;
    }
    food();
  obstacle();
  }
    
    if(gamestate === END){
      
      ground.velocityX = 0;
      monkey.velocityX = 0;
      monkey.velocityY = 0;
      bg.velocityX = 0;
      
      obstacleGroup.setVelocityXEach(0);
      obstacleGroup.setLifetimeEach(-1);
      foodGroup.setVelocityXEach(0);
      foodGroup.setLifetimeEach(-1);
      
      gameover.visible = true;
    
    }
  
  if(mousePressedOver(gameover)){
    reset();
  }
  monkey.collide(ground);
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("Score :"+score,500,50);
  
}
function food (){
  if(frameCount%50 ===0){
  banana= createSprite(random(550,300),random(200,300),10,10);
banana.addImage("banana",bananaIMG) ;
 banana.scale = 0.08; 
    banana.setVelocity(-5,0);
    foodGroup.add(banana);
    banana.lifetime= 120;
  }
}
function obstacle (){
  if(frameCount%80 ===0){
  rock= createSprite(random(550,300),355,10,10);
rock.addImage("banana",obstacleIMG) ;
 rock.scale = 0.2; 
    rock.setVelocity(-5,0);
   obstacleGroup.add(rock);
    rock.debug=false;
    rock.setCollider("circle",0,0,200);
    rock.lifetime= 120;
  }
}
function reset(){
  gamestate = PLAY;
  gameover.visible = false;
  //restart.visible = false;
  monkey.changeAnimation("running",monkeyAnim);
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  bg.setVelocity(-4,0);
  score = 0;
  monkey.velocityY = -12;
}
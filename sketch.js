
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var score=0
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload()
{
	 bi=loadImage("flappy bird.png")
	 coins=loadAnimation("Coin_1.png","Coin_2.png","Coin_3.png","Coin_4.png")
}

function setup() {
	createCanvas(1360, 620);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.

	bird=createSprite(200,500)
	bird.addImage(bi)
	bird.scale=0.2
	//bird.debug=true
	bird.setCollider("rectangle",0,0,10,30)
	
	tpgro=new Group ()
	bpgro=new Group()
	coingro=new Group()
	
	

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  background(0);
  if(gameState==PLAY){
  background.velocityX=-3
  

  if (bird.y > 600) {
	bird.y = 600;
	bird.velocityY = 0;
  }

  if (bird.y < 0) {
	bird.y = 0;
	bird.velocityY = 0;
  }
  if(keyDown("space")){
	bird.velocityY=-4
}
  bird.velocityY=bird.velocityY+0.2

  score = score + Math.round(getFrameRate()/60);

  spawnPipes()

  if(tpgro.isTouching(bird)||(bpgro.isTouching(bird))){
	  bird.destroy()
	  gameState=END
  }

  if(coingro.isTouching(bird))
  {
	  score=score+150
	  coingro.destroyEach()
  }

  if(score>1000){
	  tp.velocityX=-9;
	  bp.velocityX=-9
	  coins.velocityX=-10
	  background.velocityX=-11
  }
  textSize(70)
  fill (color(random(100,800)))
  text ("score: "+score,400,400)
  textSize(30)
  text("press space to jump and collect coins to increase your score",200,100)}

 else  if(gameState==END){
	 // background("white")
	  tp.velocityX=0;
	  bp.velocityX=0;
	  coin.velocityX=0;
	  textSize(50)
	  fill ("white")
	  text("YOUR SCORE: "+score,400,400)
	  textSize(50)
	  text ("press f5 to play again",330,300)
  }
  
  drawSprites();
 
}

function spawnPipes(){
	if(frameCount%100===0){
		tp=createSprite(1400,20,100,random (100,700))
		tp.velocityX=-6
		tp.shapeColor=color(random(200,500))
		
		tpgro.add(tp)

		bp=createSprite(1400,610,100,random(100,400))
		bp.velocityX=-6
		bp.shapeColor=color(random(200,500))
		bpgro.add(bp)
		
		coin=createSprite(1200,random(height))
		coin.addAnimation("coins",coins)
		coin.velocityX=-6
		coin.scale=0.2
		coingro.add(coin)

	}
}


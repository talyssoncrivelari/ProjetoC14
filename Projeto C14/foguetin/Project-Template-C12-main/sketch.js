let rocket;
let star1Img, star2Img, rocketImg, powerImg, asteroidImg;
let gameState = "serve";
let score = 0;
let asteroidsGroup, lasersX1Group, starsGroup, powersGroup;
let gun = "lvl1";
let lifes = 3;

function preload(){
  star1Img = loadImage("star01_2D0.png");
  star2Img = loadImage("star02_2D0.png");
  rocketImg = loadImage("rocket2D0.png");
  powerImg = loadImage("poder+.png");
  asteroidImg = loadImage("asteroide2D.png");
  //lifesImg = loadImage("Heart2D0.png");
}

function setup(){
  createCanvas(500, 300);
  edges = createEdgeSprites();
  rocket = createSprite(-40, 150, 20, 20);
  rocket.scale = 0.15;
  rocket.addImage(rocketImg);
  rocket.debug = true;
  asteroidsGroup = new Group();
  starsGroup = new Group();
  powersGroup = new Group();
  lasersX1Group = new Group();
  lasersX2Group = new Group();
  lasersX4Group = new Group();
  lasersX8Group = new Group();
}

function draw() {
  background(0);

  if(gameState == "serve"){
    frameCount = 0;
    textSize(20);
    fill("white");
    text("Click to play!",200, 250);
    textSize(15);
    fill("white");
    text("v0.3",465, 295);
    textSize(15)
    fill("white");
    text("press SPACE to shoot" , 180, 270);
    if(mouseIsPressed){
      gameState = "loginStage1";
    }
  }
  if(gameState == "loginStage1"){
    spawnSTARS1();
    spawnSTARS2();
    rocket.velocityX = + 3;
    if(rocket.x > 100){
      rocket.velocityX = 0;
      textSize(16.5);
      fill("white");
      text("Joseph Joestar :", 11, 265);
      textSize(17);
      fill("white");
      text('"OH NO! Uma chuva de meteoros está vindo em nossa direção!"', 11, 285);
    }
    textSize(30)
    fill("red");
    text("STAGE 1", 200, 150);
    if(frameCount == 200){
      gameState = "Stage1";
    }
  }
  if(gameState == "Stage1"){
    base();
    spawnASTEROIDS();
    fill("white");
    text(" " +score, 455, 290);
    rocket.bounceOff(edges);
    if(rocket.isTouching(asteroidsGroup)){
      //rocket.addImage(rocket_destroyed);
      lifes = lifes - 1;
      gameState = "end";
      if(lifes === 0){
        gameState = "gameOver";
      }
    }
    lasersX1Group.bounceOff(asteroidsGroup,destroyasteroid);
    lasersX2Group.bounceOff(asteroidsGroup,destroyasteroid);
    lasersX4Group.bounceOff(asteroidsGroup,destroyasteroid);
    lasersX8Group.bounceOff(asteroidsGroup,destroyasteroid);
    if(frameCount > 1000){
      gameState = "Stage1Clear";
    }
  }
  if(gameState == "Stage1Clear"){
    spawnSTARS1();
    spawnSTARS2();
    starsGroup.setVelocityXEach(-10);
    asteroidsGroup.setVelocityXEach(-10);
    textSize(20);
    fill("cyan");
    text("Parabéns, você passou pelo Stage 1!", 100, 150);
    rocket.velocityX = + 4;
    //if(rocket.y >= 150){
    //  rocket.velocityY = -3;
    //}
    //if(rocket.y <= 150){
    //  rocket.velocityY = +3;
    //}
    //if(rocket.y === 150){
    //  rocket.velocityY = 0;
    //  rocket.y = 150;
    //}
    if(rocket.x > 620){
      gameState = "EmBreve"
    }
  }
  if(gameState == "EmBreve"){
    textSize(20);
    fill("cyan");
    text("Obrigado por jogar!", 100, 150);
  }
  if(gameState == "end"){
    frameCount = 0;
    starsGroup.setVelocityXEach(0);
    powersGroup.setVelocityXEach(0);
    asteroidsGroup.setVelocityXEach(0);
    starsGroup.setLifetimeEach(-1);
    asteroidsGroup.setLifetimeEach(-1);
    lasersX1Group.setVelocityXEach(0);
    lasersX2Group.setVelocityXEach(0);
    lasersX4Group.setVelocityXEach(0);
    lasersX8Group.setVelocityXEach(0);
    textSize(30)
    fill("red");
    text("YOU BLEW UP!", 140, 150);
    textSize(15)
    fill("white");
    text("Score: " +score, 210, 200);
    textSize(20);
    fill("white");
    text("Press SPACE to play again!", 130, 250);
    if(keyDown("SPACE")){
     reset();
    }
  }
  if(gameState == "gameOver"){
    frameCount = 0;
    starsGroup.setVelocityXEach(0);
    powersGroup.setVelocityXEach(0);
    asteroidsGroup.setVelocityXEach(0);
    starsGroup.setLifetimeEach(-1);
    asteroidsGroup.setLifetimeEach(-1);
    lasersX1Group.setVelocityXEach(0);
    lasersX2Group.setVelocityXEach(0);
    lasersX4Group.setVelocityXEach(0);
    lasersX8Group.setVelocityXEach(0);
    textSize(30)
    fill("red");
    text("GAMER OVER", 140, 150);
    textSize(20);
    fill("white");
    text("Click to play again!", 159, 175);
    if(mouseIsPressed){
      resetGameOver();
    }
  }
  //textSize(15);
  //text(""+frameCount, 400, 290);
  drawSprites();
  //console.log(gameState)
}

function spawnSTARS1(){
  if(frameCount % 8 === 0){
    let star1 = createSprite(500, 150, 10, 10);
    star1.addImage(star1Img);
    star1.lifetime = 150;
    star1.velocityX = - 4;
    star1.y = Math.round(random(1, 299));
    star1.x = Math.round(random(1, 499));
    rocket.depth = star1.depth;
    rocket.depth += 1;
    starsGroup.add(star1);
  }
}

function spawnSTARS2(){
  if(frameCount % 8 === 0){
    let star2 = createSprite(500, 150, 10, 10);
    star2.addImage(star2Img);
    star2.scale = 5;
    star2.lifetime = 150;
    star2.velocityX = - 4;
    star2.y = Math.round(random(1, 299));
    star2.x = Math.round(random(1, 499));
    rocket.depth = star2.depth;
    rocket.depth += 1;
    starsGroup.add(star2);
  }
}

function spawnASTEROIDS(){
  if(frameCount % 14 === 0){
    let asteroid = createSprite(500, 150, 10, 10);
    asteroid.life = 3;
    asteroid.addImage(asteroidImg);
    asteroid.scale = (random(0.03, 0.1));
    asteroid.lifetime = 600/asteroid.velocityX;
    asteroid.rotation = Math.round(random(1, 360));
    asteroid.velocityX = Math.round(random(-1, -10));
    asteroid.y = Math.round(random(1,299));
    asteroid.x = 600;
    asteroid.debug = true;
    asteroid.setCollider("circle", 0, 0, 230);
    asteroidsGroup.add(asteroid);
  }
}

function spawnPOWERS(){
  if(frameCount % 500 === 0){
    let power1 = createSprite(500, 150, 10, 10);
    power1.addImage(powerImg);
    power1.scale = 0.08;
    power1.lifetime = 200;
    power1.velocityX = - 3;
    power1.y = Math.round(random(10, 289));
    power1.x = 600;
    power1.debug = true;
    powersGroup.add(power1);
  }
}

function laser1x(){
  let bala1 = createSprite(200, 200, 18, 3.5);
  bala1.shapeColor = "yellow";
  bala1.lifetime = 60;
  bala1.velocityX = + 10;
  bala1.x = rocket.x + 40;
  bala1.y = rocket.y;
  bala1.depth = rocket.depth;
  bala1.depth += 1;
  lasersX1Group.add(bala1);
}

function laser2x(){
  let bala2 = createSprite(200, 200, 18, 3.5);
  bala2.shapeColor = "yellow";
  bala2.lifetime = 60;
  bala2.velocityX = + 10;
  bala2.x = rocket.x + 19;
  bala2.y = rocket.y + 11;
  bala2.depth = rocket.depth;
  bala2.depth += 1;
  lasersX2Group.add(bala2);
  let bala3 = createSprite(200, 200, 18, 3.5);
  bala3.shapeColor = "yellow";
  bala3.lifetime = 60;
  bala3.velocityX = + 10;
  bala3.x = rocket.x + 19;
  bala3.y = rocket.y - 11;
  bala3.depth = rocket.depth;
  bala3.depth += 1;
  lasersX2Group.add(bala3);
}

function laser4x(){
  let bala4 = createSprite(200, 200, 18, 3.5);
  bala4.shapeColor = "yellow";
  bala4.lifetime = 60;
  bala4.velocityX = + 10;
  bala4.x = rocket.x + 19;
  bala4.y = rocket.y + 11;
  bala4.depth = rocket.depth;
  bala4.depth += 1;
  lasersX4Group.add(bala4);
  let bala5 = createSprite(200, 200, 18, 3.5);
  bala5.shapeColor = "yellow";
  bala5.lifetime = 60;
  bala5.velocityX = + 10;
  bala5.x = rocket.x + 19;
  bala5.y = rocket.y - 11;
  bala5.depth = rocket.depth;
  bala5.depth += 1;
  lasersX4Group.add(bala5);
  let bala6 = createSprite(200, 200, 18, 3.5);
  bala6.shapeColor = "yellow";
  bala6.lifetime = 60;
  bala6.velocityX = + 10;
  bala6.x = rocket.x + 19;
  bala6.y = rocket.y + 16;
  bala6.depth = rocket.depth;
  bala6.depth += 1;
  lasersX4Group.add(bala6);
  let bala7 = createSprite(200, 200, 18, 3.5);
  bala7.shapeColor = "yellow";
  bala7.lifetime = 60;
  bala7.velocityX = + 10;
  bala7.x = rocket.x + 19;
  bala7.y = rocket.y - 16;
  bala7.depth = rocket.depth;
  bala7.depth += 1;
  lasersX4Group.add(bala7);
}

function laser8x(){
  let bala8 = createSprite(200, 200, 18, 3.5);
  bala8.shapeColor = "cyan";
  bala8.lifetime = 60;
  bala8.velocityX = + 10;
  bala8.x = rocket.x + 19;
  bala8.y = rocket.y + 11;
  bala8.depth = rocket.depth;
  bala8.depth += 1;
  lasersX8Group.add(bala8);
  let bala9 = createSprite(200, 200, 18, 3.5);
  bala9.shapeColor = "cyan";
  bala9.lifetime = 60;
  bala9.velocityX = + 10;
  bala9.x = rocket.x + 19;
  bala9.y = rocket.y - 11;
  bala9.depth = rocket.depth;
  bala9.depth += 1;
  lasersX8Group.add(bala9);
  let bala10 = createSprite(200, 200, 18, 3.5);
  bala10.shapeColor = "cyan";
  bala10.lifetime = 60;
  bala10.velocityX = + 10;
  bala10.x = rocket.x + 19;
  bala10.y = rocket.y + 16;
  bala10.depth = rocket.depth;
  bala10.depth += 1;
  lasersX8Group.add(bala10);
  let bala11 = createSprite(200, 200, 18, 3.5);
  bala11.shapeColor = "cyan";
  bala11.lifetime = 60;
  bala11.velocityX = + 10;
  bala11.x = rocket.x + 19;
  bala11.y = rocket.y - 16;
  bala11.depth = rocket.depth;
  bala11.depth += 1;
  lasersX8Group.add(bala11);
}

function destroyasteroid(bala,asteroid){
  //if(asteroid.life == 0){
  asteroid.remove();
  bala.remove();
  score = score +5;
  //sound
}

function reset(){
  frameCount = 0;
  lasersX1Group.destroyEach();
  lasersX2Group.destroyEach();
  lasersX4Group.destroyEach();
  lasersX8Group.destroyEach();
  starsGroup.setVelocityXEach();
  asteroidsGroup.destroyEach();
  powersGroup.destroyEach();
  rocket.addImage(rocketImg);
  rocket.x = 50;
  rocket.y = 150;
  gameState = "Stage1";
  gun = "lvl1";
}

function resetGameOver(){
  frameCount = 0;
  lasersX1Group.destroyEach();
  lasersX2Group.destroyEach();
  lasersX4Group.destroyEach();
  lasersX8Group.destroyEach();
  starsGroup.destroyEach();
  asteroidsGroup.destroyEach();
  powersGroup.destroyEach();
  rocket.addImage(rocketImg);
  rocket.x = -40;
  rocket.y = 150;
  gameState = "loginStage1";
  gun = "lvl1";
  score = 0;
  lifes = 3;
}

function base(){
  spawnSTARS1();
  spawnSTARS2();
  spawnPOWERS();
  if(keyDown("W")){
    rocket.y = rocket.y - 5;
  }
  if(keyDown("S")){
    rocket.y = rocket.y + 5;
  }
  if(keyDown("A")){
    rocket.x = rocket.x - 5;
  }
  if(keyDown("D")){
    rocket.x = rocket.x + 5;
  }
  if(keyDown("UP")){
    rocket.y = rocket.y - 5;
  }
  if(keyDown("DOWN")){
    rocket.y = rocket.y + 5;
  }
  if(keyDown("LEFT")){
    rocket.x = rocket.x - 5;
  }
  if(keyDown("RIGHT")){
    rocket.x = rocket.x + 5;
  }
  if(lifes === 3){
    textSize(20);
    fill("lightgreen");
    text(" " +lifes, 20, 290);
    textSize(20);
    fill("lightgreen");
    text(" " +lifes, 20, 290);
  }
  if(lifes === 2){
    textSize(20);
    fill("yellow");
    text(" " +lifes, 20, 290);
    textSize(20);
    fill("yellow");
    text(" " +lifes, 20, 290);
  }
  if(lifes === 1){
    textSize(20);
    fill("red");
    text(" " +lifes, 20, 290);
    textSize(20);
    fill("red");
    text(" " +lifes, 20, 290);
  }
  if(rocket.isTouching(powersGroup)){
    powersGroup.destroyEach();
    if(gun == "lvl1"){
      gun = "lvl2";
      } else { gun = "lvl3" 
    } 
    //if(gun == "lvl3"){
    //  gun = "lvl4";
    //}
  }
  if(gun == "lvl1"){
    if(keyDown("SPACE")){
      laser1x();
    }
  }
  if(gun == "lvl2"){
    if(keyDown("SPACE")){
      laser2x();
    }
  }
  if(gun == "lvl3"){
    if(keyDown("SPACE")){
      laser4x();
    }
  }
  if(gun == "lvl4"){
    if(keyDown("SPACE")){
      laser8x();
    }
  }
}

//Jogo em atualização =D...

//Oi professora, tudo bem? Aqui, faltou uns pequenos detalhes mas estou mexendo ainda,
//Não fiz muita coisa mas, espero que tenha gostado! =D
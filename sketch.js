//declaring variables globally
var bg, bg_image;
var player ,player_img, shooting_img;
var edges;
var zombie, zombie_img;
var zombieGroup;
var heart1,heart2, heart3, heart_img1, heart_img2, heart_img3;

function preload(){
    //loading images
    bg_image = loadImage("assets/bg.jpeg");
    player_img = loadImage("assets/shooter_2.png");
    shooting_img = loadImage("assets/shooter_3.png");
    zombie_img = loadImage("assets/zombie.png");
    heart_img1 = loadImage("assets/heart_1.png");
    heart_img2 = loadImage("assets/heart_2.png");
    heart_img3 = loadImage("assets/heart_3.png");

}

function setup() {
    createCanvas(windowWidth, windowHeight);
    //adding backgroundimage
    bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
    bg.addImage(bg_image);
    bg.scale = 1.1;

    //creating player sprite
    player = createSprite(displayWidth-1150,displayHeight-300,50,50);
    player.addImage(player_img);
    player.scale = 0.3;
    player.debug = true;
    player.setCollider("rectangle",0,0,300,300);

    //creating new group
    zombieGroup = new Group();

    //creating hearts reprenting life
    heart1 = createSprite(displayWidth - 100,40,20,20);
    heart1.addImage("heart1",heart_img1);
    heart1.scale = 0.4;
    heart1.visible = false;

    heart2 = createSprite(displayWidth - 150,40,20,20);
    heart2.addImage("heart2",heart_img2);
    heart2.scale = 0.4;
    heart2.visible = false;

    heart3 = createSprite(displayWidth - 200,40,20,20);
    heart3.addImage("heart3",heart_img3);
    heart3.scale = 0.4;

}

function draw() {

    //to make the player move up and down with arrow keys
    if(keyDown("UP_ARROW") || touches.length>0){
        player.y = player.y-30;
    }
    if(keyDown("DOWN_ARROW") || touches.length>0){
        player.y = player.y+30;
    }
    // shooting when space key is pressed
    if(keyWentDown("space")){
        player.addImage(shooting_img);
    }
    if(keyWentUp("space")){
        player.addImage(player_img);
    }
    //destroying zombie if it touches player 
    if(zombieGroup.isTouching(player)){
       for(var i = 0; i<zombieGroup.length; i++){
         if(zombieGroup[i].isTouching(player)){
            zombieGroup[i].destroy();
         }  
       }   
    }

   // creating edges
    edges = createEdgeSprites();
    player.collide(edges);

    //calling function spawnZombies
    spawnZombies();

    drawSprites();
}

//declaring function spawnZombies
function spawnZombies(){
    if(frameCount % 50 ===0){
        zombie = createSprite(random(500,1100),random(100,500),40,40);
        zombie.addImage(zombie_img);
        zombie.scale = 0.15;
        zombie.velocityX = -3;
        zombie.lifetime = 400;
        zombie.debug = true;
        zombie.setCollider("rectangle",0,0,400,400);
        zombieGroup.add(zombie);
    }
}    
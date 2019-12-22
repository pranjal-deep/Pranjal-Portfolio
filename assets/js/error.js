var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var screenText = "404\nIt seems you've landed in the wrong place.";
var status = 'nuetral', screenPos = 'closed', scene_W = 2910, scene_H=2188;

//Storing the position of buttons
var buttonWidth = 260, buttonHeight=82, screenButton;
var astronautSprite, astronautWidth = 830, astronautHeight = 530;

//adjusting the buttons by referencing to the window size
var aboutX=0.20*winWidth, aboutY=projectY=0.825*winHeight, projectX=0.65*winWidth;

function preload() {
    bg = loadImage('assets/images/home/space-bg-1920.png');
    spaceship = loadImage('assets/images/home/spaceship.png');
    screenSprite = createSprite(winWidth/2,200,530,300);
    
    screenAnimation = loadAnimation('assets/images/home/small/screen-1.png','assets/images/home/small/screen-6.png');
}

function setup() {
    createCanvas(winWidth, winHeight);

    buttonDestroy = createButton('Destroy Earth');
    buttonDestroy.position(projectX, projectY);
    buttonDestroy.mousePressed(destroyClicked);
    buttonDestroy.id('largeButton');

    buttonBack = createButton('Go Back');
    buttonBack.position(aboutX, aboutY);
    buttonBack.mousePressed(backClicked);
    buttonBack.id('largeButton');

    astronautSprite = createSprite(winWidth/2,winHeight-astronautHeight/2+75,830,580);
    
    screenSprite.addAnimation('openScreen','assets/images/home/small/screen-0.png','assets/images/home/small/screen-1.png');

    astronautSprite.addAnimation('normal','assets/images/home/small/alien-3.png','assets/images/home/small/alien-4.png');
    astronautSprite.addAnimation('goingLeft','assets/images/home/small/alien-3.png','assets/images/home/small/alien-2.png');
    astronautSprite.addAnimation('onLeft','assets/images/home/small/alien-2.png','assets/images/home/small/alien-1.png');
    astronautSprite.addAnimation('goingRight','assets/images/home/small/alien-4.png','assets/images/home/small/alien-5.png');
    astronautSprite.addAnimation('onRight','assets/images/home/small/alien-5.png','assets/images/home/small/alien-6.png');
    astronautSprite.addAnimation('hideAstronaut','assets/images/home/blank-1.png','assets/images/home/blank-2.png');

}

function draw() {
    image(bg,-650,-600,scene_W,scene_H);
    image(spaceship,0,0,winWidth,winHeight+40);
    
    drawSprites();

    textFont('Russo One');
    fill(255,255,255);
    textSize(20);
    textLeading(30);
    textAlign(CENTER);
    text(screenText,winWidth/2-220,150,450); 

    if(mouseX>=projectX && status == 'nuetral') {
        astronautSprite.changeAnimation('goingRight');
        astronautSprite.changeAnimation('onRight');
        status = 'project';
    } else if(mouseX<=aboutX+buttonWidth && status == 'nuetral') {
        astronautSprite.changeAnimation('goingLeft');
        astronautSprite.changeAnimation('onLeft');
        status = 'about';
    } 
    if((status == 'project' || status == 'about') && mouseX >= aboutX+buttonWidth && mouseX <= projectX) {      
        astronautSprite.changeAnimation('normal');
        status = 'nuetral';
    }

}

function destroyClicked(){
    if(screenPos == 'closed'){
        screenPos = 'open';
        screenText = '\nHumans are already destroying earth.';
    } else {
        screenText = "404\nIt seems you've landed in the wrong place.";
        screenPos = 'closed';
    }
    
}

function backClicked(){
    window.location.href = "index.html";
}
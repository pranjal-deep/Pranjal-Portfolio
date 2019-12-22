var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var camStatus = false;
var screenText = "";
var status = 'nuetral', zoom = false, scene_W = 2910, scene_H=2188;

// var screenButton;
var astronautSprite, astronautWidth = 830, astronautHeight = 530;
var cursorX = winWidth/2, cursorY = winHeight/2;

//adjusting the About and Project buttons by referencing to the window size
var aboutX=0.20*winWidth, aboutY=projectY=0.825*winHeight, projectX=0.65*winWidth;
var buttonProject, buttonAbout, planets;
var planetImage = [];

function preload() {
    bg = loadImage('assets/images/home/space-bg.png');
    spaceship = loadImage('assets/images/home/spaceship.png');
    cursorSprite = createSprite(cursorX-10,cursorY-150,40,40);
    screenSprite = createSprite(winWidth/2,200,530,300);
    astronautSprite = createSprite(winWidth/2,winHeight-astronautHeight/2+75,830,530);
    spaceshipFrame = loadImage('assets/images/home/blank-1.png');
    planetsData = loadJSON('./assets/js/data.json');
    
    star = loadImage('assets/images/home/star.png');
    star2 = loadImage('assets/images/home/star-2.png');
    meteor = loadImage('assets/images/home/meteor.png');
}

function setup() {
    createCanvas(winWidth, winHeight);

    //adding all astronaut animations to the astronaut sprite
    astronautSprite.addAnimation('normal','assets/images/home/small/astronaut-2.png','assets/images/home/small/astronaut-3.png');
    astronautSprite.addAnimation('pressingProject','assets/images/home/small/astronaut-2.png','assets/images/home/small/astronaut-1.png');
    astronautSprite.addAnimation('onProject','assets/images/home/small/astronaut-0.png','assets/images/home/small/astronaut-1.png');
    astronautSprite.addAnimation('pressingAbout','assets/images/home/small/astronaut-3.png','assets/images/home/small/astronaut-4.png');
    astronautSprite.addAnimation('onAbout','assets/images/home/small/astronaut-4.png','assets/images/home/small/astronaut-5.png');
    astronautSprite.addAnimation('hideAstronaut','assets/images/home/blank-1.png','assets/images/home/blank-2.png');

    //adding animations to the screen
    screenSprite.addAnimation('closedScreen','assets/images/home/small/screen-6.png','assets/images/home/small/screen-7.png');
    screenSprite.addAnimation('openingScreen','assets/images/home/small/screen-6.png','assets/images/home/small/screen-1.png');
    screenSprite.addAnimation('closingScreen','assets/images/home/small/screen-1.png','assets/images/home/small/screen-6.png');
    screenSprite.addAnimation('openScreen','assets/images/home/small/screen-0.png','assets/images/home/small/screen-1.png');
    screenSprite.addAnimation('hide','assets/images/home/blank-1.png','assets/images/home/blank-2.png');

    cursorSprite.addAnimation('hideCursor','assets/images/home/blank-1.png','assets/images/home/blank-2.png');
    cursorSprite.addAnimation('showCursor','assets/images/home/cursor-1.png','assets/images/home/cursor-2.png')

    buttonProject = createButton('Projects');
    buttonProject.position(projectX, projectY);
    buttonProject.mousePressed(projectClicked);
    buttonProject.id('largeButton');

    buttonAbout = createButton('About');
    buttonAbout.position(aboutX, aboutY);
    buttonAbout.mousePressed(aboutClicked);
    buttonAbout.id('largeButton');

    // console.log(planetsData.positionX);

    //setting up background
    bg  = loadImage('assets/images/home/space-bg.png');
    
    for(let i =0 ; i<planetsData.planets.length;i++){
        planetImage[i] = loadImage(planetsData.planets[i].image);
        // image(planetImage, planetsData.planets[i].positionX, planetsData.planets[i].positionY);
    }
}

function draw() {
    image(bg,-650,-600,scene_W,scene_H);
    for(let i =0 ; i<planetsData.planets.length;i++){
        // planetImage = loadImage(planetsData.planets[i].image);
        image(planetImage[i], planetsData.planets[i].positionX, planetsData.planets[i].positionY);
    }
    image(spaceship,0,0,winWidth,winHeight+40);
    // createBG();
    drawSprites();

    textFont('Russo One');
    fill(255,255,255);
    textSize(20);
    textLeading(30);
    text(screenText,winWidth/2-220,100,450); 

    //animating the astronaut. If mouse is on left side, he inclinces on left and vice versa
    if(mouseX>=projectX && status == 'nuetral') {
        astronautSprite.changeAnimation('pressingProject');
        astronautSprite.changeAnimation('onProject');
        status = 'project';
    } else if(mouseX<=aboutX+220 && status == 'nuetral') {
        astronautSprite.changeAnimation('pressingAbout');
        astronautSprite.changeAnimation('onAbout');
        status = 'about';
    } 
    if((status == 'project' || status == 'about') && mouseX >= aboutX+220 && mouseX <= projectX) {      
        astronautSprite.changeAnimation('normal');
        status = 'nuetral';
    }

    //controling camera. Camera funtions happen only when project button is clicked.
    if(camStatus==true){
        cursorSprite.velocity.x = (camera.mouseX-cursorSprite.position.x)/100;
        cursorSprite.velocity.y = (camera.mouseY-cursorSprite.position.y)/100;
        camera.position.x = cursorSprite.position.x;
        camera.position.y = cursorSprite.position.y;
    }

    if(cursorSprite.position.x < 200)
        cursorSprite.position.x = 200;
    if(cursorSprite.position.y < -100)
        cursorSprite.position.y = -100;
    if(cursorSprite.position.x > scene_W-1400)
        cursorSprite.position.x = scene_W-1400;
    if(cursorSprite.position.y > scene_H-1200)
        cursorSprite.position.y = scene_H-1200;

    camera.off();
    image(spaceshipFrame,0,0,winWidth,winHeight);
    
}

// function getJoke(){
//     let url = "https://geek-jokes.sameerkumar.website/api";
//     httpGet(url,function joke(response){
//         screenText = response;
//     })
// }

var screenOpen = false, openProject = false;

function projectClicked(){
    if(zoom==true){
        camera.zoom = 1;
        zoom = false;
        camera.position.x = winWidth/2;
        camera.position.y = winHeight/2;
        // bg = loadImage('assets/images/home/space-bg-1920.png');
        cursorSprite.changeAnimation('hideCursor');
        screenSprite.changeAnimation('closedScreen');
        astronautSprite.changeAnimation('normal');
        status = 'nuetral';
        spaceship = loadImage('assets/images/home/spaceship.png');
        spaceshipFrame = loadImage('assets/images/home/blank-1.png');
        buttonAbout.position(aboutX,aboutY);
        buttonProject.position(projectX,projectY);
        camStatus = false;
        openProject = false;
        
    } else{
        // projectList();
        camera.zoom = 1.4;
        camera.position.x = cursorX;
        camera.position.y = cursorY-100;
        cursorSprite.changeAnimation('showCursor');
        screenSprite.changeAnimation('hide');
        astronautSprite.changeAnimation('hideAstronaut');
        status = 'none';
        spaceship = loadImage('assets/images/home/blank-1.png');
        spaceshipFrame = loadImage('assets/images/home/spaceshipFrame.png');
        buttonAbout.position(aboutX,aboutY+50);
        buttonProject.position(projectX,projectY+50);
        camStatus = true; 
        zoom = true;
        openProject = true;
        console.log(openProject);
    }
}

function aboutClicked(){  
    if(screenOpen==true){ 
        screenText = "";
        screenSprite.changeAnimation('closingScreen');
        screenSprite.changeAnimation('closedScreen');
        screenOpen = false;
    } else{
        screenSprite.changeAnimation('openingScreen');
        screenSprite.changeAnimation('openScreen');
        screenOpen = true;
        // getJoke();
        screenText = "Hello travellers!\nI'm a UX Designer with 3 yrs of industry experience. Currently, pursuing MFA in Design and Technology at the Parsons School of Design.";
    }
}

// function projectList(){
    
// }

function mousePressed(){ 
    if(openProject == true){
        openProject = false;
        // console.log("false");
    } else if(openProject == false && zoom==true) {
        for(let i=0; i<planetsData.planets.length;i++){
            if(mouseX>=planetsData.planets[i].positionX && mouseX<=planetsData.planets[i].positionX+planetsData.planets[i].width && mouseY>=planetsData.planets[i].positionY && mouseY<=planetsData.planets[i].positionY+planetsData.planets[i].height){
                window.location.href = planetsData.projects[i].targetUrl;
             }
        }
    }
}

function keyTyped() {
    if (key === 'x' || key === 'X') {
        window.location.href = "error.html";
    }
  }
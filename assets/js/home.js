var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var camStatus = false;
var screenText = "";
var status = 'nuetral', screenPos = 'closed', zoom = false, scene_W = 2910, scene_H=2188;

//Storing the position of About and Project buttons
var buttonWidth = 260, buttonHeight=82, screenButton;
var astronautSprite, astronautWidth = 830, astronautHeight = 530;

var cursorX = winWidth/2, cursorY = winHeight/2;

//adjusting the About and Project buttons by referencing to the window size
var aboutX=0.28*winWidth-buttonWidth/2, aboutY=0.875*winHeight-buttonHeight/2, projectX=0.73*winWidth-buttonWidth/2, projectY=0.875*winHeight-buttonHeight/2;

function preload() {
    bg = loadImage('assets/images/home/space-bg-1920.png');
    spaceship = loadImage('assets/images/home/spaceship.png');
    aboutButton = loadImage('assets/images/home/about-1.png');
    projectButton = loadImage('assets/images/home/project-1.png');
    // astronaut = loadImage('assets/images/home/astronaut-5.png');
    // screenCursor = loadImage('assets/images/home/cursor.png');
    // backgroundSprite = createSprite(winWidth,winHeight,0,0);

    //adding buttons animation
    aboutButtonAnimation = loadAnimation('assets/images/home/small/about-1.png','assets/images/home/small/about-7.png');
    projectButtonAnimation = loadAnimation('assets/images/home/small/project-1.png','assets/images/home/small/project-7.png');
    
    cursor = createSprite(cursorX-10,cursorY-150,40,40);
    screenSprite = createSprite(winWidth/2,200,530,300);
    astronautSprite = createSprite(winWidth/2,winHeight-astronautHeight/2+75,830,530);
    
    screenAnimation = loadAnimation('assets/images/home/small/screen-1.png','assets/images/home/small/screen-6.png');
    screenButton = loadImage('assets/images/home/screen-button.png');
    spaceshipFrame = loadImage('assets/images/home/blank-1.png');
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

    screenSprite.addAnimation('closedScreen','assets/images/home/small/screen-6.png','assets/images/home/small/screen-7.png');
    screenSprite.addAnimation('openingScreen','assets/images/home/small/screen-6.png','assets/images/home/small/screen-1.png');
    screenSprite.addAnimation('closingScreen','assets/images/home/small/screen-1.png','assets/images/home/small/screen-6.png');
    screenSprite.addAnimation('openScreen','assets/images/home/small/screen-0.png','assets/images/home/small/screen-1.png');
    screenSprite.addAnimation('hide','assets/images/home/blank-1.png','assets/images/home/blank-2.png');

    cursor.addAnimation('hideCursor','assets/images/home/blank-1.png','assets/images/home/blank-2.png');
    cursor.addAnimation('showCursor','assets/images/home/cursor-1.png','assets/images/home/cursor-2.png')
}

function draw() {
    image(bg,-650,-600,scene_W,scene_H);
    image(spaceship,0,0,winWidth,winHeight+40);
    image(aboutButton,aboutX,aboutY,buttonWidth,buttonHeight);
    image(projectButton,projectX,projectY,buttonWidth,buttonHeight);
    // image(screenCursor,cursorX-20,cursorY-200,40,40); 
    
    drawSprites();

    textFont('Russo One');
    fill(255,255,255);
    textSize(20);
    textLeading(30);
    text(screenText,winWidth/2-220,100,450); 

    // image(screenButton,winWidth/2-50,10,100,100);

    if(mouseX>=projectX && status == 'nuetral') {
        astronautSprite.changeAnimation('pressingProject');
        astronautSprite.changeAnimation('onProject');
        status = 'project';
    } else if(mouseX<=aboutX+buttonWidth && status == 'nuetral') {
        astronautSprite.changeAnimation('pressingAbout');
        astronautSprite.changeAnimation('onAbout');
        status = 'about';
    } 
    if((status == 'project' || status == 'about') && mouseX >= aboutX+buttonWidth && mouseX <= projectX) {      
        astronautSprite.changeAnimation('normal');
        status = 'nuetral';
    }

    //controling camera. Camera funtions happen only when project button is clicked.
    if(camStatus==true){
        cursor.velocity.x = (camera.mouseX-cursor.position.x)/40;
        cursor.velocity.y = (camera.mouseY-cursor.position.y)/40;
        camera.position.x = cursor.position.x;
        camera.position.y = cursor.position.y;
    }

    if(cursor.position.x < 200)
        cursor.position.x = 200;
    if(cursor.position.y < -100)
        cursor.position.y = -100;
    if(cursor.position.x > scene_W-1400)
        cursor.position.x = scene_W-1400;
    if(cursor.position.y > scene_H-1200)
        cursor.position.y = scene_H-1200;

    camera.off();
    image(spaceshipFrame,0,0,winWidth,winHeight);
    
}

function getJoke(){
    let url = "https://geek-jokes.sameerkumar.website/api";
    httpGet(url,function joke(response){
        screenText = response;
    })
}

function mouseClicked(){  
    if(zoom == false){
        if(screenPos == 'closed' && mouseX>winWidth/2-50 && mouseX<winWidth/2+50 && mouseY<120){
            // rect(winWidth/2-300,30,600,400);
            screenSprite.changeAnimation('openingScreen');
            screenSprite.changeAnimation('openScreen');
            screenPos = 'open';
        } else if(screenPos == 'open' && ((mouseX>winWidth/2-50 && mouseX<winWidth/2+50 && mouseY<120) || (mouseX>=aboutX && mouseX<=aboutX+buttonWidth && mouseY>=aboutY && mouseY<=aboutY+buttonHeight))){
            //executes on clicking about button. Closes the screen.
            screenText = "";
            screenSprite.changeAnimation('closingScreen');
            screenSprite.changeAnimation('closedScreen');
            screenPos = 'closed';
        } else if(mouseX>=projectX && mouseX<=projectX+buttonWidth && mouseY>=projectY && mouseY<=projectY+buttonHeight){
            //executes on clicking the project button. Zooms in the screen and shows projects in space
            camera.zoom = 1.4;
            zoom = true;
            camera.position.x = cursorX;
            camera.position.y = cursorY-100;
            cursor.changeAnimation('showCursor');
            screenSprite.changeAnimation('hide');
            astronautSprite.changeAnimation('hideAstronaut');
            status = 'none';

            spaceship = loadImage('assets/images/home/blank-1.png');
            spaceshipFrame = loadImage('assets/images/home/spaceshipFrame.png');
            aboutButton = loadImage('assets/images/home/blank-1.png');
            projectButton = loadImage('assets/images/home/blank-1.png');
            camStatus = true;
            // image(cursor,mouseX,mouseY,40,40);
            // image(screenCursor,cursorX-20,cursorY-200,40,40); 

        } else if(mouseX>=aboutX && mouseX<=aboutX+buttonWidth && mouseY>=aboutY && mouseY<=aboutY+buttonHeight){
            //executes on clicking about button. Opens the screen.
            screenSprite.changeAnimation('openingScreen');
            screenSprite.changeAnimation('openScreen');
            screenPos = 'open';
            getJoke();
        }
    }
    else{
        camera.zoom = 1;
        zoom = false;
        camera.position.x = winWidth/2;
        camera.position.y = winHeight/2;
        cursor.changeAnimation('hideCursor');
        screenSprite.changeAnimation('closedScreen');
        astronautSprite.changeAnimation('normal');
        status = 'nuetral';
        spaceship = loadImage('assets/images/home/spaceship.png');
        spaceshipFrame = loadImage('assets/images/home/blank-1.png');
        aboutButton = loadImage('assets/images/home/about-1.png');
        projectButton = loadImage('assets/images/home/project-1.png');
        camStatus = false;
    }
    
}

function keyTyped() {
    if (key === 'x' || key === 'X') {
        window.location.href = "error.html";
    }
  }
        
  
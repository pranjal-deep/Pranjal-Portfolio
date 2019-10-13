var winWidth = window.innerWidth;
var winHeight = window.innerHeight;
var status = 'nuetral';

//Storing the position of About and Project buttons
var buttonWidth = 260, buttonHeight=82;
var astronautSprite, astronautWidth = 830, astronautHeight = 530;

//adjusting the About and Project buttons at 20% of window space
var aboutX=0.2*winWidth-buttonWidth/2, aboutY=0.8*winHeight-buttonHeight/2, projectX=0.8*winWidth-buttonWidth/2, projectY=0.8*winHeight-buttonHeight/2;
console.log(winWidth);
console.log(winHeight);

function preload() {
    console.log("here again");
    bg = loadImage('assets/images/home/space-bg-1920.png');
    spaceship = loadImage('assets/images/home/spaceship.png');
    aboutButton = loadImage('assets/images/home/about-1.png');
    projectButton = loadImage('assets/images/home/project-1.png');
    astronaut = loadImage('assets/images/home/astronaut-5.png');

    aboutButtonAnimation = loadAnimation('assets/images/home/small/about-1.png','assets/images/home/small/about-7.png');
    projectButtonAnimation = loadAnimation('assets/images/home/small/project-1.png','assets/images/home/small/project-7.png');
    astronautAnimation = loadAnimation('assets/images/home/small/astronaut-5.png','assets/images/home/small/astronaut-9.png');
    astronautSprite = createSprite(winWidth/2,winHeight-astronautHeight/2+30,830,530);
}

function setup() {
    createCanvas(winWidth, winHeight);
    astronautSprite.addAnimation('normal','../assets/images/home/small/astronaut-5.png','../assets/images/home/small/astronaut-6.png');
    // astronautSprite.addAnimation('afterPressingProject','../assets/images/home/small/astronaut-1.png','../assets/images/home/small/astronaut-5.png');
    astronautSprite.addAnimation('pressingProject','../assets/images/home/small/astronaut-5.png','../assets/images/home/small/astronaut-1.png');
    astronautSprite.addAnimation('onProject','../assets/images/home/small/astronaut-0.png','../assets/images/home/small/astronaut-1.png');
    astronautSprite.addAnimation('pressingAbout','../assets/images/home/small/astronaut-11.png','../assets/images/home/small/astronaut-7.png');
    astronautSprite.addAnimation('onAbout','../assets/images/home/small/astronaut-7.png','../assets/images/home/small/astronaut-8.png');
}

function draw() {

    image(bg,0,0,winWidth,winHeight);
    image(spaceship,0,0,winWidth,winHeight+40);
    image(aboutButton,aboutX,aboutY,buttonWidth,buttonHeight);
    image(projectButton,projectX,projectY,buttonWidth,buttonHeight); 
    // console.log("This is mouseX "+mouseX);
    // console.log("This is winmouseX "+winMouseX);
    
    // animation(projectButton,100,100);

    // if(status == 'nuetral') {
    //     astronautSprite.animation.stop();
    // }
    drawSprites();

    if(mouseX>=projectX && status == 'nuetral') {
        astronautSprite.changeAnimation('pressingProject');
        // astronautSprite.animation.rewind();
        astronautSprite.changeAnimation('onProject');
        // astronautSprite.goToFrame(0);
        status = 'project';
    }

    if(mouseX<=aboutX+buttonWidth && status == 'nuetral') {
        astronautSprite.changeAnimation('pressingAbout');
        // astronautSprite.animation.rewind();
        astronautSprite.changeAnimation('onAbout');
        status = 'about';
        // astronautSprite.goToFrame(0);
    }

    if(status != 'nuetral' && mouseX >= aboutX+buttonWidth && mouseX <= projectX) {
        // console.log("here!");
        // console.log("Mouse X is "+mouseX+" which is in between " + aboutX+buttonWidth + " and "+ projectX);
        
        astronautSprite.changeAnimation('normal');
        status = 'nuetral';
    }

    // if(mouseX>=projectX && status == 'nuetral') {
    //     // astronautSprite.animation.play();
    //     astronautSprite.changeAnimation('pressingProject');
        
        // if(astronautSprite.getLastFrame()>0) {
        //     console.log(pressingProject.getFrame());
        //     // astronautSprite.animation.stop();
        // }
    //     status = 'project';
    // }

    // if(mouseX<=projectX && status == 'project') {
    //     astronautSprite.animation.play();
    //     astronautSprite.changeAnimation('afterPressingProject');
    //     status = 'nuetral';
    // }


    if(mouseX>=aboutX && mouseX<=aboutX+buttonWidth && mouseY>=aboutY && mouseY<=aboutY+buttonHeight) {
        aboutButtonPress();
    }
    if(mouseX>=projectX && mouseX<=projectX+buttonWidth && mouseY>=projectY && mouseY<=projectY+buttonHeight) {
        projectButtonPress();
    }


    
}

function aboutButtonPress() {
    //  if() {
        animation(aboutButtonAnimation,aboutX+buttonWidth/2,aboutY+buttonHeight/2);
        // console.log("Here"); 
    // }
}

function projectButtonPress() {
        animation(projectButtonAnimation,projectX+buttonWidth/2,projectY+buttonHeight/2);
        // delayTime(4);
        if(mouseIsPressed == true){
            window.location.href = "projects.html";
        }
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      aboutButtonPress();
    } else if (keyCode === RIGHT_ARROW) {
      projectButtonPress();
    }
  }

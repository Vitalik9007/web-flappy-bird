var cvs = document.getElementById('canvas');
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src ="img/flappy_bird_bird.png";
bg.src ="img/flappy_bird_bg.png";
fg.src ="img/flappy_bird_fg.png";
pipeBottom.src ="img/flappy_bird_pipeBottom.png";
pipeUp.src ="img/flappy_bird_pipeUp.png";

//sound
var flyAudio = new Audio();
var scoreAudio = new Audio();
flyAudio.src = "audio/fly.mp3";
scoreAudio.src = "audio/score.mp3";

//add block
var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}
// click
document.addEventListener("keydown", moveUp);
function moveUp() {
    yPos -= 30;
    flyAudio.play();
}
var score = 0;
// Position bird
var xPos = 10;
var yPos = 150;
var grav = 2;
var gap = 90;


function draw() {
    ctx.drawImage(bg, 0, 0); // drawImage(element,xPosition,yPosition);

    for(var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y+pipeUp.height + gap); //отсутп от верхнего

        pipe[i].x--; //move block left
        if(pipe[i].x == 100){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeUp.height-pipeUp.height) // add new block with random y position
            });
        }
        if(xPos+bird.width >= pipe[i].x
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y + pipeUp.height
            || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height){
            location.reload(); // if bird hit in block - reload page
        }
        
        if(pipe[i].x==5){
            score++;
            scoreAudio.play();
        }
    }

    ctx.drawImage(fg, 0, cvs.height -fg.height);
    ctx.drawImage(bird,xPos,yPos);
    yPos+=grav;

    ctx.fillStyle = "#D53D30";
    ctx.font="26px Verdana";
    ctx.fillText("Score: " + score,30,cvs.height*0.1);
    requestAnimationFrame(draw);
}
pipeBottom.onload = draw; // .onload - после того как загрузиться
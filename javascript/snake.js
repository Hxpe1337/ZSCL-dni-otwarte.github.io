window.onload=function() {
    canv=document.getElementById("gc");
    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    setInterval(game,1000/15);
}

// Initialize variables
px=py=10;
gs=tc=20;
ax=ay=15;
xv=yv=0;
trail=[];
tail = 5;
score = 0;
gamePaused = false;
let koniec = false;

function game() {
    
    // Pause the game if gamePaused is true
    if (gamePaused) {
        return;
    }
    // Move the snake
    px+=xv;
    py+=yv;
    if(px<0) {
        px= tc-1;
    }
    if(px>tc-1) {
        px= 0;
    }
    if(py<0) {
        py= tc-1;
    }
    if(py>tc-1) {
        py= 0;
    }
    // Draw the game board
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);
    // Draw the snake
    ctx.fillStyle="white";
    for(var i=0;i<trail.length;i++) {
        ctx.fillRect(trail[i].x*gs,trail[i].y*gs,gs-2,gs-2);
        // Check for collision with tail
        if(trail[i].x==px && trail[i].y==py) {
            gamePaused = false;
            px=py=10;
            gs=tc=20;
            ax=ay=15;
            xv=yv=0;
            trail=[];
            tail = 5;
            score = 0;
            ctx.fillStyle = "rgba(255, 255, 255, " + 0.7 + ")";
            ctx.font = "32px VT323";
            ctx.textAlign = "center";
            ctx.fillText("Aby zacząć porusz się WASD", canv.width / 2, canv.height / 2);
            document.getElementById("score").innerText = "" + score;
            koniec = true;
        }
    }
    // Add the snake's head to the trail
    trail.push({x:px,y:py});
    // Remove the oldest part of the trail if it's longer than the snake's tail
    while(trail.length>tail) {
        trail.shift();
    }
    // Draw the food
    if(ax==px && ay==py) {
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tc);
        score++;
        document.getElementById("score").innerText = "" + score;
    }
    ctx.fillStyle="red";
    ctx.fillRect(ax*gs,ay*gs,gs-2,gs-2);


}

function keyPush(evt) {
    switch(evt.keyCode) {
        case 65:
            xv=-1;yv=0;
            break;
        case 87:

            xv=0;yv=-1;
            break;
        case 68:

            xv=1;yv=0;
            break;
        case 83:

            xv=0;yv=1;
            break;
    }
}

function pauseGame() {
    var pauseButton = document.getElementById("pauseButton");

    if(gamePaused == false && koniec == false){
        ctx.fillStyle = "rgba(255, 255, 255, " + 0.7 + ")";
        ctx.font = "48px VT323";
        ctx.textAlign = "center";
        ctx.fillText("Gra Zapauzowana", canv.width / 2, canv.height / 2);
        pauseButton.innerText = "Wznów";
        gamePaused = true;
        
    } else {
        pauseButton.innerText = "Pauza";
        gamePaused = false;
    }
}


function restartGame() {

    if (gamePaused==true) {
        gamePaused = false;
    }
    px=py=10;
    gs=tc=20;
    ax=ay=15;
    xv=yv=0;
    trail=[];
    tail = 5;
    score = 0;
    document.getElementById("score").innerText = "" + score;
}

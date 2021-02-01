
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');


// load images
var bird = new Image();
bird.src = 'img/bird.png';

var bg = new Image();
bg.src = 'img/bg.png';

var fg = new Image();
fg.src = 'img/fg.png';

var pipeNorth = new Image();
pipeNorth.src = 'img/pipeNorth.png';

var pipeSouth = new Image();
pipeSouth.src = 'img/pipeSouth.png';

// load audio file
var fly = new Audio();
fly.src = 'audio/fly.mp3';

var scorre = new Audio();
scorre.src = 'audio/score.mp3';

// some variable
gap = 95;
var constant = pipeNorth.height+gap;

var birdX = 10;
var birdY = 150;

var gravity = 1.5;

var score = 0;

// on key down
document.addEventListener('keydown', moveUp);
function moveUp () {
	birdY -= 40;
	fly.play();
}

// pipe coordinates
var pipe = [];
pipe[0] = {
	x : canvas.width,
	y : 0
}

function draw(){
	context.drawImage(bg, 0, 0);

	for (var i = 0; i < pipe.length; i++){

	context.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
	context.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);
	pipe[i].x--;
	if (pipe[i].x == 125){
		pipe.push({
			x :canvas.width,
			y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
		})
	}
	// detect collision
	if (birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + pipeNorth.width && (birdY <= pipe[i].y + pipeNorth.height || birdY+bird.height >= pipe[i].y+constant) || birdY+bird.height >= canvas.height - fg.height){
		location.reload();// reload the page
	}
	if(pipe[i].x == 5){
		score ++;
		scorre.play();
	}
	}
	context.drawImage(fg, 0, canvas.height - fg.height);
	context.drawImage(bird, birdX, birdY);

	//bird always fall
	birdY += gravity;
	requestAnimationFrame(draw);

	// score
	context.fillStyle = '#000';
	context.font = '20px Verdana';
	context.fillText('score: '+score, 10, canvas.height-20);

}
draw();
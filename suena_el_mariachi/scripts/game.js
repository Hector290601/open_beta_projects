var puntuacion = 0;
let valor = 10;
var songing = true;
var start = 0;
var end;
var x = 0;
var y = 0;
var len = 100;
var len2 = 100;
let mariachi;
let fondo;
let score = 0;
let max = 250;
let sound;

function preload() {
	mariachi = loadImage('../img/icon.png');
	fondo = loadImage('../img/bg.jpg');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function change_position(){
	start = millis();
	x = random(0, windowWidth - len);
	y = random(0, windowHeight - len2 - 20);
}

function draw() {
	imageMode(CORNER);
	background(fondo);
	imageMode(CENTER);
	image(mariachi, x, y, len, len);
	if(songing){
		change_position();
		songing = false;
	}
	fill(0, 0, 0);
	rect(0, 0, windowWidth, 20)
	pgbar();
	textSize(32);
	text(puntuacion, 50, 50);
}

function pgbar(){
	score = ( puntuacion / max);
	score_ln = windowWidth * score;
	fill(0, 255, 0);
	rect(0, 5, score_ln, 10);
}

function mouseClicked() {
	var tolx1 = x + len / 2;
	var tolx2 = x - len / 2;
	var toly1 = y + len2 / 2;
	var toly2 = y - len2 / 2;
	if(mouseX < tolx1 && mouseX > tolx2 && mouseY < toly1 && mouseY > toly2){
		end = millis();
		var delta = end - start;
		if(delta <= 500){
			puntuacion += valor * 2;
		}else if(delta <= 1000){
			puntuacion += valor;
		}else if(delta <= 1500){
			puntuacion += valor * 0.5;
		}else if(delta > 1500){
			puntuacion += valor * 0.1;
		}
		songing = true;  
	}
	return false;
}

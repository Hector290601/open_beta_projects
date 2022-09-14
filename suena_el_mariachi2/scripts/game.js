var puntuacion = 0;
let valor = 10;
var start = 0;
var end;
var x = 0;
var y = 0;
var len = 100;
var len2 = 100;
var flag = true;
let mariachi;
let guitarrista;
let fondo;
let score = 0;
let max = 250;
let song1;
let song2;
var song;
var img;

var i = 0;

function preload() {
	mariachi = loadImage('./img/icon.png');
	guitarrista = loadImage("./img/cantando.png");
	fondo = loadImage('./img/bg.jpg');
	img = mariachi;
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	frameRate(10);
	change_position();
}

function change_position(){
	x = random(0, windowWidth - len);
	y = random(0, windowHeight - len2 - 20);
	i = 0;
	flag = !flag;
}

function draw() {
	imageMode(CORNER);
	background(fondo);
	imageMode(CENTER);
	image(img, x, y, len, len);
	if(flag){
		change_position();
	}
	fill(0, 0, 0);
	rect(0, 0, windowWidth, 20)
	pgbar();
	textSize(32);
	text(puntuacion, 50, 50);
	text(i, 50, 150);
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
		flag = !flag;
		x = -100;
		y = -100;
		if(img == mariachi){
			img = guitarrista;
		}else{
			img = mariachi;
		}
		if(i <= 5){
			puntuacion += valor * 2;
		}else if(i <= 10){
			puntuacion += valor;
		}else if(i <= 15){
			puntuacion += valor * 0.5;
		}else if(i > 15){
			puntuacion += valor * 0.1;
		}
	}
	return false;
}

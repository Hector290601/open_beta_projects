var puntuacion = 0;
let valor = 10;
var start = 0;
var end;
var x = 0;
var y = 0;
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
var divider = 5;
var i = 0;
var len = 100;
var len2 = 100;

function preload() {
	mariachi = loadImage('./img/icon.png');
	guitarrista = loadImage("./img/cantando.png");
	fondo = loadImage('./img/bg.jpg');
	song1 = loadSound('./sounds/sound_1.wav');
	song2 = loadSound('./sounds/sound_2.wav');
	song = song1;
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
}

function draw() {
	len = windowWidth/divider;
	len2 = windowHeight/divider;
	imageMode(CORNER);
	image(fondo,  - fondo.width/4, 0, fondo.width, windowHeight);
	imageMode(CENTER);
	image(img, x, y, len, len2);
	if(song1.isPlaying() || song2.isPlaying()){
		i = 0;
		flag = true;
	}else{
		i += 1;
		if(flag){
			change_position();
			flag = false;
		}
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
		len = windowWidth/divider;
		len2 = windowHeight/divider;
		divider += divider / 2;
		x = -100;
		y = -100;
		if(song.isPlaying()){
		}else{
			song.play();
		}
		if(song == song1){
			song = song2;
			img = guitarrista;
		}else{
			song = song1;
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

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}

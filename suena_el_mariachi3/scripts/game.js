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
var j = 0;
var max1 = 0;

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
	fft = new p5.FFT();
	song.amp(0.2);
}

function change_position(){
	x = random(0, windowWidth - len);
	y = random(0, windowHeight - len2 - 20);
	ratio = img.width / img.height;
	ratio2 = img.height / img.width;
	len = (windowWidth/divider) * ratio;
	len2 = (windowHeight/divider) * ratio2;
	i = 0;
}


function counter(value, i, spectrum){
	if(value > max1){
		max1 = value;
	}
	if(value > 185){
		j += 1;
	}
}

function draw() {
	len = windowWidth/divider;
	len2 = windowHeight/divider;
	imageMode(CORNER);
	imageMode(CENTER);
	image(fondo, windowWidth / 2, windowHeight / 2);
	image(img, x, y, len, len2);
	let spectrum = fft.analyze();
	spectrum.forEach(counter);
	if(j >= 1){
		flag = true
		song.pause();
	}else{
		flag = false;
	}
	j = 0;
	spectrum = [];
	if(song1.isPlaying() || song2.isPlaying()){
		i = 0;
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
		ratio = img.width / img.height
		len2 = windowHeight/divider;
		len = len * ratio;
		divider += 1;
		x = - img.widht * 2;
		y = - img.heigth * 2;
		if(song.isPlaying()){
		}else{
			song.play();
		}
		if(song == song1 && puntuacion > 100){
			divider = 1;
			song = song2;
			img = guitarrista;
		}else{
			if(puntuacion>100){
				divider = 1;
			}
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

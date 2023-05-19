
let lifeBar = document.querySelector('.life')
let myScore = document.getElementById('myScore')
var myOption = 0
var feelingBrave = true
var score       
var otherOptions
var imgSRC = "img/usa_";
let statusDoor = false;
let life
let timer
var $para = document.querySelectorAll("[value^=usa]");
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const startButton = document.getElementById('startButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let soundlength = 0
let soundfile
var ambientsound
let ambientSong = './sound/KG3CLEB-scary-8000H-128k-S.mp3'
let soundVolume = 0.25
let playerlevel = 0
let gameStatus = 0


class usa{
	constructor(id, statusDoor){
		this.id=id;
		this.statusDoor=statusDoor;
	}

	getId(){
		return this.id;
	}
	
	getstatusDoor(){
		return this.statusDoor;
	}

	setstatusDoor(newstatusDoor){
		this.statusDoor  = newstatusDoor;
	}


}

function myAlert(){
	alert("etc etc ...") ;
}

// window.onload=function (){
// 	document.getElementById(myAudio).play()
	
// }
// startGame()
// startButton.addEventListener('click', startButtonFunction)
restartButton.addEventListener('click', startButtonFunction)
// window.addEventListener('onload', startGame)
// Window.onload(startGame())

if (gameStatus==0){

	game('start')
}

function startButtonFunction(){
	if (gameStatus==0){
		gameStatus=1
		bgSound(true)
		startGame()
	}else{
		startButton.innerHTML="Start"
		bgSound(false)
	}
}

function bgSound(status){
	if (status){
		ambientsound = new Audio(ambientSong);
		ambientsound.volume=soundVolume;
		ambientsound.loop=true;
		ambientsound.play()
	}else{
		ambientsound.pause()
	}
	
}


function getDoorId() {

	if(statusDoor == false){
		let doorId = this.id;
		openDoor(doorId)	
	}	
}

function openDoor(doorId) {

	let currentDoor = document.getElementById(doorId)
	let imgName = ""
	
	imgName = setDoor(randomDoor(1, 4));
	
	var soundopendoor = new Audio(soundfile);
	soundopendoor.volume = soundVolume
	soundopendoor.play();
	
	statusDoor=true;
	timer=setTimeout(closeDoor, soundlength, doorId);
	currentDoor.src = imgSRC + imgName + ".png";
	
	myScore.innerHTML=score
	
}

function closeDoor(doorId) {
	let currentDoor = document.getElementById(doorId)
	// console.log(currentDoor)

	soundlength=500
	soundfile = './sound/mixkit-cabinet-door-closing-192-(500).wav'

	var soundopendoor = new Audio(soundfile);
	soundopendoor.volume = soundVolume
	soundopendoor.play();

	currentDoor.src = imgSRC + "inchisa.png";
	clearTimeout(timer);
	statusDoor = false
}


function randomDoor(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function setDoor(rv){

	switch(rv){
		case 1:
			score+=1
			soundlength=800
			soundfile = './sound/mixkit-creaky-door-open-195.wav'
			playerlevel += 1
			return "deschisa"
		break

		case 2:
			score += 5
			soundlength=900
			soundfile = './sound/mixkit-creaking-door-open-199.wav'
			playerlevel += 1
			return "vanator"
		break
		
		case 3:
			score -=3
			soundlength=800
			soundfile = './sound/mixkit-wooden-floorboard-creak-337.wav';
			if (score>0) {
				playerlevel += 1
			}
			return "bisnitar"
		break
			
			default:
				life-=10;
				lifeBar.style.width = life+"%";
				soundlength=1500
				soundfile = './sound/Creaking_door_opening_Sound_Effect-1500.mp3';
			if (life<=0) {
				timer=setTimeout(game('end'), 1200);
				ambientsound.pause();
			}
		return "fantoma";
										
	}
}

function startGame() {

	for(var i=0; i<$para.length; i++){
		// $para[i].removeEventListener('click', getDoorId);
		$para[i].addEventListener('click', getDoorId);  
		// console.log($para[i])
	}	
	winningMessageElement.classList.remove('show')
	score=0
	life=100
	document.body.requestFullscreen();
	myScore.innerHTML=score;
	lifeBar.style.width=life + "%"

}

function game(cmd) {
	if (cmd=='end'){
		let msg="Game Over!";
		if (score>=0){
			msg += "</br>Ai acumulat " + score + " puncte."
		}else{
		msg += "</br>Ai o datorie " + score + " puncte"
		}

		msg += "</br> si ai reusit sa treci de " + playerlevel +" usi!"
		msg += "</br><p> Din nou?</p>"
		winningMessageTextElement.innerHTML = msg
		winningMessageElement.classList.add('show')

		endgamesound = new Audio('./sound/mixkit-retro-game-over-1947.wav');
		endgamesound.volume = soundVolume
		endgamesound.play()

		for(var i=0; i<$para.length; i++){
			$para[i].removeEventListener('click', getDoorId);
			// $para[i].addEventListener('click', getDoorId);  
			// console.log($para[i])
		}
		gameStatus=0
	}else{
		// winningMessageTextElement.innerHTML = ""
		// winningMessageElement.classList.add('show')

	}
}


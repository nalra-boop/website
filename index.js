import { animate, utils, createTimeline, engine } from './animejs/dist/bundles/anime.esm.js';




// initialisation 
let audio = document.getElementById("a");
// le poussin
animate('.img1', {
		translateX: ['0em', -25],
		duration: 10,
		});
animate('.img3,.img4, .img6', {
		translateX: ['0em', -25],
		duration: 10,
		opacity:0,
		});

// la pancarte sam
animate('.img2, .img5', {
		translateX: ['0em', 1],
		duration: 10,
		opacity: 0,
		});


document.addEventListener("keydown", function(event) {
	console.log(`Key released: ${event.key}`);
	if (event.key == "Enter") {
		but();
	}
});

const repUti = document.getElementById("repUtilisateur");
const repAff = document.getElementById("repElt");
const butV = document.getElementById("butV");
const img_but_zoom = document.getElementById("image_zoom");
const question = document.getElementById("question");
const [ $container ] = utils.$('.container');
let rep ="";
let Etat="debut";
let samQ;
function but(){
	
	rep = repUti.value;
	samQ = rep.toLowerCase() == "sam";
	if (samQ && Etat != "etape1-1" && Etat != "gameover" ) {
		repAff.textContent = "Bien joué ! Mais presque";
		sound("correct");
		animation2();
		Etat="etape1-1";

	} 
	//// les sous étapes de la loupe
	else if (Etat == "etape1-1" && rep.toLowerCase() == "sam, le plus grand") {
		Etat="etape1-2";
		sound("correct");
		const currentTimeline = createTimeline()
		.add('.img5' ,{duration: 10,opacity:1})
		.add('.loupe2, .loupe3, .loupe4, .loupe5, .loupe1' ,{duration: 10,opacity:0});
	} else if (Etat == "etape1-2" && rep.toLowerCase() == "sam, le plus grand, le plus beau") {
		Etat="etape1-3";
		sound("correct");
		const currentTimeline = createTimeline()
		.add('.img5' ,{duration: 10,opacity:1})
		.add('.loupe2, .loupe3, .loupe4, .loupe5, .loupe1' ,{duration: 10,opacity:0});
	} else if (Etat == "etape1-3" && rep.toLowerCase() == "sam, le plus grand, le plus beau, le plus fort") {
		Etat="etape1-4";
		sound("correct");
		const currentTimeline = createTimeline()
		.add('.img5' ,{duration: 10,opacity:1})
		.add('.loupe2, .loupe3, .loupe4, .loupe5, .loupe1' ,{duration: 10,opacity:0});
	} else if (Etat == "etape1-4" && rep.toLowerCase() == "sam, le plus grand, le plus beau, le plus fort, le plus mieux") {
		Etat="etape1-5";
		sound("correct");
		const currentTimeline = createTimeline()
		.add('.img5' ,{duration: 10,opacity:1})
		.add('.loupe2, .loupe3, .loupe4, .loupe5, .loupe1' ,{duration: 10,opacity:0});
		
	} else if ((Etat == "etape1-5" && rep.toLowerCase() == "sam, le plus grand, le plus beau, le plus fort, le plus mieux, le dieu suprême")) { // || rep.toLowerCase() == "skip"
		Etat="etape5";
		sound("correct");
		const currentTimeline = createTimeline()
		.add('.loupe2, .loupe3, .loupe4, .loupe5, .loupe1, .img5, .img6' ,{duration: 10,opacity:0})
		.add('.autel', {duration: 0, opacity:1})
		.add('.menace' ,{duration: 0,opacity:1});
		sound("reload");

	} else if (Etat == "etape1-1" || Etat == "etape1-2" || Etat == "etape1-3" || Etat == "etape1-4" ||Etat == "etape1-5") {
		const currentTimeline = createTimeline()
		.add('.img5' ,{duration: 10,opacity:1})
		.add('.loupe2, .loupe3, .loupe4, .loupe5, .loupe1' ,{duration: 10,opacity:0});
		Etat="etape1-1";
		sound("wrong");
	} else if (Etat =="etape5" && rep.toLowerCase() == "oui") { // fin reussite de la vénération
		// étincelle de partout avec les animations 
		const currentTimeline = createTimeline()
		.add('.menace' ,{duration: 10,opacity:0})
		// marque de partout merci mtn tu m'appartiens ou une blague dans se gout 
		document.body.background = "image/liam.png";
		question.textContent = "Désormais tu m'appartiens va te maquiller tout de suite !";
		repAff.textContent = "Désormais tu m'appartiens va te maquiller tout de suite !";
		butV.textContent = "Désormais tu m'appartiens va te maquiller tout de suite !";
		sound("coupe_du_monde");
	} else if (Etat =="etape5" && rep.toLowerCase() == "non") { // fin prison
		// may be pluie avec animation 
		sound("shoot");
		const currentTimeline = createTimeline()
		.add('.menace, .autel' ,{duration: 10,opacity:0});

		document.body.background = "image/prison.png";
		// image de prison a la place de l'hotel et game over de partout
		question.textContent = "Game Over 🐑🐑🐑🐑🐑";
		repAff.textContent = "Game Over 🐑🐑🐑🐑🐑";
		butV.textContent = "Game Over 🐑🐑🐑🐑🐑";

	} else if (!samQ && Etat != "gameover" && Etat != "etape2" && Etat != "etape3" && Etat != "etape4" && Etat != "etape5" ) {
		sound("wrong");
		repAff.textContent = "C'est faux loser gros caca boudin !";
		animation1();
		Etat="etape2";

	} else if (!samQ && Etat == "etape2"){
		animate('.img2', {
		duration: 1000,
		rotateX: 360,
		rotateY: 360,
		rotateZ: 360,
		loop: true,
  		alternate: true,
		});
		sound("wrong");
		Etat="etape3";

	} else if (!samQ && Etat == "etape3"){
		animate('.img3' ,{duration: 10,opacity:1})
		animate('.img6, .img1, .img4' ,{duration: 10,opacity:0})
		sound("reload");
		Etat="etape4";
	} else if (!samQ && Etat == "etape4"){
		Etat="gameover";
		sound("shoot");
		repAff.textContent = "Game Over";
		repAff.style.fontSize = "120%"
		const currentTimeline = createTimeline()
		.add('.img1, .img2, .img3, .img4, .img5, .img6' ,{duration: 10,opacity:0});
	}
	repUti.value="";
}
/////////////////////////////////////// Partie Sound Effect

function sound(src){
	audio.src ="audio/"+ src+".mp3";
	audio.volume = 1;
	audio.play();
}
////////////////////////////////////// Partie bouton zoom

function zoom() {
	console.log("ici le zoom");
	if (Etat=="etape1-1") {
		const currentTimeline = createTimeline()
		.add('.loupe1' ,{duration: 10,opacity:1})
		.add('.loupe2, .loupe3, loupe4, .loupe5, .img5' ,{duration: 10,opacity:0});
	} else if (Etat=="etape1-2") {
		const currentTimeline = createTimeline()
		.add('.loupe2' ,{duration: 10,opacity:1})
		.add('.loupe1, .loupe3, loupe4, .loupe5, .img5' ,{duration: 10,opacity:0});
	} else if (Etat=="etape1-3") {
		const currentTimeline = createTimeline()
		.add('.loupe3' ,{duration: 10,opacity:1})
		.add('.loupe1, .loupe2, loupe4, .loupe5, .img5' ,{duration: 10,opacity:0});
	} else if (Etat=="etape1-4") {
		const currentTimeline = createTimeline()
		.add('.loupe4' ,{duration: 10,opacity:1})
		.add('.loupe1, .loupe3, loupe2, .loupe5, .img5' ,{duration: 10,opacity:0});
	} else if (Etat=="etape1-5") {
		const currentTimeline = createTimeline()
		.add('.loupe5' ,{duration: 10,opacity:1})
		.add('.loupe1, .loupe3, loupe4, .loupe2, .img5' ,{duration: 10,opacity:0});
	}
}

////////////////////////////////////// Partie animation grande
function animation1() {

	const currentTimeline = createTimeline()
	//marche 
	.add('.img1' ,{duration: 10,opacity:1})
	.add('.img3, .img4, .img6' ,{duration: 10,opacity:0})

	//cache les sams
	.add('.img2, .img5' ,{duration: 10,opacity:0})

	// le poussin se deplace a droite 
	.add('.img1,.img4, .img3, .img6, .menace', {
		translateX: ['0em',25],
		duration: 2000
	})
	
	// changement de sprite
	.add('.img4' ,{duration: 10,opacity:1})
	.add('.img3, .img1, .img6' ,{duration: 10,opacity:0})

	// le poussin se retourne
	.add('.img1, .img3, .img4, .img6, .menace', {
		rotateY: 180,
		duration: 500,
	})
	
	// la pancarte se pose 2
	.add('.img2', {
		opacity: { from: 0 ,to : 1},
		scale: {from: 0},
		duration: 1000,
	})
	// le poussin se retorune
	.add('.img1, .img3, .img4, .img6, .menace', {
		rotateY: 0,
		duration: 500,
	})
}

function animation2() {
	
	const currentTimeline = createTimeline()
	//marche 
	.add('.img1' ,{duration: 10,opacity:1})
	.add('.img3, .img4, .img6' ,{duration: 10,opacity:0})

	//cache les sams
	.add('.img2, .img5' ,{duration: 10,opacity:0})

	// le poussin se deplace a droite 
	.add('.img1,.img4, .img3, .img6, .menace', {
		translateX: ['0em',25],
		duration: 2000
	})
	
	// changement de sprite
	.add('.img4' ,{duration: 10,opacity:1})
	.add('.img3, .img1, .img6' ,{duration: 10,opacity:0})
	
	// le poussin se retourne
	.add('.img1, .img3, .img4, .img6, .menace', {
		rotateY: 180,
		duration: 500,
	})

	// la pancarte se pose 5
	.add('.img5', {
		opacity: { from: 0 ,to : 1},
		scale: {from: 0},
		duration: 1000,
	})
	// le poussin se retorune
	.add('.img1, .img3, .img4, .img6, .menace', {
		rotateY: 0,
		duration: 500,
	})

	// mets le monocle
	.add('.img6' ,{duration: 10,	opacity:1})
	.add('.img3, .img4, .img1' ,{duration: 10,opacity:0});
}


butV.onclick = function() {but()};
img_but_zoom.onclick = function() {zoom()};
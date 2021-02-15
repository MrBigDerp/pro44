var  maze1, maze2, maze3, maze4, maze5, maze6, maze7, maze8, maze9 , maze10, maze11,maze12,maze13,maze14,maze15,maze16,maze17,maze18,maze19
,maze20,maze21,maze22,maze23,maze24,maze25,maze26,maze27,maze28,maze29,maze30,maze31,maze32,maze33,maze34,maze35,maze36,maze37,maze38,maze39,maze40
,maze41,maze42,maze43,maze44,maze45,maze46,maze47,maze48,maze49,maze50,maze51,maze52,maze53,maze54;

var pac1, pac2, pacs = []

var dots_img

var score=0;

var dots = []

var mazes = []

var canvas, backgroundImage;
var carsAtEnd
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;


 function preload()
{
     maze = loadImage("images/pac-man.jpg");
     pac1_img = loadImage("images/pacman.png")
     pac2_img = loadImage("images/pinkpacman.png")
     ghost1_img = loadImage("images/redghost.png")
     ghost2_img = loadImage("images/yellowghost.png")
     ghost3_img = loadImage("images/pinkghost.png")
     ghost4_img = loadImage("images/blueghost.png")
     dots_img = loadImage("images/dots.png")
 } 
//  function setup() 
//  { 
//    createCanvas(650, 720);


//    }
function setup(){
  canvas = createCanvas(650,720);

 database = firebase.database();
 game = new Game();
 game.getState();
  game.start();
}


function draw(){

  background(0);
    if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}


// function preload(){
//   track = loadImage("../images/track.jpg");
//   car1_img = loadImage("../images/car1.png");
//   car2_img = loadImage("../images/car2.png");
//   car3_img = loadImage("../images/car3.png");
//   car4_img = loadImage("../images/car4.png");
//   ground = loadImage("../images/ground.png");
// }


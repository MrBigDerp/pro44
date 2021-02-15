class Game {
  constructor() {

  }

  getState() {
    var gameStateRef = database.ref('gameState');
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    })

  }

  update(state) {
    database.ref('/').update({
      gameState: state
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    this.createMaze();
    this.createDots();
    pac1 = createSprite(570, 625);
    pac1.addImage("pac1", pac1_img);
    pac2 = createSprite(75, 625);
    pac2.addImage("pac2", pac2_img);

    pacs = [pac1, pac2];
  }


  play() {
    player.getCarsAtEnd()
    form.hide();

    Player.getPlayerInfo();

    for (var i = 0; i < mazes.length; i++) {
      pac1.bounceOff(mazes[i])
      pac2.bounceOff(mazes[i])
    }

    if (allPlayers !== undefined) {
      background(0)
      imageMode(CENTER)
      image(maze, width / 2, height / 2, width, height)
      text(mouseX + ',' + mouseY, mouseX, mouseY);

      //var display_position = 100;

      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175;
      var y;

      for (var plr in allPlayers) {
        //add 1 to the index for every loop
        index = index + 1;

        //position the cars a little away from each other in x direction
        // x = x + 200;
        //use data form the database to display the cars in y direction
        if (index !== player.index) {

          pacs[index - 1].x = allPlayers[plr].x;
          pacs[index - 1].y = allPlayers[plr].y;
        }
        // console.log(index, player.index)


        if (index === player.index) {
          stroke(10);
          fill("red");
          // ellipse(x,y,60,60);
        }

        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if (player.index === 1) {
      for(var i = 0; i<dots.length ; i++){
        if(pac1.isTouching(dots[i])){
          dots[i].destroy()
          score = score+10
        }

      }
    }
    if (player.index === 2) {
      for(var i = 0; i<dots.length ; i++){
        if(pac2.isTouching(dots[i])){
          dots[i].destroy()
          score = score+10
        }

      }
    }
    if (player.index === 1) {
      if (keyIsDown(UP_ARROW) && player.index !== null) {
        pac1.y -= 10
        //  player.y =pac1.y
        player.updateposition(pac1.x, pac1.y);
      }
      if (keyIsDown(LEFT_ARROW) && player.index !== null) {

        pac1.x -= 10
        //player.x=pac1.x
        player.updateposition(pac1.x, pac1.y);
      }
      if (keyIsDown(DOWN_ARROW) && player.index !== null) {
        pac1.y += 10
        //player.y =pac1.y

        player.updateposition(pac1.x, pac1.y);
      }
      if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
        pac1.x += 10
        //player.x=pac1.x

        player.updateposition(pac1.x, pac1.y);
      }
    } else if (player.index === 2) {
      if (keyIsDown(UP_ARROW) && player.index !== null) {
        pac2.y -= 10
        //player.y =pac2.y
        player.updateposition(pac2.x, pac2.y);
      }
      if (keyIsDown(LEFT_ARROW) && player.index !== null) {

        pac2.x -= 10
        //player.x=pac2.x
        player.updateposition(pac2.x, pac2.y);
      }
      if (keyIsDown(DOWN_ARROW) && player.index !== null) {
        pac2.y += 10
        //player.y =pac2.y

        player.updateposition(pac2.x, pac2.y);
      }
      if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
        pac2.x += 10
        //player.x=pac2.x

        player.updateposition(pac2.x, pac2.y);
      }
    }

    if (player.distance > 3860) {
      gameState = 2;
      carsAtEnd++;
      player.rank = carsAtEnd
      Player.updateCarsAtEnd(player.rank);
      player.update()
    }

    drawSprites();
  }

  end() {
    console.log("Game Ended");
    console.log(player.rank)
    console.log(allPlayers)
  }
  createDots() {
    for (var i = 70; i < 585; i = i + 50) {
      var dot = createSprite(i, 135, 10, 10)
      dot.addImage(dots_img)
      dots.push(dot)
      var dot = createSprite(i, 55, 10, 10)
      dots.push(dot)
      var dot = createSprite(i, 200, 10, 10)
      dots.push(dot)
      var dot = createSprite(i, 625, 10, 10)
      dots.push(dot)
      var dot = createSprite(i, 565, 10, 10)
      dots.push(dot)
      var dot = createSprite(i, 505, 10, 10)
      dots.push(dot)
      var dot = createSprite(i, 444, 10, 10)
      dots.push(dot)
      var dot = createSprite(i, 320, 10, 10)
      dots.push(dot)
    }
    for (var i = 170; i < 475; i += 50) {
      var dot = createSprite(i, 385, 10, 10)
      dots.push(dot)
      var dot = createSprite(i, 260, 10, 10)
      dots.push(dot)
    }
    var dot = createSprite(70, 95, 10, 10)
    dots.push(dot)
    var dot = createSprite(170, 95, 10, 10)
    dots.push(dot)
    var dot = createSprite(290, 95, 10, 10)
    dots.push(dot)
    var dot = createSprite(350, 95, 10, 10)
    dots.push(dot)
    var dot = createSprite(470, 95, 10, 10)
    dots.push(dot)
    var dot = createSprite(570, 95, 10, 10)
    dots.push(dot)

    dots[41].visible = false
    dots[42].visible = false
    dots[47].visible = false
    dots[44].visible = false
    dots[46].visible = false
    dots[55].visible = false
    dots[39].visible = false
    dots[77].visible = false
    dots[13].visible = false


    for (var i = 0; i < dots.length; i++) {
      console.log(dots[i].x + "," + dots[i].y + "," + i)
    }
  }
  createMaze() {
    maze1 = createSprite(325, 30, 585, 10);
    maze2 = createSprite(325, 650, 585, 10);
    maze3 = createSprite(610, 532, 10, 245);
    maze4 = createSprite(37, 532, 10, 245);
    maze5 = createSprite(610, 130, 10, 200);
    maze6 = createSprite(37, 130, 10, 200);
    maze7 = createSprite(92, 225, 115, 10);
    maze8 = createSprite(557, 225, 115, 10);
    maze9 = createSprite(557, 295, 115, 10);
    maze10 = createSprite(92, 295, 115, 10);
    maze11 = createSprite(92, 415, 115, 10);
    maze12 = createSprite(92, 345, 115, 10);
    maze13 = createSprite(557, 415, 115, 10);
    maze14 = createSprite(557, 345, 115, 10);
    maze15 = createSprite(505, 382, 10, 75);
    maze16 = createSprite(143, 382, 10, 75);
    maze17 = createSprite(505, 257, 10, 75);
    maze18 = createSprite(143, 257, 10, 75);
    maze19 = createSprite(447, 230, 20, 140);
    maze20 = createSprite(198, 230, 20, 140);
    maze21 = createSprite(323, 167, 143, 17);
    maze22 = createSprite(323, 410, 143, 17);
    maze23 = createSprite(323, 533, 143, 17);
    maze24 = createSprite(57, 532, 50, 17);
    maze25 = createSprite(588, 532, 47, 17);
    maze26 = createSprite(417, 473, 80, 20);
    maze27 = createSprite(230, 473, 80, 20);
    maze28 = createSprite(447, 380, 20, 78);
    maze29 = createSprite(198, 380, 20, 78);
    maze30 = createSprite(323, 440, 20, 80);
    maze31 = createSprite(323, 567, 20, 77);
    maze32 = createSprite(323, 200, 20, 77);
    maze33 = createSprite(198, 562, 20, 77);
    maze34 = createSprite(448, 562, 20, 77);
    maze35 = createSprite(415, 230, 77, 20);
    maze36 = createSprite(230, 230, 77, 20);
    maze37 = createSprite(470, 595, 185, 20);
    maze38 = createSprite(177, 595, 185, 20);
    maze39 = createSprite(115, 96, 60, 42);
    maze40 = createSprite(531, 96, 60, 42);
    maze41 = createSprite(417, 96, 80, 40);
    maze42 = createSprite(230, 96, 80, 40);
    maze43 = createSprite(115, 170, 60, 20);
    maze44 = createSprite(530, 170, 60, 20);
    maze45 = createSprite(325, 75, 20, 80);
    maze46 = createSprite(530, 473, 60, 20);
    maze47 = createSprite(115, 473, 60, 20);
    maze48 = createSprite(510, 505, 20, 77);
    maze49 = createSprite(135, 505, 20, 77);
    maze50 = createSprite(372, 285, 45, 10);
    maze51 = createSprite(390, 323, 10, 82);
    maze52 = createSprite(272, 285, 45, 10);
    maze53 = createSprite(255, 323, 10, 82);
    maze54 = createSprite(322, 358, 145, 10)


    mazes = [maze1, maze2, maze3, maze4, maze5, maze6, maze7, maze8, maze9, maze10, maze11, maze12, maze13, maze14, maze15, maze16, maze17, maze18, maze19
      , maze20, maze21, maze22, maze23, maze24, maze25, maze26, maze27, maze28, maze29, maze30, maze31, maze32, maze33, maze34, maze35, maze36, maze37, maze38, maze39, maze40
      , maze41, maze42, maze43, maze44, maze45, maze46, maze47, maze48, maze49, maze50, maze51, maze52, maze53, maze54]
    for (var i = 0; i < 54; i++) {
      mazes[i].visible = true
    }

  }
}

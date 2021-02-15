class Player {
  constructor(){
    this.index = null;
    this.x = 0;
    this.y = 0;
    this.name = null;
    this.rank = 0;
  }
  updateposition(x,y){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        x:x,
        y:y,
      });
  }
  static updateCarsAtEnd(rank){
    database.ref('/').update({
      carsAtEnd:rank
      
    })
  }
  getCarsAtEnd(){
    database.ref('carsAtEnd').on('value',(data)=>{
      carsAtEnd = data.val()
    })
  }
  getCount(){
    var playerCountRef = database.ref('playerCount');
    playerCountRef.on("value",(data)=>{
      playerCount = data.val();
    })
  }

  updateCount(count){
    database.ref('/').update({
      playerCount: count
    });
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).set({
      name:this.name,
      x:this.x,
      y:this.y,
      rank:this.rank
    });
  }

  static getPlayerInfo(){
    var playerInfoRef = database.ref('players');
    playerInfoRef.on("value",(data)=>{
      allPlayers = data.val();
    })
  }
}

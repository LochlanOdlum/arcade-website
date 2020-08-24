export const GameStatus = {
  preGame: Symbol("preGame"),
  inGame: Symbol("inGame"),
  draw: Symbol("draw"),
  won: Symbol("won")
};

export default class Game {
  // Shared properties among all game types
  players;
  winner = null;
  status = GameStatus.preGame;
  currentPlayer;

  constructor(players = []) {
    this.players = players;
    this.currentPlayer = players[0];

    const startingPlayer = [players[0], players[1]].find(
      p => p.value === "x"
    );
    this.setCurrentPlayer(startingPlayer);

  }


  leave = player => {
    if (player === this.currentPlayer) {
      this.goToNextPlayer();
    }

    const indexOfPlayer = this.players.indexOf(player);
    this.players.splice(indexOfPlayer, 1);

    if (this.players.length === 1) {
      this.setWinner(this.players[0]);
    }
  };

  setWinner = player => {
    this.winner = player;
  };

  setCurrentPlayer = player => {
    this.currentPlayer = player;
  };

  goToNextPlayer = () => {
    const currentPlayerIndex = this.players.indexOf(this.currentPlayer);
    const nextPlayerIndex = (currentPlayerIndex + 1) % this.players.length;
    this.setCurrentPlayer(this.players[nextPlayerIndex]);
  };
}

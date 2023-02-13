
export default class GamePlay {

    constructor (p1, p2, p1_team, p2_team) {
        this.player1 = p1;
        this.player2 = p2;
        this.player1_team = p1_team;
        this.player2_team = p2_team;
        this.game = false;
        this.turn = "red";
        this.board = []
    }

    gameStart(board) {
       this.game = true; 
       this.board = board;
       
    }
    gameOver() {
        this.game = false;
    }

    changeTurn () {
        if (this.turn === "red") {
            this.turn = "blue";
        } else {
            this.turn = "red";
        }
    }

    getTurn () {
        return this.turn;
    }

}
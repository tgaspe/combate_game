export default class Rules {

    constructor() {
        this.moves = 0;
        this.turn = 0;
    }

    turns () {
        
        if (this.moves >= 1 ) {
            console.log("your turn is over");
            this.moves = 0;
            this.moves ++;
            //this.turn = false;
            return 0;
        } else {
            return 1;
        }

        
    }

    isValidMove (px, py, x, y, rank) {

        console.log("\nreferee is checking move:");

        //Prevent bombs from moving
        if (rank === 11) {
            console.log("Bombs do not move!")
            return false;
        }

        if (px === 0) {
            if (py === 0) {        // up left corner
                //light tile 01 and 10
                if (x === 0 && y === 1) {
                    return true;
                } else if (x === 1 && y === 0) {
                    return true;
                } else {
                    return false;
                }

            } else if (py === 9) { //down left corner
                //light tile 08 and 19
                if (x === 0 && y === 9) {
                    return true;
                } else if (x === 1 && y === 9) {
                    return true;
                } else {
                    return false;
                }
                
            } else {
                //light up down right
                if (x === px && y === py + 1) {       //Down
                    return true;
                } else if (x === px && y === py - 1) {//Up
                    return true;
                } else if (x === px + 1 && y === py) {//Right
                    return true;
                } else {
                    return false;
                }
                
            }
        } else if (px === 9) { 
            if (py === 0) {        //up right corner
                //light tile 91 and 80
                if (x === 9 && y === 1) {
                    return true;
                } else if (x === 8 && y === 0) {
                    return true;
                } else {
                    return false;
                }
            } else if (py === 9) { //down right corner
                //light tile 98 and 89
                if (x === 9 && y === 8) {
                    return true;
                } else if (x === 8 && y === 9) {
                    return true;
                } else {
                    return false;
                }
            } else {
                //light up down left
                if (x === px && y === py + 1) {       //Down
                    return true;
                } else if (x === px && y === py - 1) {//up
                    return true;
                } else if (x === px - 1 && y === py) {//Left
                    return true;
                } else {
                    return false;
                }
            }
        } else if (py === 0) { 
            //light down left right
            if (x === px && y === py + 1) {//Down
                return true;
            } else if (x === px + 1 && y === py) {//Right
                return true;
            } else if (x === px - 1 && y === py) {//Left
                return true;
            } else {
                return false;
            }
            
        } else if (py === 9) { 
            //light up left right
            if (x === px && y === py - 1) {       //Up
                return true;
            } else if (x === px + 1 && y === py) {//Right
                return true;
            } else if (x === px - 1 && y === py) {//Left
                return true;
            } else {
                return false;
            }
            
        } else {
            //light all 4 directions
            if (x === px && y === py + 1) {       //Up
                return true;
            } else if (x === px && y === py - 1) {//Down
                return true;
            } else if (x === px + 1 && y === py) {//Right
                return true;
            } else if (x === px - 1 && y === py) {//Left
                return true;
            } else {
                return false;
            }
        }
 
        //if (lake piece on x, y) return false;
    }

    attack (rank, rank_adv) {

        if (rank === rank_adv) {
            console.log("tie both die");
            return 0;
        } else if (rank > rank_adv) {
            console.log("you win!");
            if (rank_adv === 0) {
                console.log("you won the GAME!");
            }
            return 1;
        } else {
            if (rank === 3 && rank_adv === 11) {
                console.log("Bomb disarmed!");
                return 1;
            }
            console.log("you die!");
            return -1;
        }

    }
}
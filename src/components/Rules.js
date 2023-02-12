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


    /*
    ligthTiles(x, y, team) {
        
        let tile_u, tile_d, tile_l, tile_r = null;

        if (x === 0) {
            if (y === 0) {        // up left corner
                //light tile 01 and 10 
                tile_d = document.getElementById("id01");
                tile_d.lastElementChild.id.slice(0,3) == team ? tile_d.style.backgroundColor = "red" : tile_d.style.backgroundColor = '#1fd137';
                tile_r = document.getElementById("id10");
                tile_r.lastElementChild.id.slice(0,3) == team ? tile_r.style.backgroundColor = "red" : tile_r.style.backgroundColor = '#1fd137';
                
            } else if (y === 9) { //down left corner
                //light tile 08 and 19
                tile_u = document.getElementById("id08");
                tile_u.lastElementChild.id.slice(0,3) == team ? tile_u.style.backgroundColor = "red" : tile_u.style.backgroundColor = '#1fd137';
                tile_r = document.getElementById("id19");
                tile_r.lastElementChild.id.slice(0,3) == team ? tile_r.style.backgroundColor = "red" : tile_r.style.backgroundColor = '#1fd137';
            } else {
                //light up down right
                console.log("ligth up down right");
                tile_u = document.getElementById("id"+ x + (y-1));
                tile_u.lastElementChild.id.slice(0,3) == team ? tile_u.style.backgroundColor = "red" : tile_u.style.backgroundColor = '#1fd137';
                tile_d = document.getElementById("id"+ x +(y+1));
                tile_d.lastElementChild.id.slice(0,3) == team ? tile_d.style.backgroundColor = "red" : tile_d.style.backgroundColor = '#1fd137';
                tile_r = document.getElementById("id"+(x+1)+y);
                tile_r.lastElementChild.id.slice(0,3) == team ? tile_r.style.backgroundColor = "red" : tile_r.style.backgroundColor = '#1fd137';
            }
        } else if (x == 9) { 
            if (y === 0) {        //up right corner
                //light tile 91 and 80
                tile_d = document.getElementById("id91");
                tile_d.lastElementChild.id.slice(0,3) == team ? tile_d.style.backgroundColor = "red" : tile_d.style.backgroundColor = '#1fd137';
                tile_l = document.getElementById("id80");
                tile_l.lastElementChild.id.slice(0,3) == team ? tile_l.style.backgroundColor = "red" : tile_l.style.backgroundColor = '#1fd137';
                
            } else if (y === 9) { //down right corner
                //light tile 98 and 89
                tile_u = document.getElementById("id98");
                tile_u.style.backgroundColor = '#1fd137';
                tile_l = document.getElementById("id89");
                tile_l.style.backgroundColor = '#1fd137';
            } else {
                //light up down left
                console.log("ligth up down right");
                tile_u = document.getElementById("id"+x+(y-1));
                tile_u.style.backgroundColor = '#1fd137';
                tile_d = document.getElementById("id"+x+(y+1));
                tile_d.style.backgroundColor = '#1fd137';
                tile_l = document.getElementById("id"+(x-1)+y);
                tile_l.style.backgroundColor = '#1fd137';
            }
        } else if (y === 0) { 
            //light down left right
            tile_d = document.getElementById("id"+x+(y+1));
            tile_d.style.backgroundColor = '#1fd137';
            tile_l = document.getElementById("id"+(x-1)+y);
            tile_l.style.backgroundColor = '#1fd137';
            tile_r = document.getElementById("id"+(x+1)+y);
            tile_r.style.backgroundColor = '#1fd137';
        } else if (y === 9) { 
            //light up left right
            tile_u = document.getElementById("id"+x+(y-1));
            tile_u.style.backgroundColor = '#1fd137';
            tile_l = document.getElementById("id"+(x-1)+y);
            tile_l.style.backgroundColor = '#1fd137';
            tile_r = document.getElementById("id"+(x+1)+y);
            tile_r.style.backgroundColor = '#1fd137';
        } else {
            //light all 4 directions
            tile_u = document.getElementById("id"+x+(y-1));
            tile_u.style.backgroundColor = '#1fd137';
            tile_d = document.getElementById("id"+x+(y+1));
            tile_d.style.backgroundColor = '#1fd137';
            tile_l = document.getElementById("id"+(x-1)+y);
            tile_l.style.backgroundColor = '#1fd137';
            tile_r = document.getElementById("id"+(x+1)+y);
            tile_r.style.backgroundColor = '#1fd137';
        } 

    }
    */
    isValidMove (px, py, x, y, rank) {

        console.log("\nreferee is checking move:");

        //Prevent bombs and flags from moving
        if (rank === 11 || rank === 0) {
            console.log("Bombs and Flags do not move!")
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
                if (x === 0 && y === 8) {
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
 
    }

    isValidPlacement (x, y, team) {

        if (team === "red") {
            if (y < 4) {
                console.log("valid placement: red team");
                return true;
            } else {
                console.log("invalid placement: red team");
                return false;
            }
        } else {
            if (y > 5) {
                console.log("valid placement: blue team");
                return true;
            } else {
                console.log("invalid placement: blue team");
                return false;
            }
        }

    }

    attack (rank, rank_adv) {

        if (rank === rank_adv) {
            console.log("tie both die");
            return 0;
        } else if (rank > rank_adv) {
            console.log("you win!");
            if (rank_adv === 0) {
                console.log("you won the GAME!");
                console.log("show all the pieces in the game")
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
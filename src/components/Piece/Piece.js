
export default class Piece {

    constructor (team,rank, img, x, y) {
        this.team = team;
        this.rank = rank; //rank flag = 0; rank bomb = 11
        this.img = img;
        this.x = x;
        this.y = y;
    }

    attack (rank_adv) {
        
        //flag captured
        if (rank_adv === 0) {
            //Game Over -> player win!
        }
        //spie attack
        if (this.rank === 1 && rank_adv === 10) {
            //piece pop
        } 
        //bomb disarmament
        if (this.rank === 3 && rank_adv === 11) {
            //adv pop
        }

        //normal rule
        if (this.rank > rank_adv) {
            //adv pop
        } else if (this.rank === rank_adv) {
            //piece pop
            //adv pop
        } else {
            //piece pop
        }
    }

}
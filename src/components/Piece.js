
export default class Piece {

    constructor (team,rank, img, x, y) {
        this.team = team;
        this.rank = rank; //rank flag = 0; rank bomb = 11
        this.img = img;
        this.x = x;
        this.y = y;
        this.id = team + "-" + rank; // "team-rank-number"
        this.enemy_icon = "./assets/images/enemy_icon.png";
    }
    getTeam () {
        return this.team;
    }
    getRank() {
        return this.rank;
    }
    setPosition (x, y) {
        this.x = x;
        this.y = y;
    }
    getPosition() {
        return [this.x, this.y];
    }
    setId(id) {
        this.id = this.id + "-" +  id;
    }
    getId () {
        return this.id;
    }
    getImage () {
        return this.img;
    }
    getEnemyIcon () {
        return this.enemy_icon;
    }
    print () {
        console.log(this.team +" "+ this.rank +" "+ this.img +" "+ this.x +" "+ this.y)
    }
}
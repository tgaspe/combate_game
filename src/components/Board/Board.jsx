import React from "react";
import Tile from "../Tile/Tile";
import "./Board.css";
import Piece from "../Piece/Piece.js";

//Board Axis
const horixontalAxis = [1,2,3,4,5,6,7,8,9,10].reverse();
const verticalAxis = ["a", "b", "c", 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

//Pieces
const pieces = [];
const img_pieces = ["./assets/images/flag.png", "./assets/images/soldier.png", "./assets/images/corporal.png", 
"./assets/images/sargent.png","./assets/images/liutenant.png", "./assets/images/capatain.png", 
"./assets/images/major.png", "./assets/images/colonel.png", "./assets/images/general.png",
"./assets/images/5star_general.png", "./assets/images/bomb.png" ]

//Initializing pieces
for (var rank = 0; rank < 12; rank++) {
    
    const red_piece = new Piece("red", rank, img_pieces[rank], null, null);
    const blue_piece = new Piece("blue", rank, img_pieces[rank], null, null);
    
    if (rank == 0) {
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 1) {
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 2) {
        for (var i = 0; i < 8; i++) {
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 3) {
        for (var i = 0; i < 5; i++) {
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank => 4 && rank <= 6) {
        for (var i = 0; i < 4; i++) {
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 7) {
        for (var i = 0; i < 3; i++) {
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 8) {
        for (var i = 0; i < 2; i++) {
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 9) {
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 10) {
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 11) {
        for (var i = 0; i < 6; i++) {
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    }
}

function grabPiece (e) {
    document.addEventListener()
    console.log(e);
}


export default function Board() {

    let board = [];

    for (let i = 0; i < horixontalAxis.length; i++) {
        for (let j = 0; j < verticalAxis.length; j++) {
            let position = horixontalAxis[i].toString + "," + verticalAxis[j];
            let x = j;
            let y = i;

            let img = "./assets/images/enemy_icon.png";
            //let img = null;

            //let p = pieces[0];
            //p.setPosition(x, y);
            //p.getImage();
            
            board.push(<Tile pos={position} image={img} x={x} y={y} />);
        }
    }

    return (<div id="board" onMouseDown={ e => grabPiece()}>{board}</div>);

}
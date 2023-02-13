import React, { useState, useRef, useEffect } from "react";
//import io from 'socket.io-client';
import Tile from "./Tile";
import "./styles/Board.css";
import Piece from "./Piece.js";
//import Rules from "./Rules.js";

//Socket io
//const socket = io();

//Board Axis
const horixontalAxis = [1,2,3,4,5,6,7,8,9,10].reverse();
const verticalAxis = ["a", "b", "c", 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

//Pieces
const pieces = [];
const img_pieces = ["./assets/images/flag.png", "./assets/images/spie.png","./assets/images/soldier.png", "./assets/images/corporal.png", 
"./assets/images/sargent.png","./assets/images/liutenant.png", "./assets/images/captain.png", 
"./assets/images/major.png", "./assets/images/colonel.png", "./assets/images/general.png",
"./assets/images/5star_general.png", "./assets/images/bomb.png" ]

//Initializing pieces array
for (var rank = 0; rank < 12; rank++) {
    
    if (rank === 0) { //Flag
        const red_piece = new Piece("red", rank, img_pieces[rank], 0, 0);
        const blue_piece = new Piece("blue", rank, img_pieces[rank], 0, 9);
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank === 1) { //Spie
        const red_piece = new Piece("red", rank, img_pieces[rank], 1, 0);
        const blue_piece = new Piece("blue", rank, img_pieces[rank], 1, 9);
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank === 2) { //Soldier
        for (var i = 0; i < 8; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], 2+i, 0);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], 2+i, 9);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank === 3) { //Corporal
        for (var i = 0; i < 5; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], i, 1);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], i, 8);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank === 4 ) { //Sargent
        for (var i = 0; i < 4; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], 5 + i, 1);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], 5 + i, 8);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank === 5 ) { //BlueTenent
        for (var i = 0; i < 4; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], null, null);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], null, null);
            if (i === 0) {
                red_piece.setPosition(9, 1);
                blue_piece.setPosition(9, 8);
            } else {
                red_piece.setPosition(i-1, 2);
                blue_piece.setPosition(i-1, 7);
            }
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank === 6 ) { //Captain
        for (var i = 0; i < 4; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], i+3, 2);
            const blue_piece = new Piece("blue", rank, img_pieces[rank],  i+3, 7);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank === 7) { //Major
        for (var i = 0; i < 3; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], 7+i, 2);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], 7+i, 7);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank === 8) { //Colonel
        for (var i = 0; i < 2; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], i, 3);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], i, 6);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank === 9) { //General
        const red_piece = new Piece("red", rank, img_pieces[rank], 2, 3);
        const blue_piece = new Piece("blue", rank, img_pieces[rank], 2, 6);
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank === 10) { //5 Star General
        const red_piece = new Piece("red", rank, img_pieces[rank], 3, 3);
        const blue_piece = new Piece("blue", rank, img_pieces[rank], 3, 6);
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank === 11) { //Bomb
        for (var i = 0; i < 6; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], 4+i, 3);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], 4+i, 6);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    }
}


// Board Function
export default function Board(props) {

    const boardRef = useRef(null);
    const board_matrix = [];       //used to pass board state to server
    //const board = [];
    const [board, setBoard] = useState([]);


    // --- Creating Board ---
    let index = 0;
    for (let i = 0; i < horixontalAxis.length; i++) {

        const row = [];

        for (let j = 0; j < verticalAxis.length; j++) {
            
            let position =  "id" + j + i;
            let x = j;
            let y = i;
            let img = null;
            let id = null;
            
            //Putting pieces on board
            
            pieces.forEach((p) => {
                let pos = p.getPosition();
                if (pos[0] === j && pos[1] === i) {

                    if (i > 5) {
                        //p.getTeam() === "blue" ? img = p.getImage() : img = "./assets/images/enemy_icon.png";
                        img = p.getImage();
                        id = p.getId();
                    }
                    
                }
            });
            
            row.push(id);
            board.push(<Tile key={index} pos={position} image={img} x={x} y={y} piece_id={id}/>);
            index++;
        }

        board_matrix.push(row);
    }

    // onMouseDown={e => dragStart(e)} 
    // onMouseMove={e => _dragging(e)}
    // onMouseUp={e => dragEnd(e)}
    return (
        <div id="board" ref={boardRef}>
            {board}
        </div>);

}
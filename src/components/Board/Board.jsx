import React, { useState, useRef } from "react";
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
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 1) {
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 2) {
        for (var i = 0; i < 8; i++) {
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 3) {
        for (var i = 0; i < 5; i++) {
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank => 4 && rank <= 6) {
        for (var i = 0; i < 4; i++) {
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 7) {
        for (var i = 0; i < 3; i++) {
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 8) {
        for (var i = 0; i < 2; i++) {
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 9) {
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 10) {
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 11) {
        for (var i = 0; i < 6; i++) {
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    }
}

//function grabPiece (e) {
//    document.addEventListener()
//    console.log(e);
//}

//onDragStart
//onDragOver
//onDrop

let elementToDrag = null;

function dragStart (e) {
    
    elementToDrag = e.target;
    console.log(elementToDrag);

    if (elementToDrag && elementToDrag.classList.contains("game_piece")) {

        let pos = elementToDrag.parentNode.id.slice(2);
        console.log("pos->" + pos);
        
        const X = e.clientX -30;
        const Y = e.clientY -30;

        elementToDrag.style.left = `${X}px`;
        elementToDrag.style.top = `${Y}px`;

        //light adjecent tiles
        // edge cases
        if (parseInt(pos[0]) === 0) {
            if (parseInt(pos[1]) === 0) {        // up left corner
                //light tile 01 and 10
                const tile_d = document.getElementById("id01");
                console.log(tile_d);
                tile_d.style.backgroundColor = '#1fd137';
                const tile_r = document.getElementById("id10");
                tile_r.style.backgroundColor = '#1fd137';

            } else if (parseInt(pos[1]) === 9) { //down left corner
                //light tile 08 and 19
            } else {
                //light up down right
            }
        } else if (parseInt(pos[0]) === 9) { 
            if (parseInt(pos[1]) === 0) {        //up right corner
                //light tile 91 and 80
            } else if (parseInt(pos[1]) === 9) { //down right corner
                //light tile 98 and 89
            } else {
                //light up down left
            }
        } else if (parseInt(pos[1]) === 0) { 
            //light down left right
        } else if (parseInt(pos[1]) === 9) { 
            //light up left right
        } else {
            //light all 4 directions
        }
        
        //*/
    }


}



function _dragging (e) {

    //elementToDrag = e.target;
    //console.log(elementToDrag);

    if (elementToDrag && elementToDrag.classList.contains("game_piece")) {
        
        const X = e.clientX -30;
        const Y = e.clientY -30;

        elementToDrag.style.left = `${X}px`;
        elementToDrag.style.top = `${Y}px`;
    }

}

function dragEnd (e) {
    
    if (elementToDrag && elementToDrag.classList.contains("game_piece")) {
        elementToDrag = null;
    }
}

export default function Board() {

    const board = [];

    let p = pieces[0];

    let index = 0;
    for (let i = 0; i < horixontalAxis.length; i++) {
        for (let j = 0; j < verticalAxis.length; j++) {
            let position =  "id" + j + i;
            
            let x = j;
            let y = i;

            //let img = "./assets/images/enemy_icon.png";
            let img = null;
            let id = null;
            
            if (j === 0 && i === 0) {
                p.setPosition(x, y);
                img = p.getImage();
                id = p.getId();
            }
            
            
            board.push(<Tile key={index} pos={position} image={img} x={x} y={y} piece_id={id}/>);

            index++;
        }
    }

    return (<div id="board" 
        onMouseDown={e => dragStart(e)} 
        onMouseMove={e => _dragging(e)}
        onMouseUp={e => dragEnd(e)}
        >{board}</div>);

}
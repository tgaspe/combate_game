import React, { useState, useRef, useEffect } from "react";
import Tile from "../Tile/Tile";
import "./Board.css";
import Piece from "../Piece/Piece.js";
import Rules from "../Rules/Rules.js";

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
    
    if (rank == 0) { //Flag
        const red_piece = new Piece("red", rank, img_pieces[rank], 0, 0);
        const blue_piece = new Piece("blue", rank, img_pieces[rank], 0, 9);
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 1) { //Spie
        const red_piece = new Piece("red", rank, img_pieces[rank], 1, 0);
        const blue_piece = new Piece("blue", rank, img_pieces[rank], 1, 9);
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 2) { //Soldier
        for (var i = 0; i < 8; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], 2+i, 0);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], 2+i, 9);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 3) { //Corporal
        for (var i = 0; i < 5; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], i, 1);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], i, 8);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 4 ) { //Sargent
        for (var i = 0; i < 4; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], 5 + i, 1);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], 5 + i, 8);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 5 ) { //BlueTenent
        for (var i = 0; i < 4; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], null, null);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], null, null);
            if (i == 0) {
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
    } else if (rank == 6 ) { //Captain
        for (var i = 0; i < 4; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], i+3, 2);
            const blue_piece = new Piece("blue", rank, img_pieces[rank],  i+3, 7);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 7) { //Major
        for (var i = 0; i < 3; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], 7+i, 2);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], 7+i, 7);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 8) { //Colonel
        for (var i = 0; i < 2; i++) {
            const red_piece = new Piece("red", rank, img_pieces[rank], i, 3);
            const blue_piece = new Piece("blue", rank, img_pieces[rank], i, 6);
            red_piece.setId(i + 1);
            blue_piece.setId(i + 1);
            pieces.push(red_piece);
            pieces.push(blue_piece);
        }
    } else if (rank == 9) { //General
        const red_piece = new Piece("red", rank, img_pieces[rank], 2, 3);
        const blue_piece = new Piece("blue", rank, img_pieces[rank], 2, 6);
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 10) { //5 Star General
        const red_piece = new Piece("red", rank, img_pieces[rank], 3, 3);
        const blue_piece = new Piece("blue", rank, img_pieces[rank], 3, 6);
        red_piece.setId(1);
        blue_piece.setId(1);
        pieces.push(red_piece);
        pieces.push(blue_piece);
    } else if (rank == 11) { //Bomb
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







            //Todo list: 
            // - if player move but does not want to attack: button to attack or end turn???
            // - Players turns 
            // - Show pieces after attacking - 
            // - hide adversary pieces
            // - implement online 
            // - adjust light tiles when player moves
            // - pieces deployement screen with timer and start game button
            // - game over screen showing all pieces and highlightin flag





//Board Function
export default function Board(props) {

    const boardRef = useRef(null);
    const board = [];

    let elementToDrag = null;
    let current_tile, tile_u, tile_d, tile_l, tile_r = null;
    let pos;
    
    const rules = new Rules;

    // Move piece functions
    function dragStart (e) {
        
        elementToDrag = e.target;

        if (elementToDrag && elementToDrag.classList.contains("game_piece")) {

            current_tile = elementToDrag.parentNode;
            
            //Ligth current tile yellow
            current_tile.style.backgroundColor = "yellow";

            //Mouse Grab
            const X = e.clientX -30;
            const Y = e.clientY -30;
            elementToDrag.style.left = `${X}px`;
            elementToDrag.style.top = `${Y}px`;

            //Light adjecent tiles
            pos = current_tile.id.slice(2);
            if (parseInt(pos[0]) === 0) {
                if (parseInt(pos[1]) === 0) {        // up left corner
                    //light tile 01 and 10
                    tile_d = document.getElementById("id01");
                    tile_d.style.backgroundColor = '#1fd137';
                    tile_r = document.getElementById("id10");
                    tile_r.style.backgroundColor = '#1fd137';

                } else if (parseInt(pos[1]) === 9) { //down left corner
                    //light tile 08 and 19
                    tile_u = document.getElementById("id08");
                    tile_u.style.backgroundColor = '#1fd137';
                    tile_r = document.getElementById("id19");
                    tile_r.style.backgroundColor = '#1fd137';
                } else {
                    //light up down right
                    console.log("ligth up down right");
                    tile_u = document.getElementById("id"+pos[0]+(parseInt(pos[1])-1));
                    tile_u.style.backgroundColor = '#1fd137';
                    tile_d = document.getElementById("id"+pos[0]+(parseInt(pos[1])+1));
                    tile_d.style.backgroundColor = '#1fd137';
                    tile_r = document.getElementById("id"+(parseInt(pos[0])+1)+pos[1]);
                    tile_r.style.backgroundColor = '#1fd137';
                }
            } else if (parseInt(pos[0]) === 9) { 
                if (parseInt(pos[1]) === 0) {        //up right corner
                    //light tile 91 and 80
                    tile_d = document.getElementById("id91");
                    tile_d.style.backgroundColor = '#1fd137';
                    tile_l = document.getElementById("id80");
                    tile_l.style.backgroundColor = '#1fd137';
                } else if (parseInt(pos[1]) === 9) { //down right corner
                    //light tile 98 and 89
                    tile_u = document.getElementById("id98");
                    tile_u.style.backgroundColor = '#1fd137';
                    tile_l = document.getElementById("id89");
                    tile_l.style.backgroundColor = '#1fd137';
                } else {
                    //light up down left
                    console.log("ligth up down right");
                    tile_u = document.getElementById("id"+pos[0]+(parseInt(pos[1])-1));
                    tile_u.style.backgroundColor = '#1fd137';
                    tile_d = document.getElementById("id"+pos[0]+(parseInt(pos[1])+1));
                    tile_d.style.backgroundColor = '#1fd137';
                    tile_l = document.getElementById("id"+(parseInt(pos[0])-1)+pos[1]);
                    tile_l.style.backgroundColor = '#1fd137';
                }
            } else if (parseInt(pos[1]) === 0) { 
                //light down left right
                tile_d = document.getElementById("id"+pos[0]+(parseInt(pos[1])+1));
                tile_d.style.backgroundColor = '#1fd137';
                tile_l = document.getElementById("id"+(parseInt(pos[0])-1)+pos[1]);
                tile_l.style.backgroundColor = '#1fd137';
                tile_r = document.getElementById("id"+(parseInt(pos[0])+1)+pos[1]);
                tile_r.style.backgroundColor = '#1fd137';
            } else if (parseInt(pos[1]) === 9) { 
                //light up left right
                tile_u = document.getElementById("id"+pos[0]+(parseInt(pos[1])-1));
                tile_u.style.backgroundColor = '#1fd137';
                tile_l = document.getElementById("id"+(parseInt(pos[0])-1)+pos[1]);
                tile_l.style.backgroundColor = '#1fd137';
                tile_r = document.getElementById("id"+(parseInt(pos[0])+1)+pos[1]);
                tile_r.style.backgroundColor = '#1fd137';
            } else {
                //light all 4 directions
                tile_u = document.getElementById("id"+pos[0]+(parseInt(pos[1])-1));
                tile_u.style.backgroundColor = '#1fd137';
                tile_d = document.getElementById("id"+pos[0]+(parseInt(pos[1])+1));
                tile_d.style.backgroundColor = '#1fd137';
                tile_l = document.getElementById("id"+(parseInt(pos[0])-1)+pos[1]);
                tile_l.style.backgroundColor = '#1fd137';
                tile_r = document.getElementById("id"+(parseInt(pos[0])+1)+pos[1]);
                tile_r.style.backgroundColor = '#1fd137';
            }
        }
    }
    function _dragging (e) {

        const board = boardRef.current;
    
        if (elementToDrag && elementToDrag.classList.contains("game_piece")) {
            
            //Board dimensions
            const minX = board.offsetLeft;
            const minY = board.offsetTop;
            const maxX = board.offsetLeft + 540;
            const maxY = board.offsetTop + 540;
            
            //Mouse position
            const X = e.clientX -30;
            const Y = e.clientY -30;
            
            //Keeping piece inside the board
            // X axis
            if (X < minX) {
                elementToDrag.style.left = `${minX}px`;
            } else if (X > maxX) {
                elementToDrag.style.left = `${maxX}px`;
            } else {
                elementToDrag.style.left = `${X}px`;
            }
            // Y axis
            if (Y < minY) {
                elementToDrag.style.top = `${minY}px`;
            } else if (Y > maxY) {
                elementToDrag.style.top = `${maxY}px`;
            } else {
                elementToDrag.style.top = `${Y}px`;
            } 
        }
    
    }
    function dragEnd (e) {

        if (elementToDrag) {

            const id = elementToDrag.id;
            const team = id.slice(0, 3);
            const rank = id.slice(id.indexOf("-") + 1, id.lastIndexOf("-"));

            //Set tile colors back to normal
            if (current_tile) {current_tile.style.backgroundColor = null;}
            if (tile_u) {tile_u.style.backgroundColor = null;}
            if (tile_d) {tile_d.style.backgroundColor = null;}
            if (tile_l) {tile_l.style.backgroundColor = null;}
            if (tile_r) {tile_r.style.backgroundColor = null;} 

            //Calculate mouse grid position
            const x = Math.floor((e.clientX - boardRef.current.offsetLeft)/60);
            const y = Math.floor((e.clientY - boardRef.current.offsetTop)/60);
            

            // --- Rules for moving and attacking ---
            const new_parent_tile = document.getElementById("id"+x+y);
            
            //Empty tile
            if (new_parent_tile.childElementCount === 0) {

                if (rules.isValidMove(parseInt(pos[0]), parseInt(pos[1]), x, y, parseInt(rank)) === true) {

                    new_parent_tile.appendChild(elementToDrag);
                    //Set piece position in the middle of selected tile
                    elementToDrag.style.left = `${x*60 + boardRef.current.offsetLeft}px`;
                    elementToDrag.style.top = `${y*60 + boardRef.current.offsetTop}px`;
                    console.log("Can go here! empty tile.");

                } else {
                    console.log("cannot go here!");
                    elementToDrag.style.left = `${parseInt(pos[0])*60 + boardRef.current.offsetLeft}px`;
                    elementToDrag.style.top = `${parseInt(pos[1])*60 + boardRef.current.offsetTop}px`;
                }
            //Not empty tile    
            } else {

                if (rules.isValidMove(parseInt(pos[0]), parseInt(pos[1]), x, y, team) === true) {// Not empty
                
                    const parent_child = new_parent_tile.lastElementChild;
                    const id_adv = parent_child.id;
                    const team_adv = id_adv.slice(0, 3);
                    const rank_adv = id_adv.slice(id_adv.indexOf("-") + 1, id_adv.lastIndexOf("-"));
                    
                    //lake tile or ally tile
                    if (team_adv === team || parent_child.className === "lake") {
                        //Invalid move return x, y to previous place
                        console.log("cannot go here! ally or lake there!");
                        elementToDrag.style.left = `${parseInt(pos[0])*60 + boardRef.current.offsetLeft}px`;
                        elementToDrag.style.top = `${parseInt(pos[1])*60 + boardRef.current.offsetTop}px`;
                    } else { //Enemy tile 
                        console.log("attack command!");
                        
                        let attack_result = rules.attack(parseInt(rank), parseInt(rank_adv));

                        if (attack_result === 0) {
                            //Tie
                            elementToDrag.remove();
                            parent_child.remove();
                        } else if (attack_result === 1) {
                            //Won
                            elementToDrag.style.left = `${parseInt(pos[0])*60 + boardRef.current.offsetLeft}px`;
                            elementToDrag.style.top = `${parseInt(pos[1])*60 + boardRef.current.offsetTop}px`;
                            parent_child.remove();
                            
                            //TODO: Show to the adversary your piece
                            setTimeout(() => {
                                console.log('Show your piece to the adv!')
                              }, 2000);
                            

                        } else {
                            //Lost
                            elementToDrag.remove();

                            //TODO: Show adversary piece to you
                            setTimeout(() => {
                                console.log('Adv show his piece to you!')
                              }, 2000);
                        }


                    }
                    //if child node of new parent tile enemy tile -> call attack 
                } else {
                    console.log("connot go here!");
                    elementToDrag.style.left = `${parseInt(pos[0])*60 + boardRef.current.offsetLeft}px`;
                    elementToDrag.style.top = `${parseInt(pos[1])*60 + boardRef.current.offsetTop}px`;
                }
            }  

            
            
            //Set piece position in the middle of selected tile
            // elementToDrag.style.left = `${x*60 + boardRef.current.offsetLeft}px`;
            // elementToDrag.style.top = `${y*60 + boardRef.current.offsetTop}px`;

            
            elementToDrag = null;
        }
    }


    function attack (e) {

        //implement attack here  

    }


    //Creating Board
    let index = 0;
    for (let i = 0; i < horixontalAxis.length; i++) {
        for (let j = 0; j < verticalAxis.length; j++) {
            let position =  "id" + j + i;
            let x = j;
            let y = i;

            //let img = "./assets/images/enemy_icon.png";
            let img = null;
            let id = null;
            
            //Putting pieces on board
            pieces.forEach((p) => {
                let pos = p.getPosition();
                if (pos[0] == j && pos[1] == i) {
                    img = p.getImage();
                    id = p.getId();
                }
            });
            
            board.push(<Tile key={index} pos={position} image={img} x={x} y={y} piece_id={id}/>);
            index++;
        }
    }

    return (
        <div 
        id="board" 
        onMouseDown={e => dragStart(e)} 
        onMouseMove={e => _dragging(e)}
        onMouseUp={e => dragEnd(e)}
        onClick={e => attack(e)}
        ref={boardRef}
        >
            {board}
        </div>);

}
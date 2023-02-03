import Tile from "./Tile/Tile";
import Piece from "./Piece/Piece.js";


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


export default function Holder () {
    
    let elementToDrag, current_tile;
    

    // function dragStart1 (e) {
        
    //     elementToDrag = e.target;

    //     if (elementToDrag && elementToDrag.classList.contains("game_piece")) {

    //         current_tile = elementToDrag.parentNode;
            
    //         //Ligth current tile yellow
    //         current_tile.style.backgroundColor = "yellow";

    //         //Mouse Grab
    //         const X = e.clientX -30;
    //         const Y = e.clientY -30;
    //         elementToDrag.style.left = `${X}px`;
    //         elementToDrag.style.top = `${Y}px`;
    //     }
    // }

    // function _dragging1 (e) {
    //     if (elementToDrag && elementToDrag.classList.contains("game_piece")) {

    //         //Mouse position
    //         const X = e.clientX -30;
    //         const Y = e.clientY -30;

    //         elementToDrag.style.left = `${X}px`;
    //         elementToDrag.style.top = `${Y}px`;

    //     }
    // }

    // function dragEnd1 (e) {
        
    //     if (elementToDrag) {

    //         const board = document.getElementById("board");
    //         const id = elementToDrag.id;
    //         const team = id.slice(0, 3);
    //         const rank = id.slice(id.indexOf("-") + 1, id.lastIndexOf("-"));

    //         //Set tile colors back to normal
    //         if (current_tile) {current_tile.style.backgroundColor = null;} 

    //         //Calculate mouse grid position
    //         const x = Math.floor((e.clientX - board.offsetLeft)/60);
    //         const y = Math.floor((e.clientY - board.offsetTop)/60);

    //         // --- Rules for moving and attacking ---
    //         const new_parent_tile = document.getElementById("id"+x+y);
            
    //         //Empty tile
    //         if (new_parent_tile.childElementCount === 0) { 
                
    //             new_parent_tile.appendChild(elementToDrag);
    //             //Set piece position in the middle of selected tile
    //             elementToDrag.style.left = `${x*60 + board.offsetLeft}px`;
    //             elementToDrag.style.top = `${y*60 + board.offsetTop}px`;
    //             console.log("Can place here!");
    //         } else {
    //             console.log("Cannot place here!");
    //         }
    //     } 

    //     elementToDrag = null;

    // }


    const piece_select = [];
    
    for (let i = 0; i < 10; i++) { //rows
        for (let j= 0; j < 4; j++) {//collums
            
            let position =  "id>" + j + i;
            let x = i;
            let y = j;
            let img = null;
            let id = null;
            
            //Putting pieces on board
            pieces.forEach((p) => {
                let pos = p.getPosition();
                if (pos[0] == i && pos[1] == j) {
                    img = p.getImage();
                    id = p.getId();
                }
            });
            
            
            piece_select.push(<Tile pos={position} image={img} x={x} y={y} piece_id={id}/>);
        }
    }
    // onMouseDown={e => dragStart1(e)} 
    //     onMouseMove={e => _dragging1(e)}
    //     onMouseUp={e => dragEnd1(e)}
    console.log(piece_select);
    return (<div 
        id='piece_holder'
        
        >{piece_select}</div>);
}
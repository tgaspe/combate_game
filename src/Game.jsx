import './Game.css';
import {io} from "socket.io-client";
import Board from './components/Board';
import HolderRed from './components/HolderRed';
import HolderBlue from './components/HolderBlue';
import Buttons from './components/Buttons';
import Rules from "./components/Rules.js";
import GamePlay from "./components/game.js";
import { useEffect, useRef } from 'react';

            // Todo list: 
            // - if player move but does not want to attack: button to attack or end turn???
            // - Players turns   
            // - make it that you can move only your pieces and not the adv as well
            // - flip board for red team
            // - pieces deployement screen with timer and start game button
            // - css for lobby and waiting room
            // - Deploy Game on a real website
            // - Create AI for single player

// Connection to server
export const socket = io("http://localhost:2000");


function Game() {

  // --- Variables ---
  const gameRef = useRef();
  const rules = new Rules;
  let elementToDrag = null;
  let current_tile, tile_u, tile_d, tile_l, tile_r = null;
  let deploymentPhase = true;
  let pos;
  let player;
  let turn = true;
  let room;
  let moves = 0;

  useEffect(() => {

    // Setting player1 variable
    socket.on("setPlayers", (data) => {
        console.log("On set players: ")
        console.log(data)
        room = data.room;
        player = data.player1;
        console.log("room: " + room + " player: " + player);
        if (player) {
            // hide blue holder
            const blueHolder = document.getElementById("holder-blue");
            blueHolder.style.display = "none";
            // hide adversary pieces
            const enemyPieces = document.getElementsByClassName("blue");
            for (let i = 0; i < enemyPieces.length; i++) {
                enemyPieces[i].style.backgroundImage = "url(./assets/images/enemy_icon.png)";
                enemyPieces[i].innerHTML = "*";
            }
            // flip board
            //const board = document.getElementById("board");
            //board.style.transform = "rotate(180deg)";

        } else {
            const redHolder = document.getElementById("holder-red");
            redHolder.style.display = "none";
            // hide adversary pieces
            const enemyPieces = document.getElementsByClassName("red");
            for (let i = 0; i < enemyPieces.length; i++) {
                enemyPieces[i].style.backgroundImage = "url(./assets/images/enemy_icon.png)";
                enemyPieces[i].innerHTML = "*";
            }
        }
    });

    // Starting Game
    socket.on("gameStart", (data) => {
        deploymentPhase = false;
        const game = new GamePlay(data.p1, data.p2, data.p1_team, data.p2_team);
    });

    // Updating Board
    socket.on("updateBoard", (data) => {
        console.log("Updating board...");
        console.log(data);
        updatePositions(data.piece_id, data.tile_id, data.x, data.y);
    }); 
    // Updating Attacks
    socket.on("updateAttack", (data) => {
        console.log("Updating attack board...");
        updateAttackResult(data.piece_id, data.adver_id, data.visibility, data.result);
    })

    socket.on("newTurn", () => {
        console.log("new turn received");
        turn = true;
        moves = 0;
    });

    socket.on("End-Screen", () => {
        console.log("recived end screen from server!")
        if (player) {
            // show blue pieces
            console.log("did i got here? Red Player");
            const enemyPieces = document.getElementsByClassName("blue");
            for (let i = 0; i < enemyPieces.length; i++) {
                let piece_id = enemyPieces[i].id;
                let pieceImage = getPieceImg(piece_id);
                enemyPieces[i].style.backgroundImage = `url(${pieceImage})`;
            }
        } else {
            // show red pieces
            console.log("did i got here? Blue player");
            const enemyPieces = document.getElementsByClassName("red");
            for (let i = 0; i < enemyPieces.length; i++) {
                let piece_id = enemyPieces[i].id;
                let pieceImage = getPieceImg(piece_id);
                enemyPieces[i].style.backgroundImage = `url(${pieceImage})`;
            }
            
        }
    })
    

  }, []);
  
  // --- Update Board functions ---
  function updatePositions (piece_id, tile_id, x, y) {
    
    const board = document.getElementById("board");
    const piece = document.getElementById(piece_id);
    const tile = document.getElementById(tile_id);
    
    //Update Piece position
    piece.style.left = `${x*60 + board.offsetLeft}px`;
    piece.style.top = `${y*60 + board.offsetTop}px`;

    //Attach piece div to tile
    tile.appendChild(piece);
  }
  function updateAttackResult (piece_id, adver_id, visibility, result) {
    //const board = document.getElementById("board");
    const piece = document.getElementById(piece_id);
    const adver = document.getElementById(adver_id);

    if (result === "tie") {
        console.log("tieee");
        piece.remove();
        adver.remove();
    } else if (result === "win") {
        
        console.log("winn");
        let pieceImage = getPieceImg(piece_id);
        piece.style.backgroundImage = `url(${pieceImage})`;
        adver.remove();

        // Revert back background
        setTimeout(() => {
            piece.style.backgroundImage = "url(./assets/images/enemy_icon.png)";
        }, 2000);

    } else {
        console.log("tieee");
        piece.remove();
    }

  }
  // --- Move piece functions ---
  function dragStart (e) {
      e.preventDefault() 
      elementToDrag = e.target;

      if (elementToDrag && elementToDrag.classList.contains("game_piece")) {

        const id = elementToDrag.id;
        const team = id.slice(0, 3);
        current_tile = elementToDrag.parentNode;

        console.log("turn: " + turn + " moves: " + moves);
        if (elementToDrag.parentNode.parentNode.id === "board" && turn === true) {
          
            //Ligth current tile yellow
          current_tile.style.backgroundColor = "yellow";
            
          //Light adjecent tiles
          pos = current_tile.id.slice(2);
          if (parseInt(pos[0]) === 0) {
              if (parseInt(pos[1]) === 0) {        // up left corner
                  //light tile 01 and 10 
                  tile_d = document.getElementById("id01");
                  tile_r = document.getElementById("id10");

                  if (tile_d.lastElementChild) {
                      tile_d.lastElementChild.id.slice(0,3) === team ? tile_d.style.backgroundColor = "blue" : tile_d.style.backgroundColor = 'red';
                  } else {
                      tile_d.style.backgroundColor = '#1fd137';
                  }
                  if (tile_r.lastElementChild) {
                      tile_r.lastElementChild.id.slice(0,3) === team ? tile_r.style.backgroundColor = "blue" : tile_r.style.backgroundColor = "red";
                  } else {
                      tile_r.style.backgroundColor = '#1fd137';
                  }

              } else if (parseInt(pos[1]) === 9) { //down left corner
                  //light tile 08 and 19
                  tile_u = document.getElementById("id08");
                  tile_r = document.getElementById("id19");
                  if (tile_u.lastElementChild) {
                      tile_u.lastElementChild.id.slice(0,3) === team ? tile_u.style.backgroundColor = "blue" : tile_u.style.backgroundColor = "red";
                  } else {
                      tile_u.style.backgroundColor = '#1fd137';
                  }
                  if (tile_r.lastElementChild) {
                      tile_r.lastElementChild.id.slice(0,3) === team ? tile_r.style.backgroundColor = "blue" : tile_r.style.backgroundColor = 'red';
                  } else {
                      tile_r.style.backgroundColor = '#1fd137';
                  }
              } else {
                  //light up down right
                  console.log("ligth up down right");
                  tile_u = document.getElementById("id"+pos[0]+(parseInt(pos[1])-1));
                  tile_d = document.getElementById("id"+pos[0]+(parseInt(pos[1])+1));
                  tile_r = document.getElementById("id"+(parseInt(pos[0])+1)+pos[1]);
                  
                  if (tile_u.lastElementChild) {
                      tile_u.lastElementChild.id.slice(0,3) === team ? tile_u.style.backgroundColor = "blue" : tile_u.style.backgroundColor = 'red';
                  } else {
                      tile_u.style.backgroundColor = '#1fd137';
                  }
                  if (tile_d.lastElementChild) {
                      tile_d.lastElementChild.id.slice(0,3) === team ? tile_d.style.backgroundColor = "blue" : tile_d.style.backgroundColor = 'red';
                  } else {
                      tile_d.style.backgroundColor = '#1fd137';
                  }
                  if (tile_r.lastElementChild) {
                      tile_r.lastElementChild.id.slice(0,3) === team ? tile_r.style.backgroundColor = "blue" : tile_r.style.backgroundColor = 'red';
                  } else {
                      tile_r.style.backgroundColor = '#1fd137';
                  }
              
              }
          } else if (parseInt(pos[0]) === 9) { 
              if (parseInt(pos[1]) === 0) {        //up right corner
                  //light tile 91 and 80
                  tile_d = document.getElementById("id91");
                  tile_l = document.getElementById("id80");

                  if (tile_d.lastElementChild) {
                      tile_d.lastElementChild.id.slice(0,3) === team ? tile_d.style.backgroundColor = "blue" : tile_d.style.backgroundColor = 'red';
                  } else {
                      tile_d.style.backgroundColor = '#1fd137';
                  }
                  if (tile_l.lastElementChild) {
                      tile_l.lastElementChild.id.slice(0,3) === team ? tile_l.style.backgroundColor = "blue" : tile_l.style.backgroundColor = 'red';
                  } else {
                      tile_l.style.backgroundColor = '#1fd137';
                  }
              } else if (parseInt(pos[1]) === 9) { //down right corner
                  //light tile 98 and 89
                  tile_u = document.getElementById("id98");
                  tile_l = document.getElementById("id89");

                  if (tile_u.lastElementChild) {
                      tile_u.lastElementChild.id.slice(0,3) === team ? tile_u.style.backgroundColor = "blue" : tile_u.style.backgroundColor = 'red';
                  } else {
                      tile_u.style.backgroundColor = '#1fd137';
                  } if (tile_l.lastElementChild) {
                      tile_l.lastElementChild.id.slice(0,3) === team ? tile_l.style.backgroundColor = "blue" : tile_l.style.backgroundColor = 'red';
                  } else {
                      tile_l.style.backgroundColor = '#1fd137';
                  }
              } else {
                  //light up down left
                  console.log("ligth up down right");
                  tile_u = document.getElementById("id"+pos[0]+(parseInt(pos[1])-1));
                  tile_d = document.getElementById("id"+pos[0]+(parseInt(pos[1])+1));
                  tile_l = document.getElementById("id"+(parseInt(pos[0])-1)+pos[1]);

                  if (tile_u.lastElementChild) {
                      tile_u.lastElementChild.id.slice(0,3) === team ? tile_u.style.backgroundColor = "blue" : tile_u.style.backgroundColor = 'red';
                  } else {
                      tile_u.style.backgroundColor = '#1fd137';
                  }
                  if (tile_d.lastElementChild) {
                      tile_d.lastElementChild.id.slice(0,3) === team ? tile_d.style.backgroundColor = "blue" : tile_d.style.backgroundColor = 'red';
                  } else {
                      tile_d.style.backgroundColor = '#1fd137';
                  } 
                  if (tile_l.lastElementChild) {
                      tile_l.lastElementChild.id.slice(0,3) === team ? tile_l.style.backgroundColor = "blue" : tile_l.style.backgroundColor = 'red';
                  } else {
                      tile_l.style.backgroundColor = '#1fd137';
                  }
              }
          } else if (parseInt(pos[1]) === 0) { 
              //light down left right
              tile_d = document.getElementById("id"+pos[0]+(parseInt(pos[1])+1));
              tile_l = document.getElementById("id"+(parseInt(pos[0])-1)+pos[1]);
              tile_r = document.getElementById("id"+(parseInt(pos[0])+1)+pos[1]);

              if (tile_d.lastElementChild) {
                  tile_d.lastElementChild.id.slice(0,3) === team ? tile_d.style.backgroundColor = "blue" : tile_d.style.backgroundColor = 'red';
              } else {
                  tile_d.style.backgroundColor = '#1fd137';
              } 
              if (tile_l.lastElementChild) {
                  tile_l.lastElementChild.id.slice(0,3) === team ? tile_l.style.backgroundColor = "blue" : tile_l.style.backgroundColor = 'red';
              } else {
                  tile_l.style.backgroundColor = '#1fd137';
              }
              if (tile_r.lastElementChild) {
                  tile_r.lastElementChild.id.slice(0,3) === team ? tile_r.style.backgroundColor = "blue" : tile_r.style.backgroundColor = 'red';
              } else {
                  tile_r.style.backgroundColor = '#1fd137';
              }
          } else if (parseInt(pos[1]) === 9) { 
              //light up left right
              tile_u = document.getElementById("id"+pos[0]+(parseInt(pos[1])-1));
              tile_l = document.getElementById("id"+(parseInt(pos[0])-1)+pos[1]);
              tile_r = document.getElementById("id"+(parseInt(pos[0])+1)+pos[1]);

              if (tile_u.lastElementChild) {
                  tile_u.lastElementChild.id.slice(0,3) === team ? tile_u.style.backgroundColor = "blue" : tile_u.style.backgroundColor = 'red';
              } else {
                  tile_u.style.backgroundColor = '#1fd137';
              }
              if (tile_l.lastElementChild) {
                  tile_l.lastElementChild.id.slice(0,3) === team ? tile_l.style.backgroundColor = "blue" : tile_l.style.backgroundColor = 'red';
              } else {
                  tile_l.style.backgroundColor = '#1fd137';
              }
              if (tile_r.lastElementChild) {
                  tile_r.lastElementChild.id.slice(0,3) === team ? tile_r.style.backgroundColor = "blue" : tile_r.style.backgroundColor = 'red';
              } else {
                  tile_r.style.backgroundColor = '#1fd137';
              }
          } else {
              //light all 4 directions
              tile_u = document.getElementById("id"+pos[0]+(parseInt(pos[1])-1));
              tile_d = document.getElementById("id"+pos[0]+(parseInt(pos[1])+1));
              tile_l = document.getElementById("id"+(parseInt(pos[0])-1)+pos[1]);
              tile_r = document.getElementById("id"+(parseInt(pos[0])+1)+pos[1]);
              
              if (tile_u.lastElementChild) {
                  tile_u.lastElementChild.id.slice(0,3) === team ? tile_u.style.backgroundColor = "blue" : tile_u.style.backgroundColor = 'red';
                  if (tile_u.lastElementChild.className === "lake undefined") {tile_u.style.backgroundColor = "grey"}
              } else {
                  tile_u.style.backgroundColor = '#1fd137';
              }
              if (tile_d.lastElementChild) {
                  tile_d.lastElementChild.id.slice(0,3) === team ? tile_d.style.backgroundColor = "blue" : tile_d.style.backgroundColor = 'red';
                  if (tile_d.lastElementChild.className === "lake undefined") {tile_d.style.backgroundColor = "grey"}
              } else {
                  tile_d.style.backgroundColor = '#1fd137';
              } 
              if (tile_l.lastElementChild) {
                  tile_l.lastElementChild.id.slice(0,3) === team ? tile_l.style.backgroundColor = "blue" : tile_l.style.backgroundColor = 'red';
                  if (tile_l.lastElementChild.className === "lake undefined") {tile_l.style.backgroundColor = "grey"}
              } else {
                  tile_l.style.backgroundColor = '#1fd137';
              }
              if (tile_r.lastElementChild) {
                  tile_r.lastElementChild.id.slice(0,3) === team ? tile_r.style.backgroundColor = "blue" : tile_r.style.backgroundColor = 'red';
                  if (tile_r.lastElementChild.className === "lake undefined") {tile_r.style.backgroundColor = "grey"}
              } else {
                  tile_r.style.backgroundColor = '#1fd137';
              }
          } 

        } else if (elementToDrag.parentNode.parentNode.id === "piece_holder" && deploymentPhase === true) {
          console.log("Deploying piece");

        } else {
          console.log("error: something wrong on dragStart");
        }
          
          
          //Mouse Grab
          const X = e.clientX -30;
          const Y = e.clientY -30;
          elementToDrag.style.left = `${X}px`;
          elementToDrag.style.top = `${Y}px`;

      }
      
  }
  function _dragging (e) {
    e.preventDefault() 
    const board = document.getElementById("board");
  
      if (elementToDrag && elementToDrag.classList.contains("game_piece")) {
        
        //Mouse position
        const X = e.clientX -30;
        const Y = e.clientY -30;

        if (elementToDrag.parentNode.parentNode.id === "board") {
          
          //Board dimensions
          const minX = board.offsetLeft;
          const minY = board.offsetTop;
          const maxX = board.offsetLeft + 540;
          const maxY = board.offsetTop + 540;

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

        } else if (elementToDrag.parentNode.parentNode.className === "piece_holder") {
            
            elementToDrag.style.left = `${X}px`;
            elementToDrag.style.top = `${Y}px`;

        } else {
          console.log("error: something wrong on _dragging");
        }

          
      }
  
  }
  function dragEnd (e) {
    e.preventDefault() 
    if (elementToDrag) {        
        const board = document.getElementById("board");
        const id = elementToDrag.id;
        const team = id.slice(0, 3);
        const rank = id.slice(id.indexOf("-") + 1, id.lastIndexOf("-"));
        
        // Calculate mouse grid position
        const x = Math.floor((e.clientX - board.offsetLeft)/60);
        const y = Math.floor((e.clientY - board.offsetTop)/60);

        // --- Rules for moving and deploying ---
        const new_parent_tile = document.getElementById("id"+x+y);

        if (elementToDrag.parentNode.parentNode.id === "board") {
        
            //Set tile colors back to normal
            if (current_tile) {current_tile.style.backgroundColor = null;}
            if (tile_u) {tile_u.style.backgroundColor = null;}
            if (tile_d) {tile_d.style.backgroundColor = null;}
            if (tile_l) {tile_l.style.backgroundColor = null;}
            if (tile_r) {tile_r.style.backgroundColor = null;} 

                
            // --- Moving and attacking ---
            // Empty tile
            if (new_parent_tile.childElementCount === 0) {

                if (rules.isValidMove(parseInt(pos[0]), parseInt(pos[1]), x, y, parseInt(rank)) === true) {

                    if (rank != 2 && moves === 1) {
                        elementToDrag.style.left = `${parseInt(pos[0])*60 + board.offsetLeft}px`;
                        elementToDrag.style.top = `${parseInt(pos[1])*60 + board.offsetTop}px`;
                    } else if (rank === 2 && moves === 2) {
                        elementToDrag.style.left = `${parseInt(pos[0])*60 + board.offsetLeft}px`;
                        elementToDrag.style.top = `${parseInt(pos[1])*60 + board.offsetTop}px`;
                    } else {
                        new_parent_tile.appendChild(elementToDrag);
                        //Set piece position in the middle of selected tile
                        elementToDrag.style.left = `${x*60 + board.offsetLeft}px`;
                        elementToDrag.style.top = `${y*60 + board.offsetTop}px`;
                        console.log("Can go here! empty tile.");
                        console.log("room: " + room);
                        // Send to Server
                        socket.emit("movingPiece", {
                            roomId: room,
                            player1: player,
                            piece_id: elementToDrag.id,
                            tile_id: new_parent_tile.id,
                            x: x,
                            y: y,
                        });
                        
                        moves ++;

                        if (rank === 2 && moves === 2) {
                            // end turn 
                            console.log("soldier can only move 2 tiles max")
                            turn = false;
                            socket.emit("endTurn", {roomId: room, player1: player});
                        }
                    }                 

                } else {
                    console.log("cannot go here!");
                    elementToDrag.style.left = `${parseInt(pos[0])*60 + board.offsetLeft}px`;
                    elementToDrag.style.top = `${parseInt(pos[1])*60 + board.offsetTop}px`;
                }
            // Not empty tile    
            } else {

                if (rules.isValidMove(parseInt(pos[0]), parseInt(pos[1]), x, y, team) === true) {// Not empty
                
                    const parent_child = new_parent_tile.lastElementChild;
                    const id_adv = parent_child.id;
                    const team_adv = id_adv.slice(0, 3);
                    const rank_adv = id_adv.slice(id_adv.indexOf("-") + 1, id_adv.lastIndexOf("-"));
                    
                    // lake tile or ally tile
                    if (team_adv === team || parent_child.className === "lake") {
                        // Invalid move return x, y to previous place
                        console.log("cannot go here! ally or lake there!");
                        elementToDrag.style.left = `${parseInt(pos[0])*60 + board.offsetLeft}px`;
                        elementToDrag.style.top = `${parseInt(pos[1])*60 + board.offsetTop}px`;
                    } else { // Enemy tile 
                        console.log("attack command!");
                        
                        let attack_result = rules.attack(parseInt(rank), parseInt(rank_adv));

                        if (attack_result === 0) {
                            // Tie
                            elementToDrag.remove();
                            parent_child.remove();
                            
                            socket.emit("attack", {
                                roomId: room,
                                player1: player,
                                piece_id: elementToDrag.id,
                                adver_id: parent_child.id,
                                visibility: "none",
                                result: "tie",
                            });

                            turn = false;
                            socket.emit("endTurn", {roomId: room, player1: player});

                        } else if (attack_result === 1) {
                            // Won
                            elementToDrag.style.left = `${parseInt(pos[0])*60 + board.offsetLeft}px`;
                            elementToDrag.style.top = `${parseInt(pos[1])*60 + board.offsetTop}px`;
                            parent_child.remove();
                            
                            socket.emit("attack", {
                                roomId: room,
                                player1: player,
                                piece_id: elementToDrag.id,
                                adver_id: parent_child.id,
                                visibility: "player",
                                result: "win",
                            });
                            
                            let pieceImage = getPieceImg(id);
                            console.log('Show your piece to the adv!');
                            //elementToDrag.style.backgroundImage = `url(${pieceImage})`;
                            // Revert back background
                            setTimeout(() => {
                                //elementToDrag.style.backgroundImage = "url(./assets/images/enemy_icon.png)";
                            }, 2000);
                            turn = false;
                            socket.emit("endTurn", {roomId: room, player1: player});

                        } else if (attack_result === -1){
                            // Lost
                            elementToDrag.remove();

                            socket.emit("attack", {
                                roomId: room,
                                player1: player,
                                piece_id: elementToDrag.id,
                                adver_id: parent_child.id,
                                visibility: "adver",
                                result: "lost",
                            });

                            let pieceImage = getPieceImg(id_adv);
                            console.log('Adv show his piece to you');
                            parent_child.style.backgroundImage = `url(${pieceImage})`;
                            // Revert back background
                            setTimeout(() => {
                                parent_child.style.backgroundImage = "url(./assets/images/enemy_icon.png)";
                                }, 2000);
                            
                            turn = false;
                            socket.emit("endTurn", {roomId: room, player1: player});

                        } else { // Game Over: You Won
                            // Return piece to its position
                            elementToDrag.style.left = `${parseInt(pos[0])*60 + board.offsetLeft}px`;
                            elementToDrag.style.top = `${parseInt(pos[1])*60 + board.offsetTop}px`;
                            
                            socket.emit("GAME-OVER", {
                                roomId: room,
                                player1: player,
                            });
                            
                            console.log("game over!!! ");
                            console.log("player var: " + player);
                        }


                    }
                    //if child node of new parent tile enemy tile -> call attack 
                } else {
                    console.log("connot go here!");
                    elementToDrag.style.left = `${parseInt(pos[0])*60 + board.offsetLeft}px`;
                    elementToDrag.style.top = `${parseInt(pos[1])*60 + board.offsetTop}px`;
                }
            }  

        } else if (elementToDrag.parentNode.parentNode.className === "piece_holder") {
          // --- Deploying pieces ---
          //Empty tile
          if (new_parent_tile.childElementCount === 0) {

            if (rules.isValidPlacement(x, y, team) === true) {

                new_parent_tile.appendChild(elementToDrag);
                //Set piece position in the middle of selected tile
                elementToDrag.style.left = `${x*60 + board.offsetLeft}px`;
                elementToDrag.style.top = `${y*60 + board.offsetTop}px`;

                socket.emit("movingPiece", {
                    roomId: room,
                    player1: player,
                    piece_id: elementToDrag.id,
                    tile_id: new_parent_tile.id,
                    x: x,
                    y: y,
                  });

            } else {
                let holder;
                if (player) {
                    holder = document.getElementById("holder-red");
                    pos = current_tile.id.slice(2);
                    elementToDrag.style.left = `${parseInt(pos[0])*60 + holder.offsetLeft}px`;
                    elementToDrag.style.top = `${parseInt(pos[1])*60 + holder.offsetTop}px`;
                } else {
                    holder = document.getElementById("holder-blue");
                    pos = current_tile.id.slice(2);
                    elementToDrag.style.left = `${(parseInt(pos[0])-6)*60 + holder.offsetLeft}px`;
                    elementToDrag.style.top =  `${parseInt(pos[1])*60 + holder.offsetTop}px`;
                }
                console.log("cannot go here!");
                
            }
          //Not empty tile    
          } else {
              console.log("Tile already occupied!");       
          } 
          
        } else {
          console.log("error: something wrong on drag end");
        }
          
          elementToDrag = null;
      }
  }

  function getPieceImg(pieceId) {
    const img_pieces = ["./assets/images/flag.png", "./assets/images/spie.png","./assets/images/soldier.png", "./assets/images/corporal.png", 
    "./assets/images/sargent.png","./assets/images/liutenant.png", "./assets/images/captain.png", 
    "./assets/images/major.png", "./assets/images/colonel.png", "./assets/images/general.png",
    "./assets/images/5star_general.png", "./assets/images/bomb.png" ];
    
    let index = pieceId.slice(pieceId.indexOf("-") + 1, pieceId.lastIndexOf("-"));
    return img_pieces[index];
  }

  return (
    <div id="game" ref={gameRef}
      onMouseDown={e => dragStart(e)} 
      onMouseMove={e => _dragging(e)}
      onMouseUp={e => dragEnd(e)}
      >  
        <HolderRed/>
        <HolderBlue/>
        <Board/>
        <Buttons />
    </div>
  );

}

export default Game;

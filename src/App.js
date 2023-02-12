import './App.css';
import {io} from "socket.io-client";
import Board from './components/Board';
import Holder from './components/Holder';
import Buttons from './components/Buttons';
import Rules from "./components/Rules.js";
import {useEffect, useState} from 'react';


            // Todo list: 
            // - if player move but does not want to attack: button to attack or end turn???
            // - Players turns 
            // - Show pieces after attacking - 
            // - hide adversary pieces
            // - implement online (backend)
            // - adjust red light tiles next to lakes
            // - pieces deployement screen with timer and start game button
            // - game over screen showing all pieces and highlighting flag
            // - if player deploy where is not supposed to get back to piece holder
            // - Create AI for single player

// Connection to server
export const socket = io("http://localhost:2000");

socket.on("connect", () => {
    window.alert(`You connected to the server!\nYour id is: ${socket.id}`)
    socket.emit("custom-event", "heyooo");
  });

function App() {

  let elementToDrag = null;
  let current_tile, tile_u, tile_d, tile_l, tile_r = null;
  let pos;
  
  const rules = new Rules;
  
  useEffect(() => {
    
    socket.on("updateBoard", (data) => {
        console.log("Updating board...");
        console.log(data);
        updatePositions(data.piece_id, data.tile_id, data.x, data.y);
    }); 

    socket.on("updateAttack", (data) => {
        console.log("Updating attack board...");
        updateAttackResult(data.piece_id, data.adver_id, data.visibility, data.result);
    })

  }, [socket]);
  
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
        adver.remove();
    } else {
        console.log("tieee");
        piece.remove();
    }
  }

  // --- Move piece functions ---
  function dragStart (e) {
      
      elementToDrag = e.target;

      if (elementToDrag && elementToDrag.classList.contains("game_piece")) {

        const id = elementToDrag.id;
        const team = id.slice(0, 3);
        current_tile = elementToDrag.parentNode;

        if (elementToDrag.parentNode.parentNode.id === "board") {
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
              if (tile_r.lastElementChild) {
                  tile_r.lastElementChild.id.slice(0,3) === team ? tile_r.style.backgroundColor = "blue" : tile_r.style.backgroundColor = 'red';
              } else {
                  tile_r.style.backgroundColor = '#1fd137';
              }
          } 

        } else if (elementToDrag.parentNode.parentNode.id === "piece_holder") {
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

        } else if (elementToDrag.parentNode.parentNode.id === "piece_holder") {
            
            elementToDrag.style.left = `${X}px`;
            elementToDrag.style.top = `${Y}px`;

        } else {
          console.log("error: something wrong on _dragging");
        }

          
      }
  
  }
  function dragEnd (e) {

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

                  new_parent_tile.appendChild(elementToDrag);
                  //Set piece position in the middle of selected tile
                  elementToDrag.style.left = `${x*60 + board.offsetLeft}px`;
                  elementToDrag.style.top = `${y*60 + board.offsetTop}px`;
                  console.log("Can go here! empty tile.");
                  // Send to Server
                  socket.emit("movingPiece", {
                    piece_id: elementToDrag.id,
                    tile_id: new_parent_tile.id,
                    x: x,
                    y: y,
                  });

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
                            piece_id: elementToDrag.id,
                            adver_id: parent_child.id,
                            visibility: "none",
                            result: "tie",
                          });

                      } else if (attack_result === 1) {
                          // Won
                          elementToDrag.style.left = `${parseInt(pos[0])*60 + board.offsetLeft}px`;
                          elementToDrag.style.top = `${parseInt(pos[1])*60 + board.offsetTop}px`;
                          parent_child.remove();
                          
                          socket.emit("attack", {
                            piece_id: elementToDrag.id,
                            adver_id: parent_child.id,
                            visibility: "player",
                            result: "win",
                          });


                          //TODO: Show to the adversary your piece
                          setTimeout(() => {
                              console.log('Show your piece to the adv!');
                            }, 2000);
                          

                      } else {
                          
                          // Lost
                          elementToDrag.remove();

                          socket.emit("attack", {
                            piece_id: elementToDrag.id,
                            adver_id: parent_child.id,
                            visibility: "adver",
                            result: "lost",
                          });

                          //TODO: Show adversary piece to you
                          setTimeout(() => {
                              console.log('Adv show his piece to you!')
                          }, 2000);

                      }


                  }
                  //if child node of new parent tile enemy tile -> call attack 
              } else {
                  console.log("connot go here!");
                  elementToDrag.style.left = `${parseInt(pos[0])*60 + board.offsetLeft}px`;
                  elementToDrag.style.top = `${parseInt(pos[1])*60 + board.offsetTop}px`;
              }
          }  

        } else if (elementToDrag.parentNode.parentNode.id === "piece_holder") {
          // --- Deploying pieces ---
          //Empty tile
          if (new_parent_tile.childElementCount === 0) {

            if (rules.isValidPlacement(x, y, team) === true) {

                new_parent_tile.appendChild(elementToDrag);
                //Set piece position in the middle of selected tile
                elementToDrag.style.left = `${x*60 + board.offsetLeft}px`;
                elementToDrag.style.top = `${y*60 + board.offsetTop}px`;

            } else {
                console.log("cannot go here!");
                // elementToDrag.style.left = `${parseInt(pos[0])*60 + board.offsetLeft}px`;
                // elementToDrag.style.top = `${parseInt(pos[1])*60 + board.offsetTop}px`;
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


  return (
    <div id="app"
      onMouseDown={e => dragStart(e)} 
      onMouseMove={e => _dragging(e)}
      onMouseUp={e => dragEnd(e)}
      >
        <Holder/>
        <Board/>
        <Buttons/>
    </div>
  );
}

export default App;

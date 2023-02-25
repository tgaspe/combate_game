import { React, useEffect, useRef } from "react";
import {socket} from "../Game.jsx";
import { useNavigate } from "react-router-dom";
import "./pages.css";

function Lobby() {

    const inputRef = useRef();
    let navigate = useNavigate(); 
    
    function routeChange() { 
        let path = "/waiting-page"; 
        navigate(path);
    }

    function createRoom (e) {
        socket.emit("createRoom");
        routeChange();
    }

    function joinRoom (e) {
        const input = inputRef.current;
        
        socket.emit("joinRoom", {room: input.value});
        console.log("emmiting join room to server");
        input.value = "";
        routeChange();
    }

    
    
    return (
        <div id='lobby'>
            <div id="lobby-buttons">
                <h1>MATCHES</h1>
                <button id="create-room" onClick={e => createRoom(e)}>Create a Room</button>
                <button id="join-room" onClick={e => joinRoom(e)}>Join a Room</button>
                <input id='room_input' ref={inputRef} type="text"  />
            </div>
            <div id="rules">
                <h1>COMBATE GAME</h1>
                <h2>INSTRUCTIONS</h2>
                <ul>
                    <li>Click on the Create a Room button to your right</li>
                    <li>Share the room code to your friend </li>
                    <li>Your Friend should then copy the code in the join room field and click the button</li>
                </ul>
                <h3>GAME</h3>
                <p>The game Combate consists of a board of 10x10, and two teams (Red and Blue) each team has 40 pieces representing the different army ranks (soldier, corporal, sergeant, captain, blue-tenent, general, etc). The objective of the game is to capture the enemy flag before he captures yours, each player on its turn needs to move a piece and/or attack an enemy piece. The piece's rank determines the outcome of an attack, where the bigger rank kills the smaller rank with a few exceptions (spy & 5 star general, and corporal & bombs).<br /></p>
                <h3>DEPLOYMENT PHASE</h3>
                <p>Each player must deploy its troops before the game starts on any formation that they see fit according to their strategy. The Red player must deploy its troops on the first 4 rows of the board (from top to button) and the Blue player on the last 4 rows of the board. Once both players are done deploying, they must click the Start Game button to begin playing.</p>
                <h3>ATTACK</h3>
                <p>When a player decides to attack, the outcome is decided based on pieces’ rank. If both pieces have the same rank both die, if they are different, however, the piece with the bigger rank wins the attack. The two exceptions to the rule are: the spy that has a rank of one but when in combat with a 5 star General it kills it, and the corporal and a bomb, bombs kill any piece that dares to attack it, with the exception of the corporal who can disarm it.</p>
                <h3>RANKS</h3>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/spie.png" alt="" />
                    <ul>
                        <li><h3>Spy</h3></li>
                        <li>Rank: 1</li>
                        <li>Ability: Assassinates 5 Star General</li>
                    </ul>
                </div>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/soldier.png" alt="" />
                    <ul>
                        <li><h3>Soldier</h3></li>
                        <li>Rank: 2</li>
                        <li>Ability: Can walk 2 tiles in a turn</li>
                    </ul>
                </div>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/corporal.png" alt="" />
                    <ul>
                        <li><h3>Corporal</h3></li>
                        <li>Rank: 3</li>
                        <li>Ability: Can disarm bombs</li>
                    </ul>
                </div>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/sargent.png" alt="" />
                    <ul>
                        <li><h3>Sargent</h3></li>
                        <li>Rank: 4</li>
                        <li>Ability: None</li>
                    </ul>
                </div>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/liutenant.png" alt="" />
                    <ul>
                        <li><h3>Liutenant</h3></li>
                        <li>Rank: 5</li>
                        <li>Ability: Has a cool eye-patch</li>
                    </ul>
                </div>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/captain.png" alt="" />
                    <ul>
                        <li><h3>Captain</h3></li>
                        <li>Rank: 6</li>
                        <li>Ability: None</li>
                    </ul>
                </div>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/major.png" alt="" />
                    <ul>
                        <li><h3>Major</h3></li>
                        <li>Rank: 7</li>
                        <li>Ability: None</li>
                    </ul>
                </div>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/colonel.png" alt="" />
                    <ul>
                        <li><h3>Colonel</h3></li>
                        <li>Rank: 8</li>
                        <li>Ability: None</li>
                    </ul>
                </div>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/general.png" alt="" />
                    <ul>
                        <li><h3>General</h3></li>
                        <li>Rank: 9</li>
                        <li>Ability: None</li>
                    </ul>
                </div>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/5star_general.png" alt="" />
                    <ul>
                        <li><h3>5 Star General</h3></li>
                        <li>Rank: 10</li>
                        <li>Ability: Beats all ranks except for the spy</li>
                    </ul>
                </div>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/bomb.png" alt="" />
                    <ul>
                        <li><h3>Bombs</h3></li>
                        <li>Rank: None</li>
                        <li>Ability: Explodes!!!</li>
                        <li>Weekness: Corporal</li>
                    </ul>
                </div>
                <div className="rank">
                    <img className="pics-ranks" src="./assets/images/flag.png" alt="" />
                    <ul>
                        <li><h3>Flag</h3></li>
                        <li>Rank: None</li>
                        <li>Ability: Waves in the wind!</li>
                    </ul>
                </div> 
            </div>
        </div>
        
    );
}

export default Lobby;
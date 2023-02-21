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
                <h2>RULES:</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quod rerum recusandae ratione inventore dolorum facere qui consequuntur perferendis fugit, mollitia, dolorem adipisci velit error. Nulla distinctio asperiores similique reprehenderit.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, dicta similique commodi adipisci facere iure? Neque enim facere ipsum unde iusto odio cupiditate. Cupiditate soluta amet, magnam temporibus voluptate ad.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quod rerum recusandae ratione inventore dolorum facere qui consequuntur perferendis fugit, mollitia, dolorem adipisci velit error. Nulla distinctio asperiores similique reprehenderit.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, dicta similique commodi adipisci facere iure? Neque enim facere ipsum unde iusto odio cupiditate. Cupiditate soluta amet, magnam temporibus voluptate ad.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quod rerum recusandae ratione inventore dolorum facere qui consequuntur perferendis fugit, mollitia, dolorem adipisci velit error. Nulla distinctio asperiores similique reprehenderit.</p>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim, dicta similique commodi adipisci facere iure? Neque enim facere ipsum unde iusto odio cupiditate. Cupiditate soluta amet, magnam temporibus voluptate ad.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias numquam repudiandae provident corrupti dolore ullam fugiat laboriosam a iusto facilis commodi possimus magnam, fuga impedit inventore est soluta voluptatum ex.</p>
            </div>
        </div>
        
    );
}

export default Lobby;
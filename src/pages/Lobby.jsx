import { React, useEffect, useRef } from "react";
import {socket} from "../Game.jsx";
import { useNavigate } from "react-router-dom";

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
            <h1>this is the lobby</h1>
            <button onClick={e => createRoom(e)}>Create a Room</button>
            <input ref={inputRef} type="text" id='room_input' />
            <button onClick={e => joinRoom(e)}>Join a Room</button>
        </div>
        
    );
}

export default Lobby;
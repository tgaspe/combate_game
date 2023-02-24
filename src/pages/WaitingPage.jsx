import { React, useEffect, useRef } from "react";
import {socket} from "../Game.jsx";
import { useNavigate } from "react-router-dom";
import "./pages.css";

function WaitingPage() {
    
    let room;
    const waitingRef = useRef();
    let navigate = useNavigate(); 

    useEffect( () => {

        socket.on("newGame", (data) => {
            const waitingDiv = waitingRef.current;
            const div = document.createElement("div");
            const button = document.getElementById("copy-room");
            button.style.visibility = "visible";
            room = data.room;
            div.setAttribute("id", "room-code");
            div.innerHTML = room;
            console.log("wating for oppenent to join, please share this code: " + room);
            waitingDiv.append(div);
          });

        // Connection btw players
        socket.on("playersConnected", (data) => {
            console.log("Both Players Connected!");
            socket.emit("deployment-phase", data.room);
            routeChange("/game");
        });

        socket.on("error-joining", (data) => {
            console.log("Room does not exist: " + data.room);
            window.alert("Room does not exist: " + data.room);
            routeChange("/");
        });

    }, [socket]);

    
    
    function routeChange(path) { 
        navigate(path);
    }
    function copyRoom(e) {
        console.log("button cliked!");
        const button = e.target;
        button.innerHTML = "Copied!";
        button.style.backgroundColor = "red";
        navigator.clipboard.writeText(room);

    }

    return (
        <div id='waiting-page' ref={waitingRef}>
            <div id="waiting-text" ><p>Wating for opponent to join ...<br></br>Please share this code:</p></div>
            <button id="copy-room" onClick={e => copyRoom(e)}>Copy Room</button>
        </div>
        
    );
}

export default WaitingPage;
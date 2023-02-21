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
            room = data.room;
            div.innerHTML = "Please share this code: " + room;
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

    return (
        <div id='waiting-page' ref={waitingRef}>
            <div>Wating for oppenent to join ...</div>
        </div>
        
    );
}

export default WaitingPage;
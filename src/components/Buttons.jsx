import "./styles/Buttons.css";
import {socket} from "../Game.jsx";
import { useEffect, useRef } from "react";

export default function Buttons () {

    const chatInputRef = useRef();
    const chatTextRef = useRef();
    let roomId;

    function startGame (e) {
        // Hide Holders
        const element = e.target;
        const holders = document.getElementsByClassName("piece_holder");
        element.style.backgroundColor = "red";
        for (let i in holders) {
            holders[i].style.visibility = "hidden";
        }
        // Start Game
        socket.emit("start", {
            //implement here
            room: roomId,
        });

    }
    function endTurn (e) {
        console.log("End turn button clicked!");
        socket.emit("endTurn", {});
    }
    function sendText (e) {
        e.preventDefault();
        const chatInput = chatInputRef.current;
        console.log("sending msg to server...");
        socket.emit("sendMsgToServer", chatInput.value);
        chatInput.value = "";
    }
    
    useEffect(() => {
        socket.on("addToChat", (data) => {
            const chatText = chatTextRef.current;
            console.log("message received from server: adding to chat.");
            const div = document.createElement("div");
            div.innerHTML = data;
            chatText.append(div); 
        }); 

        socket.on("setPlayers", (data) => {
            roomId = data.room;
        });

        socket.on('End-Screen', (data) => {
            const chatText = chatTextRef.current;
            console.log("End Screen: Append to chat winner: " + data.winner);
            const div = document.createElement("div");
            if (data.winner) {
                div.innerHTML = "GAME-OVER!!!\nWinner: Red";
            } else {
                div.innerHTML = "GAME-OVER!!!\nWinner: Blue";
            }
            chatText.append(div);
        })

      }, [socket]);

    return (
        <div id="buttons">
            <button id="start_button" className="button" onClick={e => startGame(e)}>Start Game</button>
            <button id="turn_button" className="button" onClick={e => endTurn(e)}>End Turn</button>
            <div id="chat_box" ref={chatTextRef}>
                <div>Messages:</div>
            </div>
            <form id="chat_form" onSubmit={e => sendText(e)}>
                <input id="chat_input" type="text" ref={chatInputRef}></input>
            </form>
        </div>);
}
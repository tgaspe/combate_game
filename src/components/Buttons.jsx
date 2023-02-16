import "./styles/Buttons.css";
import {socket} from "../Game.jsx";
import { useEffect, useRef } from "react";

export default function Buttons () {

    const chatInputRef = useRef();
    const chatTextRef = useRef();
    let roomId;
    let player;

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
        const element = e.target;
        element.style.backgroundColor = "red";
        socket.emit("endTurn", {roomId: roomId, player1: player});
    }
    function sendText (e) {
        e.preventDefault();
        const chatInput = chatInputRef.current;
        console.log("sending msg to server...");
        //console.log("roomId: " + roomId + " player: " + player + " msg: " + chatInput.value);
        socket.emit("sendMsgToServer", {room: roomId, player1: player, msg: chatInput.value});
        chatInput.value = "";
    }
    
    useEffect(() => {

        socket.on("setPlayers", (data) => {
            console.log("set players received in buttons:")
            console.log(data);
            roomId = data.room;
            player = data.player1;
        });

        socket.on("addToChat", (data) => {
            const chatText = chatTextRef.current;
            console.log("message received from server: adding to chat.");
            const div = document.createElement("div");
            div.innerHTML = data;
            chatText.append(div); 
        }); 

        socket.on("newTurn", () => {
            const turnButton = document.getElementById("turn_button");
            turnButton.style.backgroundColor = 'rgb(29, 224, 15)';
        });

        socket.on('End-Screen', (data) => {
            const chatText = chatTextRef.current;
            console.log("End Screen: Append to chat winner: " + data);
            const div = document.createElement("div");
            if (data.winner) {
                div.innerHTML = "GAME-OVER! Red Won";
            } else {
                div.innerHTML = "GAME-OVER! Blue Won";
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
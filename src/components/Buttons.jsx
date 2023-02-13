import "./styles/Buttons.css";
import {socket} from "../Game.jsx";
import { useEffect, useRef } from "react";

export default function Buttons () {

    const chatInputRef = useRef();
    const chatTextRef = useRef();

    function startGame (e) {
        // Start Game
        const element = e.target;
        const holder = document.getElementById("piece_holder");
        //holder.remove();
        //element.style.display = "none";
        element.style.backgroundColor = "red";
        holder.style.visibility = "hidden";

        socket.emit("start", {
            player: "",
            socketId: socket.id,
        });

    }
    function endTurn (e) {
        console.log("End turn button clicked!");
        //End turn button must submit current board state to the other player
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
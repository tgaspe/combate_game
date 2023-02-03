
export default function Buttons () {

    function startGame (e) {
        //Start Game
        const element = e.target;
        const holder = document.getElementById("piece_holder");
        holder.remove();
        element.style.display = "none";
        holder.style.display = "none";
    }

    function endTurn (e) {
        console.log("End turn button clicked!");
    }

    return (
        <div id="buttons">
            <button id="start_button" onClick={e => startGame(e)}>Start Game</button>
            <button id="turn_button" onClick={e => endTurn(e)}>End Turn</button>
        </div>);
}
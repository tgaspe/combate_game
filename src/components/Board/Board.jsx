import React from "react";
import Tile from "../Tile/Tile";
import "./Board.css"

const horixontalAxis = [1,2,3,4,5,6,7,8,9,10].reverse();
const verticalAxis = ["a", "b", "c", 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

export default function Board() {

    let board = [];

    for (let i = 0; i < horixontalAxis.length; i++) {
        for (let j = 0; j < verticalAxis.length; j++) {
            let position = horixontalAxis[i].toString + "," + verticalAxis[j];
            let x = j;
            let y = i;

            board.push(<Tile pos={position} image={"./assets/images/5star_general.png"} x={x} y={y} />);

        }
    }

    return (<div id="board">{board}</div>);

}
import React from "react";
import "./Tile.css";
import Piece from "../Piece/Piece.js";

export default class Tile extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            tile_type: null,
            piece: null,
            position: this.props.position,
            image: this.props.image,
            x: this.props.x,
            y: this.props.y
        };
    }

    render () {
        
        //lake 1
        if (this.state.x == 2 && this.state.y == 4) {
            this.state.image = "./assets/images/lake1.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x == 3 && this.state.y == 4) {
            this.state.image = "./assets/images/lake2.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x == 2 && this.state.y == 5) {
            this.state.image = "./assets/images/lake3.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x == 3 && this.state.y == 5) {
            this.state.image = "./assets/images/lake4.png";
            this.state.tile_type = "lake";
        }
        //lake 2
        if (this.state.x == 6 && this.state.y == 4) {
            this.state.image = "./assets/images/lake1.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x == 7 && this.state.y == 4) {
            this.state.image = "./assets/images/lake2.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x == 6 && this.state.y == 5) {
            this.state.image = "./assets/images/lake3.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x == 7 && this.state.y == 5) {
            this.state.image = "./assets/images/lake4.png";
            this.state.tile_type = "lake";
        }

        return (<div className="tile" >
        <div className={this.state.tile_type} style={{background: `url(${this.state.image})`, backgroundRepeat: "no-repeat", backgroundSize: "59px", width: "59px", height: "59px"}}>{this.state.x},{this.state.y}</div>
        </div> );
    }
    
}

//
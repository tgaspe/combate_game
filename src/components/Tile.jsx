import React from "react";
import "./styles/Tile.css";


export default class Tile extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            index: this.key,
            piece_id: this.props.piece_id,
            tile_type: "game_piece",
            piece: null,
            position: this.props.pos,
            image: this.props.image,
            x: this.props.x,
            y: this.props.y,
        };
    }

    render () {
        
        // Lake 1
        if (this.state.x === 2 && this.state.y === 4) {
            this.state.image = "./assets/images/lake1.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x === 3 && this.state.y === 4) {
            this.state.image = "./assets/images/lake2.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x === 2 && this.state.y === 5) {
            this.state.image = "./assets/images/lake3.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x === 3 && this.state.y === 5) {
            this.state.image = "./assets/images/lake4.png";
            this.state.tile_type = "lake";
        }
        // Lake 2
        if (this.state.x === 6 && this.state.y === 4) {
            this.state.image = "./assets/images/lake2_1.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x === 7 && this.state.y === 4) {
            this.state.image = "./assets/images/lake2_2.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x === 6 && this.state.y === 5) {
            this.state.image = "./assets/images/lake2_3.png";
            this.state.tile_type = "lake";
        }
        if (this.state.x === 7 && this.state.y === 5) {
            this.state.image = "./assets/images/lake2_4.png";
            this.state.tile_type = "lake";
        }

        // Style for class
        const piece_style = {
            background: `url(${this.state.image})`, 
            backgroundRepeat: "no-repeat", 
            backgroundSize: "59px", 
            width: "59px", 
            height: "59px",
        }

        return (
        <div id={this.state.position} className="tile">
            {this.state.image !== null && 
            <div id={this.state.piece_id} className={this.state.tile_type} style={piece_style} >{this.state.x},{this.state.y}</div>
            }
        </div>);
    }  
}

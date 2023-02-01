import React from "react";
import "./Tile.css";
import Piece from "../Piece/Piece.js";


export default class Tile extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            index: this.props.key,
            piece_id: this.props.piece_id,
            tile_type: "game_piece",
            piece: null,
            position: this.props.pos,
            image: this.props.image,
            x: this.props.x,
            y: this.props.y,
            //Drag & Drop
            /*
            activePiece: null,
            diffX: 0,
            diffY: 0,
            dragging: false,
            styles: {}
            */
        };
        /*
        this.dragStart = this.dragStart.bind(this);
        this._dragging = this._dragging.bind(this);
        this.dragEnd = this.dragEnd.bind(this);
        */
    }

    /*
    dragStart (e) {
        
        const element = e.target;
        console.log(e.target);

        this.setState({
            activePiece: element,
            diffX: e.screenX - e.currentTarget.getBoundingClientRect().left,
            diffY: e.screenY - e.currentTarget.getBoundingClientRect().top,
            dragging: true
        });

        //element.style.position = "absolute";
        //element.style.left = `${this.state.diffX}px`;
        //element.style.top = `${this.state.diffY}px`;

    }

    _dragging (e) {

        //const element = e.target;
        //console.log(e.target);

        if (this.state.activePiece) {
            
            var left = e.screenX - this.state.diffX;
            var top = e.screenY - this.state.diffY;
            
            this.state.activePiece.style.left = `${left}px`;
            this.state.activePiece.style.top = `${top}px`;
        
        }
        
    }

    dragEnd () {
        this.setState({
            activePiece: null,
            dragging: false,
        })
    }
    */

    render () {
        
        //lake 1
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
        //lake 2
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

        //Style for class
        const piece_style = {
            background: `url(${this.state.image})`,
            backgroundRepeat: "no-repeat", 
            backgroundSize: "59px", 
            width: "59px", 
            height: "59px",

        }

        //let index = this.state.index;
    
        return (
        //onMouseDown={this.dragStart} onMouseMove={this._dragging} onMouseUp={this.dragEnd}
        <div id={this.state.position} className="tile">
            {this.state.image !== null && 
            <div id={this.state.piece_id} className={this.state.tile_type} style={piece_style} >{this.state.x},{this.state.y}</div>
            }
        </div> );
        //{background: `url(${this.state.image})`, backgroundRepeat: "no-repeat", backgroundSize: "59px", width: "59px", height: "59px"}
    }
    
}

//
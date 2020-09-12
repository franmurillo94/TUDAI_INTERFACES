import Point from './point.js';
import { TOOL_PINCEL, TOOL_GOMA } from "./tools.js";
import { getMouseCoordsOnCanvas } from "./utility.js";

export default class Paint {

    constructor(canvasID){
        this.canvas = document.getElementById(canvasID);
        this.context = canvas.getContext("2d");
    }

    set activeTool(tool) {
        this.tool = tool;
    }
    
    set activeColor(color) {
        this.color = color;
        this.context.strokeStyle = this.color;
        return console.log(this.color);
    }
    
    set activeGrosor(grosor) {
        this.grosor = grosor;
        this.context.lineWidth = this.grosor;
        return console.log(this.grosor);
    }

    init(){
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e){

        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp(e);

        //console.log(e.clientX, e.clientY);
        //console.log(getMouseCoordsOnCanvas(e, this.canvas));
        this.startPos = getMouseCoordsOnCanvas(e,this.canvas);

        if(this.tool == TOOL_PINCEL){
            this.context.moveTo(this.startPos.x,this.startPos.y);
        }
        else if(this.tool == TOOL_GOMA){
            this.context.clearRect(this.startPos.x, this.startPos.y,20,20);
        }
    }

    onMouseMove(e){

        this.currentPos = getMouseCoordsOnCanvas(e,this.canvas);
        console.log(this.currentPos);

        switch(this.tool){
            case TOOL_PINCEL:
                this.drawFreeLine();
                break;
            case TOOL_GOMA:
                this.context.clearRect(this.currentPos.x,this.currentPos.y,20,20);
                break;
            default:
        }
    }

    onMouseUp(e){

        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }

    drawFreeLine(){
        this.context.lineTo(this.currentPos.x,this.currentPos.y);
        this.context.stroke();
    }
}
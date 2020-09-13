
import { TOOL_PINCEL, TOOL_GOMA } from "./tools.js";
import { getMouseCoordenadas } from "./utility.js";

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
        this.coord_inicio = getMouseCoordenadas(e,this.canvas);

        if(this.tool == TOOL_PINCEL){
            this.context.beginPath();
            this.context.moveTo(this.coord_inicio.x,this.coord_inicio.y);
        }
        else if(this.tool == TOOL_GOMA){
            this.context.clearRect(this.coord_inicio.x, this.coord_inicio.y,20,20);
        }
    }

    onMouseMove(e){

        this.coord_actual = getMouseCoordenadas(e,this.canvas);
        //console.log(this.currentPos);

        switch(this.tool){
            case TOOL_PINCEL:
                this.dibujar();
                break;
            case TOOL_GOMA:
                this.context.clearRect(this.coord_actual.x,this.coord_actual.y,20,20);
                break;
            default:
        }
    }

    onMouseUp(e){

        if(this.tool == TOOL_PINCEL){
            this.context.beginPath();
        }
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }

    dibujar(){
        this.context.lineTo(this.coord_actual.x,this.coord_actual.y);
        this.context.stroke();
    }
}
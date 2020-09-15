
import { TOOL_PINCEL, TOOL_GOMA } from "./tools.js";

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
        //return console.log(this.color);
    }
    
    set activeGrosor(grosor) {
        this.grosor = grosor;
        this.context.lineWidth = this.grosor;
        //return console.log(this.grosor);
    }

    init(){
        this.canvas.onmousedown = e => this.onMouseDown(e);
    }

    onMouseDown(e){

        this.canvas.onmousemove = e => this.onMouseMove(e);
        document.onmouseup = e => this.onMouseUp();

        //console.log(e.clientX, e.clientY);
        //console.log(getMouseCoordenadas(e, this.canvas));
        this.coord_inicio = getMouseCoordenadas(e,this.canvas);

        if(this.tool == TOOL_PINCEL){
            this.context.beginPath();
            this.context.moveTo(this.coord_inicio.x,this.coord_inicio.y);
        }
        else if(this.tool == TOOL_GOMA){
            this.context.clearRect(this.coord_inicio.x, this.coord_inicio.y,this.grosor*3,this.grosor*3);
        }
    }

    onMouseMove(e){

        this.coord_actual = getMouseCoordenadas(e,this.canvas);
        //console.log(this.coord_actual);

        switch(this.tool){
            case TOOL_PINCEL:
                this.dibujar();
                break;
            case TOOL_GOMA:
                this.context.clearRect(this.coord_actual.x,this.coord_actual.y,this.grosor*3,this.grosor*3);
                break;
            default:
        }
    }

    onMouseUp(){

        if(this.tool == TOOL_PINCEL){
            this.context.closePath();
        }
        this.canvas.onmousemove = null;
        document.onmouseup = null;
    }

    dibujar(){
        this.context.lineTo(this.coord_actual.x,this.coord_actual.y);
        this.context.stroke();
    }
}

// devuelve coordenadas actual (x, y)
function getMouseCoordenadas(e,canvas){
    
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return new Punto(x,y);
}

class Punto{

    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}
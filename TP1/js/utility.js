import Point from './point.js'

export function getMouseCoordsOnCanvas(e,canvas){
    
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return new Point(x,y);
}
import Punto from './punto.js'

export function getMouseCoordenadas(e,canvas){
    
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    return new Punto(x,y);
}


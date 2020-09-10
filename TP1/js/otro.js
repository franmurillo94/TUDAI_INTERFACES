// funcion valores radio button
function getRadioValue(name){
    for (var i = 0; i < document.getElementsByName(name).length; i++){
        if (document.getElementsByName(name)[i].checked){
            return document.getElementsByName(name)[i].value;
        }
    }
}
// obtiene valores de los radio paint-tool
let paint_tool = getRadioValue('paint-tool');

// canvas color blanco
ctx.fillStyle = 'rgba(255,255,255,1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);
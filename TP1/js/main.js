"use strict"

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
// muestra y oculta barra de herramientas 'filtros'
let filter_tools = document.querySelector('.filter-btn').addEventListener('click',function() {
    document.getElementById('filter-toggle').classList.toggle('active')
});
// canvas y contexto
let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext('2d');
// canvas color blanco
ctx.fillStyle = 'rgba(255,255,255,1)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

let input = document.querySelector('.file');

input.onchange = e => {

    // getting a hold of the file reference
    let file = e.target.files[0];

    // setting up the reader
    let reader = new FileReader();
    reader.readAsDataURL(file); // this is reading as data url

    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
        let content = readerEvent.target.result; // this is the content!

        let image = new Image();
        //image.crossOrigin = 'Anonymous';

        image.src = content;

        image.onload = function () {
          /*   let imageAspectRatio = (1.0 * this.height) / this.width;
            let imageScaledWidth = canvas.width;
            let imageScaledHeight = canvas.width * imageAspectRatio; */
            console.log(this.height);
            console.log(this.width);
            canvas.width = this.width;
            canvas.height = this.height;
            // draw image on canvas
            ctx.drawImage(this, 0, 0, this.width, this.height);

            // get imageData from content of canvas
            let imageData = ctx.getImageData(0, 0, this.width, this.height);

            // modify imageData
   /*          for (let j = 0; j < imageData.height; j++) {
                for (let i = 0; i < imageData.width; i++) {
                    if (i % 2 == 0) {
                        let index = (i + imageData.width * j) * 4;
                        imageData.data[index + 0] = 0;
                        imageData.data[index + 1] = 0;
                        imageData.data[index + 2] = 0;
                    }
                }
            } */
            
            // draw the modified image
            ctx.putImageData(imageData, 0, 0);
        }
    }
}
let btn_download = document.getElementById('download_btn').addEventListener('click',download);

function download(){
    let download = document.getElementById("download");
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);

}

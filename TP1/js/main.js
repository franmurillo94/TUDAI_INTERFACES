"use strict"

import Paint from './paint.js';

let paint = new Paint("canvas");
paint.init();

// se agrega funcionalidad a las paint-tools
document.querySelectorAll("[data-tool]").forEach(
    item => {
        item.addEventListener("click", e => {
            if (document.querySelector("[data-tool].active-tool") != null) {
                document.querySelector("[data-tool].active-tool").classList.toggle("active-tool");
            }
            item.classList.add("active-tool");

            let active_tool = item.getAttribute('data-tool');
            paint.activeTool = active_tool;
        })
    }
);
// onchange a los input para setear color y grosor
document.getElementById("color").onchange = () => set_color();
document.getElementById("grosor").onchange = () => set_grosor();

// muestra y oculta barra de herramientas 'filtros'
document.querySelector('.filter-btn').addEventListener('click', function () {
    document.getElementById('filter-toggle').classList.toggle('active')
});

// canvas y contexto
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');

let data_copia;
clean_canvas();


// cargar imagen de disco
let input = document.querySelector('.file');
input.onchange = e => {

    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = readerEvent => {
        let content = readerEvent.target.result;
        let image = new Image();

        image.src = content;
        image.onload = function () {
            //console.log(this.height);
            //console.log(this.width);
            canvas.width = this.width;
            canvas.height = this.height;

            ctx.drawImage(this, 0, 0, this.width, this.height);

            let imageData = ctx.getImageData(0, 0, this.width, this.height);
            // se hace copia de la imageData de la imagen
            let imageDataCopy = new ImageData(new Uint8ClampedArray(imageData.data), imageData.width, imageData.height);
            data_copia = imageDataCopy;
            ctx.putImageData(imageData, 0, 0);
            // se setea grosor y color
            set_grosor(); set_color();
        }
    }
}
// limpiar canvas
document.getElementById('clean-canvas').addEventListener('click', clean_canvas);
function clean_canvas() {
    canvas.width = 500;
    canvas.height = 300;
    let imageData = ctx.createImageData(canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i + 0] = 255;
        imageData.data[i + 1] = 255;
        imageData.data[i + 2] = 255;
        imageData.data[i + 3] = 255;
    }
    data_copia = imageData;
    ctx.putImageData(imageData, 0, 0);
    set_grosor(); set_color();
}

// descargar
document.getElementById('download_btn').addEventListener('click', download);
function download() {
    let download = document.getElementById("download");
    let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}
// set grosor y set color del objeto paint
function set_grosor() {
    let grosor = document.getElementById("grosor").value;
    paint.activeGrosor = grosor;
}
function set_color() {
    let color = document.getElementById("color").value;
    paint.activeColor = color;
}
// filtros
document.getElementById("sepia").addEventListener('click', function () {
    aSepia(canvas, ctx)
});
document.getElementById("negativo").addEventListener('click', function () {
    aNegativo(canvas, ctx)
});
document.getElementById("binarizacion").addEventListener('click', function () {
    aBinarizacion(canvas, ctx)
});
document.getElementById("gris").addEventListener('click', function () {
    aGris(canvas, ctx)
});
//document.getElementById("negativo").addEventListener('click', aInvertir(canvas,ctx));

// filtros
function aSepia(canvas, ctx) {
    //console.log("sepia");
    let restauracion = ctx.putImageData(data_copia, 0, 0);
    let data_img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = data_img.data;

    for (let x = 0; x < data.length; x += 4) {
        data[x] = data[x] * 0.393 + data[x + 1] * 0.769 + data[x + 2] * 0.189;
        data[x + 1] = data[x] * 0.393 + data[x + 1] * 0.686 + data[x + 2] * 0.168;
        data[x + 2] = data[x] * 0.272 + data[x + 1] * 0.534 + data[x + 2] * 0.131;
    }
    ctx.putImageData(data_img, 0, 0);
}
function aGris(canvas, ctx) {
    //console.log("sepia");
    let restauracion = ctx.putImageData(data_copia, 0, 0);
    let data_img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = data_img.data;
    let aux;

    for (let x = 0; x < data.length; x += 4) {
        aux = (data[x]+data[x+1]+data[x+2])/3;
        data[x] = aux;
        data[x + 1] = aux;
        data[x + 2] = aux;
    }
    ctx.putImageData(data_img, 0, 0);
}
function aNegativo(canvas, ctx) {
    //console.log("negativo");
    let restauracion = ctx.putImageData(data_copia, 0, 0);
    let data_img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = data_img.data;

    for (let x = 0; x < data.length; x += 4) {
        data[x] = 255 - data[x];
        data[x + 1] = 255 - data[x + 1];
        data[x + 2] = 255 - data[x + 2];
    }
    ctx.putImageData(data_img, 0, 0);
}
function aBinarizacion(canvas, ctx) {
    //console.log("binarizacion");
    let restauracion = ctx.putImageData(data_copia, 0, 0);
    let data_img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = data_img.data;

    for (let x = 0; x < data.length; x += 4) {
        let aux;
        let gris = (data[x] + data[x + 1] + data[x + 2]) / 3;
        if (127.5 <= gris) {
            aux = 255;
        }
        else {
            aux = 0;
        }
        data[x] = aux;
        data[x + 1] = aux;
        data[x + 2] = aux;
    }
    ctx.putImageData(data_img, 0, 0);
}

//let contraste = document.getElementById("contraste");
let brillo = document.getElementById("brillo");

//contraste.onchange = () => { aContraste(); }
brillo.onchange = () => { aBrillo(); }

function aBrillo() {
    let restauracion = ctx.putImageData(data_copia, 0, 0);
    let value = brillo.value * 0.7;
    let data_img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = data_img.data;

    //console.log(value);
    for (let x = 0; x < data.length; x += 4) {
        {
            data[x] = Math.trunc(value + data[x]);
            data[x + 1] = Math.trunc(value + data[x + 1]);
            data[x + 2] = Math.trunc(value + data[x + 2]);
        }
    }
    ctx.putImageData(data_img, 0, 0);
}

let saturacion = document.getElementById("saturacion");

saturacion.onchange = () => { aSaturacion(); }

function aSaturacion() {
    let restauracion = ctx.putImageData(data_copia, 0, 0);
    let value = saturacion.value*0.5;
    let data_img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = data_img.data;
    let color;

    //console.log(value);
    for (let x = 0; x < data.length; x += 4) {
        color = color_principal(data[x], data[x + 1], data[x + 2]);
        switch(color) {
            case 0:
                data[x] =  Math.trunc(data[x]+value);
                data[x + 1] = Math.trunc(data[x + 1]-value);
                data[x + 2] = Math.trunc(data[x + 2]-value);
                break;
            case 1:
                data[x] = Math.trunc(data[x]-value);
                data[x + 1] = Math.trunc(data[x + 1]+value);
                data[x + 2] = Math.trunc(data[x + 2]-value);
                break;
            case 2:
                data[x] = Math.trunc(data[x]-value);
                data[x + 1] = Math.trunc(data[x + 1]-value);
                data[x + 2] = Math.trunc(data[x + 2]+value);
                break;
            default:
        }
    }
    ctx.putImageData(data_img, 0, 0);
}

function color_principal(r, g, b) {
    if (r > b && r > g) {
        return 0;
    }
    else if (g > r && g > b) {
        return 1;
    }
    else if (b > r && b > g) {
        return 2;
    }
    else return -1;
}
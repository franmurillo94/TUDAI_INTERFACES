"use strict"

function getRadioValue(name){
    for (var i = 0; i < document.getElementsByName(name).length; i++){
        if (document.getElementsByName(name)[i].checked){
            return document.getElementsByName(name)[i].value;
        }
    }
}

let paint_tool = getRadioValue('paint-tool');
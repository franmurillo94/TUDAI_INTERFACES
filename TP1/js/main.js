"use strict"

function getRadioValue(name){
    for (var i = 0; i < document.getElementsByName(name).length; i++){
        if (document.getElementsByName(name)[i].checked){
            return document.getElementsByName(name)[i].value;
        }
    }
}

let paint_tool = getRadioValue('paint-tool');

let filter_tools = document.querySelector('.filter-btn').addEventListener('click',function() {
    document.getElementById('filter-toggle').classList.toggle('active')
});
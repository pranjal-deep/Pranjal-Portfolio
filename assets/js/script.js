// window.addEventListener('DOMContentLoaded', function(){
//     function openNav(){
//         $("#mySideNav").addClass("openMenu");
//     }
    
//     function closeNav(){
//         $("#mySideNav").removeClass("openMenu");
//     }
// })


// import data from 'data.json';

// var data = require('data.json');


var actual_JSON;

window.addEventListener('DOMContentLoaded', function () {
    // loadData();
    init();
});

function loadData(){
    // console.log("hi");
    $.getJSON("data.json",function(data) {
        // console.log(data);
        generateWebsites(data);
    })

    function generateWebsites(data) {
        let source = $("#website-template").html();
        // console.log(source);
        let template = Handlebars.compile(source);
        let result = template(data);
        // console.log(result);
        
        let list = $(".projects-list");
        list.append(result);
    }
}

function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
    // xobj.overrideMimeType("application/json");
    xobj.open('GET', '/assets/js/data.json', true);
    xobj.responseType = 'json';
    xobj.send();

    xobj.onload = function(){}


    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function init() {
    loadJSON(function(response) {
     // Parse JSON string into object
       actual_JSON = JSON.parse(response);
    });
}

console.log(actual_JSON);


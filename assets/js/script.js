// window.addEventListener('DOMContentLoaded', function(){
//     function openNav(){
//         $("#mySideNav").addClass("openMenu");
//     }
    
//     function closeNav(){
//         $("#mySideNav").removeClass("openMenu");
//     }
// })

window.addEventListener('DOMContentLoaded', function () {
    loadData();
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


var mm = 0;
var hemisphere = "";
var cSeason;

var seasonList = {
  spring: {nextSeason: 'summer', photos:[], descriptions:[]},
  summer: {nextSeason: 'autumn', photos:[], descriptions:[]},
  // endOfSummer: {nextSeason: 'endOfSummer', photos:[], descriptions:[]},
  autumn: {nextSeason: 'winter',photo:[], description:[]},
  winter: {nextSeason: 'spring',photo:[], description:[]},
};

var handlers = {
    init: function(){
      if ( localStorage.length === 0 ) {
        hemisphere = "North";
        $("#fs").prop( "checked", true );
        //$('#fs').flipswitch( "refresh" ) ;  // set flipswitch to northern
      }
      else {
        hemisphere = localStorage.getItem('sphere');
        if ( hemisphere === "North") {
          $("#fs").prop( "checked", true ) ;  // set flipswitch to northern
        } else {
          $("#fs").prop( "checked", false ) ;  // set flipswitch to southern
        }
      }
    },

    isMonth: function(){
      var today = new Date();
      return today.getMonth()+1;
    },
    getSeason: function(month){
      switch (month) {
        case 3: case 4: case 5:
        return (hemisphere == "North") ? "spring" : "autumn";
        break;
        case 6: case 7: case 8:
        return (hemisphere == "North") ? "summer" : "winter";
        break;
        case 9: case 10: case 11:
        return (hemisphere == "North") ? "autumn" : "spring" ;
        break;
        case 12: case 1: case 2:
        return (hemisphere == "North") ? "winter" : "summer";
        break;
        default:
          return "error";
      }

    }, // END OF getSeason

    setUpEventListeners: function() {
      var toggleSwitch = document.getElementById("fs");
      //console.log(hemisphere);
      toggleSwitch.addEventListener('change', function(){
        if ( hemisphere == "North") {  // was in Northern position
           // hemisphere will not change if toggle to south and back to north within 0.2 second
          setTimeout(function(){
                if (toggleSwitch.checked == true ){
                  //console.log("in North position and switch to south and back!!");
                  return; // do nothing
                }else{
                  hemisphere = "South";
                  // console.log(hemisphere);
                  cSeason = handlers.getSeason(mm);
                  // console.log(cSeason);
                  view.season(cSeason);
                  $("#season").text(cSeason.toUpperCase());
                  localStorage.setItem('sphere', hemisphere);
                  return;
                }
          }, 200); // 0.2 second delay
        }
        if ( hemisphere == "South") {  // was in Southern position
          setTimeout(function(){
                if (toggleSwitch.checked == false ){
                  //console.log("in South position and switch to North and back!!");
                  return;  // do nothing
                }else{
                  hemisphere = "North";
                  // console.log(hemisphere);
                  cSeason = handlers.getSeason(mm);
                  // console.log(cSeason);
                  view.season(cSeason);
                  $("#season").text(cSeason.toUpperCase());
                  localStorage.setItem('sphere', hemisphere);
                  return;
                }
          }, 200); // 0.2 second delay
        }

      }); //END OF addEventListener function
    }  // END OF setUpEventListeners
}  //END OF handlers class

var view = {
  season: function(theSeason){
    cSeason = theSeason;
    var htmlFile = theSeason + '.html';
    $("#season").text(theSeason.toUpperCase());
    $("#currentSeason").load("./html/seasons/" + htmlFile);
  }, 
  showPoint: function(location, pointName){
      var htmlFile = pointName + '.html';
      $("#" + location).load("./html/Points/" + htmlFile);
    }
}; // End of view

$(document).ready(function(){
    handlers.init();
    mm = handlers.isMonth();
    handlers.setUpEventListeners();
    cSeason = handlers.getSeason(mm);
    view.season(cSeason);
    $("#season").text(cSeason.toUpperCase());
});

// // When the user scrolls the page, execute myFunction 
// window.onscroll = function() {myFunction()};

// // Get the navbar
// var navbar = document.getElementById("navbar");

// // Get the offset position of the navbar
// var sticky = navbar.offsetTop;

// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }
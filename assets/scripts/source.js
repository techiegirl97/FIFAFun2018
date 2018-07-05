/* 
FIFA Page created by Christina Fleming 6/26/2018
Dependencies include 
"angular.min.js" (needed for football api),
"angular-footballdata-api-factory.js" (the main football api) and 
"moment.js" (for date time parsing)
 */

//set up the background animation for the banner
//the fifa div is relative and the photo div is absolute   
var teamphoto = document.getElementById('teamphoto'); //the teamphoto box
var t = setInterval(move, 100); //set an interval of time for the photo movement
var dir = 1;// direction


//need a global empty array to work for bracket
//        var getTeamNames = localStorage['teams'];
        //$_SESSION['teams'] = json_encode(getTeamNames);



//need an array of images
//filename - width - height
var arr = [
    ['netherlands.jpg', 652, 366],
    ['neth2.jpg', 960, 540],
    ['neth3.jpg', 960, 540],
    ['neth4.jpg', 960, 540]
];

//select one photo from arr on page load; can play with a timer here
//get arr length
var arrLen = arr.length;
//console.log(arrLen);

//random select a photo from the array
var pic = Math.floor(Math.random() * arrLen);
//console.log(pic);

var filename = arr[pic][0]; // filename
//console.log(filename);

var width = arr[pic][1]; // width
//console.log(width);

var height = arr[pic][2]; // height
//console.log(height);

//even though siz2 isnt evaluated it still needs to be a num variable and not a string
//a default value is set for width based on smallest image in array
    function move(){
        if((width > 652 && dir ===1) || (width < 600 && dir === -1)) {
            dir*=-1; // switch direction
        }
        else {
            width += 1*dir;
            height += 1*dir;
            teamphoto.style.background = "url(images/" + filename + ")";
            teamphoto.style.backgroundSize = width+'px '+height+'px'; //creates a zoom in/out effect with the image
        }
    }; 


//another one to try
//http://worldcup.sfg.io


//World Cup API from - http://api.football-data.org 
//my key 13523f0f4fed4ba6a4271b47f9d82ce0
apiKey = '13523f0f4fed4ba6a4271b47f9d82ce0';
var app = angular.module("app", ['jtt_footballdata']);


//create the football object
app.controller('controller', ['$scope', 'footballdataFactory', function($scope, footballdataFactory) {

//get current Season tournaments from the API
    footballdataFactory.getSeasons({
        season: '2018',
        apiKey: apiKey
    }).then(function(_data){
        //stepping through the JSON data to find what we need
        //console.log(_data);                
        //console.log(_data.data);              
        //console.log(_data.data[0]);        
        //console.log(_data.data[0]["caption"]);//this is the tournament title we want
        
        var jsonString = _data.data;
        var jsonStringLen = jsonString.length;
        //console.log(jsonString);
        //console.log(jsonStringLen);
        
        //create a loop, write the result into the document for every available tournament
        document.getElementById("getSeasons").innerHTML = "<h2>Current FIFA Tournaments</h2>";
        for (x=0; x<jsonStringLen; x++){
            document.getElementById("getSeasons").innerHTML += jsonString[x]["caption"] + "<br/>";            
        };
    });    
 
//get the current season schedule from the API
    footballdataFactory.getFixturesBySeason({
        id: 467,
        apiKey: apiKey
    }).then(function(_data){
        var seasonData = _data.data["fixtures"];          
        //console.info(seasonData);
        
        var seasonDataLen = seasonData.length;
        //console.info(seasonDataLen);
                
        //create a loop, write out upcoming events
        document.getElementById("getFixtures").innerHTML = "<h2>Upcoming Schedule</h2>";
        for (y=0; y<seasonDataLen; y++){
            if(seasonData[y]["status"] === "TIMED" || seasonData[y]["status"] === "IN_PLAY"){
            document.getElementById("getFixtures").innerHTML += moment(seasonData[y]["date"]).format("YYYY-MM-DD") + " - " + seasonData[y]["homeTeamName"] + " vs " + seasonData[y]["awayTeamName"] + "<br/>";
        } else if (seasonData[y]["status"] === "SCHEDULED"){
            //document.getElementById("getFixtures").innerHTML += moment(seasonData[y]["date"]).format("YYYY-MM-DD") + " - " + seasonData[y]["homeTeamName"] + " vs " + seasonData[y]["awayTeamName"] + "<br/>";
                        
            //replace a blank team name with TBD
            if(seasonData[y]["homeTeamName"] === "" && seasonData[y]["awayTeamName"] === ""){
                document.getElementById("getFixtures").innerHTML += moment(seasonData[y]["date"]).format("YYYY-MM-DD") + " - " + "TBD" + " vs " + "TBD" + "<br/>";
            }else if(seasonData[y]["awayTeamName"] === ""){
                document.getElementById("getFixtures").innerHTML += moment(seasonData[y]["date"]).format("YYYY-MM-DD") + " - " + seasonData[y]["homeTeamName"] + " vs " + "TBD" + "<br/>";
            }else if (seasonData[y]["homeTeamName"] === ""){
                document.getElementById("getFixtures").innerHTML += moment(seasonData[y]["date"]).format("YYYY-MM-DD") + " - " + "TBD" + " vs " + seasonData[y]["awayTeamName"] + "<br/>";
            }else{           
            //write everything else
                document.getElementById("getFixtures").innerHTML += moment(seasonData[y]["date"]).format("YYYY-MM-DD") + " - " + seasonData[y]["homeTeamName"] + " vs " + seasonData[y]["awayTeamName"] + "<br/>";
                };
        }else if (seasonData[y]["status"] === "FINISHED"){
                //getLatestResult DIV
                //show the latest game results
                //try to re-order these DESC
                document.getElementById("getLatestResult").innerHTML += moment(seasonData[y]["date"]).format("YYYY-MM-DD") + " - " + seasonData[y]["homeTeamName"] + " (" + seasonData[y]["result"]["goalsHomeTeam"] + ")" + " vs " + seasonData[y]["awayTeamName"] + " (" + seasonData[y]["result"]["goalsAwayTeam"] + ")" + "<br/>";                                           
                


                
                
            };  
        }  
          
});
   //footballdatafactory is Angular    
    //build a team roster based on a selection box
        footballdataFactory.getPlayersByTeam({
        id: 5,
        apiKey: apiKey
    }).then(function(_data){
        //console.info("getPlayersByTeam", _data);
    });
    
        footballdataFactory.getTeam({
        id: 5,
        apiKey: apiKey
    }).then(function(_data){
        //console.info("getTeam", _data);
    });
    
        footballdataFactory.getTeamsBySeason({
        id: 467,
        apiKey: apiKey
    }).then(function(_data){
        //console.info("getTeamsBySeason", _data);
    });

}]);


            
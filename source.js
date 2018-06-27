/* 
FIFA Page created by Christina Fleming 6/26/2018
 */

//set up the background animation for the banner
//the fifa div is relative and the photo div is absolute
   
var teamphoto = document.getElementById('teamphoto'); //the teamphoto box
var t = setInterval(move, 100000); //set an interval of time for the movement
var dir = 1;// direction

//need an array of images
//filename width height
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
            teamphoto.style.background = "url(" + filename + ")";
            teamphoto.style.backgroundSize = width+'px '+height+'px'; //creates a heartbeat effect with the image
        }
    }; 


//another one to try
//http://worldcup.sfg.io


//include angular-footballdata-api-factory.js
//include open angular library for this API
//set up the API for stats
//http://api.football-data.org 
//my key 13523f0f4fed4ba6a4271b47f9d82ce0
apiKey = '13523f0f4fed4ba6a4271b47f9d82ce0';
var app = angular.module("app", ['jtt_footballdata']);
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
        document.getElementById("getSeasons").innerHTML = "<h2>Current FIFA Tournaments</h2>";
        for (x=0; x<jsonStringLen; x++){
            document.getElementById("getSeasons").innerHTML += jsonString[x]["caption"] + "<br/>";            
        };//format the data
    });

}]);
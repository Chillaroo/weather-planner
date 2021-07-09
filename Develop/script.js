//variable definitions
var APIKey= "eb145cf7d73a9a6af533438e5bc0b8ff";
var search= document.getElementById("search");
var currentCity;
var test= document.getElementById("test");

//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

function searchCity(event) {
    //prevent default refresh
    event.preventDefault();
    //store user input in variable
    currentCity= document.getElementById("city").value;
    //just a check to see if the above is working
    console.log(currentCity);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=" + APIKey;
    //fetch request
    fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log(data.name + "; Temperature: " + data.main.temp + " degrees Fahrenheit; Humidity: " + data.main.humidity + "%; Wind Speed: " + data.wind.speed + " mph; UV Index: ");
            //save latitude and longitude to be used as parameters in another fetch request           
            var lat= data.coord.lat;
            var lon= data.coord.lon;
            console.log(lat +" and "+ lon);

            var queryURL2 = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;

            //second fetch request
            fetch(queryURL2)
            .then(function(response){
                return response.json();
            })
            .then(function(data) {
                console.log(data);
            });
        });
    //call function to display search history and clear current search
};


//need a function to display search history and clear current search

//might want a feature to autocomplete city names

//when search button is clicked...
search.addEventListener("click", searchCity);
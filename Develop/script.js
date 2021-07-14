//variable definitions
var APIKey= "eb145cf7d73a9a6af533438e5bc0b8ff";
var search= document.getElementById("search");
var currentCity;
var dayInSeconds = 86400;
var cityName = document.getElementById("cityname");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uvi = document.getElementById("uvi");
var cityNames = localStorage.getItem("city names");
var searchList = $("#search-list");
var clear = document.getElementById("clear");

//parse cityNames as an array or assign it an empty array
if(cityNames){
    cityNames= JSON.parse(cityNames);
}
else{
    cityNames= [];
}

function searchCity(event) {
    //prevent default refresh
    event.preventDefault();
    //TODO - clear user input from search bar
    //store user input in variable
    currentCity= document.getElementById("city").value;
    //URL for API call using city name
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=" + APIKey;
    //fetch request using user specified city name
    fetch(queryURL)
    .then(function(response){
            return response.json();
            })
        .then(function(data) {
            //add a city name to the cityNames array
            if (data.name){
                    //only add unique entries to cityNames array
                    if(cityNames.includes(data.name)==false){
                    cityNames.push(data.name);
                    //store the array as a string in local storage
                    localStorage.setItem("city names", JSON.stringify(cityNames));
                    }
                //display city name
                cityName.textContent = data.name;
                //displace search history
                displaySearchHistory();
                //save latitude and longitude to be used as parameters in another fetch request           
                var lat= data.coord.lat;
                var lon= data.coord.lon;
                //query URL using lat and lon
                var queryURL2 = "http://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
                //fetch request using latitude and longitude from user specified city name
                fetch(queryURL2)
                .then(function(response){
                    return response.json();
                    })
                .then(function(data) {
                    //convert the date into a readable string
                    var currentDate = new Date(data.current.dt*1000);
                    var formatCurrentDate = currentDate.toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
                    //display current date
                    date.textContent = "(" + formatCurrentDate + ")";
                    //display current weather icon
                    img_home.innerHTML= '';
                    var img = new Image();
                    img.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png";
                    img_home.appendChild(img);
                    //display current weather data
                    temp.textContent = "Temp: " + data.current.temp + "° Fahrenheit";
                    humidity.textContent = "Humidity: " + data.current.humidity + "%";
                    wind.textContent = "Wind: " + data.current.wind_speed + " MPH"
                    uvi.textContent = "UV Index: " + data.current.uvi;
                    //display weather data for previous days
                    for(var i=1; i<6; i++){
                        currentDate = new Date(data.daily[i].dt*1000);
                        formatCurrentDate = currentDate.toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
                        //clear inner HTML
                        $("#"+i).empty();
                        //display weather info for 5 days in the future
                        $("#"+i).append("<p>"+ formatCurrentDate + "</p>");
                        $("#"+i).append("<img src = http://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + "@2x.png ></img>");
                        $("#"+i).append("<p>Temp: " + data.daily[i].temp.day + "° Fahrenheit</p>");
                        $("#"+i).append("<p>Humidity: " + data.daily[i].humidity + "%</p>");
                        $("#"+i).append("<p>Wind Speed: " + data.daily[i].wind_speed + " MPH</p>");
                        $("#"+i).append("<p>UV Index: " + data.daily[i].uvi + "</p>");
                    };
    
                });
            }
            else {
                alert("That's not a valid city name. Please try again.");
            }
        });
};

//displays search history
function displaySearchHistory() {
    
    searchList.empty();

    for(var i=0; i<cityNames.length; i++){
        searchList.append("<li>"+cityNames[i]+"</li>").on("click", console.log("Clicked on "+cityNames[i]));
    };
};

//might want a feature to autocomplete city names

//when search button is clicked...
search.addEventListener("click", searchCity);
//when clear button is clicked...
clear.addEventListener("click", function(){
    event.preventDefault();
    localStorage.clear();
    cityNames=[];
});
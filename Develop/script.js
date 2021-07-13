//variable definitions
var APIKey= "eb145cf7d73a9a6af533438e5bc0b8ff";
var search= document.getElementById("search");
var currentCity;
/* var test= document.getElementById("cityname"); */
var dayInSeconds = 86400;
var cityName = document.getElementById("cityname");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uvi = document.getElementById("uvi");

//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

function searchCity(event) {
    //prevent default refresh
    event.preventDefault();
    //store user input in variable
    currentCity= document.getElementById("city").value;

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=" + APIKey;
    //fetch request using user specified city name
    fetch(queryURL)
    .then(function(response){
            return response.json();
    })
        .then(function(data) {
            console.log(data);
            //log city name, temp, humidity, and wind speed
            console.log(data.name);
            cityName.textContent = data.name;
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
                console.log(data);
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
               
                for(var i=1; i<6; i++){
                    currentDate = new Date(data.daily[i].dt*1000);
                    formatCurrentDate = currentDate.toLocaleString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
                    //Display weather info for 5 days in the future
                    $("#"+i).append("<p>"+ formatCurrentDate + "</p>");
                    $("#"+i).append("<img src = 'http://openweathermap.org/img/wn/' + data.daily[i].weather[0].icon + '@2x.png ></img>");
                    $("#"+i).append("<p>Temp: " + data.daily[i].temp.day + "° Fahrenheit</p>");
                    $("#"+i).append("<p>Humidity: " + data.daily[i].humidity + "%</p>");
                    $("#"+i).append("<p>Wind Speed: " + data.daily[i].wind_speed + " MPH</p>");
                    $("#"+i).append("<p>UV Index: " + data.daily[i].uvi + "</p>");
                    //Just a check to see if the above is working
                    console.log("Date: " + formatCurrentDate);
                    console.log("Temperature: " + data.daily[i].temp.day + " degrees Fahrenheit"); 
                    console.log("Humidity: " + data.daily[i].humidity + "%"); 
                    console.log("Wind Speed: " + data.daily[i].wind_speed + " mph");
                    console.log("UV Index: " + data.daily[i].uvi);
                    console.log("Icon: " + data.daily[i].weather[0].icon);
                    console.log("Description: " + data.daily[i].weather[0].description);

                };
  
           });
        });
    //call function to display search history and clear current search
};

//need a function to display search history and clear current search

//might want a feature to autocomplete city names

//when search button is clicked...
search.addEventListener("click", searchCity);
//variable definitions
var APIKey= "eb145cf7d73a9a6af533438e5bc0b8ff";
var search= document.getElementById("search");
var currentCity;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + APIKey;


function searchCity(event) {
    //prevent default refresh
    event.preventDefault();
    //store user input in variable
    currentCity= document.getElementById("city").value;
    //just a check to see if the above is working
    console.log(currentCity);
    //fetch request
    fetch(queryURL)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
        });
    //call function to display search history and clear curent search
};


//need a function to display search history and clear current search

//might want a feature to autocomplete city names

//when search button is clicked...
search.addEventListener("click", searchCity);




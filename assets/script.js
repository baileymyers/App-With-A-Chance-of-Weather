/*
When user inputs city name and clicks search,
then the current weather and 5 day forecast are shown, while the city name is added as a button under the search history.
When the screen is refreshed,
then the search history is still shown
*/

$(".search-btn").on("click", function() {
    // let location = $(".search-input").val();
    // let apiKey = "387132af451fb4380aeaf30be323dfab";
    // let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;

    // console.log(location);
    // console.log(apiUrl);

    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Tacoma&appid=d3578c0285de5e61bde169ab3e1ff031";

    $.ajax({ url: apiUrl, method: "GET" }).then(function (response) {
            // const cityEl = $(".city");
            // const windEl = $(".wind");
            // const humidityEl = $(".humidity");
            // const tempEl = $(".temp");

            console.log(response);

            // cityEl.text(response.name);
            // windEl.text(response.wind.speed + "m/s");
            // humidityEl.text(response.main.humidity + "%");
            // tempEl.html(convertKtoF(parseFloat(response.main.temp)) + "&deg;F");
        });
    
    // function convertKtoF(tempInKelvin) {
    //     // (360K − 273.15) × 9/5 + 32 = 188.33°F
    //     return ((tempInKelvin - 273.15) * 9) / 5 + 32;
    //     };
})
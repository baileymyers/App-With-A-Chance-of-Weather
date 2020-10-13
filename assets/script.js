/*
When user inputs city name and clicks search,
then the current weather and 5 day forecast are shown, while the city name is added as a button under the search history.
When the screen is refreshed,
then the search history is still shown
*/

$("#searchBtn").on("click", function() {
    let location = $(".search-input").val();
    let apiKey = "387132af451fb4380aeaf30be323dfab";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&forecast?q=" + location + "&appid=" + apiKey;

    console.log(location);
    console.log(apiUrl);

    $.ajax({ url: apiUrl, method: "GET" }).then(function (response) {
            const cityEl = $(".city");
            const windEl = $(".wind");
            const humidityEl = $(".humidity");
            const tempEl = $(".temp");

            console.log(response);

            let city = cityEl.text(response.name);
            let date = moment().format(' (MMMM Do YYYY)');
            let cityDate = city.append(date);
            let icon = response.weather[0].icon;
            let iconUrl= "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            $('#wicon').attr('src', iconUrl);
            $('#wicon').attr('alt', "weather icon");
            windEl.text(response.wind.speed + "m/s");
            humidityEl.text(response.main.humidity + "%");
            tempEl.html(convertKtoF(parseFloat(response.main.temp)) + "&deg;F");
        });
    
    function convertKtoF(tempInKelvin) {
        // (360K − 273.15) × 9/5 + 32 = 188.33°F
        return ((tempInKelvin - 273.15) * 9) / 5 + 32;
        };
});
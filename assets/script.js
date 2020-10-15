/*
When user inputs city name and clicks search,
then the current weather and 5 day forecast are shown, while the city name is added as a button under the search history.
When the screen is refreshed,
then the search history is still shown
*/

$("#searchBtn").on("click", function() {
    let location = $(".search-input").val();
    let apiKey = "387132af451fb4380aeaf30be323dfab";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + apiKey;

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
            windEl.text("Wind: " + response.wind.speed + "m/s");
            humidityEl.text("Humidity: " + response.main.humidity + "%");
            tempEl.html("Temperature: " + convertKtoF(parseFloat(response.main.temp)) + "&deg;F");

            function convertKtoF(tempInKelvin) {
                // (360K − 273.15) × 9/5 + 32 = 188.33°F
                return ((tempInKelvin - 273.15) * 9) / 5 + 32;
                };

            let historyLocation = response.name;
            console.log(historyLocation);
            let historyDiv = $("<div>");
            let historyBtn = $("<button>").text(historyLocation);
            $(historyBtn).addClass("list-group-item list-group-item-action border border-secondary rounded-0");
            $(historyBtn).attr("type", "button");
            $(historyBtn).css("margin-top", "5px");
            $(historyBtn).val(historyLocation);
            historyDiv.append(historyBtn);
            $("#search-history-appears-here").prepend(historyDiv);

            let latitude = response.coord.lat;
            let longitude = response.coord.lon;

            console.log(latitude);
            console.log(longitude);

            // http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}

            let uvApiUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;

            let uviEl = $(".uv-index").val(0);

            $.ajax({ url: uvApiUrl, method: "GET" }).then(function (response) {
                console.log(response);
                // let uviEl = $(".uv-index");
                // let uviElValue = $(".uv-index").val();
                $(".uv-text").html("UV Index: ");
                uvIndex = uviEl.text(response.value);
                console.log(response.value);
            });

            console.log(uviEl);

        });

        // let uviElVal = $(".uv-index").val();
        // console.log(uviEl);
        // if (uviElVal <= 2) {
        //     document.getElementById("uv-index").style.backgroundColor = "green";
        //     document.getElementById("uv-index").style.color = "white";
        //     document.getElementById("uv-index").style.padding = "3px 5px";
        //     // console.log(uviElVal);
        //     $("#uv-index").addClass("rounded-lg");
        // } else if (uviElVal >= 3 && uviElVal <= 5) {
        //     document.getElementById("uv-index").style.backgroundColor = "yellow";
        // } else if (uviElVal >= 6 && uviElVal <= 7) {
        //     document.getElementById("uv-index").style.backgroundColor = "orange";
        // } else if (uviElVal >= 7.01 && uviElVal <= 10) {
        //     document.getElementById("uv-index").style.backgroundColor = "red";
        //     // console.log(uviElVal);
        // } else if (uviElVal >10) {
        //     document.getElementById("uv-index").style.backgroundColor = "purple";
        // }

        let forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + location + "&units=imperial" + "&appid=" + apiKey;

        $.ajax({ url: forecastUrl, method: "GET" }).then(function (response) {
            console.log(response);
            let forecastArr = response.list[0];
            
            let forecastDate = response.list.dt;
            console.log(forecastDate);
        });
});
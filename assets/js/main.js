
function invalidname() {
    alert("Invalid City");
}
// Functions for loading indicator
function showLoading() {
    document.querySelector(".lazy-loading").style.display = "flex";
}

function hideLoading() {
    document.querySelector(".lazy-loading").style.display = "none";
}

// Function for getting city from the input field
function updateWeather() {
    var city = document.getElementById("cityInput").value.trim();
    if (city) {
        console.log("Fetching weather for:", city);
        fetchWeather(city);
    }
    else {
        invalidname();
    }
}


// Function to fetch weather data
async function fetchWeather(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=e5583ddc48ce44858a8145320242404&q=${city}&days=8&aqi=no&alerts=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw alert('Invalid city name or network error');
        }
        const result = await response.json();

        // Check if the result contains valid data
        if (!result.location || !result.current) {
            throw new Error('Invalid data received from API');
        }
        console.log(result)
        // Extract weather data
        var location = result.location.name;
        var temperature = result.current.temp_c;
        var avg_temp = result.current.temp_c;
        var wind_kph = result.current.wind_kph;
        var cloudy = result.current.cloud;
        var feelslike_c = result.current.feelslike_c;
        var icon = result.current.condition.icon;
        var humidity = result.current.humidity;
        var time = result.current.last_updated;
        var status = result.current.condition.text;
        var day2 = result.forecast.forecastday[1];
        var day3 = result.forecast.forecastday[2];

        // for time and date it will extract time in 12-hour time format
        var time = new Date(result.current.last_updated);
        let day = time.getDate();
        let month = time.getMonth() + 1; // Months are zero-indexed (0-11)
        let year = time.getFullYear();

        let hours = time.getHours();
        let minutes = time.getMinutes().toString().padStart(2, '0');

        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'

        let formattedDate = `${day}/${month}/${year}`;
        let formattedTime = `${hours}:${minutes} ${ampm}`;
        let fullFormattedDateTime = `${formattedDate} ${formattedTime}`;
        // console.log(fullFormattedDateTime);

        // background according to weather conditions
        switch (status) {
            case 'Partly cloudy':
            case 'Cloudy':
            case 'Overcast':
                document.querySelector('body').style.backgroundImage = 'url("https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg")';
                break;
            case 'Sunny':
            case 'Clear':
                document.querySelector('body').style.backgroundImage = 'url("https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?cs=srgb&dl=pexels-tahir-shaw-50609-186980.jpg&fm=jpg")';
                break;
            case 'Light rain':
            case 'Moderate or heavy rain with thunder':
            case 'Patchy rain nearby':
                document.querySelector('body').style.backgroundImage = 'url("https://images.pexels.com/photos/2877066/pexels-photo-2877066.jpeg?auto=compress&cs=tinysrgb&w=600")';
                break;
            case 'Snowy':
                document.querySelector('body').style.backgroundImage = 'url("https://images.pexels.com/photos/3540375/pexels-photo-3540375.jpeg?auto=compress&cs=tinysrgb&w=600")';
                break;
            case 'Windy':
            case 'Mist':
                document.querySelector('body').style.backgroundImage = 'url("https://images.pexels.com/photos/2449543/pexels-photo-2449543.jpeg?auto=compress&cs=tinysrgb&w=600")';
                break;
            case 'Thunderstorm':
            case 'Lightning':
                document.querySelector('body').style.backgroundImage = 'url("https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&cs=tinysrgb&w=600")';
                break;
            default:
                document.querySelector('body').style.backgroundImage = 'url("https://images.pexels.com/photos/186980/pexels-photo-186980.jpeg?cs=srgb&dl=pexels-tahir-shaw-50609-186980.jpg&fm=jpg")';
                break;
        }



        // Update HTML with current weather data
        document.querySelector(".city_name").textContent = location;
        document.querySelector(".current_temp").textContent = temperature + "°C";
        document.querySelector(".avg_temp").textContent = avg_temp + "°C";
        document.querySelector(".windy").textContent = wind_kph + "km/h";
        document.querySelector(".cloudy").textContent = cloudy + "%";
        document.querySelector(".feels_like").textContent = feelslike_c + "°C";
        document.querySelector(".icon").src = icon;
        document.querySelector(".humidity").textContent = humidity + "%";
        document.querySelector(".time").textContent = fullFormattedDateTime;
        document.querySelector(".status").textContent = status;

        // Update HTML with forecast data
        document.querySelector('.day2-date').textContent = day2.date;
        document.querySelector('.day2-temp').textContent = `${day2.day.avgtemp_c}°C`;
        document.querySelector('.day2-condition').textContent = day2.day.condition.text;
        document.querySelector('.day2-icon').src = day2.day.condition.icon;

        document.querySelector('.day3-date').textContent = day3.date;
        document.querySelector('.day3-temp').textContent = `${day3.day.avgtemp_c}°C`;
        document.querySelector('.day3-condition').textContent = day3.day.condition.text;
        document.querySelector('.day3-icon').src = day3.day.condition.icon;
        hideLoading();
        // document.querySelector(".error-message").textContent = '';


    }
    catch (error) {
        hideLoading();
        // document.querySelector(".error-message").textContent = `Error: ${error.message}`;
        console.error("The error has been caught", error);
    }
}



// Fetch weather for  random cities on page load
const randomCities = ["London", "New York", "Tokyo", "Sydney", "Paris", "Karachi", "Multan", "Dubai", "Moscow", "Berlin", "Toronto"];
window.onload = function () {
    const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
    fetchWeather(randomCity);
};
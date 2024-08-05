document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=e5583ddc48ce44858a8145320242404&q=hyderabad%20sindh&days=8&aqi=no&alerts=no';

    async function fetchWeather(url) {
        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log(result); // Log the entire result to the console

            // Extract necessary weather data
            const current = result.current;
            const location = result.location;
            const forecast = result.forecast.forecastday[0];

            console.log('Current Weather:', current); // Log current weather data
            console.log('Location Data:', location); // Log location data
            console.log('Forecast Data:', forecast); // Log forecast data

            const { temp_c, humidity, wind_kph, condition, feelslike_c, cloud, is_day } = current;
            const { day } = forecast;
            const { avgtemp_c } = day;
            const iconUrl = condition.icon; // Get the weather icon URL

            // Log the extracted values to verify correctness
            console.log('Temperature:', temp_c);
            console.log('Average Temp:', avgtemp_c);
            console.log('Feels Like:', feelslike_c);
            console.log('Humidity:', humidity);
            console.log('Wind Speed:', wind_kph);
            console.log('Condition:', condition);
            console.log('Cloudiness:', cloud);
            console.log('Icon URL:', iconUrl);

            // Update HTML elements with fetched data
            document.querySelector('#current-temp').textContent = `${temp_c}°C`;
            document.querySelector('#weather-description').textContent = condition.text;
            document.querySelector('#avg-temp').textContent = `${avgtemp_c}°C`;
            document.querySelector('#feels-like').textContent = `${feelslike_c}°C`;
            document.querySelector('#humidity').textContent = `${humidity}%`;
            document.querySelector('#wind-speed').textContent = `${wind_kph} km/h`;
            document.querySelector('#cloudiness').textContent = `${cloud}%`;
            document.querySelector('#weather-icon').src = iconUrl; // Set the icon URL

            // Update location
            const locationElement = document.querySelector('#location');
            if (locationElement) {
                locationElement.textContent = `${location.name}, ${location.region}`;
            } else {
                console.error('Location element not found');
            }

            // Update time
            const time = new Date(current.last_updated);
            let hours = time.getHours();
            const minutes = time.getMinutes().toString().padStart(2, '0');
            const dayName = time.toLocaleDateString('en-US', { weekday: 'long' });
            const year = time.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'

            document.querySelector('#time').textContent = `${hours}:${minutes} ${ampm}`;
            document.querySelector('#day').textContent = dayName;
            document.querySelector('#year').textContent = year;

            // Update background based on weather description
            // const body = document.body;
            // switch (condition.text.toLowerCase()) {
            //     case 'sunny':
            //     case 'clear':
            //         body.style.backgroundImage = 'url(sunny.jpg)';
            //         break;
            //     case 'cloudy':
            //     case 'overcast':
            //         body.style.backgroundImage = 'url(https://www.adventurebikerider.com/wp-content/uploads/2017/10/tumblr_o27c7fByaO1tchrkco1_500.gif?_gl=1*19k6rld*_up*MQ..*_ga*OTYxMzgzNzI4LjE3MjIxOTgxNjA.*_ga_LVJDHLPXC0*MTcyMjE5ODE2MC4xLjAuMTcyMjE5ODE2MC4wLjAuMA..)';
            //         break;
            //     case 'rain':
            //     case 'rainy':
            //     case 'light rain':
            //     case 'patchy rain':
            //     case 'patchy rain nearby':
            //         body.style.backgroundImage = 'url(rain.jpg)';
            //         break;
            //     case 'snow':
            //     case 'snowy':
            //         body.style.backgroundImage = 'url(snow.jpg)';
            //         break;
            //     default:
            //         body.style.backgroundImage = 'url(default.jpg)';
            // }

            // Update background based on day or night
            // if (is_day) {
            //     body.style.backgroundColor = '#a0d3ff'; // Light blue for day
            // } else {
            //     body.style.backgroundColor = '#001f3f'; // Dark blue for night
            // }

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    // Fetch weather data on page load
    fetchWeather(url);

    // Form submission event listener to update weather based on location input
    document.querySelector('#location-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const locationInput = event.target.querySelector('input').value;
        const newUrl = `https://api.weatherapi.com/v1/forecast.json?key=e5583ddc48ce44858a8145320242404&q=${locationInput}&days=8&aqi=no&alerts=no`;

        fetchWeather(newUrl);
    });
});

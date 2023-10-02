document.addEventListener("DOMContentLoaded", () => {
    let contentContainer = document.getElementById("container");
    let search = document.getElementById("searchInput");
    let searchButton = document.getElementById("searchBtn");
    let error = document.getElementById("notFound");
    

    let city = 'Baku';

 
    function fetchWeatherData(cityName) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ca9d83af9825242f183b35ba821b3420&units=metric`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                showElement(data);
            })
            .catch(err => {
                console.error(err);
                showError();
            });
    }

	const weatherImages = {
  		"Clear": "./src/image/clear-day.png",
  		"Clouds": "./src/image/cloud.png", 
  		"Rain": "./src/image/rainy-day.png", 
  		"Thunderstorm": "./src/image/thunderstorm.png", 
  		"Snow": "./src/image/snowflake.png", 
  		"Mist": "./src/image/fog.png",
		"wind": "./src/image/wind.png",
};

    const defaultWeatherImage = "./src/image/cloudy-day.png";


    function showElement(data) {
        contentContainer.style.display = 'block';
        error.style.display = 'none';


        const temperature = data.main.temp.toFixed(1) + '°C';
    	const cityName = data.name;
    	const weatherDescription = data.weather[0].main;
    	const humidity = data.main.humidity + '%';
    	const windSpeed = data.wind.speed + ' m/s';
    
        const weatherImage = weatherImages[weatherDescription] || defaultWeatherImage;


        contentContainer.innerHTML = `
		<div class="all">
        <div id="weatherBox">
			<img src="${weatherImage}" alt="" />
          	<p class="temprature">${temperature}</p>
          	<p class="city">${cityName}</p>
        </div>

        <div id="weatherInfoBox">
          <h2>${weatherDescription}</h2>
          <div id="weatherInfo">
            <div class="humidity">
              <span>${humidity}</span>
              <p>Humidity</p>
            </div>
            <div class="wind">
              <i class="fa-solid fa-wind"></i>
              <p>${windSpeed}</p>
            </div>
          </div>
        </div>
      </div>
		`
    }

 
    function showError() {
        contentContainer.style.display = 'none';
        error.style.display = 'block';
    }


    fetchWeatherData(city);

    searchButton.addEventListener('click', () => {
        const inputCity = search.value.trim();

        if (inputCity !== '') {
            city = inputCity; 
            fetchWeatherData(city);
        }
    });

   
    search.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const inputCity = search.value.trim();

            if (inputCity !== '') {
                city = inputCity;
                fetchWeatherData(city);
            }
        }
    });

});
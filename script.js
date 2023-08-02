API_KEY='c61c02c32a0c4281b01205848231104'

///Controls the toggle of F/C in the NAVBAR
const unitChangeButton = document.querySelector('.unitChangeButton');
const fahrenheitSpan = unitChangeButton.querySelector('span:first-of-type');
const celsiusSpan = unitChangeButton.querySelector('span:last-of-type');
const tempUnitChangeButton = document.getElementById('tempUnitChange');


///Captures the info from submission of the form *STARTS HERE*
async function captureForm(event){
  event.preventDefault();
  
  const cityInput = document.getElementById('query').value.trim();
  if (cityInput == ''){
    alert('This field may not be empty')

  }
  else{
    const form = document.getElementById('citySearch');

    const formData = new FormData(form);
    const cityName = formData.get('query')
    const weatherData = await requestCurrentWeather(cityName);
    
    /// Checks to see if there is already content displayed so it won't run again
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (weatherDisplay.childNodes.length === 0){
      displayCurrentWeather(weatherData);

    }
    else{
      displayCurrentWeather(weatherData);
  
    }
  }
}

///adds event to the F/C button 
unitChangeButton.addEventListener('click', () => {
  if (tempUnitChangeButton.value === 'F') {
    celsiusSpan.style.fontWeight = 'bold';
    fahrenheitSpan.style.fontWeight = 'normal'
    tempUnitChangeButton.value = 'C'
  } else {
    tempUnitChangeButton.value = 'F'
    fahrenheitSpan.style.fontWeight = 'bold';
    celsiusSpan.style.fontWeight = 'normal'
  }
});


///gets current hour
function currentHour(){
  const now = new Date();
  const hours = now.getHours();
  return hours
}


///gets the current hour and converts it into the HH:00 format
function currentConvertedTime(){
  const now = new Date();
  const hours = now.getHours().toString();
  if(hours.length == 1){
      return "0" + hours + ":00";
  }else{
      return hours + ":00";
  }
}



/// returns current rain chance using the current hour converted
function currentRainChance(weatherData){
  for(i in weatherData.forecast.forecastday[0].hour){
    if ((weatherData.forecast.forecastday[0].hour[i].time).includes(currentConvertedTime())){
        return weatherData.forecast.forecastday[0].hour[i].chance_of_rain;
    }
  }
}




///handles and displays current weather information
async function displayCurrentWeather(weatherData){


  const tempUnitChangeButton = document.getElementById('tempUnitChange');

  const currentWeatherDisplay = document.createElement('div');
  currentWeatherDisplay.classList.add("currentWeatherDisplay");
  
  const currentCity = document.createElement('div');
  currentCity.innerHTML = weatherData.location.name;
  currentCity.classList.add("currentCity");


  const currentCondition = document.createElement('div');
  currentCondition.innerHTML = weatherData.current.condition.text;
  currentCondition.classList.add("currentCondition");



  const currentTemp = document.createElement('div');
  currentTemp.classList.add("currentTemp");
  if (tempUnitChangeButton.value == 'F'){
    currentTemp.innerHTML = Math.round(weatherData.current.temp_f) + "°F";
  }
  else{
    currentTemp.innerHTML = Math.round(weatherData.current.temp_c) + "°C";
  }


  const currentHighAndLow = document.createElement('div');
  currentHighAndLow.classList.add("currentHighAndLow");
  
  if (tempUnitChangeButton.value == 'F'){
    currentHighAndLow.innerHTML = "H:" + Math.round(weatherData.forecast.forecastday[0].day.maxtemp_f) + "°F" + " " + " L:" + Math.round(weatherData.forecast.forecastday[0].day.mintemp_f) + "°F";;
  }
  else{
    currentHighAndLow.innerHTML = "H:" + Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c) + "°C" + " " + " L:" + Math.round(weatherData.forecast.forecastday[0].day.mintemp_c) + "°C";;
  }
  

  currentWeatherDisplay.appendChild(currentCity);
  currentWeatherDisplay.appendChild(currentCondition);
  currentWeatherDisplay.appendChild(currentTemp);
  currentWeatherDisplay.appendChild(currentHighAndLow);


  document.getElementById('weatherDisplay').appendChild(currentWeatherDisplay);


  ///This section will handle and display the hourly forecast
  const forecast = document.createElement('div');
  forecast.classList.add('forecast');
  forecast.setAttribute('id','forecast');

  document.getElementById('weatherDisplay').appendChild(forecast);

  ///Handles displaying weather data per hour, 27 times
  let hourCounter = currentHour();
  for(let i = 0; i<27; i++){
    if(hourCounter < 23){
      const hourData = weatherData.forecast.forecastday[0].hour[hourCounter];
      const dateObject = new Date(hourData.time);

      let hourDataTemp;
      if (tempUnitChangeButton.value == 'F'){
        hourDataTemp = Math.round(hourData.temp_f) + "°F";
      }
      else{
        hourDataTemp = Math.round(hourData.temp_c) + "°C";
      }
      
      const hourDataCondition = hourData.condition.text;


      const dataToBeDisplayed = dateObject.getHours() + "<br>" + hourDataTemp +"<br>" + hourDataCondition;
      const hourDataDisplay = document.createElement('div');
      hourDataDisplay.classList.add('data');
      hourDataDisplay.classList.add(`${hourCounter}`);
      hourDataDisplay.innerHTML = dataToBeDisplayed;

      document.getElementById('forecast').appendChild(hourDataDisplay);
      hourCounter+=1;
    }
    else if(hourCounter == 23){
      const hourData = weatherData.forecast.forecastday[0].hour[hourCounter];
      const dateObject = new Date(hourData.time);

      let hourDataTemp;
      if (tempUnitChangeButton.value == 'F'){
        hourDataTemp = Math.round(hourData.temp_f) + "°F";
      }
      else{
        hourDataTemp = Math.round(hourData.temp_c) + "°C";
      }
      
      const hourDataCondition = hourData.condition.text;


      const dataToBeDisplayed = dateObject.getHours() + "<br>" + hourDataTemp +"<br>" + hourDataCondition;
      const hourDataDisplay = document.createElement('div');
      hourDataDisplay.classList.add('data');
      hourDataDisplay.classList.add(`${hourCounter}`);
      hourDataDisplay.innerHTML = dataToBeDisplayed;

      document.getElementById('forecast').appendChild(hourDataDisplay);

      hourCounter+=1;
    }
    else if (hourCounter >= 24 && hourCounter < 48){
      const hourData = weatherData.forecast.forecastday[1].hour[hourCounter-24];
      const dateObject = new Date(hourData.time);

      let hourDataTemp;
      if (tempUnitChangeButton.value == 'F'){
        hourDataTemp = Math.round(hourData.temp_f) + "°F";
      }
      else{
        hourDataTemp = Math.round(hourData.temp_c) + "°C";
      }
      
      const hourDataCondition = hourData.condition.text;


      const dataToBeDisplayed = dateObject.getHours() + "<br>" + hourDataTemp + "<br>" + hourDataCondition;
      const hourDataDisplay = document.createElement('div');
      hourDataDisplay.classList.add('data');
      hourDataDisplay.classList.add(`${hourCounter}`);
      hourDataDisplay.innerHTML = dataToBeDisplayed;


      document.getElementById('forecast').appendChild(hourDataDisplay);
      hourCounter+=1;
    }
    else if (hourCounter >= 48){
      const hourData = weatherData.forecast.forecastday[2].hour[hourCounter-48];
      const dateObject = new Date(hourData.time);

      let hourDataTemp;
      if (tempUnitChangeButton.value == 'F'){
        hourDataTemp = Math.round(hourData.temp_f) + "°F";
      }
      else{
        hourDataTemp = Math.round(hourData.temp_c) + "°C";
      }
      
      const hourDataCondition = hourData.condition.text;


      const dataToBeDisplayed = dateObject.getHours() + "<br>" + hourDataTemp +"<br>" + hourDataCondition;
      const hourDataDisplay = document.createElement('div');
      hourDataDisplay.classList.add('data');
      hourDataDisplay.classList.add(`${hourCounter}`);
      hourDataDisplay.innerHTML = dataToBeDisplayed;

      document.getElementById('forecast').appendChild(hourDataDisplay);
      
      hourCounter+=1;
    }
  }




  ///this part displays the extra current weather data
  const extraCurrentWeatherDisplay = document.createElement('div');
  extraCurrentWeatherDisplay.classList.add('extraCurrentWeatherDisplay');


  const currentSunrise = document.createElement('div');
  currentSunrise.innerHTML = "Sunrise: " + weatherData.forecast.forecastday[0].astro.sunrise;
  
  const currentSunset = document.createElement('div');
  currentSunset.innerHTML = "Sunset: " + weatherData.forecast.forecastday[0].astro.sunset;

  const currentRainPercent = document.createElement('div');
  currentRainPercent.innerHTML ="Rain Chance: " + currentRainChance(weatherData) + "%";

  const currentUVIndex = document.createElement('div');
  currentUVIndex.innerHTML = "Max UV Index: " + weatherData.current.uv;

  const currentFeelsLike = document.createElement('div');
  if (tempUnitChangeButton.value == "F"){
    currentFeelsLike.innerHTML = "Feels Like: " + Math.round(weatherData.current.feelslike_f) + "°F";
  }
  else{
    currentFeelsLike.innerHTML = "Feels Like: " + Math.round(weatherData.current.feelslike_c) + "°C";
  }
  const currentHumidity = document.createElement('div');
  currentHumidity.innerHTML = "Humidity: " + weatherData.current.humidity + "%";

  const currentWind = document.createElement('div');
  currentWind.innerHTML = "Wind Speeds: " + weatherData.current.wind_mph + " MPH " + weatherData.current.wind_dir


///Object for EPA Standards
  const epaStandards = {
    1:"Good",
    2:"Moderate",
    3:"Unhealthy for sensitive groups",
    4:"Unhealthy",
    5:"Very Unhealthy",
    6:"Hazardous"
  }

  const currentEPAIndex = document.createElement('div');
  currentEPAIndex.innerHTML = "Air Quality (US-EPA): " + weatherData.current['air_quality']['us-epa-index'] + " " +epaStandards[weatherData.current['air_quality']['us-epa-index']];


  extraCurrentWeatherDisplay.appendChild(currentSunrise);
  extraCurrentWeatherDisplay.appendChild(currentSunset);
  extraCurrentWeatherDisplay.appendChild(currentRainPercent);
  extraCurrentWeatherDisplay.appendChild(currentUVIndex);
  extraCurrentWeatherDisplay.appendChild(currentFeelsLike);
  extraCurrentWeatherDisplay.appendChild(currentHumidity);
  extraCurrentWeatherDisplay.appendChild(currentWind);
  extraCurrentWeatherDisplay.appendChild(currentEPAIndex);

  document.getElementById('extraWeatherDisplay').appendChild(extraCurrentWeatherDisplay);

}


///Requests Data from Weather API
async function requestCurrentWeather(cityName){
  url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=5&aqi=yes&alerts=no`;
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData;
}


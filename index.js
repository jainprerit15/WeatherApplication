
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key: "4acf8ecc8760d34eb36b6e204589e620",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather"

}

const searchInputBox = document.getElementById('input-box');

searchInputBox.addEventListener('keypress', (event) => {

    if(event.keyCode == 13){
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});

function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}`)
    .then(weather => {
        if(!weather.ok)
        {
            alert("City Not Found");
        }
        return weather.json();
    }).then(showWeatherReport);
}

function showWeatherReport(weather) {
    console.log(weather);

    let city=document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temp=document.getElementById('temp');
    temp.innerHTML = `${Math.round(weather.main.temp)-273}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)-273}&deg;C (min) / ${Math.ceil(weather.main.temp_max)-273}&deg;C (min)`;

    let weatherType=document.getElementById('weather');
    weatherType.innerText =`${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear')
    {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }
    else if(weatherType.textContent == 'Clouds')
    {
        document.body.style.backgroundImage = "url('images/cloud.jpg')";
    }
    else if(weatherType.textContent == 'Haze')
    {
        document.body.style.backgroundImage = "url('images/haze.jpg')";
    }
    else if(weatherType.textContent == 'Rain')
    {
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    }
    else if(weatherType.textContent == 'Snow')
    {
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }
    else if(weatherType.textContent == 'Sunny')
    {
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    }
    else if(weatherType.textContent == 'Thunderstorm')
    {
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    }


}

function dateManage(dateArg)
{
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}






















const apiKey = '0102104e569d4811bbf13656232210';
const inputtext = document.getElementById('input-box');
const weather_icon = document.querySelector('.weather-icon');
const temp_box = document.querySelector('.temp');
const city_box = document.querySelector('.city');
const wind_box = document.querySelector('.wind');
const humidity_box = document.querySelector('.humidity');
const weather_box = document.querySelector('.weather');
const current_weather = document.querySelector('.current-weather');

async function getJson() {
    const city = inputtext.value;

    if (city === '') {
        return;
    }
    const website = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try{
        const response = await fetch(website);

        inputtext.value = '';
        if (!response.ok) {
            weather_box.style.display = 'none';
            throw new Error('City not found');
        }

        const data = await response.json();
        temp_box.innerText = data.current.temp_c + '°c';
        city_box.innerText = `${data.location.name} , ${data.location.country}`;
        wind_box.innerText = data.current.wind_kph + 'kph';
        humidity_box.innerText = data.current.humidity + '%';
        current_weather.innerText = data.current.condition.text;
        weather_icon.src = weather(data.current.condition.code);
        weather_box.style.display = 'block';
    }
    catch (error){
        console.error(error);
    }
}

function weather(current) {
    switch(current) {
        case 1000:
            return '/images/clear.png';
        case 1003:
        case 1006:
        case 1009:
            return '/images/clouds.png';
        case 1030:
        case 1135:
        case 1147:
        case 1117:
            return '/images/mist.png';
        case 1072:
        case 1150:
        case 1153:
        case 1168:
        case 1063:
        case 1171:
        case 1189:
        case 1183:
        case 1192:
        case 1240:
        case 1243:
        case 1249:
        case 1276:
            return '/images/drizzle.png';
        case 1213:
        case 1216:
        case 1219:
        case 1222:
        case 1225:
        case 1237:
        case 1279:
        case 1282:
            return '/images/snow.png'
        default:
            return '/images/clear.png'
    }
}


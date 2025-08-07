import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


function getWeatherDescription(code) {
  const map = {
    0: "Clear ☀️",
    1: "Mainly Clear 🌤️",
    2: "Partly Cloudy ⛅",
    3: "Overcast ☁️",
    45: "Fog 🌫️",
    51: "Light Drizzle 🌦️",
    61: "Light Rain 🌧️",
    71: "Light Snow ❄️",
    95: "Thunderstorm ⛈️"
  };
  return map[code] || "Unknown";
}



app.get("/", async (req, res) => {
  try {
    const currentWeather = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=24.7136&longitude=46.6753&current_weather=true"
    );

    const hourlyResponse = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=24.7136&longitude=46.6753&hourly=temperature_2m"
    );

 const City="Riyadh";

const today = new Date();

const options = {
  weekday: "long",
  month: "long",
  day: "numeric"
};

const fullDate = today.toLocaleDateString("en-US", options);


   const temps = hourlyResponse.data.hourly.temperature_2m;
    const times = hourlyResponse.data.hourly.time;
const now = new Date();
    const hourlyData = times.map((time, index) => ({
      time,
      temperature: temps[index],
    })).filter(entry => new Date(entry.time) > now);



//weather status
const weathercode=currentWeather.data.current_weather.weathercode;
const Weatherstatus=getWeatherDescription(weathercode);

    res.render("index.ejs", {
      temp: currentWeather.data.current_weather.temperature,
      forecast: (hourlyData.slice(0, 12)), 
       day: fullDate,
       weatherstatus: Weatherstatus,
       city:City,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data!");
  }
});

app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});





app.get("/jeddah",async(req,res)=>{

  try {
    const currentWeather = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=21.4901&longitude=39.1862&current_weather=true"
    );

    const hourlyResponse = await axios.get(
      "https://api.open-meteo.com/v1/forecast?latitude=21.4901&longitude=39.1862&hourly=temperature_2m"
    );

    const City="Jeddah"
 
const today = new Date();

const options = {
  weekday: "long",
  month: "long",
  day: "numeric"
};

const fullDate = today.toLocaleDateString("en-US", options);


   const temps = hourlyResponse.data.hourly.temperature_2m;
    const times = hourlyResponse.data.hourly.time;
const now = new Date();
    const hourlyData = times.map((time, index) => ({
      time,
      temperature: temps[index],
    })).filter(entry => new Date(entry.time) > now);



//weather status
const weathercode=currentWeather.data.current_weather.weathercode;
const Weatherstatus=getWeatherDescription(weathercode);

    res.render("index.ejs", {
      temp: currentWeather.data.current_weather.temperature,
      forecast: hourlyData.slice(0,12), 
       day: fullDate,
       weatherstatus: Weatherstatus,
       city:City,

    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data!");
  }
});



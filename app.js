const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const appId = "709d737ee00db98a2469a4d2d578124c";
  const units = "imperial";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&appid=" +
    appId +
    "&units=" +
    units +
    "";

  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${icon}.png`;

      res.write(`<h1>The temperature is ${temp} degrees Farenheit.</h1>`);
      res.write(`<p>The weather is currently ${weatherDescription}</p>`);
      res.write(`<img src=${iconURL}>`);

      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});

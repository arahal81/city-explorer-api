const express = require('express');
const app = express();
const cors = require('cors');
const data = require('./data/weather.json');
const PORT = 3010;
const C_array=['AMMAN','PARIS','SEATTLE'];
app.use(cors());
//
app.get('/', function (req, res) {res.send('weather data Backend');});

/*app.get(`/weather`, (req, res) => {let cityName = req.query.S_Q;
  if(C_array.includes(cityName.toUpperCase()))
  {const dataArray = data.data.map(item => new Forecast(item));
    console.log('hi');
    res.send(dataArray);}else{res.status(500).send('sorry, there is no data for the city you search for it');}
});*/
class Forecast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = item.weather.description;
  }
}

app.listen(PORT);

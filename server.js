const express = require('express');
const app = express();
const cors = require('cors');
const weatherApi=require('./Modules/weather');
const movieApi=require('./Modules/movies')
const PORT =  process.env.PORT||8080;
 
//const data = require('./data/weather.json');
//const C_array=['AMMAN','PARIS','SEATTLE'];
app.use(cors());

app.get('/', function (req, res) {res.send('weather data Backend');});
app.get('/weather',weatherApi);
app.get('/movie',movieApi)

/*app.get(`/weather`, (req, res) => {let cityName = req.query.S_Q;
  if(C_array.includes(cityName.toUpperCase()))
  {const dataArray = data.data.map(item => new Forecast(item));
    res.send(dataArray);}else{res.status(500).send('sorry, there is no data for the city you search for it');}
});*/
app.listen(PORT);

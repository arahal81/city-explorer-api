const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config(); 
//const data = require('./data/weather.json');
const PORT =  process.env.PORT||8080;
const axios = require('axios');
//const C_array=['AMMAN','PARIS','SEATTLE'];
app.use(cors());
//
app.get('/', function (req, res) {res.send('weather data Backend');});
app.get('/weather',weatherApi);
app.get('/movie',movieApi)
function weatherApi(req,res) {
  let cityName = req.query.S_Q;
  let lat= req.query.lat;
  let lon=req.query.lon;
  let weatherAPI = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${cityName}`;
          axios.get(weatherAPI).then(apiResult =>{
          
            const photoArray = apiResult.data.data.map(item=>{
            return new Forecast(item);
            })
        res.send(photoArray);
        })
        .catch(err =>{
            //res.send(`there is an error in getting the data => ${err}`);
            res.status(500).send('sorry, there is no data for the city you search for it');
        })
  
}
/*app.get(`/weather`, (req, res) => {let cityName = req.query.S_Q;
  if(C_array.includes(cityName.toUpperCase()))
  {const dataArray = data.data.map(item => new Forecast(item));
    res.send(dataArray);}else{res.status(500).send('sorry, there is no data for the city you search for it');}
});*/


function movieApi(req,res) {
  let cityName = req.query.S_Q;
  let movieUrl = `${process.env.MOVIE_URL}?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;

          axios.get(movieUrl).then(item =>{
            const moviearray = item.data.results.map(item=>{
            return new MoviesList(item);
            })
            if (moviearray.length !== 0) {
              res.send(moviearray);
            }else{
              res.status(500).send('sorry, there is no data for the city you search for it');
            }
        
        })
        .catch(err =>{
            //res.send(`there is an error in getting the data => ${err}`);
            res.status(500).send('sorry, there is no data for the city you search for it');
          })
  
}

class Forecast {
  constructor(item) {
    this.date = item.valid_date;
    this.description = item.weather.description;
  }
}
class MoviesList{
  constructor(item){
    this.title=item.title;
    this.original_language=item.original_language;
    this.vote_average=item.vote_average;
    this.poster_img=item.poster_path;
    this.overview=item.overview;
  }
}

app.listen(PORT);

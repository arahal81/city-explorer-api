module.exports = weatherApi;
const axios = require('axios');
require("dotenv").config();
let weatherMemory = {};
function weatherApi(req, res) {
    let cityName = req.query.S_Q;
    if(weatherMemory[cityName] !== undefined)
    {
    res.send(weatherMemory[cityName]);
  }else{
    let weatherAPI = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${cityName}`;
    axios.get(weatherAPI).then(apiResult => {

        const weatherarray = apiResult.data.data.map(item => {
            return new Forecast(item);
        })
        weatherMemory[cityName]=weatherarray;
        res.send(weatherarray);
    })
        .catch(err => {
            //res.send(`there is an error in getting the data => ${err}`);
            res.status(500).send('sorry, there is no data for the city you search for it');
        })

}}
class Forecast {
    constructor(item) {
        this.date = item.valid_date;
        this.description = item.weather.description;
    }
}

module.exports = weatherApi;
const axios = require('axios');
require("dotenv").config();
function weatherApi(req, res) {
    let cityName = req.query.S_Q;
    let lat = req.query.lat;
    let lon = req.query.lon;
    let weatherAPI = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&city=${cityName}`;
    axios.get(weatherAPI).then(apiResult => {

        const photoArray = apiResult.data.data.map(item => {
            return new Forecast(item);
        })
        res.send(photoArray);
    })
        .catch(err => {
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

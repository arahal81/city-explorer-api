module.exports=movieApi;
const axios = require('axios');
require("dotenv").config();
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
          .catch(() =>{
              //res.send(`there is an error in getting the data => ${err}`);
              res.status(500).send('sorry, there is no data for the city you search for it');
            })
    
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
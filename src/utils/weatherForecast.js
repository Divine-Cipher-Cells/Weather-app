const request = require("request");
const weatherForecast=(latitude,longitude,callback) => {
    request({url:`http://api.weatherstack.com/current?access_key=cd0e1e2ee8b25b1b5bc0ac44a240ac02&query=${latitude},${longitude}`, json: true},
    (error,response) => {
if(error){
callback("Unable to connect to weather service",undefined);
}else if(response.body.error){
    callback("Unable to find location");
}
else 
callback(undefined,`${response.body.current.weather_descriptions[0]}, It is currently ${response.body.current.temperature} degress out. It feels like ${response.body.current.feelslike} degress out`)
    }
    )
}

module.exports= weatherForecast;
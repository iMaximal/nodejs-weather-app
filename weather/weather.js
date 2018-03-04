const request = require('request')

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/e7dd87fef60c798ace7ddca61c4e1d3c/${lat},${lng}`,
    json: true,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      })
    } else {
      callback('Unable to fetch weather.')
    }
  })
}

module.exports.getWeather = getWeather

const yargs = require('yargs')
const axios = require('axios')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h')
  .argv

const encodedAddress = encodeURIComponent(argv.address)
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyD54W7M8hb_hKeVYG9yEh0z1SJJvbRv59A`

axios.get(geocodeUrl)
  .then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.')
    }

    const lat = response.data.results[0].geometry.location.lat
    const lng = response.data.results[0].geometry.location.lng
    const weatherUrl = `https://api.darksky.net/forecast/e7dd87fef60c798ace7ddca61c4e1d3c/${lat},${lng}`

    console.log(response.data.results[0].formatted_address)

    return axios.get(weatherUrl)
  })
  .then((response) => {
    const temperature = response.data.currently.temperature
    const apparentTemperature = response.data.currently.apparentTemperature

    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`)
  })
  .catch((e) => {
    if (e.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.')
    } else {
      console.log(e.message)
    }
  })

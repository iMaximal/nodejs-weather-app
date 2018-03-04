const request = require('request')

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia&key=AIzaSyD54W7M8hb_hKeVYG9yEh0z1SJJvbRv59A',
  json: true,
}, (error, response, body) => {
  console.log(body)
})

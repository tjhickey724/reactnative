const axios = require('axios')

// returns a list of matches for an address
// if there is a match the latlon is in the coordinates field
// URL is
// https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=ADDRESS&benchmark=2020&format=json
const get_latlon = async (address) => {
    address = encodeURI(address);
    let url="https://geocoding.geo.census.gov/geocoder"+
              "/locations/onelineaddress"+
              "?address="+address+
              "&benchmark=2020"+
              "&format=json"
    console.log('url=',url)
    let response = await fetch(url)
    let json = await response.json()
    return json.result.addressMatches
}

// returns a forecast for any US location
// given by lattitude and longitude
const get_forecastURL = async (latlon) => {
  let url = "https://api.weather.gov/points/"+
              latlon.y+","+latlon.x
  const response = await axios.get(url)
  return response.data.properties.forecast
}

const get_weather = async (address) => {
  const matches = await get_latlon(address)
  if (matches.length==0) {
    return ([])
  } else {
    const url = await get_forecastURL(matches[0].coordinates)
    const response = await axios.get(url)
    return (response.data.properties.periods)
  }
}

export {get_latlon, get_forecastURL,  get_weather}

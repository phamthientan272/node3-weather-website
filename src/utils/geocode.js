const request = require('request')

const geocode = (address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicGhhbXRoaWVudGFuMjcyIiwiYSI6ImNrMndzczA2eTBpd2ozbnFkNTVpM3R4ajMifQ.G4tyZY2MeA90DwMqjSffQg&limit=1'

    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to location services', undefined)
        } else if(body.features.length===0){
            callback("Unable to find location. Try another search",undefined)
        } else{
            const data = {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}

module.exports = geocode
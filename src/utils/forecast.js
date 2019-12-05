const request = require('request')

const forecast = (latitude, longtitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/d9fc2243b91183d1556f0da023b87fe4/'+latitude+','+longtitude+'?units=si'
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback("Unable to connect to weather serive",undefined)
        } else if (body.error)
        {
            callback("Unable to find location", undefined)
        }else{
            
            data = body.daily.data[0].summary+" It is currently " +body.currently.temperature+ " . The high today is "+ body.daily.data[0].temperatureHigh+" with a low of "+body.daily.data[0].temperatureLow+". There is a "+  body.currently.precipProbability+'% of rain.'
            callback(undefined,data)
        }
    })
}

module.exports = forecast
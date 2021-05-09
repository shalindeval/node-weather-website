const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b296634ee5ead3dae960e530416d1ff8&query=${longitude},${lattitude}`

    request({ url, json: true },(err,{body}) => {
        if(err){
            callback("Unable to connect!", undefined)
        }else if(body.success === false){
            callback("Request failed!", undefined)
        }else{
            callback(undefined,{temperature: body.current.temperature, precip: body.current.precip})
        }
    })
}

module.exports = forecast
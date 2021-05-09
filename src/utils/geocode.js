const request = require('request')

const geoCode = (addr, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addr}.json?access_token=pk.eyJ1Ijoic3VubnktZGV2YWwiLCJhIjoiY2tvYTFtazhtMTBiNDJvbXVmeWpxazVqcCJ9.eAks_ceF4zLCQV5tsN59EQ`

    request({url, json:true}, (err, {body}) => {
        if(err){
            callback("Couldn't connect!", undefined)
        }else if(body.features.length === 0){
            callback("Couldn't get the coordinates", undefined)
        }else{
            callback(undefined, {
                lattitude: body.features[0].center[0],
                longitude: body.features[0].center[1]
            })
        }
    })

}

module.exports = geoCode
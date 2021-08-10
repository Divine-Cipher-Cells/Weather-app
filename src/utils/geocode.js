const request=require("request");



const geocode=(address,callback) =>{
    request({
        url:`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGl2aW5lY2lwaGVyY2VsbHMiLCJhIjoiY2tyN3poem1rMDluMjJwbWNocmowc3YwMyJ9.PTRALTxfXitRCDxo5bG3HQ&limit=1`,
        json:true
    }, (error,response) => {
    if(error){
        callback("Unable to connect to weather-service",undefined);
    }
    else if(response.body.features.length === 0) {
        callback("NO LOCATION MATCH FOUND! TRY ANOTHER SEARCH",undefined);
    }
    else{
        callback(undefined,{
            latitude:response.body.features[0].center[1],
            longitude:response.body.features[0].center[0],
            location:response.body.features[0].place_name
        });
    }
    })
    }


module.exports= geocode   
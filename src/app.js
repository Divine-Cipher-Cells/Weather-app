const express= require("express");
const app = express();// this is done to store our server application now we can tel this what we want it to do
const path=require("path").join(__dirname,"../public");
const newViewPath=require("path").join(__dirname,"../templates/views")
const partialPath=require("path").join(__dirname,"../templates/partials")
const hbs=require("hbs");
const geocode=require("./utils/geocode");
const foreCast=require("./utils/weatherForecast");
const port = process.env.PORT || 3000;
app.use(express.static(path));
// this is the directory from where it will load soeven in dynamic files we must mention link and script as if that file is in this directory

app.set("view engine","hbs")
app.set("views",newViewPath)
// to set new path first argument as a string named previous directory
// the second is also a string containing the new directory's absolute path

hbs.registerPartials(partialPath)
// this is done to register for partials with hbs

app.get("",(req,res)=>{
    res.render("index",{
        name:"Harsh",
        title:"Weather"
    })
})

//for about
app.get("/about",(req,res) => {
    res.render("about",{
        name:"Harsh",
        title:"About"
    })
})


app.get("/weather",(req,res) => {
    console.log(req.query)
    if(!req.query.address){
        return res.send({
            error:"requires an address query"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
           return res.send({
               error
           })
        }
    
    
    foreCast(latitude,longitude,(error,forecastData) => {
        if(error){
            return res.send({
                error
            })
        }
      
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
        })

         })
         
    })

    
})


app.get("/products",(req,res)=>{
    if(!req.query.search){
return res.send({
    error:"No search query"
})
    }

    res.send({
        products:[]
    })
})


app.get("/help",(req,res)=>{
    res.render("help",{
        name:"Harsh",
        title:"Help",
        helpText:"The help message is shown:"
    })
})


app.get("/help/*",(req,res)=>{
    res.render("404page",{
        error:"Help Article Not Found!",
        name:"Harsh",
        title:"404"
    })
})


app.get("*",(req,res)=>{
    res.render("404page",{
        error:"Page Not Found!",
        name:"Harsh",
        title:"404"
    })
})


app.listen(port,() =>{
console.log("DOne:")
});
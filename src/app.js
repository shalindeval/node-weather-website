const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode =require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const staticPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(staticPath))

app.get('',(req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'xyz'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title: "About",
        name:"xyz"
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:"Help",
        name: 'xyz'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(req.query.address, (err, {lattitude, longitude} = {}) => {
        if(err){
            return res.send({error: err})
        }else{
            console.log(lattitude, longitude)
            forecast(lattitude,longitude, (err, {temperature, precip})=>{
                if(err){
                    return res.send({error: err})
                }else{
                    console.log(`The temperature is ${temperature} degrees and ${precip}% chance of raining in ${req.query.address} `)
                    res.send({
                        temperature,
                        precip,
                        location: req.query.address 
                    })
                }
            })
        }
    })

})

app.get('/products',(req,res)=>{
    
    if(!req.query.search){
        res.send({
            error: 'You must provide search term'
        })
    }else{
        res.send({
        products: []
    })
    }


})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:"404 page not found",
        name:"xyz",
        title:"Error"
    })
})

app.listen(port, () => {
    console.log("Server is up and running!")
})
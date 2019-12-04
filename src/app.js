const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Pham Thien Tan'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About me",
        name:"me"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:"this is some helpful text",
        title:'Help',
        name:'Pham Thien Tan'
    })
})

app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            error: "You must provide an address!"
        })
    }


    geocode(req.query.address,(error,{latitude,longtitude, location}={})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longtitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

  
})


app.get('/products',(req,res)=>{

    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    } 

    console.log(req.query)

    res.send({
        products:[]
    })
})



// 404

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Pham Thien Tan",
        errorMessage:'Help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:"Pham Thien Tan",
        errorMessage:"Page not found"

    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})
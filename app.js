const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
const port=process.env.PORT||3000;
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('app.log', log + '\n',(err)=> {
        if(err) {
            console.log('error occured while logging in')
        }
    })
    next();
});
app.use((req,res,next)=>{
    res.render('maintanance.hbs');
})
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
});

app.set('view engine', 'hbs');
app.use(express.static(__dirname))
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome To My page',

    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',

    });
})
app.get('/bad', (req, res) => {
    res.send({
        error: 'bad request'
    })
})
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
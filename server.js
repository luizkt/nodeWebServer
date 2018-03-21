const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (error) => {
        if (error){
            console.log('Unable to append to server.log');
        }
    });
    next();
});

//Comment to use the website
// app.use((request, response, next) => {
//     res.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase(); 
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage: 'Welcome to my first web server page'
    });
});

app.get('/projects', (request, response) => {
    response.render('projects.hbs', {
        pageTitle: 'Projects page'
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Unable to fetch page.',
        code: 404
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About page'
    });
});

app.listen(port, () => {
    console.log(`Server is up in port ${port}`);
});
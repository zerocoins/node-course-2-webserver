const express = require('express');

const hbs = require('hbs');

const fs = require('fs');

const port = process.env.PORT || 3000;

// this is the web server
var app = express(); // simply by calling a function we create  new web application

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase() + '!';
})

// set HBS as Express' view engine
app.set('view engine','hbs');


// basic example of express middleware
app.use((req,res,next) => {
  var now = new Date().toString();
  var logLine = `${now}: ${req.method} ${req.url}\n`;
  fs.appendFile('requests.log', logLine, (error) => {
    console.log(`Error writing to the log file: ${error} `);
  })
  next();
});


// serve static pages from the public folder. __dirname is the root folder of the project
// anything you paste inside /public folder will be statically serverd and available over the server
app.use(express.static(__dirname + '/public'));

// create web server get request handler method to control the response back to client

//  get method is used to setrequest handler
// someone sends in a http request via get method to the root of our server
// so we can anaylyze request = req , and use response object to send some data
// back to the requester
app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>'); // server sends this back to a client (browser)
  // res.send({
  //   name: 'Aleksandar Zivkovic',
  //   age: 42,
  //   proffession: 'programmer'
  // })
  res.render('home.hbs', {
    pageTitle: 'Home Page (HBS)',
    welcomeMessage: 'Welcome to my website!'
  })
});

app.get('/about', (req, res) => {
  // instead to send static html code back we render it with the view engine previously set
  //res.send('About page');
  res.render('about.hbs', { // pass in some arguments via jSON object
    pageTitle: 'About Page (HBS)'
  }); // views is the default folder
})

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error: Unable to process the request!'
  })
})

app.get('/projects', (req,res) => {
  res.render('projects.hbs', {
    pageTitle : 'Projects page with portfolios'
  });
})

app.listen(port, () => {
  console.log(`Server created. Up and running. Listenning for the requests on port ${port}.`)
});

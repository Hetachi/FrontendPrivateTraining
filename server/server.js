const express = require('express')
const request = require('request');
const bodyParser = require('body-parser')
const app = express()
app.enable('trust proxy')
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Credentials", "true")
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 1337
let postCollection = []

app.post('/api', function(req, res) {
  console.log(req.body)
  if(req.body.message) {
    postCollection.push({
      author: req.body.author || req.ip,
      message: req.body.message
    })
    res.send(JSON.stringify('Message posted'))
  } else {
    res.send(JSON.stringify("Incorrect data recieved"))
  }
});

app.get('/api', function(req, res){
  res.send(JSON.stringify(postCollection))
});

app.delete('/api', function(req, res) {
  if(req.body.id && postCollection[req.body.id]) {
    postCollection.splice(req.body.id, 1)
    res.send("Post deleted")
  } else {
    res.send(JSON.stringify("Incorrect request data, or no item to delete"))
  }
});

app.get('/api/all', function(req,res) {
    postCollection = []
    res.send("All posts have been deleted!")
})

app.listen(port, () => console.log(`POE Data Storage on port: ${port}!`))

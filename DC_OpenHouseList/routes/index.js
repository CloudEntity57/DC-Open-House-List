var express = require('express');
var router = express.Router();
var request = require('request');
var https = require('https');
let apiKey=process.env.DISPLET_API_KEY;
// let params = 'latitude,longitude,image_urls,street_name,subdivision,street_number,square_feet,mls_number,list_price,open_house_events,address,full_baths,num_bedrooms,half_baths';

let params='';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/featured',function(req,res,next){
  let url = "https://api.displet.com/residentials/search?authentication_token="+apiKey+"&;return_fields="+params+"&min_bedrooms=2&min_bathrooms=1&min_list_price=350&open_house=y&open_house_within=7";

  let options = {
    url:url,
    headers:{
      'Accept':'application/javascript',
      'Referer':'http://localhost:3000'
    }
  }

  request(options, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    body=JSON.parse(body);
    res.json(body);
  });
});

router.get('/open_houses',function(req,res,next){
  console.log('api key: ',apiKey);
  // let params='';
  let url = "https://api.displet.com/residentials/search?authentication_token="+apiKey+"&;return_fields="+params+"&min_bedrooms=2&min_bathrooms=1&min_list_price=350&open_house=y&open_house_within=7&limit=10";

  let options = {
    url:url,
    headers:{
      'Accept':'application/javascript',
      'Referer':'http://localhost:3000'
    }
  }

  request(options, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    body=JSON.parse(body);
    res.json(body);
  });
});

router.get('/neighborhoods',function(req,res,next){
  params = '';
  let url = "https://api.displet.com/residentials/search?authentication_token="+apiKey+"&;return_fields="+params+"&min_bedrooms=2&min_bathrooms=1&min_list_price=350";
  let options = {
    url:url,
    headers:{
      'Accept':'application/javascript',
      'Referer':'http://localhost:3000'
    }
  }
  request(options, function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    body=JSON.parse(body);
    // console.log('body: ',body);
    let neighborhoods=[];
    let results = [];
    body.results.map((result)=>{
      results.push(result.subdivision);
    });
    results.forEach((subdiv)=>{
      let exists = false;
      neighborhoods.forEach((val)=>{
        if(val==subdiv){
          exists = true;
        }
      });
      if(exists==false){
        neighborhoods.push(subdiv);
      }
    });
    neighborhoods = neighborhoods.sort();
    console.log('sending back: ',neighborhoods);
    res.json(neighborhoods);
  });
});

module.exports = router;

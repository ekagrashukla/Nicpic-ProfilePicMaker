const fs = require('fs')
const request = require('request');
var config = require('./config');

const dir = 'output';
const input_image='./test_img/001.jpg';

const tkn = config.MY_API_TOKEN
const key = config.SECRET_API_KEY   
request.post({
    url: 'https://api.remove.bg/v1.0/removebg',
    formData: {
      image_file: fs.createReadStream(input_image),
      size: 'auto',
    },
    headers: {
        "X-Api-Key" : key
    },
    encoding: null
}, function(error, response, body) {
    if(error) return console.error('Request failed:', error);
    if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
    fs.writeFileSync("./output/No_bg/no-bg.png", body)
  });

  
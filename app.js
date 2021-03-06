const fs = require('fs')
const request = require('request');
var config = require('./config');
const Jimp = require('jimp');

const dir = 'output';
const input_image='./test_img/001.jpg';

const tkn = config.MY_API_TOKEN
const key = config.SECRET_API_KEY

let counter = 0
let counter_circular = 0

const bgs = ['./backgrounds/bg000.jpg','./backgrounds/bg001.jpg','./backgrounds/bg002.jpeg','./backgrounds/bg003.jpg',
    './backgrounds/bg004.jpg','./backgrounds/bg005.jpg','./backgrounds/bg006.jpg','./backgrounds/bg007.png',
    './backgrounds/bg008.jpeg']

    const create_circular_image = async (pth) => {
      var p1 = await Jimp.read(pth);
      var p2 = await Jimp.read("circle.png");
    
      Promise.all([p1, p2]).then((images) => {
      var lenna = images[0];
      var mask = images[1];
      lenna.cover(512,512)
      // lenna.crop(0,0,512, 512);
      lenna.mask(mask, 0, 0).write('./output/output_circular/circle_color_result' + counter_circular+ '.png');
      counter_circular+=1
    });
  }

  async function add_background_image(bg) {
    const image1 = await Jimp.read(bg);
    const image2 = await Jimp.read('./output/No_bg/no-bg.png');
    
    image1.cover(512,512)
    image2.cover(512,512)
    image1.blit(image2, 0, 0)
    
    // write image
    .write('./output/temp/'+counter+'.png');
    create_circular_image('./output/temp/'+counter+'.png');
    counter+=1
    console.log('Image Background Added Successfully');
  }

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

  


  bgs.forEach(element => {
    add_background_image(element)
  })

  
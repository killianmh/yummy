const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const path = require("path");
// require('dotenv').config({ path: '.env.local' })
const Cloudinary = require("./Cloudinary/Cloudinary")
const cloudinarySignature = Cloudinary.cloudinarySignature
const axios = require('axios');
const cheerio = require('cheerio')

app.use(express.static(path.join(__dirname, "../build")));

app.get('/test', (req, res) => {
  const signature = cloudinarySignature().signature
  console.log("cloudinary signature", signature)
  res.send(process.env.CLOUDINARY_CLOUD_NAME)
})

app.get('/scrapeImg', (req, res, next) => {
  console.log(req.query.url)
  console.log(typeof(req.query.url))
  // console.log(toString(req.query.url))
  const url = req.query.url
  axios.get(req.query.url)
    .then(response => {
      if (response.status === 200) {
        // Load the web page source code into a cheerio instance
        const $ = cheerio.load(response.data)
        
        // return first 5 images
        const allImgElems = $('img')
        const imgElems = Object.keys(allImgElems)
          .slice(0, 5)
          .map(el => {
            return allImgElems[el]
          })
        imgElems.forEach(el => {
          console.log($(el).attr('src'))
        })
        console.log(imgElems)
        res.status(200)
      }
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        error.status = error.response.status
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      next(error)
    });
})

app.post('/uploadImg', (req, res, next) => {
  console.log('uploading image via server')
  const signature = cloudinarySignature().signature
  const timestamp = cloudinarySignature().timestamp
  const file = 'https://img.pngio.com/ocean-io-ecosia-oceans-png-1920_1200.png'
  const url = `https://api.cloudinary.com/v1_1/da8ekwkyg/image/upload`;

  axios.post(url, {
    file: file,
    api_key: process.env.CLOUDINARY_API_KEY,
    public_id: 'test_image',
    timestamp: timestamp,
    signature: signature
  })
    .then(function (response) {
      console.log(response.status, response.data)
      if (response.status === 200) {
        res.status(200).send(response.data)
      }
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        error.status = error.response.status
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      next(error)
    });
})

app.get('/uploadConfig', (req, res) => {
  // TODO: First authenticate via Firebase

  
  const uploadURL = process.env.CLOUDINARY_BASE_URL + '/upload'
  
  // get cloudinary signature for upload
  const signature = cloudinarySignature().signature
  const timestamp = cloudinarySignature().timestamp

  if (signature && timestamp) {
    res.status(200).send({
      signature: signature, 
      timestamp: timestamp,
      uploadURL: uploadURL
    })
  }
  else {
    res.status(500).send('failed')
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
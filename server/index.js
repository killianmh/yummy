const express = require('express')
const app = express()
const port = process.env.PORT || 3001
require('dotenv').config({path: '.env.local'})
const path = require("path");
const Cloudinary = require("./Cloudinary/Cloudinary")
const cloudinarySignature = Cloudinary.cloudinarySignature
const axios = require('axios');

app.use(express.static(path.join(__dirname, "../build")));

app.get('/test', (req, res) => {
  const signature = cloudinarySignature().signature
  console.log("cloudinary signature", signature)
  res.send(process.env.CLOUDINARY_CLOUD_NAME)
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
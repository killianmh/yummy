const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const cloudinarySignature = () => {
  // Get the timestamp in seconds
  console.log("signature function log api secret:", process.env.CLOUDINARY_API_SECRET)
  const timestamp = Math.round((new Date).getTime()/1000); 
  const signature = cloudinary.utils.api_sign_request({
    timestamp: timestamp,
    public_id: 'test_image'
    }, process.env.CLOUDINARY_API_SECRET); 
  return {
    signature: signature,
    timestamp: timestamp
  }
}

const cloudinarySignature2 = (params) => {
  // Get the timestamp in seconds
  console.log("signature function log api secret:", process.env.CLOUDINARY_API_SECRET)
  // console.log(params)
  // const timestamp = Math.round((new Date).getTime()/1000);
  const timestamp = params.timestamp
  const sigParams = JSON.parse(params)
  console.log({...sigParams})
  const signature = cloudinary.utils.api_sign_request({ ...sigParams }, process.env.CLOUDINARY_API_SECRET);
  console.log(signature) 
  // const signature = cloudinary.utils.api_sign_request({
  //   timestamp: timestamp,
  //   public_id: 'test_image',
  //   source: 'uw',
  //   upload_preset: 'ml_default'
  //   }, process.env.CLOUDINARY_API_SECRET); 
  return signature
}

module.exports = {
  cloudinary: cloudinary,
  cloudinarySignature: cloudinarySignature2
}
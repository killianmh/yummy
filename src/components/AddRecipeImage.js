import React from 'react';
import './AddRecipeImage.css'
import axios from 'axios'

const AddRecipeImage = props => {
  // const [recipeImgURL, setRecipeImgURL] = React.useState("")
  const [imgSource, setImgSource] = React.useState(null)

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   console.log("submitted")
  //   setRecipeImgURL("")
  //   // submit to server
  //   axios.get('/scrapeImg', {
  //       params: {
  //         url: recipeImgURL
  //       }
  //     })
  //     .then((response) => {
  //       console.log(response)
  //       if (response.data.length > 0) {
  //         setImgSources(response.data)
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })
  // }

  // const handleChange = e => {
  //   setRecipeImgURL(e.target.value)
  // }

  // const imageChoices = () => {
  //   return(
  //     imgSources.map((img, id) => 
  //       <img src={img} alt="My image" className="recipeImg"/>
  //     ) 
  //   )
  // }

  const generateSignature = (callback, params_to_sign) => {
    console.log(params_to_sign)
    axios.get('/uploadSignature', {
      params: {
        data: params_to_sign
      }
    })
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          console.log(response.data.signature)
          return callback(response.data.signature)
        }
      })
      .catch((error) => {
        console.log(error)
        return error
      })
  }

  const checkUploadResult = (error, result) => {
    if (result && result.event === "success") {
      console.log(result.info)
      setImgSource(result.info.secure_url)
    }
    else {
      console.log(error)
    }
  }

  let uploadWidget = window.cloudinary.createUploadWidget({ 
    cloudName: "da8ekwkyg", 
    apiKey: '313357833943387',
    uploadPreset: "ml_default",
    publicId: 'test_image',
    uploadSignature: generateSignature,
    multiple: false  }, (error, result) => {
      checkUploadResult(error, result)
     })

  const showWidget = () => {
    uploadWidget.open()
  }

  const imgReject = () => {
    setImgSource(null)
  }

  const imgAccept = () => {
    // post image url to recipe object in firebase using imgSource state variable

    // change to ingredients modal
    props.nextStep()
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log("submitted")
    // Add name to recipe
    // Add name to recipe
    props.updateRecipe("image", imgSource)
    setImgSource(null)
    props.complete("image")
  }
 
  return(
    <div className="newRecipe">
      <div className="scraper">
        {imgSource
          ? (<div>
                <img src={imgSource}/>
                <button
                  className="uploadBtn"
                  onClick={() => imgReject()}>
                  Reject
                </button>
                <button
                  className="uploadBtn"
                  onClick={handleSubmit}>
                  Accept
                </button>
            </div>)
          : ( 
              <div>
                <h2>Upload an image</h2>
                <button
                  className="uploadBtn"
                  onClick={() => showWidget()}>
                  Upload
                </button>
                <button onClick={handleSubmit}>
                  skip
                </button>
              </div>) }
        {/* <button 
          className="manualAdd"
          onClick={() => props.manualAdd("Load Recipe from URL", 5)}>
            Load Image by URL
        </button> */}
      </div>
      {/* <div>-OR-</div>
      <div className="manualEntry">
        <button 
          className="manualAdd"
          onClick={() => props.manualAdd("Creating New Recipe", 4)}>
            Enter Recipe Manually
        </button>
      </div> */}
    </div>
  )
}

export default AddRecipeImage
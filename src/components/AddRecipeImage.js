import React from 'react';
import './AddRecipeImage.css'
import axios from 'axios'

const AddRecipeImage = props => {
  const [recipeImgURL, setRecipeImgURL] = React.useState("")

  const handleSubmit = e => {
    e.preventDefault()
    console.log("submitted")
    // submit to server
    axios.get('/scrapeImg', {
        params: {
          url: recipeImgURL
        }
      })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    setRecipeImgURL("")
  }

  const handleChange = e => {
    setRecipeImgURL(e.target.value)
  }
 
  return(
    <div className="newRecipe">
      <div className="scraper">
        {/* <button 
          className="manualAdd"
          onClick={() => props.manualAdd("Load Recipe from URL", 5)}>
            Load Image by URL
        </button> */}
        <h2>Add a recipe URL and we'll find a couple photos for you to choose from</h2>
        <form onSubmit={handleSubmit}>
          <label>
            URL:
            <input type="url" required value={recipeImgURL} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
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
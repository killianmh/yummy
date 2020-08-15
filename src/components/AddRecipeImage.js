import React from 'react';
import './AddRecipeImage.css'
import axios from 'axios'

const AddRecipeImage = props => {
  const [recipeImgURL, setRecipeImgURL] = React.useState("")
  const [imgSources, setImgSources] = React.useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    console.log("submitted")
    setRecipeImgURL("")
    // submit to server
    axios.get('/scrapeImg', {
        params: {
          url: recipeImgURL
        }
      })
      .then((response) => {
        console.log(response)
        if (response.data.length > 0) {
          setImgSources(response.data)
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleChange = e => {
    setRecipeImgURL(e.target.value)
  }

  const imageChoices = () => {
    return(
      imgSources.map((img, id) => 
        <img src={img} alt="My image" className="recipeImg"/>
      ) 
    )
  }
 
  return(
    <div className="newRecipe">
      <img src="https://www.eatwell101.com/wp-content/uploads/2018/05/Chicken-with-Spinach-in-Creamy-Parmesan-Sauce-1.jpg" alt="My image" className="recipeImg"/>
      <div className="scraper">
        {imgSources 
          ? imageChoices()
          : ( 
              <div>
                <h2>Add a recipe URL and we'll find a couple photos for you to choose from</h2>
                <form onSubmit={handleSubmit}>
                  <label>
                    URL:
                    <input type="url" required value={recipeImgURL} onChange={handleChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
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
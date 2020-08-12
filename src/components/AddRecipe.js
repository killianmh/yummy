import React from 'react';
import './AddRecipe.css'

const AddRecipe = props => {
  const [recipeURL, setRecipeURL] = React.useState("")

  const handleSubmit = e => {
    e.preventDefault()
    console.log("submitted")
    // submit to server
    setRecipeURL("")
  }

  const handleChange = e => {
    setRecipeURL(e.target.value)
  }
 
  return(
    <div className="newRecipe">
      <div className="scraper">
        <h3>Enter a Recipe URL</h3>
        <form onSubmit={handleSubmit}>
          <label>
            URL:
            <input type="url" required value={recipeURL} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div>-OR-</div>
      <div className="manualEntry">
        <button 
          className="manualAdd"
          onClick={() => props.manualAdd("Creating New Recipe", 4)}>
            <i className="fas fa-plus" />
        </button>
      </div>
    </div>
  )
}

export default AddRecipe
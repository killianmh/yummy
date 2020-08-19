import React from 'react';
import './ReviewAdd.css'
import List from './List'

const ReviewAdd = props => {
  const { name, image, ingredients, instructions, url} = props.recipe
  const [error, setError] = React.useState(null)
  console.log('review url: ', url)

  const checkRecipe = () => {
    if (name.length === 0 || ingredients.length === 0 || instructions.length === 0) {
      let errorMsg = "Missing information. Please correct before submitting"
      setError(errorMsg)
      return
    } else {
      props.handleRecipeSubmit()
    }
  }

  return (
    <div className="modalRecipe">
      <h2>{name}</h2>
      <button 
        className="manualAdd"
        onClick={() => props.edit("name")}>
          Edit
      </button>
      {image
          ? (
              <div className="imgCont">
                <picture>
                  <source srcset={image}
                   />
                  <img src={image} alt="My image" className="recipeImg"/>
                </picture>
                <button 
                  className="manualAdd"
                  onClick={() => props.edit("image")}>
                    Edit
                </button>
              </div>
            )
          : (<div>
              <button 
                className="manualAdd"
                onClick={() => props.edit("image")}>
                  Add Image
              </button>
            </div>)
        }
      <List
        type={"ingredients"}
        ingredients={ingredients}
      />
      <button 
        className="manualAdd"
        onClick={() => props.edit("ingredients")}>
          Edit
      </button>
      <List
        type={"instructions"}
        instructions={instructions}
      />
      <button 
        className="manualAdd"
        onClick={() => props.edit("instructions")}>
          Edit
      </button>
      {url
        ? (<div>
            {url}
            <button 
              className="manualAdd"
              onClick={() => props.edit("url")}>
                Edit
            </button>
          </div>)
        : (<div>
            <button 
              className="manualAdd"
              onClick={() => props.edit("url")}>
                Add URL
            </button>
          </div>)}
      <button 
        className="manualSubmit"
        onClick={checkRecipe}>
          Submit Recipe
      </button>
    </div>
  )
 
}

export default ReviewAdd
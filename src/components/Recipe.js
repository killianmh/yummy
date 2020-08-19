import React from 'react';
import './Recipe.css';
import List from './List'

const Recipe = props => {
  const { image, ingredients, instructions, name} = props.recipe

  return (
    <div className="modalRecipe">
      {image
          ? (
              <div className="imgCont">
                <picture>
                  <source srcset={image}
                   />
                  <img src={image} alt="My image" className="recipeImg"/>
                </picture>
              </div>
            )
          : (null)
        }
      <List
          type={"ingredients"}
          ingredients={ingredients}
          />
      <List
        type={"instructions"}
        instructions={instructions}
      />
    </div>
  )
}

export default Recipe
import React from 'react';
import './List.css';

const List = props => {
  const {type} = props
  console.log(type)
  let ingredients, instructions

  switch (type) {
    case "ingredients":
      ingredients = props.ingredients
      let ingredientList
      if(ingredients.length > 0) {
        ingredientList = ingredients.map((el, id) =>
          <li key={id}>{el}</li>
        )
        return(
          <div className="ingredients">
            <h3>Ingredients</h3>
            <ul>
              {ingredientList}
            </ul>
          </div>
        )
      }
      else {
        return (
          <div>
            <h3>Ingredients</h3>
            <div>Sorry, no ingredients have been added for this recipe</div>
          </div>
        )
      }
      
    case "instructions":
      instructions = props.instructions
      let instructionList
      if(instructions.length > 0) {
        instructionList = instructions.map((el, id) =>
          <li key={id}>{el}</li>
        )
        return(
          <div className="instructions">
            <h3>Instructions</h3>
            <ol>
              {instructionList}
            </ol>
          </div>
        )
      }
      else {
        return (
          <div>
            <h3>Instructions</h3>
            <div>Sorry, no instructions have been added for this recipe</div>
          </div>
        )
      }
  }
}

export default List
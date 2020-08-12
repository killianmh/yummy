import React, {useContext} from 'react';
import Card from './Card'
import './RecipeList.css'
import { FirebaseContext } from './Firebase'


const RecipeList = props => {
  const database = useContext(FirebaseContext)

  const addToMenu = (userId, name, email) => {
    console.log('pressed')
    database.ref('users/' + userId).set({
      username: name,
      email: email
    });
  }

  const recipes = props.recipes
  // const {viewRef, viewTarget, addRef, addTarget, name, image} = props
  const recipeActions = {
    number: 2,
    actions: [
      {
        name: "view",
        label: "View Recipe",
        onClick: props.openModal
      },
      {
        name: "add",
        label: "Add to Menu",
        onClick: props.openModal
      }
    ]
  }

  const recipeList = recipes.map((recipe, id) => 
    <Card 
      title={recipe.name} 
      type={"recipe"} 
      actions={recipeActions} 
      key={id}
      openModal={props.openModal}
      image={recipe.image}>
    </Card>
  )

  return(
    <div>
      <div className="recipe-list">
        {recipeList}
        <Card
          title={"Add"}
          type={"add"}>
            <button 
              className="addButton"
              onClick={() => props.newRecipe("New Recipe", 3)}>
                <i className="fas fa-plus" />
            </button>
        </Card>
        <button
          className="firebaseTest"
          onClick={() => addToMenu(1, "matt", "test@test.com")}>

        </button>
      </div>
    </div>
  )
}

export default RecipeList
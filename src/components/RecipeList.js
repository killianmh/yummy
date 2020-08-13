import React, {useContext} from 'react';
import Card from './Card'
import './RecipeList.css'
import { FirebaseContext } from './Firebase'
import axios from 'axios'


const RecipeList = props => {
  const database = useContext(FirebaseContext)
  console.log(database)

  const addToMenu = (userId, name, email) => {
    console.log('pressed')
    database.ref('users/' + userId).set({
      username: name,
      email: email
    });
  }

  const cloudinaryServerUpload = () => {
    axios.post('/uploadImg', {

    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const cheerioScrapeImg = () => {
    axios.get('/scrapeImg')
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
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
        <button
          className="cloudinaryTest"
          onClick={() => cloudinaryServerUpload()}>

        </button>
        <button
          className="cloudinaryTest"
          onClick={() => cheerioScrapeImg()}>

        </button>
      </div>
    </div>
  )
}

export default RecipeList
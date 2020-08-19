import React from 'react';
import './AddRecipe.css'
import axios from 'axios'
import IngredientList from './IngredientList'
import InstructionList from './InstructionList'
import Url from './Url'
import { exportDefaultSpecifier } from '@babel/types';
import Recipe from './Recipe';
import Name from './Name'
import AddRecipeImage from './AddRecipeImage'
import ReviewAdd from './ReviewAdd'
import ModalNav from './ModalNav'
// import Ingred from './Ingred'
// import Steps from './Steps'
// import Url from './Url'

const AddRecipe = props => {
  const [recipeURL, setRecipeURL] = React.useState("")
  const [type, setType] = React.useState("")
  const [manualType, setManualType] = React.useState("")
  const [scrapeRes, setScrapeRes] = React.useState([])
  const [scraping, setScraping] = React.useState(false)
  const [missingKeys, setMissingKeys] = React.useState(["name", "image", "ingredients", "instructions", "url"])
  const [recipe, setRecipe] = React.useState({})

  const modalSteps = ["name", "image", "ingredients", "instructions", "url"]

  const manualElements = [
    {
      name: <Name />
    },
    // {
    //   image: Image
    // },
    // {
    //   ingred: Ingred
    // },
    // {
    //   steps: Steps
    // },
    // {
    //   url: Url
    // }
  ]

  const handleSubmit = e => {
    e.preventDefault()
    setScraping(true)
    setType("scraping")
    console.log("submitted")
    setRecipeURL("")
    // submit to server
    axios.get('/scrapeRecipe', {
        params: {
          url: recipeURL
        }
      })
      .then((response) => {
        console.log(response)
        if (response.data) {
          setMissingKeys(getMissingKeys(response.data))
          if (missingKeys.length > 0) {
            setType(missingKeys[0])
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getMissingKeys = (recipe) => {
    let recipeAttr = ["name", "image", "ingredients", "instructions", "url"]

    let manualAdd = recipeAttr.filter(el => {
      return !(el in recipe)
    })
    return manualAdd
  }

  const manualAdd = (attr) => {
    setManualType(attr)
  }

  const handleURLChange = e => {
    setRecipeURL(e.target.value)
  }

  const changeType = (type) => {
    setType(type)
  }

  // Recipe helper
  const updateRecipe = (key, value) => {
    console.log(key, value)
    setRecipe(recipe => ({
      ...recipe,
      [key]: value
    }))
  }

  const nextRecipeAttr = (old) => {
    let newKeys = missingKeys
    console.log(missingKeys)
    let index = missingKeys.indexOf(old)
    newKeys.splice(index, 1)
    setMissingKeys(newKeys)
    console.log(missingKeys[0])
    console.log(recipe)
    if (missingKeys[0] === undefined) {
      setType("review")
    } else {
      setType(missingKeys[0])
    }
  }

  const editRecipeAttr = (attr) => {
    setType(attr)
  }

  const handleRecipeSubmit = () => {
    // submit to db
    console.log("submitted new recipe")
    setType("success")
  }

  const getContent = () => {
    switch (type) {
      case "name":
        return(<Name
                name={recipe.name}
                updateRecipe={updateRecipe}
                complete={nextRecipeAttr} />)
      case "image":
        return(<AddRecipeImage 
                updateRecipe={updateRecipe}
                complete={nextRecipeAttr} />)
      case "ingredients":
        return(
          <IngredientList
            ingredients={recipe.ingredients} 
            updateRecipe={updateRecipe}
            complete={nextRecipeAttr} 
          />)
      case "instructions":
        return(
          <InstructionList
            instructions={recipe.instructions} 
            updateRecipe={updateRecipe}
            complete={nextRecipeAttr} 
          />)
      case "url":
        return(
          <Url 
            url={recipe.url}
            updateRecipe={updateRecipe}
            complete={nextRecipeAttr} 
          />)
      case "review":
          return(
            <ReviewAdd
              recipe={recipe}
              edit={editRecipeAttr}
              handleRecipeSubmit={handleRecipeSubmit}
            />)
      case "scraping": 
        return(
          <div>
            Scraping, please wait...
          </div>
        )
      case "success": 
        return(
          <div>
            Success!
          </div>
        )
      default:
        return (
          <div>
            <h2>Let's get the recipe information from the URL</h2>
            <form onSubmit={handleSubmit}>
              <label>
                URL:
                <input type="url" required value={recipeURL} onChange={handleURLChange} />
              </label>
              <input type="submit" value="Submit" />
            </form>
            <div className="or">
              <h2>Or Manually Add a recipe</h2>
            </div>
            <div className="manualEntry">
              <button 
                className="manualAdd"
                onClick={() => changeType("name")}>
                  Manual Add
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div>
      {type
        ? (<ModalNav 
              steps={modalSteps}
              type={type}
          />)
          : (null)
      }
      {getContent()}
    </div>
  )
}

export default AddRecipe
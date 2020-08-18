import React from 'react';
import './AddRecipeIngred.css'
import axios from 'axios'
import IngredientList from './IngredientList'
import { exportDefaultSpecifier } from '@babel/types';
import Recipe from './Recipe';

const AddRecipeIngred = props => {
  const [recipeURL, setRecipeURL] = React.useState("")
  const [type, setType] = React.useState("")
  const [scrapeRes, setScrapeRes] = React.useState([])
  const [scraping, setScraping] = React.useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setScraping(true)
    setType("url")
    console.log("submitted")
    setRecipeURL("")
    // submit to server
    axios.get('/scrapeIngred', {
        params: {
          url: recipeURL
        }
      })
      .then((response) => {
        console.log(response)
        // if (response.data.length > 0) {
        //   setImgSources(response.data)
        // }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleURLChange = e => {
    setRecipeURL(e.target.value)
  }

  const changeType = (type) => {
    setType(type)
  }

  const getContent = () => {
    if (type === "") {
      return (
        <div>
          <h2>Let's try to get the ingredients from the recipe URL</h2>
          <form onSubmit={handleSubmit}>
            <label>
              URL:
              <input type="url" required value={recipeURL} onChange={handleURLChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <div className="manualEntry">
            <h2>Adding a custom recipe?</h2>
            <button 
              className="manualAdd"
              onClick={() => changeType("manual")}>
                Manual Add
            </button>
          </div>
        </div>
      )
    } else if (type === "url") {
      return (
        scraping 
          ? (null)
          : (<IngredientList ingredients={scrapeRes} />)
      )
    }
    else if(type === "manual") {
      return(
        <IngredientList />  
      )
    }
  }

  return (
    <div>
      {getContent()}
    </div>
  )
}

export default AddRecipeIngred
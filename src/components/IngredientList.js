import React from 'react';
import './IngredientList.css'
import Editable from './Editable'
import axios from 'axios'

const IngredientList = (props) => {
  const inputRef = React.useRef()
  const [newIngred, setNewIngred] = React.useState("")
  const [ingredients, setIngredients] = React.useState(props.ingredients ? props.ingredients : [])
  const [error, setError] = React.useState(null)

  const handleNewSubmit = e => {
    e.preventDefault()
    if (newIngred.trim().length === 0) {
      let errorMsg = "Please enter a valid ingredient"
      setError(errorMsg)
      setNewIngred("")
      return
    }
    console.log("submitted")
    // let newIngredients = ingredients.slice().push(e.target.value)
    setIngredients([...ingredients, newIngred.trim()])
    setNewIngred("")
  }

  const handleNewChange = e => {
    setNewIngred(e.target.value)
  }

  const handleChange = (e, index) => {
    let updatedIngred = ingredients.slice()
    updatedIngred[index] = e.target.value
    setIngredients(updatedIngred)
  }

  const handleDelete = (e, index) => {
    console.log(ingredients)
    let updatedIngred = ingredients.slice()
    updatedIngred.splice(index, 1)
    console.log(ingredients)
    setIngredients(updatedIngred)
  }

  const renderIngredList = ingredients.map((el, index) =>
    <li key={index}>
      <Editable 
        childRef={inputRef}
        text={el}
        placeholder="Enter Ingredient"
        delete={handleDelete}
        index={index}
      >
        <input
          ref={inputRef}
          type="text"
          name={`ingredient-${index}`}
          placeholder="Enter Ingredient"
          value={el}
          onChange={e => handleChange(e, index)} />
      </Editable>
      <button
        className="ingredDelete"
        onClick={e => handleDelete(e, index)}>
        {index}
      </button>
    </li> 
  )
  // const renderIngredList = () => {
  //   return(
  //     ingredients.map((el, index) => (

  //   <div className="ingredient" key={index}>
  //     {el}
  //     <span>
  //       <button>
  //         <i className="fas fa-edit"></i>
  //       </button>
  //       <button>
  //         <i className="fas fa-times"></i>
  //       </button>
  //     </span>
  //   </div>
  // )))}

  const handleSubmit = () => {
    if (ingredients.length === 0) {
      let errorMsg = "Ingredients required"
      setError(errorMsg)
      return
    }
    console.log("submitted")
    // Add name to recipe
    props.updateRecipe("ingredients", ingredients)
    setIngredients([])
    props.complete("ingredients")
  }

  return(
    <div>
      {/* <form onSubmit={handleSubmit}>
        {renderIngredList}
        <input type="text" required value={newIngred} onChange={handleChange} />
        <input type="submit" value="Add" />
      </form> */}
      <ul>
        {renderIngredList}
        <li>
          <form onSubmit={handleNewSubmit}>
            <input type="text" required value={newIngred} onChange={e => handleNewChange(e)} />
            <input type="submit" value="Add" />
          </form>
        </li>
      </ul>
      {error
        ? (<div className="error">{error}</div>)
        : (null)
      }
      <button 
        className="listSubmit"
        onClick={handleSubmit}>
          Submit
      </button>
    </div>
  )
}

export default IngredientList


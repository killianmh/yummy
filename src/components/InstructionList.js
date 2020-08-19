import React from 'react';
import './InstructionList.css'
import Editable from './Editable'
import axios from 'axios'

const InstructionList = (props) => {
  const inputRef = React.useRef()
  const [newInstruction, setNewInstruction] = React.useState("")
  const [instructions, setInstructions] = React.useState(props.instructions ? props.instructions : [])
  const [error, setError] = React.useState(null)

  const handleNewSubmit = e => {
    e.preventDefault()
    if (newInstruction.trim().length === 0) {
      let errorMsg = "Please enter a valid instruction"
      setError(errorMsg)
      setNewInstruction("")
      return
    }
    console.log("submitted")
    // let newIngredients = ingredients.slice().push(e.target.value)
    setInstructions([...instructions, newInstruction.trim()])
    setNewInstruction("")
  }

  const handleNewChange = e => {
    setNewInstruction(e.target.value)
  }

  const handleChange = (e, index) => {
    let updatedInstructions = instructions.slice()
    updatedInstructions[index] = e.target.value
    setInstructions(updatedInstructions)
  }

  const handleDelete = (e, index) => {
    console.log(instructions)
    let updatedInstructions = instructions.slice()
    updatedInstructions.splice(index, 1)
    console.log(instructions)
    setInstructions(updatedInstructions)
  }

  const renderStepList = instructions.map((el, index) =>
    <li key={index}>
      <Editable 
        childRef={inputRef}
        text={el}
        placeholder="Enter Step"
        delete={handleDelete}
        index={index}
      >
        <input
          ref={inputRef}
          type="text"
          name={`step-${index}`}
          placeholder="Enter Step"
          value={el}
          onChange={e => handleChange(e, index)} />
      </Editable>
      <button
        className="instructDelete"
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
    if (instructions.length === 0) {
      let errorMsg = "Instructions required"
      setError(errorMsg)
      return
    }
    console.log("submitted")
    // Add name to recipe
    props.updateRecipe("instructions", instructions)
    setInstructions([])
    props.complete("instructions")
  }

  return(
    <div>
      {/* <form onSubmit={handleSubmit}>
        {renderIngredList}
        <input type="text" required value={newIngred} onChange={handleChange} />
        <input type="submit" value="Add" />
      </form> */}
      <ol>
        {renderStepList}
        <li>
          <form onSubmit={handleNewSubmit}>
            <input type="text" required value={newInstruction} onChange={e => handleNewChange(e)} />
            <input type="submit" value="Add" />
          </form>
        </li>
      </ol>
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

export default InstructionList


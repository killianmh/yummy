import React from 'react';
import Editable from './Editable'
import './NewRecipe.css'

const Name = props => {
  const inputRef = React.useRef()
  const [name, setName] = React.useState(props.name ? props.name : "")
  const [error, setError] = React.useState(null)

  const handleChange = (e, index) => {
    let updated =  e.target.value
    setName(updated)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (name.trim().length === 0) {
      let errorMsg = "Please enter a valid name"
      setError(errorMsg)
      setName("")
      return
    }
    console.log("submitted")
    // Add name to recipe
    props.updateRecipe("name", name.trim())
    setName("")
    props.complete("name")
  }

  return(
    <div>
    {/* <h2>Enter Recipe Name</h2> */}
      <form onSubmit={handleSubmit}>
        <Editable 
          childRef={inputRef}
          text={name}
          placeholder="Enter Recipe Name"
        >
          <input
            ref={inputRef}
            type="text"
            name="name"
            placeholder="Enter Recipe Name"
            value={name}
            onChange={e => handleChange(e)}
            required />
        </Editable>
        {/* <input type="text" required value={name} onChange={e => handleChange(e)} /> */}
        <input type="submit" value="Add" />
      </form>
      {error
        ? (<div className="error">{error}</div>)
        : (null)
      }
    </div>
  )
}

export default Name
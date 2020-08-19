import React from 'react';
import './NewRecipe.css'

const Url = props => {
  const inputRef = React.useRef()
  const [url, setUrl] = React.useState(props.url ? props.url : "")

  const handleChange = (e, index) => {
    let updated =  e.target.value
    setUrl(updated)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log("submitted")
    // Add name to recipe
    props.updateRecipe("url", url)
    setUrl("")
    props.complete("url")
  }

  const handleSkip = e => {
    setUrl("")
    props.complete("url")
  }


  return(
    <div>
    <h2>Enter Recipe URL</h2>
      <form onSubmit={handleSubmit}>
        <input type="url" required value={url} onChange={e => handleChange(e)} />
        <input type="submit" value="Add" />
      </form>
      <button onClick={handleSkip}>
        skip
      </button>
    </div>
  )
}

export default Url
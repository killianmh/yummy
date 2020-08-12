import React from 'react'
import './Day2.css'
// import Card from './Card'

const Day = props => {
  return (
    <div className="day">
      <h2>
        {props.title}
      </h2>
      <div className="underline"></div>
      <div className="box">
        {props.recipe ? 
          (
            <div className="recipeImg" style={{backgroundImage: "url(" + props.recipe.image + ")"}}>
              <div className="header">
                {props.recipe.name}
              </div>
              <div className="remove">
                <button 
                  className="removeButton"
                  onClick={(e) => props.remove(e, props.id)}>
                  remove
                </button>
              </div>
            </div>
          )
          :(
              <button 
                className="addButton"
                onClick={() => props.add(props.chosenRecipe, props.title)}>
                  <i className="fas fa-plus" />
              </button>
          )}
      </div>
    </div>
    // <Card title={props.title} type={"day"} recipe={props.recipe}>
      
    // </Card>
    // <div className="day">
    //   <div className="day-header">
    //     <h2>{props.title}</h2>
    //   </div>
    //   <div className="inner">
    //     {/* <Draggable>props.cards</Draggable> */}
    //   </div>
    // </div>
  )
}

export default Day
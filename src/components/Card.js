import React from 'react'
import './Card.css'


const Card = props => {
  let cardClass
  // let renderedActions
  let viewClass, addClass, onClickView, onClickAdd
  if (props.actions) {
    const {actions} = props.actions
    console.log(actions)
    viewClass = actions[0].name
    onClickView = actions[0].onClick
    addClass = actions[1].name
    onClickAdd = actions[1].onClick
  }
  switch (props.type) {
    case "add":
      cardClass = "card card-add"
      break
    case "recipe":
      cardClass = "card card-recipe"
      // renderedActions = actions.map((action, i) => 
      //   <button key={props.title + i} className={action.name} onClick={() => action.onClick(props.title, i)}>
      //     {switch (i) {
      //       case 0:
              
      //     }}
      //   </button>
      // )
      break
  }
  
  // console.log(props.title)

  let backgroundStyle
  if (props.image) {
    backgroundStyle = {
      backgroundImage: "url(" + props.image + ")"
    }
  }
  
  
  return (
    <div className={cardClass} style={backgroundStyle}>
      <div className="card-header">
        <h2>{props.title}</h2>
      </div>
      <div className="inner">
        {props.children}
      </div>
      {props.actions ?
        (<div className="card-footer">
          <button className={viewClass} onClick={() => onClickView(props.title, 0)}>
            <i className="fas fa-search-plus" />
          </button>
          <button className={addClass} onClick={() => onClickAdd(props.title, 1)}>
            <i className="fas fa-plus" />
          </button>
        </div>) 
        : (null)
      }
    </div>
  )
}

export default Card
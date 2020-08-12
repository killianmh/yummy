import React from 'react'
import './Card.css'

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
  }

  getClass = () => {
    switch (props.type) {
      case "day":
        return "card card-day"
        break
      case "recipe":
        return "card card-recipe"
        break
    }
  }
  handleClick = (id, e) => {
    this.props.action.onClick(id, e)
  }

  getActions = () => {
    props.actions.map(action => 
      <button className={action.name} onClick={action.onClick}>
        {action.label}
      </button>
    )
  }

  render() {
    <div className={this.getClass}>
      <div className="card-header">
        <h2>{props.title}</h2>
      </div>
      <div className="inner">
        {props.children}
      </div>
      <div className="card-footer">
        {this.getActions}
      </div>
    </div>
  }

}

export default Card
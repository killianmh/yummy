import React from 'react';
import './ModalNav.css'

const ModalNav = props => {

  const last = props.steps.length - 1
  console.log(last)
  const steps = props.steps.map((el, index) => 
      <div
        className={props.type === el ? "step current" : "step"}
        key={index}
      >
        {el} 
        {index === last
          ? (null)
          : (<i className="fas fa-angle-right"></i>)
        }
      </div>
  )

  return (
    <div className="modalNav">
      {steps}
    </div>
  )
}

export default ModalNav
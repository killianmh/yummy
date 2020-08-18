import React, { useEffect } from 'react';
import './Editable.css'

const Editable = (
  {
    type, 
    text, 
    placeholder, 
    children,
    childRef, 
    ...props
  }) => {
    const [isEditing, setEditing] = React.useState(false)

    useEffect(() => {
      if (childRef && childRef.current && isEditing) {
        childRef.current.focus()
      }
    }, [childRef, isEditing])

    return (
      <div>
        {isEditing
          ? (
              <div
                onBlur={() => setEditing(false)}
              >
                {children}
              </div>
          )
          : (
            <div
              className="ingredient"
              onClick={() => setEditing(true)}
            >
              <span>{text || placeholder}</span>
            </div>
          )
        }
        <button
          className="ingredDelete"
          onClick={e => props.delete(e, props.index)}>
          {props.index}
        </button>
      </div>
    )
}

export default Editable
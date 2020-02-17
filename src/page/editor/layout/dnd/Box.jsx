import React from 'react'
import { useDrag } from 'react-dnd'
import ItemTypes from './ItemTypes'
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}
const Box = ({ name }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { name, type: ItemTypes.BOX },
    end: (item, monitor) => {
      console.log(item)
      console.log(monitor)
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`)
      }
    },
    collect: (monitor, props) => {
      console.log(monitor)
      console.log(props)
      return {
        isDragging: monitor.isDragging(),
      }
    },
  })
  const opacity = isDragging ? 0.4 : 1
  return (
    <div className="box-am">
      <div ref={drag} style={{ ...style, opacity }}>
        {name}
      </div>
    </div>
    
  )
}
export default Box

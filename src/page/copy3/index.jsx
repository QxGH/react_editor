import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./style.css";

function Copyable(props) {
  return (
    <Droppable droppableId={props.droppableId} isDropDisabled={true}>
      {(provided, snapshot) => (
        <ul ref={provided.innerRef} className={props.className}>
          {props.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <React.Fragment>
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                    className={snapshot.isDragging ? "dragging" : ""}
                  >
                    {item.label}
                  </li>
                  {snapshot.isDragging && (
                    <li className="react-beatiful-dnd-copy">{item.label}</li>
                  )}
                </React.Fragment>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

function Shop(props) {
  return <Copyable droppableId="SHOP" className="shop" items={props.items} />;
}

function ShoppingBag(props) {
  return (
    <Droppable droppableId="BAG">
      {(provided, snapshot) => (
        <ul ref={provided.innerRef} className="shopping-bag">
          {props.items.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided, snapshot) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={provided.draggableProps.style}
                >
                  {item.label}
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
}

const COLLECTION = [
  { id: uuid(), label: "Apple" },
  { id: uuid(), label: "Banana" },
  { id: uuid(), label: "orange" }
];

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  console.log('destination')
  console.log(destination)
  const item = source[droppableSource.index];
  destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destination;
};

class index extends Component{
  constructor(props){
    super(props)
    this.state = {
      shoppingBagItems: []
    }
  }
  onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          shoppingBagItems: reorder(this.state.shoppingBagItems, source.index, destination.index)
        })
        break;
      case "SHOP":
        this.setState({
          shoppingBagItems: copy(COLLECTION, this.state.shoppingBagItems, source, destination)
        })
        break;
      default:
        break;
    }
  }
  render(){
    return (
      <div className="copy3">
        <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
          <div style={{width: '50%', float: 'left'}}>
            <h2>Shop</h2>
            <Shop items={COLLECTION} />
          </div>
          <div style={{width: '50%', float: 'left'}}>
            <h2>Shopping bag</h2>
            <ShoppingBag items={this.state.shoppingBagItems} />
          </div>
        </DragDropContext>
      </div>
    )
  }
}

export default index;


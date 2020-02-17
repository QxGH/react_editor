/**
 * list
 */
import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import './style/index.min.css'

class index extends Component {
  render() {
    return (
      <Droppable droppableId={this.props.droppableId} isDropDisabled={true}>
        {(provided, snapshot) => (
          <ul ref={provided.innerRef} className={this.props.className}>
            {this.props.items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <React.Fragment>
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                      className={[snapshot.isDragging ? "dragging" : "", 'components-item'].join(' ')}
                    >
                      <div className="item-box">
                        <div className="icon-box">
                          <i className={['iconfont', item.icon ? item.icon : ''].join(' ')}></i>
                        </div>
                        <span className="item-name">
                          {item.label}
                        </span>
                      </div>
                    </li>
                    {snapshot.isDragging && (
                      <li className="react-beatiful-dnd-copy components-item">
                        <div className="item-box">
                          <div className="icon-box">
                            <i className={['iconfont', item.icon ? item.icon : ''].join(' ')}></i>
                          </div>
                          <span className="item-name">
                            {item.label}
                          </span>
                        </div>
                      </li>
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
}

export default index;
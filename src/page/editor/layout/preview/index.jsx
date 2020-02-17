/**
 * preview
 */
import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

import store from '../../../../redux/index'
import { changeEditorIndex } from '../../../../redux/actionCreator'

import Carousel from '../../components/carousel';
import Divider from '../../components/divider';

import './style/index.min.css'

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focusIndex: ''
    }
  }

  changeEditorIndexHandle(val) {
    const action = changeEditorIndex(val);
		store.dispatch(action);
  }

  clickHandle(item, index) {
    this.setState({
      focusIndex: index
    })
    this.changeEditorIndexHandle(index)
    this.props.editorIndexChange(index)
  }

  showComponent(item, index, editorItems){
    let name = item.label;
    switch (name) {
      case '走马灯':
        return <Carousel setting={editorItems[index]}/>
      case '分隔符':
        return <Divider setting={editorItems[index]}/>
      default:
        break;
    }
  }

  render(){
    return (
      <div className="preview">
        <div className="preview-main">
        <Droppable droppableId="BAG">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} className="preview-list">
              {this.props.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                      onClick={this.clickHandle.bind(this, item, index)}
                      className={['dragItem', this.state.focusIndex === index ? 'focusItem' : ''].join(' ')}
                    >
                      {this.showComponent(item, index, this.props.items)}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        </div>
      </div>
    )
  }
}

export default index;
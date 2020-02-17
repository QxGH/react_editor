/**
 * editor
 */
import React, { Component } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';
import uuid from 'uuid/v4';
import store from '../../redux/index';
import { changeEditorList } from '../../redux/actionCreator'

// import { DndProvider } from 'react-dnd'
// import Backend from 'react-dnd-html5-backend'
// import Example from './layout/dnd/example'

import componentsList from './config'

import './style/index.min.css';

import Copyable from './layout/list/';
import Preview from './layout/preview/';
import Setting from './layout/setting/';

const reorder = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

const copy = (source, destination, droppableSource, droppableDestination) => {
  const item = source[droppableSource.index];
  destination.splice(droppableDestination.index, 0, { ...item, id: uuid() });
  return destination;
};


class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewList: [],
      editorIndex: ''
    };
    store.subscribe(this.handleStoreChange.bind(this));
  };

  handleStoreChange(){
    console.log('editor handleStoreChange')
    let storeData = store.getState();
    console.log(storeData)
    let list = storeData.editorList;
    // this.showComponent(list[index])
    this.setState({
      previewList: list
    }, () => {
      console.log('this.state.previewList')
      console.log(this.state.previewList)
    });
  }

  onDragEnd(result) {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    switch (source.droppableId) {
      case destination.droppableId:
        this.setState({
          previewList: reorder(this.state.previewList, source.index, destination.index)
        })
        break;
      case "ComponentsDrop":
        this.setState({
          previewList: copy(componentsList, this.state.previewList, source, destination)
        })
        break;
      default:
        break;
    }
    console.log(this.state.previewList)
    this.changeEditorListHandle(this.state.previewList)
  }

  changeEditorListHandle(val) {
    const action = changeEditorList(val);
		store.dispatch(action);
  }

  editorIndexChangeHandle(val) {
    this.setState({
      editorIndex: val
    })
  }

  render() {
    return (
      <div className="editor">
        <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
          <div className="sider">
            <Copyable droppableId="ComponentsDrop" className="components-list" itemClassName="components-item" items={componentsList} />
          </div>
          <div className="content">
            {/* <DndProvider backend={Backend}>
              <Example />
            </DndProvider> */}
            {/* drag */}
            <Preview items={this.state.previewList} editorIndexChange={this.editorIndexChangeHandle.bind(this)} />
            {/* <ShoppingBag items={this.state.shoppingBagItems} /> */}
          </div>
        </DragDropContext>
        <div className="sider">
          <Setting items={this.state.previewList} index={this.state.editorIndex}></Setting>
        </div>
      </div>
    );
  }
}

export default index;
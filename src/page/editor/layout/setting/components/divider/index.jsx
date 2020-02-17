/**
 * setting divider 
 */
import React, { Component } from 'react';
import { Divider, Select } from 'antd';
import { SketchPicker } from 'react-color';


import store from '../../../../../../redux/index';
import { changeEditorList } from '../../../../../../redux/actionCreator'

import './style/index.min.css'

const { Option } = Select;

class index extends Component {
  showModule = false;
  constructor(props) {
    super(props)
    this.state = {
      showColorPicker: false,
      color: '#333333',
      size: '1'
    }
    store.subscribe(this.handleStoreChange);
  }

  componentDidMount(){
    this.showModule = true
    this.fillData()
  }

  fillData(){
    let storeData = store.getState()
    let setting = storeData.editorList[storeData.editorIndex].setting
    if(Object.keys(setting).length > 0) {
      if(setting.color) {
        this.setState({
          color: setting.color
        })
      } else {
        this.setState({
          color: '#333333'
        })
      };
      if(setting.size) {
        this.setState({
          size: setting.size
        })
      } else {
        this.setState({
          size: '1'
        })
      };
    } else {
      this.setState({
        color: '#333333',
        size: '1'
      })
    }
  }

  handleStoreChange = () => {
    if(!this.showModule) {
      return
    };
    this.fillData()
	}

  colorChangeComplete(color) {
    this.setState({ color: color.hex })
    this.changeEditorListHandle(color.hex, 'color')
  }

  changeEditorListHandle(val, type) {
    let editorData = store.getState();
    let editorList = editorData.editorList;
    let editorIndex = editorData.editorIndex;
    let setting = editorList[editorIndex].setting;
    if(editorList.length > 0 && editorIndex !== '') {
      if(type === 'color') {
        editorList[editorIndex].setting = {...setting, ...{color: val}}
      } else if(type === 'size') {
        editorList[editorIndex].setting = {...setting, ...{size: val}}
      } else {
        return
      };
      const action = changeEditorList(editorList);
		  store.dispatch(action);
    }
  }

  swatchOpen(){
    this.setState({
      showColorPicker: true
    })
  }

  swatchClose(e){
    e.stopPropagation()
    this.setState({
      showColorPicker: false
    })
  }

  sizeChange(val){
    this.setState({
      size: val
    })
    this.changeEditorListHandle(val, 'size')
  }

  render() {
    return (
      <div className="setting-divider">
        <Divider>Color</Divider>
        <div className="swatch" onClick={this.swatchOpen.bind(this)}>
          <span className="swatch-color" style={{ background: this.state.color }}></span>
          {
            this.state.showColorPicker
            ?
            <React.Fragment>
              <div className="swatch-mask" onClick={(e)=>this.swatchClose(e)}></div>
              <div className="swatch-pack">
                <SketchPicker
                  color={this.state.color}
                  onChangeComplete={this.colorChangeComplete.bind(this)}
                />
              </div>
            </React.Fragment>
            :
            null
          }
        </div>
        <Divider>Size</Divider>
        <div className="size">
          <Select defaultValue='1' value={this.state.size} style={{ width: 330 }} onChange={this.sizeChange.bind(this)} >
            <Option value="1">1px</Option>
            <Option value="2">2px</Option>
            <Option value="4">4px</Option>
          </Select>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    this.showModule = false
  }
}

export default index;
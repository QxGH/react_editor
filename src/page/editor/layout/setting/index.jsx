/**
 * setting
 */
import React, { Component } from 'react';

import CarouselSetting from './components/carousel';
import DividerSetting from './components/divider';

import './style/index.min.css'

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorList: [],
      editorIndex: ''
    }
  }

  componentWillMount() {
    console.log('this.props')
    console.log(this.props)
  }

  render() {
    let ShowComponent = <div></div>;
    let list = this.props.items;
    let index = this.props.index;
    if(list.length > 0 && index !== '') {
      let name = list[index].label;
      switch (name) {
        case '走马灯':
          ShowComponent =  <CarouselSetting setting={this.props.items[this.props.index].setting} index={this.props.index} />
          break;
        case '分隔符':
          ShowComponent = <DividerSetting setting={this.props.items[this.props.index].setting} index={this.props.index} />
          break;
        default:
          break;
      }
    }

    return (
      <div className="setting">
        {/* <ShowComponent></ShowComponent> */}
        {ShowComponent}
      </div>
    );
  }

}

export default index;
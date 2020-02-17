/**
 * prview divider
 */
import React, { Component } from 'react';

import './style/index.min.css'

class index extends Component {
  render() {
    let color = '#333333';
    let size = '1'
    if(Object.keys(this.props.setting.setting).length > 0 ) {
      color = this.props.setting.setting.color ? this.props.setting.setting.color : ''
      size = this.props.setting.setting.size ? this.props.setting.setting.size : ''
    }

    return (
      <div className="divider">
        <i className="divider-line" style={{background: color, height: size+'px'}}></i>
      </div>
    );
  }
}

export default index;
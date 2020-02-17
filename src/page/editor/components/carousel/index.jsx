/**
 * editor preview
 */
import React, { Component } from 'react';
import { Carousel } from 'antd';

import './style/index.min.css'

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          imgUrl: 'https://i.loli.net/2020/02/16/jGSCwEzIe4DaFtL.jpg'
        }
      ],
      propsList: []
    }
  }

  render() {
    return (
      <Carousel autoplay>
        {
          Object.keys(this.props.setting.setting).length > 0
          ?
          this.props.setting.setting.list.map((item, index) => (
            <div className="carousel-item" key={index} >
              <img src={item.imgUrl} className="carousel-img" alt="carousel img"/>
            </div>
          ))
          :
          this.state.list.map((item, index) => (
            <div className="carousel-item" key={index} >
              <img src={item.imgUrl} className="carousel-img" alt="carousel img"/>
            </div>
          ))
        }
      </Carousel>
    );
  }
}

export default index;
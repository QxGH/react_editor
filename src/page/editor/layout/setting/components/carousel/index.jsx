/**
 * setting carousel 
 */
import React, { Component } from 'react';
import { Collapse, Upload, Icon, message, Button, Divider } from 'antd';
import store from '../../../../../../redux/index';
import { changeEditorList } from '../../../../../../redux/actionCreator'

import './style/index.min.css'

const { Panel } = Collapse;

class index extends Component {
  showModule = false;
  constructor(props) {
    super(props)
    this.state = {
      list: [
        {
          imgUrl: 'https://i.loli.net/2020/02/16/jGSCwEzIe4DaFtL.jpg'
        }
      ]
    };
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
      this.setState({
        list: setting.list
      })
    } else {
      this.setState({
        list: [
          {
            imgUrl: 'https://i.loli.net/2020/02/16/jGSCwEzIe4DaFtL.jpg'
          }
        ]
      })
    }
  }

  handleStoreChange = () => {
    if(!this.showModule) {
      return
    }
    this.fillData()
	}

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
      return;
    }
  }

  handleChange = (index, info) => {
    if (info.file.status === 'uploading') {
      let list = this.state.list;
      list[index].loading = true;
      this.setState({ list });
      return;
    };
    if (info.file.status === 'done') {
      this.getBase64(info.file.originFileObj, imageUrl => 
        {
          let list = this.state.list;
          list[index].imgUrl = imageUrl;
          list[index].loading = false;
          this.setState({
            list
          });
          this.changeEditorListHandle(list)
        }
      );
    };
  };



  addCarouselItem() {
    let list = this.state.list;
    if(list.length >= 4) {
      message('最多只能添加4张卡片')
      return;
    };
    let obj = {
      imgUrl: 'https://i.loli.net/2020/02/16/jGSCwEzIe4DaFtL.jpg',
      loading: false
    };
    list.push(obj);
    this.setState({
      list
    });
    this.changeEditorListHandle(list)
  }

  changeEditorListHandle(list) {
    let editorData = store.getState();
    let editorList = editorData.editorList;
    let editorIndex = editorData.editorIndex;
    if(editorList.length > 0 && editorIndex !== '') {
      editorList[editorIndex].setting.list = list;
      const action = changeEditorList(editorList);
		  store.dispatch(action);
    }
  }

  render() {
    const uploadButton = (item) => (
      <div>
        <Icon type={item.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="carousel">
        <Collapse defaultActiveKey={[0]}>
        {
          this.state.list.map((item, index) => (
            <Panel header={"轮播-"+(index+1)} key={index}>
              <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={this.beforeUpload.bind(this)}
                onChange={this.handleChange.bind(this, index)}
              >
                {
                  item.imgUrl && !item.loading
                  ? 
                  <img src={item.imgUrl} alt="avatar" style={{ width: '100%' }} /> 
                  : 
                  uploadButton(item)
                }
              </Upload>
            </Panel>
          ))
        }
        </Collapse>
        <Divider />
        <Button type="primary" block onClick={this.addCarouselItem.bind(this)} >
          Add
        </Button>
      </div>
    );
  }

  componentWillUnmount() {
    this.showModule = false
  }
}

export default index;
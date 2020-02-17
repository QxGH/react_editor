const componentsList = [
  // { 
  //   id: '1',
  //   label: "image",
  //   icon: 'icon-image'
  // }, { 
  //   id: '2',
  //   label: "text",
  //   icon: 'icon-text'
  // }, { 
  //   id: '3',
  //   label: "按钮",
  //   icon: 'icon-button-handle'
  // }, 
  { 
    id: '4',
    label: "走马灯",
    icon: 'icon-carousel'
  }, { 
    id: '5',
    label: "分隔符",
    icon: 'icon-divider'
  }
];

componentsList.map((item) => {
  item['setting'] = {};
  return item.id;
});

export default componentsList;
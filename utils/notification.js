import {  notification, Icon } from 'antd';
const openNotification = (type, title,description,icon = '') => {
   if(icon == ''){
        if(type=='success')
            icon = <Icon type="smile" theme="twoTone" twoToneColor="#00ff00"/>
        else if(type=='error')
            icon = <Icon type="frown" theme="twoTone" twoToneColor="#eb2f96"/>
        else 
            icon = <Icon type="exclamation-circle" style={{ color: '#108ee9' }}/>
    }
    
    notification[type]({
      message: title,
      description:
        description,
      icon:  icon,
    });
  };

export {
    openNotification
} 
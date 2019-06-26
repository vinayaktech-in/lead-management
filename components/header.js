import React,{Component}  from 'react';
import { Layout,Menu } from 'antd';
const { Header} = Layout;

    
export default class HeaderComponent extends Component {
    render() {
       const isMobile = this.props.isMobile;
       const menuMode = isMobile ? 'inline' : 'horizontal';
       return <Header style={{ height:"54px", backgroundColor:"#fff", position: 'fixed', zIndex: 1, width: '100%', padding:"0" }}>
        <div className="logo" />
        <Menu
          theme="light"
          mode={menuMode}
          defaultSelectedKeys={['2']}
          style={{ lineHeight: '54px' }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
    }
}
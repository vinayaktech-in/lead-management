import React,{Component}  from 'react';
import { Layout,Menu,Icon } from 'antd';
const {Sider} = Layout;
import Link from 'next/link'
const { SubMenu } = Menu;
import PropTypes from 'prop-types';
import { withNamespaces } from '../i18n'
import _ from 'underscore';
function RenderMenus (props) {
  const menus = props.menus; 
  const permissions = props.permissions;
  const renderMenu = menus.map((menu)=> {
     if(menu.submenus && _.intersection(permissions,menu.menu.permissions).length > 0){
      return ( <SubMenu
              key = {menu.menu.name}
              title={
                <span>
                  <Icon type={menu.menu.icon} style={{ fontSize: '16px'}} />
                  <span>{menu.menu.name}</span>
                </span>
              }
              >
              {  menu.submenus.map((submenu) => {
                    if(_.intersection(permissions,submenu.permissions).length > 0){
                      
                       return ( <Menu.Item key={submenu.name}><Link href={submenu.link}><div><Icon type={submenu.icon} style={{ fontSize: '16px'}}/>{submenu.name}</div></Link></Menu.Item>)
                      
                    }
                  }
                )
              } 
            </SubMenu>
        )
     } else {
       if(_.intersection(permissions,menu.menu.permissions).length > 0){
          return (
          
            <Menu.Item key={menu.menu.name}>
                <Link href={menu.menu.link}>
                  <div><Icon type={menu.menu.icon} style={{ fontSize: '16px'}}/>{menu.menu.name}</div>
                </Link>
            </Menu.Item>
          )
       }
       
     }
     
      });

    return <Menu
    mode="inline"
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    style={{ height: '100%' }}
  > {renderMenu}</Menu>;
}
let position = 'fixed';

class SidebarComponent extends Component {
    static propTypes = {
      permissions: PropTypes.array.isRequired
    };
    
    componentDidMount() {
      position = this.props.isMobile ? 'relative' : 'fixed';
    }
    render() {
      const { permissions , t } = this.props;
      const menus = [{
         menu :  {name: t('user'),icon:"user",permissions:['ADD_USER']},
         submenus : [
          {name: t('system-user'),icon:"user",link:"/",permissions:['ADD_USER']},
          {name: t('end-user'),icon:"user",link:"/end-users",permissions:[]}, 
         ]
      }, {
        menu :  {name: "Lead",icon:"sketch",link:"admin/leads", permissions:['ADD_LEAD','DELETE_LEAD','DISINTEREST_LEAD','EDIT_LEAD','LEAD_MANAGEMENT','VIEW_LEAD']},
      }, {
        menu : {name: "Settings",icon:"setting",permissions:['ADD_CITY','ADD_COUNTRY','ADD_STATE']},
        submenus : [
          {name: "Country",icon:"home",link:"/countries",permissions:['ADD_COUNTRY']},
          {name: "State",icon:"home",link:"/states",permissions:['ADD_STATE']} ,
          {name: "Zone",icon:"home",link:"/zones",permissions:[]},
          {name: "City",icon:"home",link:"/cities",permissions:[]}
        ]
      }];
      
      return <Sider width={200} style={{ background: '#fff',
       height: '100vh',
       position: position }}  breakpoint="xs"
       collapsedWidth="0"
      >
           <RenderMenus menus={menus} permissions={permissions} />
        </Sider>
    }
}
export default withNamespaces('menu')(SidebarComponent);
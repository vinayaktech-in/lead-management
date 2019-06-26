import React,{Component}  from 'react';
import Main from 'layouts/main'
import { Layout } from 'antd';
import { withAuthSync } from 'utils/auth'
import { i18n, withNamespaces } from '../../i18n'
import {connect} from 'react-redux';
const { Content } = Layout;

class App extends Component {
  static async getInitialProps() {
    return {
     
    }
  }
  render() {
    const {user, permissions} = this.props;
     return <Main user={user} permissions = {permissions}>
           Leads
        </Main>
      
    
  }
}
function mapStateToProps(state) {
  return {
      user: state.session.user,
      permissions: state.session.permissions
  };
}
export default connect(mapStateToProps)(withAuthSync(withNamespaces('lead')(App)))
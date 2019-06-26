import { enquireScreen } from 'enquire-js';
import HeaderComponent from '../components/header';
import SidebarComponent from '../components/sidebar';

// import stylesheet from 'antd/dist/antd.min.css'

import { Layout } from 'antd';
const {Content} = Layout;

let isMobile = false;
enquireScreen(b => {
  isMobile = b;
});
let contentPadding = 210;
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile
    };
  }
  componentDidMount() {
    enquireScreen(b => {
      this.setState({
        isMobile: !!b,
      });
    });
    // console.log(this.state.isMobile);
    contentPadding = this.state.isMobile ? 10 : 210;
  }
  render() {
    const { children, permissions} = this.props;
    return <Layout>
    {/* <style dangerouslySetInnerHTML={{ __html: stylesheet }} /> */}
   
    <HeaderComponent isMobile={false}/>
    <Layout style={{marginTop:54}}>
      <SidebarComponent permissions = {permissions} isMobile={this.state.isMobile}/>
      {/*<Layout style={{ marginLeft: 220,  marginRight:20, marginTop:20, minHeight:'100vh',overflow: 'auto' }}>*/}
        <Content style={{ background: '#fff', padding: 24,marginLeft: contentPadding,  marginRight:10, marginTop:10,marginBottom:10,minHeight:'100vh' }}>
            {children}
        </Content>
      {/*</Layout>*/}
    </Layout>
    </Layout>
  }
}
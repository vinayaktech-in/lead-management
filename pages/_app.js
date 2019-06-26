import React from "react";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import withReduxStore from "redux/with-redux-store";
import { appWithTranslation } from '../i18n';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {Spin} from 'antd';
import {whoAmI} from 'actions';
import nextCookie from 'next-cookies';
// import NextNProgress from '../utils/NextNProgress';
Router.events.on('routeChangeStart', url => {
    NProgress.start()
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());
class MyApp extends App {
    state = { loading: true };
 
   static async getInitialProps({ Component, ctx }) {
    const { store, req } = ctx;
    const isServer = !!req;
   
    if (isServer) {
        // happens on page first load
        const {user,token,permissions} = nextCookie(ctx);
        if (token) {
          await store.dispatch(whoAmI(token,user,permissions));
        }
      }
    
       const pageProps = Component.getInitialProps
           ? await Component.getInitialProps(ctx)
           : {};
            return { pageProps };
   }

   componentDidMount(){
        this.setState({ loading: false });
   }
   render() {
       const { Component, pageProps, store } = this.props;
       return (
           <Container>
               <Spin spinning={this.state.loading}> 
                    <Provider store={store}>
                        <Component {...pageProps} />
                    </Provider>
               </Spin>
           </Container>
       );
   }
}


export default withReduxStore(appWithTranslation(MyApp));
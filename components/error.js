import React,{Component}  from 'react';
import {openNotification} from 'utils/notification';
export default class Error extends Component {
    componentDidMount(){
        if(this.props.error) {
          openNotification('error','Opps! Something went wrong',this.props.error);  
        }
      } 
      render(){
          return <div></div>
      }
}
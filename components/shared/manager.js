import React,{Component}  from 'react';
import {Select, Checkbox} from 'antd'
import {connect} from 'react-redux';
import {findSuccessors} from 'actions'
import {  withNamespaces } from '../../i18n'
import _ from 'underscore';

const { Option, OptGroup } = Select;

class Manager extends Component {
    constructor(props){
        super(props);
        
    }
    componentDidMount(){
        this.props.findSuccessors(this.props.manager, false);
        
    } 
    findAllSuccessors = e => {
       this.props.findSuccessors(this.props.manager, e.target.checked);
    }
      render(){
          const {successors} = this.props;
          return <div>
                    <Select placeholder="Manager" mode={this.props.mode} onChange={this.props.selectSuccessors}>
                    {_.uniq(_.pluck(successors,'role')).map((role)=>{
                     return <OptGroup key={role} label={role}>
                        {
                            _.where(successors,{'role':role}).map((successor) => {
                                return <Option key={successor.id} value={successor.id}>{successor.name}</Option>
                            })
                        }
                        </OptGroup>
                      }
                    )
                }
                </Select>
                <Checkbox onChange={this.findAllSuccessors}>All Successors</Checkbox>
                </div>
          }
}

function mapStateToProps(state) {
    return {
        successors: state.session.successors
    };
  }
  function mapDispatchToProps(dispatch) {
      return {
        findSuccessors : (manager, all) => {
              dispatch(findSuccessors(manager,all));
          }
      }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces('user')(Manager))
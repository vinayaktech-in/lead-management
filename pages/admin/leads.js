import React,{Component}  from 'react';
import Main from 'layouts/main'
import { Layout, Breadcrumb ,Divider, Card , Button , Input ,Tooltip, Table , Drawer } from 'antd';
import { withAuthSync } from 'utils/auth'
import {  withNamespaces } from '../../i18n'
import {connect} from 'react-redux';
import {findAllLeads} from 'actions'
import  Error  from 'components/error';
import  LeadForm  from 'components/leads/leadForm';
import  LeadFilter  from 'components/leads/leadFilter';
import Link from 'next/link'
import _ from 'underscore'
const { Search } = Input;
const defaultFilter = {active: 'true', status:'All',source:'All', q: undefined, manager:[]};
// const { Title } = Typography;

class Lead extends Component {
  static async getInitialProps(ctx) {
    const {store} = ctx; 
    await store.dispatch(findAllLeads(1,10,{}))
    return { 
        namespacesRequired: ['lead'],
    }
  }  
  constructor(props) {
      super(props);
      this.state = {
        selectedRowKeys: [], 
        filter : defaultFilter,
        form : false,
        filterForm: false
      };
      this.columns = [
          {
              title : "Name",
              dataIndex : "name",
              fixed: this.props.isMobile ? false : 'left',
              width : 100,
              render: (text, record) => <a href="javascript:;">{text}</a>
          },
          {
              title : "Phone",
              dataIndex: "phone",
              width : 200,
          },
          {
              title : "Contact Name",
              dataIndex: "contactName",
              width : 100,
          },
          {
              title : "Email",
              dataIndex: "email",
              width: 100
          },
          {
              title : "Source",
              dataIndex: "source",
              width : 100,
          },
          {
              title : "Status",
              dataIndex: "status",
              width : 100,
          },
          {
              title : "Followup",
              dataIndex: "followup",
              render:(text, record) => <div>{text ? new Date(text).toLocaleDateString() : 'N/A'} </div>,
              width : 100,
          },
          {
              title : "Address",
              width : 800,
              children : [
                  {
                      title : "Street",
                      dataIndex: "address",
                      width : 200,
                  },
                  {
                      title : "City",
                      dataIndex: "city",
                      width : 80,
                  },
                  {
                      title : "State",
                      dataIndex: "state",
                      width : 100,
                  },
                  {
                      title : "Country",
                      dataIndex: "country",
                      width : 100,
                  }
              ]
              
          },
          {
              title : "Referal",
              children : [
                  {
                      title : "Referal Name",
                      dataIndex: "referalName",
                      width : 100,
                  },
                  {
                      title : "Referal Phone",
                      dataIndex: "referealPhone",
                      width : 100,
                  }
              ]
          },
          
          {
              title : "Manager",
              fixed:  this.props.isMobile ? false : 'right'  ,
              dataIndex: "manager",
              render: (text, record) => <Link href={"/admin/users/"+record.managerId}>{text}</Link>,
              width : 100
          },
          {
              title : "Comment",
              fixed: this.props.isMobile ? false : 'right',
              dataIndex: "comment",
              render: (text, record) =>  <span style={{fontSize:"12px"}}>Special Comment : <br/><span dangerouslySetInnerHTML={{__html:record.specialComment ? record.specialComment.substring(0,100)+'...more' : ''}}/><br/><Divider/><br/> Comment : <br/><span dangerouslySetInnerHTML={{__html:record.comment ? record.comment.substring(0,100)+'...more' : ''}}/></span>, 
              width : 150
          },
          {
              title: 'Action',
              fixed: this.props.isMobile ? false : 'right',
              width: 200,
              render: (text, record) => (
                  <span>
                      <Tooltip placement="top" title="Edit lead"> <Button  type="default" icon="edit"></Button></Tooltip>
                      <Tooltip placement="top" title="Delete lead"> <Button  type="default" icon="delete"></Button></Tooltip>
                      <Tooltip placement="top" title="Send Email"> <Button  type="default" icon="mail"></Button></Tooltip>
                      <Tooltip placement="top" title="Add Comment"> <Button  type="default" icon="message"></Button></Tooltip>  
                      <Tooltip placement="top" title="Edit Special Comment or Full Comment"> <Button  type="default" icon="history"></Button></Tooltip> &nbsp;
                  </span>
                ),
          }
      
      ];
      this.handleLeadSearchInput = this.handleLeadSearchInput.bind(this);
  }

   

  
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  showForm = () => {
    this.setState({
      form: true,
    });
  };

  showFilterForm = () => {
    this.setState({
      filterForm: true,
    });
  };

  closeFilterForm = () => {
    this.setState({
        filterForm: false,
    });
  };

//   componentDidMount(){
//     if(this.props.error) {
//       openNotification('error','Opps! Something went wrong',this.props.error);  
//     }
//   } 
  handleLeadSearchInput = (event) => {
    const filter = {...this.state.filter};
      filter.q = event.target.value == '' ? undefined : event.target.value;
      this.setState({
         filter : filter
      },() => {
        if(!filter.q) { 
          this.props.findAllLeads(1, this.props.pagination.pageSize  , this.state.filter );
        }
      })
      
  }
  handleTableChange = (pagination, filters, sorter) => {
   
    const pager = { ...this.props.pagination };
    pager.current = pagination.current;
    this.props.findAllLeads(pagination.current, pagination.pageSize , filters )
  };
  onFilterSubmit = (search) => {
    this.setState((state, props) => ({
      filter: search
    }));
    this.props.findAllLeads(1, this.props.pagination.pageSize , search )
  }
  findLeadBySearch = (search) => {
      const filter = {...this.state.filter};
      filter.q = search;
      this.setState({
         filter : filter
      })
      this.props.findAllLeads(1, this.props.pagination.pageSize , filter )
  }
  resetFilter = () => {
    this.setState({
      filter : defaultFilter
   })
   this.props.findAllLeads(1, this.props.pagination.pageSize , defaultFilter )
  }
  render() {
    const {user, permissions, leads , total , loading , error , pagination} = this.props;
    const { selectedRowKeys , filter } = this.state;
    const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [
          {
            key: 'all-data',
            text: 'Select All Data',
            onSelect: () => {
              this.setState({
                selectedRowKeys: [...Array(total).keys()], // 0...45
              });
            },
          },
          {
            key: 'odd',
            text: 'Select Odd Row',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return false;
                }
                return true;
              });
              this.setState({ selectedRowKeys: newSelectedRowKeys });
            },
          },
          {
            key: 'even',
            text: 'Select Even Row',
            onSelect: changableRowKeys => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return true;
                }
                return false;
              });
              this.setState({ selectedRowKeys: newSelectedRowKeys });
            },
          },
        ],
      };
     return <Main user={user} permissions = {permissions}>
        { error && 
            <Error error={error.toString()} />
        }
        <Drawer
            title="Add new Lead"
            width={720}
            onClose={this.closeForm}
            visible={this.state.form}
        >
            <LeadForm/>
        </Drawer>
        <Drawer
            title="Search"
            width={this.props.isMobile ? "80%" : "40%"}
            onClose={this.closeFilterForm}
            visible={this.state.filterForm}
        >
            <LeadFilter onClose={this.closeFilterForm} filter={filter} onSubmit={this.onFilterSubmit} />
        </Drawer>
        <Breadcrumb separator=">">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
                Leads
            </Breadcrumb.Item>
        </Breadcrumb> 
        <Divider/>
        
        <Card title="Leads" size="small" loading={loading} extra={
            <div>
                <Search
                placeholder="search lead"
                value = {filter.q}
                onChange = {this.handleLeadSearchInput}
                onSearch={value => this.findLeadBySearch(value)}
                style={{ width: 200 }}  
                /> &nbsp;   
                <Tooltip placement="top" onClick={this.showFilterForm} title="Search by Filters"> 
                    <Button type={_.isEqual(filter,defaultFilter) ? 'default' : 'primary'} icon="filter" />
                </Tooltip> &nbsp;
                {!_.isEqual(filter,defaultFilter) && <Tooltip placement="top" onClick={this.resetFilter} title="Reset Filters"> 
                    <Button type= 'default' icon="sync" />&nbsp;
                  </Tooltip> 
                } 
                <Tooltip placement="top" title="Download by Excel">
                    <Button type="default"  icon="download" />
                </Tooltip> &nbsp;
                <Tooltip placement="top" onClick={this.showForm} title="Add Lead">
                    <Button>Add</Button>
                </Tooltip>&nbsp;
                {selectedRowKeys.length > 0 && <Tooltip placement="top" title="Delete Selected Leads" >
                    <Button>Delete { selectedRowKeys.length } leads</Button>
                </Tooltip>
                }
            </div>}>
            <Table columns = {this.columns} dataSource={leads} onChange={this.handleTableChange} pagination={{total : pagination.total, showSizeChanger : true, defaultPageSize: pagination.pageSize, current : pagination.current }} rowSelection={rowSelection} rowKey="id"  bordered
            size="middle"
            scroll={{ x: "max-content"}}/>
        </Card>     
     </Main>
      
    
  } 
}
function mapStateToProps(state) {
  return {
      user: state.session.user,
      permissions: state.session.permissions,
      leads : state.lead.leads,
      error: state.lead.error,
      total : state.lead.total,
      loading : state.lead.loading,
      pagination : state.lead.pagination,
      isMobile: state.session.isMobile
  };
}
function mapDispatchToProps(dispatch) {
    return {
        findAllLeads : (page,size,filters) => {
            dispatch(findAllLeads(page,size,filters));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withAuthSync(withNamespaces('lead')(Lead)))
import React,{Component, forwardRef}  from 'react';
import {Form, Button, Col, Row, Input, Select } from 'antd';
import Manager from '../shared/manager';
import staticValues from 'config/static';

const { Option } = Select;


class LeadFilter extends Component {
    componentDidMount(){
    } 
    constructor(props){
        super(props);
        this.state = {
            source: null,
            q: null,
            status : null,
            manager : null,
            active : true
        };
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log(values);
          this.setState({
              source : values.source,
              q :values.q,
              status: values.status,
              active: values.active
          }, ()=> {
            if (!err) {
                this.props.onClose();  
                this.props.onSubmit(this.state);
              }
          })
          
        });
    }
    selectSuccessors = (value) => {
        this.setState({
            manager : value
        })
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return ( 
            <div>
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                        <Form.Item label="Search">
                            {getFieldDecorator('q', {
                            rules: [{ required: false }],
                            })(
                            <Input
                                placeholder="Search by name, phone , address, contact name"
                            />,
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Manager">            
                            {getFieldDecorator('manager', {
                                rules: [{ required: false }],
                                })(
                                <span><Manager mode="multiple" manager={null} selectSuccessors={this.selectSuccessors}/></span>
                            )}        
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                        <Form.Item label="Source">
                            {getFieldDecorator('source', {
                                initialValue:"All",
                                rules: [{ required: false }],
                            })(
                                <Select placeholder="Select source">
                                    { staticValues.leadSource.map((s)=> {
                                            return (<Option key={s} value={s}>{s}</Option>)
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Status">
                            {getFieldDecorator('status', {
                                initialValue:"All",
                                rules: [{ required: false }],
                            })(
                                <Select placeholder="Select status">
                                    { staticValues.leadStatus.map((s)=> {
                                            return (<Option key={s} value={s}>{s}</Option>)
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                        <Form.Item label="Active">
                            {getFieldDecorator('active', {
                                initialValue:"true",
                                rules: [{ required: false }],
                            })(
                                <Select placeholder="Select Active/Inactive">
                                { staticValues.active.map((s)=> {
                                    return <Option key={s.key} value={s.key}>{s.value}</Option>
                                    })
                                }
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <div
                style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
                }}
            >
                <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                Cancel
                </Button>
                <Button onClick={this.onSubmit} type="primary">
                    Apply Filter
                </Button>
            </div>
        </div>
        );
    }
}
export default Form.create({ name: 'leadfilter' })(LeadFilter);
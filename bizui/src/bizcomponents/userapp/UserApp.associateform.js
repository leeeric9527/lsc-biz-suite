import React, { Component } from 'react'
import { Card, Button, Form, Icon, Col, Row, DatePicker, TimePicker, Input, Select, Popover,Switch,Modal } from 'antd'
import { connect } from 'dva'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import {ImageComponent} from '../../axios/tools'
import FooterToolbar from '../../components/FooterToolbar'
import styles from './UserApp.createform.less'
import {mapBackToImageValues, mapFromImageValues} from '../../axios/tools'
import GlobalComponents from '../../custcomponents';
import UserAppBase from './UserApp.base'
import SelectObject from '../../components/SelectObject'


const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const testValues = {};
/*
const testValues = {
  title: '审车平台',
  appIcon: 'users',
  permission: 'MXWR',
  objectType: 'CarInspectionPlatform',
  objectId: 'CIP000001',
  location: '/link/to/app',
  secUserId: 'SU000001',
}
*/


const imageKeys = [
]


class UserAppAssociateForm extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    convertedImagesValues: {},
  }

  componentDidMount() {
 
    
    
    
  }

  handlePreview = (file) => {
    console.log('preview file', file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    })
  }

  



  handleChange = (event, source) => {
    console.log('get file list from change in update change:', source)

    const { fileList } = event
    const { convertedImagesValues } = this.state

    convertedImagesValues[source] = fileList
    this.setState({ convertedImagesValues })
    console.log('/get file list from change in update change:', source)
  }
	
  

  render() {
	const { form, dispatch, submitting, role,data,owner,toggleAssociatePaymentVisible,visible,onCancel, onCreate } = this.props
    const { convertedImagesValues } = this.state
    const {UserAppService} = GlobalComponents
 const {ListAccessModalTable} = GlobalComponents;
 const {ObjectAccessModalTable} = GlobalComponents;


    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form
    const {fieldLabels} = UserAppBase
    
    const capFirstChar = (value)=>{
    	//const upper = value.replace(/^\w/, c => c.toUpperCase());
  		const upper = value.charAt(0).toUpperCase() + value.substr(1);
  		return upper
  	}
    
    
    

    
    
    const tryinit  = (fieldName, candidates) => {
      
      if(candidates&&candidates.length==1){
          return candidates[0].id
      }
      const { owner } = this.props
      const { referenceName } = owner
      if(referenceName!=fieldName){
        return null
      }
      return owner.id
    }
    
    const availableForEdit= (fieldName) =>{
      const { owner } = this.props
      const { referenceName } = owner
      if(referenceName!=fieldName){
        return true
      }
      return false
    
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 12 },
    }
    const switchFormItemLayout = {
      labelCol: { span: 14 },
      wrapperCol: { span: 4 },
    }
    
    return (
 <Modal
          title="创建新的支付"
          visible={visible}
          onOk={onCancel}
          onCancel={onCancel}
          width={920}
          style={{ top: 40}}
        >
        <Card title="基础信息"  className={styles.card} style={{ backgroundColor:"#eee" }}>
          <Form >
            <Row gutter={16}>

              <Col lg={12} md={12} sm={12}>
                <Form.Item label={fieldLabels.title} {...formItemLayout}>
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '请输入标题' }],
                  })(
                    <Input placeholder="请输入标题" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={12}>
                <Form.Item label={fieldLabels.appIcon} {...formItemLayout}>
                  {getFieldDecorator('appIcon', {
                    rules: [{ required: true, message: '请输入应用程序图标' }],
                  })(
                    <Input placeholder="请输入应用程序图标" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={12}>
                <Form.Item label={fieldLabels.permission} {...formItemLayout}>
                  {getFieldDecorator('permission', {
                    rules: [{ required: true, message: '请输入许可' }],
                  })(
                    <Input placeholder="请输入许可" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={12}>
                <Form.Item label={fieldLabels.objectType} {...formItemLayout}>
                  {getFieldDecorator('objectType', {
                    rules: [{ required: true, message: '请输入访问对象类型' }],
                  })(
                    <Input placeholder="请输入访问对象类型" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={12}>
                <Form.Item label={fieldLabels.objectId} {...formItemLayout}>
                  {getFieldDecorator('objectId', {
                    rules: [{ required: true, message: '请输入对象ID' }],
                  })(
                    <Input placeholder="请输入对象ID" />
                  )}
                </Form.Item>
              </Col>

              <Col lg={12} md={12} sm={12}>
                <Form.Item label={fieldLabels.location} {...formItemLayout}>
                  {getFieldDecorator('location', {
                    rules: [{ required: true, message: '请输入位置' }],
                  })(
                    <Input placeholder="请输入位置" />
                  )}
                </Form.Item>
              </Col>

            </Row>


        

            <Row gutter={16}>
            

              <Col lg={12} md={12} sm={12}>
                <Form.Item label={fieldLabels.fullAccess}  {...switchFormItemLayout}>
                  {getFieldDecorator('fullAccess', {
                    initialValue: false,
                    rules: [{ required: true, message: '请输入完全访问' }],
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="是" unCheckedChildren="否"  placeholder="请输入完全访问bool" />
                  )}
                </Form.Item>
              </Col>

            </Row>
       
        
        









       
            <Row gutter={16}>

              <Col lg={12} md={12} sm={24}>
                <Form.Item label={fieldLabels.secUser} {...formItemLayout}>
                  {getFieldDecorator('secUserId', {
                  	initialValue: tryinit('secUser'),
                    rules: [{ required: true, message: '请输入安全用户' }],
                  })(
                <SelectObject 
                    disabled={!availableForEdit('secUser')}
                    targetType={"secUser"} 
                    requestFunction={UserAppService.requestCandidateSecUser}/>
  
                  )}
                </Form.Item>
              </Col>

            </Row>
         
       

			</Form>
			
			
			
			
        </Card>
        
	<ListAccessModalTable data={data.listAccessList} owner={owner} />
	<ObjectAccessModalTable data={data.objectAccessList} owner={owner} />
        
        
        
      </Modal>)
    
  }
}

export default connect(state => ({
  collapsed: state.global.collapsed,
}))(Form.create()(UserAppAssociateForm))





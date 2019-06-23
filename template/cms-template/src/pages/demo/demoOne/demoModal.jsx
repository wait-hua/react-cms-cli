/**
 * 用户管理 新增/编辑
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import {
    Modal,
    AutoComplete,
    Input,
    Select,
    Checkbox,
    Form,
} from 'antd';

function StaffModal(props) {
    const roleOptsArr = props.type === 'edit' && props.data && props.data.roleOpts ? props.data.roleOpts : [];
    const [corpOpts, setCorpOpts] = useState([]);
    const [roleOpts, setRoleOpts] = useState(roleOptsArr);

    const {
        visible, type, form, dispatch, data
    } = props;
    const { getFieldDecorator } = form;
    function onOk() {
        props.form.validateFields((err, fieldsValue) => {
            if (err) {
                console.warn('form validate failed');
                return;
            }
            const { name, phone } = fieldsValue;
            const param = { name, phone };
            param.defaultUserTypeInRole = fieldsValue.defaultUserTypeInRole ? 0 : 1;
            param.info = fieldsValue.info;
            param.userRoleMapping = fieldsValue.roles.map(role => ({ roleId: role }));
            props.onOk(param);
        });
    }

    function onCancel() {
        props.onClose();
    }

    // 模糊搜索用户邮箱
    function onSearchCorp(value) {
        dispatch({
            type: 'staff/searchStaff',
            payload: {
                name: value,
            }
        }).then((res) => {
            setCorpOpts(res);
        });
    }
    // 模糊搜索
    function onSearchRole(value) {
        dispatch({
            type: 'staff/searchRole',
            payload: {
                name: value
            }
        }).then((res) => {
            setRoleOpts(res);
        });
    }

    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };
    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 10, offset: 4 },
    };
    return (
      <Modal
        title={type === 'add' ? '新增用户' : '编辑用户'}
        visible={visible}
        destroyOnClose
        width={720}
        onOk={onOk}
        onCancel={onCancel}
      >
        <Form {...formItemLayout}>
          <Form.Item label="邮箱">
            {getFieldDecorator('name', {
                        rules: [{
                            required: true,
                            message: '请填写邮箱'
                        }],
                        initialValue: data.name || ''
                    })(<AutoComplete
                      onSearch={onSearchCorp}
                      dataSource={corpOpts}
                    />)}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('phone', {
                        initialValue: data.phone || '',
                    })(<Input />)}
          </Form.Item>
          <Form.Item label="角色">
            {getFieldDecorator('roles', {
                        initialValue: data.roles || []
                    })(
                      <Select
                        mode="multiple"
                        onSearch={onSearchRole}
                        filterOption={false}
                      >
                        {roleOpts.map(role => (
                          <Select.Option value={role.id} key={role.id}>
                            {role.name}
                          </Select.Option>
                            ))}
                      </Select>
                    )}
          </Form.Item>
          <Form.Item {...formTailLayout}>
            {getFieldDecorator('defaultUserTypeInRole', {
                        initialValue: data.defaultUserTypeInRole === 0, // 0：管理员 1：普通用户
                        valuePropName: 'checked'
                    })(<Checkbox>角色管理员</Checkbox>)}
          </Form.Item>
        </Form>
      </Modal>
    );
}

StaffModal.propTypes = {
    visible: PropTypes.bool,
    type: PropTypes.oneOf(['add', 'edit']),
    // eslint-disable-next-line
    data: PropTypes.object,
};

StaffModal.defaultProps = {
    visible: false,
    type: 'add',
    data: {},
};

export default connect(() => ({

}))(Form.create({ name: 'staff-modal' })(StaffModal));

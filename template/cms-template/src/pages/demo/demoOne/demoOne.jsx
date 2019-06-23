import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import {
    Table,
    Button,
    Popconfirm,
    message,
    Form,
    Input,
    Card,
} from 'antd';
import {
    Pager
} from '@/components';

import DemoModal from './demoModal';


const PAGE_SIZE = 20;

function DemoOne(props) {
    const [name, setName] = useState('');
    const [pagerProps, setPagerProps] = useState({});
    const [visible, setVisible] = useState(false);
    const [modalType, setModalType] = useState('add');
    const [modalData, setModalData] = useState({});

    let searchName = '';
    const {
        userList, dispatch, total, currentPage
    } = props;

    function getList(pageNum) {
        dispatch({
            type: 'demoOne/getList',
            payload: {
                limit: PAGE_SIZE,
                offset: (pageNum - 1) * PAGE_SIZE,
                name: searchName
            },
            pageNum
        });
    }

    useEffect(() => {
        getList(1);
    }, []);

    function onDel(record) {
        dispatch({
            type: 'demoOne/del',
            payload: {
                name: record.name
            }
        }).then(() => {
            getList(currentPage);
            message.success('删除成功');
        });
    }

    function onSearch() {
        searchName = name;
        setPagerProps({
            name: searchName
        });
        getList(1);
    }

    function onChange(event) {
        setName(event.target.value);
    }

    function onAdd() {
        setVisible(true);
        setModalType('add');
        setModalData({});
    }

    function onEdit(record) {
        setVisible(true);
        setModalType('edit');
        setModalData({
            ...record,
            roles: record.userRoleMapping.map(item => item.roleId),
            roleOpts: record.userRoleMapping.map(
                item => ({ id: item.roleId, name: item.roleName })
            ),
            info: record.info
        });
    }

    function closeModal() {
        setVisible(false);
    }

    function onModalOk(data) {
        // 新增 / 编辑用户
        const action = modalType === 'add' ? 'demoOne/add' : 'demoOne/edit';
        dispatch({
            type: action,
            payload: data
        }).then(() => {
            message.success(modalType === 'add' ? '新增成功' : '修改成功');
            setVisible(false);
            getList(currentPage);
        });
    }

    const columns = [{
        title: 'ID',
        dataIndex: 'id',
    }, {
        title: '邮箱',
        dataIndex: 'name',
    }, {
        title: '电话号码',
        dataIndex: 'phone'
    }, {
        title: '操作',
        render: (text, record) => (
          <>
            <Button
              type="primary"
              onClick={() => onEdit(record)}
            >
                    编辑
            </Button>
            <Popconfirm
              title="是否删除"
              onConfirm={() => onDel(record)}
            >
              <Button type="default" style={{ marginLeft: 10 }}>
                        删除
              </Button>
            </Popconfirm>
          </>
        )
    }];
    return (
      <Card>
        <div className="m-search">
          <Form layout="inline">
            <Form.Item>
              <Input
                value={name}
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                onClick={onSearch}
              >
                            查询
              </Button>
            </Form.Item>
          </Form>
          <Button
            type="primary"
            onClick={onAdd}
          >
                    新增
          </Button>
        </div>
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={userList}
          pagination={false}
        />
        <Pager
          pageSize={PAGE_SIZE}
          total={total}
                // actionType="staff/getStaffList"
          currentPage={currentPage}
          otherProps={pagerProps}
        />
        {visible && (
        <DemoModal
          visible={visible}
          type={modalType}
          onClose={closeModal}
          data={modalData}
          key={modalData.id}
          onOk={onModalOk}
        />
            )}
      </Card>
    );
}

DemoOne.propTypes = {
    userList: PropTypes.arrayOf(PropTypes.object),
    total: PropTypes.number,
    currentPage: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
};

DemoOne.defaultProps = {
    userList: [],
    total: 0,
    currentPage: 1
};

export default connect(({ demoOne = {} }) => ({
    userList: demoOne.list,
    total: demoOne.count,
    currentPage: demoOne.currentPage
}))(DemoOne);

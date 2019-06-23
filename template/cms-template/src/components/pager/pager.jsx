import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'antd';
import { connect } from 'dva';

function Pager(props) {
    const {
        style,
        otherProps,
        pageSize,
        align,
        total,
        actionType,
        dispatch,
        currentPage
    } = props;

    const pageChange = (pageNum) => {
        const page = {
            limit: pageSize,
            offset: (pageNum - 1) * pageSize,
        };
        dispatch({ type: actionType, payload: { ...otherProps, ...page }, pageNum });
        window.scrollTo(0, 0);
    };
    return (
      <Pagination
        {...props}
        style={{ ...style, textAlign: align || 'right', marginTop: 20 }}
        onChange={pageChange}
        total={total || 0}
        current={currentPage}
        pageSize={pageSize || 20}
      />
    );
}

Pager.propTypes = {
    pageSize: PropTypes.number,
    align: PropTypes.string,
    currentPage: PropTypes.number,
    total: PropTypes.number,
    actionType: PropTypes.string,
    otherProps: PropTypes.shape({}),
    style: PropTypes.shape({}),
    dispatch: PropTypes.func.isRequired
};

Pager.defaultProps = {
    pageSize: 20,
    align: '',
    currentPage: 1,
    total: 0,
    otherProps: {},
    actionType: '',
    style: {}
};

export default connect(() => ({
}))(Pager);

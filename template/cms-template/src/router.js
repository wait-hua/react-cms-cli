import React from 'react';
import { routerRedux, Switch } from 'dva/router';
import { LocaleProvider } from 'antd';
import PropTypes from 'prop-types';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from '@/pages/app';

import moment from 'moment';
import 'moment/locale/zh-cn';


moment.locale('zh-cn');

const { ConnectedRouter } = routerRedux;

function RouterConfig({ history }) {
    return (
      <LocaleProvider locale={zhCN}>
        <ConnectedRouter history={history}>
          <Switch>
            <App />
          </Switch>
        </ConnectedRouter>
      </LocaleProvider>
    );
}

RouterConfig.propTypes = {
    history: PropTypes.shape({}),
};

RouterConfig.defaultProps = {
    history: {}
};

export default RouterConfig;

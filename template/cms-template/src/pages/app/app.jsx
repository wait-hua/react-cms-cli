import React, { PureComponent } from 'react';
import { Route, NavLink } from 'dva/router';
import { Menu, Icon } from 'antd';
import loadable from '@loadable/component';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import Dashboard from '@/pages/dashboard';
import './app.less';

const DemoOne = loadable(() => import(/* webpackChunkName: "demoOne" */'@/pages/demo/demoOne'));
const DemoTwo = loadable(() => import(/* webpackChunkName: "demoTwo" */'@/pages/demo/DemoTwo'));

const MenuItem = Menu.Item;
const { SubMenu } = Menu;
/* eslint-disable react/prefer-stateless-function */
class App extends PureComponent {

    componentDidMount() {
        // this.props.dispatch({
        //     type: 'common/getUser'
        // });
    }

    logout = () => {
        this.props.dispatch({
            type: 'common/logout'
        });
        setTimeout(() => {
            // 登出跳转
        }, 0);
    };

    onClipse = () => {

    }

    render() {
        const { userInfo } = this.props;

        return (
            userInfo.name ? (
              <div styleName="app">
                <aside styleName="sider">
                  <div styleName="logo"><%=name %></div>
                  <Menu
                    mode="inline"
                    defaultOpenKeys={['demo']}
                  >
                    <MenuItem key="dashboard">
                      <NavLink to="/" activeClassName="nav-selected" exact>
                        <Icon type="pie-chart" theme="filled" />
                        <span>Dashboard</span>
                      </NavLink>
                    </MenuItem>
                    <SubMenu
                      title={(
                        <span>
                          <Icon type="hdd" theme="filled" />
                                        Demo页面
                        </span>
                            )}
                      key="demo"
                    >
                      <MenuItem>
                        <NavLink to="/demoone" activeClassName="nav-selected">
                          <Icon type="bars" />
                          <span>Demo一</span>
                        </NavLink>
                      </MenuItem>
                      <MenuItem>
                        <NavLink to="/demotwo" activeClassName="nav-selected">
                          <Icon type="table" />
                          <span>Demo二</span>
                        </NavLink>
                      </MenuItem>
                    </SubMenu>
                  </Menu>
                </aside>
                <section styleName="section">
                  <header styleName="head">
                    <div styleName="collapse">
                      {/* <Icon type="align-right" 
                                    onClick={this.onClipse}/> */}
                    </div>
                    <div styleName="user">
                      <span styleName="name">
                        {userInfo.name}
                      </span>
                      <a
                                // styleName="exit"
                        href="#"
                        onClick={this.logout}
                      >
                        <Icon
                          type="logout"
                          style={{
                                            fontSize: '20px',
                                            position: 'relative',
                                            top: '2px'
                                        }}
                        />
                      </a>
                    </div>
                  </header>
                  <div styleName="content">
                    <Route path="/" exact component={Dashboard} />
                    <Route path='/demoone' exact component={DemoOne} />
                    <Route path='/demotwo' exact component={DemoTwo} />
                  </div>
                </section>
              </div>
            ) : ''
        );
    }
}

App.propTypes = {
    dispatch: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    userInfo: PropTypes.object,
};

App.defaultProps = {
    dispatch: () => { },
    userInfo: { }
};

const mapStateToProps = ({ common }) => ({
    ...common
});

export default connect(mapStateToProps)(App);

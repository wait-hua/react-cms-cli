import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import '@/less/base.less';
import '@/less/common.less';

const history = createHistory({
    basename: ''
});

const app = dva({
    history,
    onError: error => error.response,
});

// app.model(require('./models/demoOne').default);
app.model(require('./models/common').default);

app.router(require('./router').default);

app.start('#root');

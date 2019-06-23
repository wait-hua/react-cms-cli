import queryString from 'query-string';
import Progress from 'nprogress';
import { message } from 'antd';
import { omit } from 'lodash';
import 'nprogress/nprogress.css';

const baseUrl = '';

const fetchBase = (apiurl, options) => {
    let url = apiurl;
    if (!options.noBaseUrl) {
        url = baseUrl + apiurl;
    }
    let opt = options;
    opt = opt || {};
    opt.method = opt.method || 'GET';
    opt.credentials = opt.credentials || 'include';
    opt.withCredentials = true;
    if (opt.headers) {
        Object.assign(opt.headers, {
            Accept: 'application/json'
        });
    }
    if (opt.query) {
        // 值为空的key 剔除
        const omitArr = [];
        Object.keys(opt.query).forEach((key) => {
            if (
                opt.query[key] === undefined || opt.query[key] === ''
                || opt.query[key] === null
            ) {
                omitArr.push(key);
            }
        });
        opt.query = omit(opt.query, omitArr);
        url = `${url}?${queryString.stringify(opt.query)}`;
    }

    Progress.start();

    return fetch(url, opt)
        .then((ret) => {
            if (opt.raw) {
                Progress.done();
                return ret.text();
            }
            const jpromise = ret.json();

            return jpromise.then((json) => {
                Progress.done();
                if (json.code === 200) {
                    // 成功的情况 返回data数据
                    return json.data;
                } if (json.code === 309) {
                    // 未登陆的情况下，跳转登陆页
                    // window.location.href = '/login';
                } else {
                    throw json;
                }
                return '';
            });
        })
        .catch((err) => {
            Progress.done();
            if (!opt.noCommonTip) {
                // 其他错误情况，统一toast提示后端msg 信息
                const errorMsg = err.message || '系统异常，请稍后重试';
                message.error(errorMsg);
            }
            const error = new Error();
            error.response = err;
            throw error;
        });
};

/**
 * GET 方法，
 * @param {*} url api url
 * @param {*} data 传递的数据，GET请求queryString 到url上
 * @param {*} options 预留的其他配置项
 */
const get = (url, data = {}, options = {}) => fetchBase(url, {
    method: 'GET',
    query: data,
    ...options
});

/**
 * POST, 数据格式为 application/json
 * @param {*} url
 * @param {*} data
 * @param {*} options
 */
const post = (url, data = {}, options = {}) => {
    const body = JSON.stringify(data);
    return fetchBase(url, {
        method: 'POST',
        body,
        headers: {
            'Content-Type': 'application/json'
        },
        ...options
    });
};

/**
 * POST, 数据格式为 multipart/form-data
 * @param {*} url
 * @param {*} data
 * @param {*} options
 */
const postFormData = (url, data = {}, options = {}) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });
    return fetchBase(url, {
        method: 'POST',
        body: formData,
        ...options
    });
};

export default {
    get,
    post,
    postFormData
};

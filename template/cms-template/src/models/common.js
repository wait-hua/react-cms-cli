import ComService from '@/services/common';

/* eslint-disable no-empty-pattern */
export default {
    namespace: 'common',
    state: {
        userInfo: {
            name: 'test'
        },
    },
    effects: {
        * getUser({}, { call, put }) {
            const userInfo = yield call(ComService.getUser);
            yield put({ type: 'saveUserInfo', payload: userInfo });
        },
        * logout({}, { call }) {
            yield call(ComService.logout);
        }
    },
    reducers: {
        saveUserInfo(state, { payload }) {
            return {
                ...state,
                payload,
            };
        }
    }
};

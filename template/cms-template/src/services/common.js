import Fetch from '@/utils/fetch';

export default {
    getUser: () => Fetch.get('/user'),
    logout: () => Fetch.get('/logout'),
};

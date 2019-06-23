# Pager

封装的Pagination，简化分页的请求逻辑，切换页面的时候自动根据切页情况发起分页请求。

## Usage

```js
import Pager from '@/components/pager';

// 通常情况下，你需要传以下三个数据
<Pager pageSize={10} total={30} currentPage={1} actionType="demo/getUserList"/>

// 但是往往这个数据都是后端会返回的，因此你只需要将后端返回的数据放在model中就行了
<Pager total={total} actionType="demo/getUserList"/>
```

## API
| param | Type | default | Description |
| -----| ---- | ------- | ----------- |
| actionType | string | '' | 请求的action |
| pageSize | Number | 20 | 每页数目 |
| total | Number | 0 | 总个数 |
| currentPage | Number | 1 | 当前页 |
| otherProps | Object | null | 给请求的除了page信息外的其他数据，数据会被原封不动的dispatch：dispatch({type:..., payload: {...otherProps, page}}) |
| align | string | 'right' | 可选`right` 和`left` |


其他配置和antd的[Pagination](https://ant.design/components/pagination-cn/)一致，如:快速跳转`showQuickJumper`,显示总数`showTotal`

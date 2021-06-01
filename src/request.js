import axios from 'axios';

const service = axios.create({
    baseURL: "https://wusthelper.wustlinghang.cn/mobileapi/v2",
    timeout: 5000
})

export default service;
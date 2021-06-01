import request from '../request';

//获取操作记录
export const getRecordApi = (stuNum, userId) => request.get("/lh/get-record", {
    params: {
        "stuNum": stuNum,
        "userId": userId
    },
    headers: {
        "Token": "",
        "postman-token": "c1249a979f1d41ac98232cc3395dec5a",
        "refrer": "https://wusthelper.wustlinghang.cn/",
        "orgin": "http://wusthelper.wustlinghang.cn"
    }
});

//获取用户详情
export const getUserDetailApi = (stuNum, userId) => request.get("/lh/get-user-detail", {
    params: {
        "stuNum": stuNum,
        "userId": userId
    },
    headers: {
        "Token": "",
        "postman-token": "c1249a979f1d41ac98232cc3395dec5a",
        "refrer": "https://wusthelper.wustlinghang.cn/",
        "orgin": "http://wusthelper.wustlinghang.cn"
    }
});

//获取学号列表
export const getStuNumListApi = (stuName, userId) => request.get("/lh/get-stunum-list", {
    params: {
        "stuName": stuName,
        "userId": userId
    },
    headers: {
        "Token": "",
        "postman-token": "c1249a979f1d41ac98232cc3395dec5a",
        "refrer": "https://wusthelper.wustlinghang.cn/",
        "orgin": "http://wusthelper.wustlinghang.cn"
    }
});
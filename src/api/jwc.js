import request from '../request';

//登录
export const loginApi = (stuNum, jwcPwd) => request.post("/jwc/login", {
    "stuNum": stuNum,
    "jwcPwd": jwcPwd
});

//获取学生信息
export const getStuInfoApi = (token) => request.get("/jwc/get-student-info", {
    headers: {
        "Token": token
    }
});
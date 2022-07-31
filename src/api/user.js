/**
 * @author MaZiXiao
 * @date 2022-07-31 17:40
 */
import request from "@/utils/request";

const getUserInfo = () => {
    return request({
        url: '/user/profile',
        method: 'GET'
    })
}
export default {
    getUserInfo
}

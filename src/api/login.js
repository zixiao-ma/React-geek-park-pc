/**
 * @author MaZiXiao
 * @date 2022-07-31 15:36
 */
import request from "@/utils/request";

const login = (data) => {
    return request({
        url: '/authorizations',
        method: 'POST',
        data
    })
}
export default {
    login
}

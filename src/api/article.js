/**
 * @author MaZiXiao
 * @date 2022-07-31 21:18
 */
import request from "@/utils/request";

export function getChannelApi() {
    return request.get('/channels')
}

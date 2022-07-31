/**
 * @author MaZiXiao
 * @date 2022-07-31 16:01
 */
import {getItem, setItem} from "@/utils/storage";
import {TOKEN} from "@/utils/publicVariable";

export const getToken = () => {
    return getItem(TOKEN)
}
export const clearToken = () => {
    setItem(TOKEN, '')
}

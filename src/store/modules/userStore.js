/**
 * @author MaZiXiao
 * @date 2022-07-31 17:38
 */
import {makeAutoObservable} from "mobx";
import API from '@/api/user'

class UserStore {
    userInfo = {}

    constructor() {
        makeAutoObservable(this)
    }

    getUserInfo = async () => {
        const res = await API.getUserInfo()
        this.userInfo = res
        console.log(res)
    }

}

export default UserStore

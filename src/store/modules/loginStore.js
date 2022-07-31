/**
 * @author MaZiXiao
 * @date 2022-07-31 15:33
 */
import {makeAutoObservable} from "mobx";
import API from '@/api/login'
import {setItem, getItem} from "@/utils/storage";
import {TOKEN} from "@/utils/publicVariable";

class LoginStore {
    token = getItem(TOKEN) || ''
    refresh_token = ''

    constructor() {
        makeAutoObservable(this)
    }

    login = async (data) => {
        const {token, refresh_token} = await API.login(data)
        this.token = token
        this.refresh_token = refresh_token
        setItem(TOKEN, this.token)
        return token
    }
    logout = () => {
        this.token = '';
        setItem(TOKEN, '')
        return true
    }
}

export default LoginStore

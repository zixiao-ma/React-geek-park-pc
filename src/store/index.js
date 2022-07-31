/**
 * @author MaZiXiao
 * @date 2022-07-31 15:29
 */
import React from "react";
import LoginStore from "@/store/modules/loginStore";
import UserStore from "@/store/modules/userStore";
import TagsStore from "@/store/modules/tagsStore";

class Store {
    constructor() {
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
        this.tagsStore = new TagsStore()
    }
}

const storeContext = React.createContext(new Store())
export const useStore = () => React.useContext(storeContext)

/**
 * @author MaZiXiao
 * @date 2022-07-31 19:59
 */
import {makeAutoObservable} from "mobx";
import {setItem, getItem} from "@/utils/storage";
import {TAGSVIEW} from "@/utils/publicVariable";

class TagsStore {
    tagsArr = []

    constructor() {
        makeAutoObservable(this)
        this.tagsArr = getItem(TAGSVIEW) || []
    }

    addTag(obj) {
        let index = this.tagsArr.findIndex(item => item.path === obj.path)
        if (index === -1) {
            this.tagsArr.push(obj)
            setItem(TAGSVIEW, JSON.stringify(this.tagsArr))
        }

    }

    delTag(index) {
        this.tagsArr.splice(index, 1)
        setItem(TAGSVIEW, JSON.stringify(this.tagsArr))
    }
}

export default TagsStore

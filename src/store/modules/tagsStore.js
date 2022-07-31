/**
 * @author MaZiXiao
 * @date 2022-07-31 19:59
 */
import {makeAutoObservable} from "mobx";
import {setItem, getItem} from "@/utils/storage";
import {TAGSVIEW} from "@/utils/publicVariable";

class TagsStore {
    tagsArr = JSON.parse(getItem(TAGSVIEW) || '[]')

    constructor() {
        makeAutoObservable(this)
    }

    addTag(obj) {
        this.tagsArr.push(obj)
        console.log(this.tagsArr)
        setItem(TAGSVIEW, this.tagsArr)
    }
}

export default TagsStore

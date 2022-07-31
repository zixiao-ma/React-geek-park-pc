/**
 * @author MaZiXiao
 * @date 2022-07-31 18:44
 */
import {RiseOutlined, ShoppingCartOutlined, UserAddOutlined} from "@ant-design/icons";

function getRandom(length) {
    let arr = [];
    let leng = length || 6
    for (let i = 0; i < leng; i++) {
        let sj = parseInt(Math.random() * 9)
        arr.push(sj)
    }
    return arr.join('')
}

export const moduleOneData = [
    {
        icon: <RiseOutlined/>,
        value: getRandom(3),
        name: '今日访问量',
        iconColor: '#1ebeff'
    },
    {
        icon: <UserAddOutlined/>,
        value: getRandom(3),
        name: '新增用户量',
        iconColor: '#ff7382'
    },
    {
        icon: <ShoppingCartOutlined/>,
        value: getRandom(3),
        name: '今日购买量',
        iconColor: '#00cca2'
    }
]

export const tableData = [
    {
        td1: '',
        td2: '课程访问量',
        td3: '课程购买量',
        td4: '听课人数',
        td5: '机构数'
    },
    {
        td1: '总量',
        td2: getRandom(2),
        td3: getRandom(2),
        td4: getRandom(2),
        td5: getRandom(2)
    },
    {
        td1: '昨日',
        td2: getRandom(2),
        td3: getRandom(2),
        td4: getRandom(2),
        td5: getRandom(2)
    }
]

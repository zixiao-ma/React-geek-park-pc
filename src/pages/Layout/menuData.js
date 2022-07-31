import {HomeOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined} from "@ant-design/icons";
import React from "react";

/**
 * @author MaZiXiao
 * @date 2022-07-31 17:42
 */


export const menuItems = [
    {
        key: '/',
        icon: <UserOutlined/>,
        label: '数据概览',
    },
    {
        key: '/contentManagement',
        icon: <VideoCameraOutlined/>,
        label: '内容管理',
    },
    {
        key: '/postArticle',
        icon: <UploadOutlined/>,
        label: '发布文章',
    },
]
export const navigateData = {
    '/': '数据概览',
    '/contentManagement': '内容管理',
    '/postArticle': '发布文章'
}

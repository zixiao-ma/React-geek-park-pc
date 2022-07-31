/**
 * @author MaZiXiao
 * @date 2022-07-30 15:02
 */
import {Layout, Menu} from 'antd';
import React, {useEffect, useState} from 'react';
import './index.scss'
import {useNavigate, Outlet, Link, useLocation} from "react-router-dom";
import {menuItems, navigateData} from "@/pages/Layout/menuData";
import {useStore} from "@/store";
import {RevealUserInfo} from "@/pages/Layout/components/userInfo";
import {observer} from "mobx-react-lite";
import {TagsView} from "@/pages/Layout/components/tagsView";

const {Header, Sider, Content} = Layout;
const HomeLayout = () => {
    const location = useLocation()
    const Navigate = useNavigate()
    const {userStore, tagsStore} = useStore()
    const [selectedKey, setSelectedKey] = useState(location.pathname);
    const handleMenuClick = ({item, key, keyPath, domEvent}) => {

        const obj = {
            path: key,
            name: navigateData[key]
        }
        setSelectedKey(key)
        tagsStore.addTag(obj)
        Navigate(key)
    }
    const delTag = (index) => {
        tagsStore.delTag(index)
    }
    const handleClickTag = path => {
        setSelectedKey(path)
    }
    useEffect(() => {
        try {
            userStore.getUserInfo()
        } catch (error) {
        }
    }, [userStore])
    return (
        <Layout>
            <Header className="header">
                <div className="logo">
                    <img src="./logo.png" alt=""/>
                </div>
                <div className="userInfo">

                    <RevealUserInfo info={userStore.userInfo}></RevealUserInfo>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={selectedKey}
                        theme={'dark'}
                        onClick={handleMenuClick}
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        items={menuItems}
                    />
                </Sider>
                <Layout>
                    <TagsView highlight={selectedKey} ClickTag={handleClickTag} data={tagsStore.tagsArr}
                              delTag={delTag}></TagsView>
                    <Content
                        className="site-layout-background"
                        style={{
                            padding: '0 10px',
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    )
}
export default observer(HomeLayout)

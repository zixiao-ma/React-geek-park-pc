/**
 * @author MaZiXiao
 * @date 2022-07-30 15:02
 */
import {Layout, Menu} from 'antd';
import React, {useEffect, useState} from 'react';
import './index.scss'
import {useNavigate, Outlet, useLocation} from "react-router-dom";
import {menuItems, navigateData} from "@/pages/Layout/menuData";
import {useStore} from "@/store";
import {RevealUserInfo} from "@/pages/Layout/components/userInfo";
import {observer} from "mobx-react-lite";
import {TagsView} from "@/pages/Layout/components/tagsView";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";

const {Header, Sider, Content} = Layout;
const HomeLayout = () => {
    const location = useLocation()
    const Navigate = useNavigate()
    const {userStore, tagsStore} = useStore()
    const [collapsed, setCollapsed] = useState(false);
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
            <Sider width={collapsed ? 64 : 200} className="site-layout-background">
                <div className="logo" style={{display: collapsed ? 'none' : 'block'}}>
                    <img src="./logo.png" alt=""/>
                </div>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={selectedKey}
                    theme={'dark'}
                    onClick={handleMenuClick}
                    style={{
                        borderRight: 0,
                    }}
                    items={menuItems}
                />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    <div className="logo d-flex">

                        <span className={'collapsed'}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                    </span>
                        <img style={{display: collapsed ? 'block' : 'none'}} src="./logo.png" alt=""/>
                    </div>


                    <div className="userInfo">

                        <RevealUserInfo info={userStore.userInfo}></RevealUserInfo>
                    </div>
                </Header>
                <Content
                    className="site-layout-background"

                >
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
                </Content>
            </Layout>
        </Layout>
    )
}
export default observer(HomeLayout)

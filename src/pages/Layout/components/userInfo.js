/**
 * @author MaZiXiao
 * @date 2022-07-31 17:52
 */

/*birthday: "1990-11-20"
gender: 1
id: "1111"
mobile: "13911111111"
name: "黑马先锋"
photo: "http://geek.itheima.net/images/user_head.jpg"*/
import {Dropdown, Menu, Space, Modal, message} from "antd";
import {DownOutlined, ExclamationCircleOutlined} from "@ant-design/icons";
import {Avatar} from 'antd';
import {useStore} from "@/store";
import {useNavigate} from "react-router-dom";

const {confirm} = Modal;
export const RevealUserInfo = (props) => {
    const {loginStore} = useStore()
    const navigate = useNavigate()

    function logout() {
        confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined/>,
            content: '确认退出登录吗？',
            okText: '确定',
            cancelText: '取消',
            onOk() {
                const isClear = loginStore.logout()
                if (isClear) {
                    navigate('/login')
                    message.success('退出成功！')
                }
            },

            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const menu = (
        <Menu
            items={[
                {
                    key: '1',
                    label: (
                        <a target="_blank">
                            {props.info.mobile}
                        </a>
                    ),
                }, {
                    key: '2',
                    label: (
                        <a target="_blank" onClick={logout}>
                            {'退出登录'}
                        </a>
                    ),
                }
            ]}
        />
    );
    return (
        <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    <Avatar src={props.info.photo}/>
                    极客园
                    <DownOutlined/>
                </Space>
            </a>
        </Dropdown>)
}

/**
 * @author MaZiXiao
 * @date 2022-07-30 15:01
 */
import './index.scss'
import {Button, Checkbox, Form, Input} from 'antd';
import {Card, message} from 'antd';
import {useState} from "react";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useStore} from "@/store";
import {useNavigate} from "react-router-dom";

const formItem = {
    labelCol: {
        span: 0,
    },
    wrapperCol: {
        span: 24,
    }
}
const Login = () => {
    const {loginStore} = useStore()
    const navigate = useNavigate()
    const [remember, setRemember] = useState(true);
    const [loading, setLoading] = useState(false);
    const onFinish = async (values) => {
        setLoading(true)
        const {mobile, code} = values
        try {
            const token = await loginStore.login({mobile, code})
            if (token) {
                message.success('登录成功！')
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const onChange = (e) => {
        setRemember(e.target.checked)
    }
    return (
        <div className='loginBox d-flex justify-content-center align-items-center'>
            <Card bordered>
                <h1>
                    <a href=""> <img src="./logo.png" alt=""/></a>
                </h1>
                <Form
                    validateTrigger={['onBlur', 'onChange']}
                    name="basic"
                    {...formItem}
                    initialValues={{
                        remember,
                        mobile: '13911111111',
                        code: '246810',
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="mobile"
                        rules={[
                            {
                                required: true,
                                message: '手机号格式不正确!',
                                pattern: /^1[3-9]\d{9}$/,
                                validateTrigger: 'onChange'
                            },
                        ]}
                    >

                        <Input placeholder='请输入手机号' prefix={<UserOutlined/>}/>
                    </Form.Item>

                    <Form.Item
                        name="code"
                        rules={[
                            {len: 6, message: '验证码6个字符', validateTrigger: 'onBlur'},
                            {required: true, message: '请输入验证码'}
                        ]}
                    >
                        <Input.Password placeholder='请输入密码' prefix={<LockOutlined/>} maxLength={6}/>
                    </Form.Item>

                    <Form.Item
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Checkbox onChange={onChange}>我已阅读并同意「用户协议」和「隐私条款」</Checkbox>
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 0,
                            span: 24,
                        }}
                    >
                        <Button type="primary" loading={loading} htmlType="submit" block disabled={!remember}>
                            立即登录
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default Login

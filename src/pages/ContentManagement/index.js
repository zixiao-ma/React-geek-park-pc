/**
 * @author MaZiXiao
 * @date 2022-07-31 16:21
 */
import {Card} from "antd";
import {
    Form,
    Button,
    DatePicker,
    Radio,
    Select
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN'
import {getChannelApi} from "@/api/article";
import {useEffect, useState} from "react";
import './index.scss'

const {RangePicker} = DatePicker;
export const ContentManagement = () => {
    const [channelsData, setChannelsData] = useState([])

    useEffect(() => {
        const getchannelData = async () => {
            const res = await getChannelApi()
            setChannelsData(res.channels)
        }
        getchannelData()
    }, [])

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    return (
        <div>
            <Card className="filterData">
                <Form
                    labelCol={{
                        span: 0,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    layout="horizontal"
                    initialValues={{
                        status: -1
                    }}
                    onFinish={onFinish}
                >

                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="频道" name="channel_id">
                        <Select
                            placeholder="请选择文章频道"
                            style={{width: 120}}
                        >
                            {channelsData.map(item => (
                                <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                            ))}

                        </Select>
                    </Form.Item>
                    <Form.Item label="日期" name='date'>
                        <RangePicker locale={locale}/>
                    </Form.Item>
                    <Form.Item
                    >
                        <Button type="primary" htmlType="submit">
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

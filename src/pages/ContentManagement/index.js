/**
 * @author MaZiXiao
 * @date 2022-07-31 16:21
 */
import {Card, Table} from "antd";
import {
    Form,
    Button,
    DatePicker,
    Radio,
    Select,
    Spin
} from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN'
import {getArticleTable, getChannelApi} from "@/api/article";
import {useEffect, useState} from "react";
import './index.scss'
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import '@/assets/error.png'
import {message, Popconfirm, Space, Tag} from 'antd';
import {deleteArticle} from "@/api/article";
import {useNavigate} from "react-router-dom";

const {RangePicker} = DatePicker;
export const ContentManagement = () => {
    const [channelsData, setChannelsData] = useState([])
    const navigator = useNavigate()
    const navigatorToDetail = (id) => {
        navigator(`/postArticle?id=${id}`)
    }
    const [params, setParams] = useState({
        page: 1,
        per_page: 10
    });
    const [article, setArticle] = useState({
        list: [],
        count: 0
    });
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getchannelData = async () => {
            const res = await getChannelApi()
            setChannelsData(res.channels)
        }
        getchannelData()
    }, [])
    useEffect(() => {
        const getTableData = async () => {
            setLoading(true)
            const {results, total_count} = await getArticleTable(params)
            setArticle({
                list: results,
                count: total_count
            })
            setLoading(false)
        }
        getTableData()
    }, [params]);
    const pageChange = page => {
        setParams({
            ...params,
            page
        })
    }
    const onFinish = (values) => {
        console.log('Success:', values);
        const _params = {}
        if (values.status !== -1) {
            _params.status = values.status
        }
        if (values.status === -1) {
            _params.status = null
        }
        if (values.channel_id) {
            _params.channel_id = values.channel_id
        }
        if (values.date) {
            _params.begin_pubdate = values.date[0].format('YYYY-MM-DD')
            _params.end_pubdate = values.date[1].format('YYYY-MM-DD')
        }
        setParams({
            ...params,
            ..._params
        })
    };

    async function handleDelArticle(id) {
        const res = await deleteArticle(id)
        if (!res) {
            message.success('???????????????')
            setParams({
                page: 1,
                per_page: 10
            })
        }
    }

    const columns = [
        {
            title: '??????',
            render: data => (
                <img src={data.cover.images[0]} alt="" style={{width: '60px', height: '60px'}}/>
            )
        },
        {
            title: '??????',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '??????',
            render: data => (
                <Tag color={data.status === 1 ? 'red' : 'green'}>{data.status === 1 ? '?????????' : '????????????'}</Tag>
            )
        }, {
            title: '????????????',
            dataIndex: 'pubdate',
            key: 'pubdate',
        },
        {
            title: '?????????',
            dataIndex: 'read_count',
            key: 'read_count',
        },
        {
            title: '?????????',
            dataIndex: 'comment_count',
            key: 'comment_count',
        }, {
            title: '?????????',
            dataIndex: 'like_count',
            key: 'like_count',
        },
        {
            title: '??????',
            render: (data) => (
                <Space size="middle">
                    <Button type="primary"
                            shape="circle"
                            onClick={() => {
                                navigatorToDetail(data.id)
                            }}
                            icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="???????????????????????????"
                        onConfirm={() => {
                            handleDelArticle(data.id)
                        }}
                        okText="??????"
                        cancelText="??????"
                    >
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined/>}
                        />
                    </Popconfirm>

                </Space>
            )
        }
    ];
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
                    layout="inline"
                    initialValues={{
                        status: -1
                    }}
                    onFinish={onFinish}
                >

                    <Form.Item label="??????" name="status">
                        <Radio.Group>
                            <Radio value={-1}>??????</Radio>
                            <Radio value={0}>??????</Radio>
                            <Radio value={1}>?????????</Radio>
                            <Radio value={2}>????????????</Radio>
                            <Radio value={3}>????????????</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="??????" name="channel_id">
                        <Select
                            placeholder="?????????????????????"
                            style={{width: 120}}
                        >
                            {channelsData.map(item => (
                                <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                            ))}

                        </Select>
                    </Form.Item>
                    <Form.Item label="??????" name='date'>
                        <RangePicker locale={locale}/>
                    </Form.Item>
                    <Form.Item
                        label="??????"
                    >
                        <Button type="primary" htmlType="submit" loading={loading}>
                            ??????
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card className='mt-2 tableCard' title={`?????????????????????????????? count ????????????`}>
                <Spin spinning={loading} delay={500}>
                    <Table
                        dataSource={article.list}
                        columns={columns}
                        pagination={
                            {
                                position: ['bottomCenter'],
                                current: params.page,
                                pageSize: params.per_page,
                                total: article.count,
                                onChange: pageChange
                            }
                        }
                        rowKey={'id'}/>
                </Spin>

            </Card>
        </div>
    )
}

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
            message.success('删除成功！')
            setParams({
                page: 1,
                per_page: 10
            })
        }
    }

    const columns = [
        {
            title: '封面',
            render: data => (
                <img src={data.cover.images[0]} alt="" style={{width: '60px', height: '60px'}}/>
            )
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '状态',
            render: data => (
                <Tag color={data.status === 1 ? 'red' : 'green'}>{data.status === 1 ? '未通过' : '审核通过'}</Tag>
            )
        }, {
            title: '发布时间',
            dataIndex: 'pubdate',
            key: 'pubdate',
        },
        {
            title: '阅读数',
            dataIndex: 'read_count',
            key: 'read_count',
        },
        {
            title: '评论数',
            dataIndex: 'comment_count',
            key: 'comment_count',
        }, {
            title: '点赞数',
            dataIndex: 'like_count',
            key: 'like_count',
        },
        {
            title: '操作',
            render: (data) => (
                <Space size="middle">
                    <Button type="primary"
                            shape="circle"
                            onClick={() => {
                                navigatorToDetail(data.id)
                            }}
                            icon={<EditOutlined/>}/>
                    <Popconfirm
                        title="确认删除此数据吗？"
                        onConfirm={() => {
                            handleDelArticle(data.id)
                        }}
                        okText="确定"
                        cancelText="取消"
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
                        label="操作"
                    >
                        <Button type="primary" htmlType="submit" loading={loading}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card className='mt-2 tableCard' title={`根据筛选条件共查询到 count 条结果：`}>
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

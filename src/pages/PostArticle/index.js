/**
 * @author MaZiXiao
 * @date 2022-07-31 16:22
 */
import {Card, Radio, Upload} from 'antd'
import {Button, Form, Input, Select} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import './postArticle.scss'
import {PlusOutlined} from "@ant-design/icons";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import {getChannelApi, postArticleAPi, getArticleDetail} from "@/api/article";
import {useSearchParams} from "react-router-dom";

const {Option} = Select;
const layout = {
    labelCol: {
        span: 0,
    },
    wrapperCol: {
        span: 24,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 0,
        span: 24,
    },
};
export const PostArticle = () => {
    const [options, setOptions] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [maxCount, setMaxCount] = useState(1);
    const [form] = Form.useForm();
    const [parsms] = useSearchParams()
    const editId = parsms.get('id')
    console.log(editId, 'editId')
    const onFinish = async (values) => {
        const queryModel = {
            cover: {
                type: values.type,
                images: fileList.map(item => item.url)
            },
            ...values
        }
        console.log(queryModel, 'queryModel')
        const res = await postArticleAPi(queryModel)
        console.log(res)
    };
    useEffect(() => {
        const getSelOptions = async () => {
            const res = await getChannelApi()
            console.log(res)
            setOptions(res?.channels)
        }
        getSelOptions()
        const getDetail = async () => {
            const {channel_id, content, cover: {type, images}, title} = await getArticleDetail(editId)
            form.setFieldsValue({
                channel_id, content, type, title
            })
            console.log(images)
            setFileList([{
                url: images[0]
            }])
            setMaxCount(type)

        }
        if (editId) {
            getDetail()
        }
    }, [editId]);

    const handleUpload = (info) => {
        const fileList = info.fileList.map(file => {
            if (file.response) {
                return {
                    url: file.response.data.url
                }
            }
            return file
        })
        setFileList(fileList)
    }
    const handleRadioChange = (e) => {
        const count = e.target.value
        setMaxCount(count)
    }
    return (
        <Card className='postArticle'>
            <Form {...layout} form={form} name="control-hooks" initialValues={{
                type: 1,
                content: ''
            }} onFinish={onFinish}>
                <Form.Item
                    name="title"
                    label="标题"
                    rules={[
                        {
                            required: true,
                            message: '请输入文章标题   '
                        },
                    ]}
                >

                    <Input placeholder={'输入文章标题'}/>
                </Form.Item>
                <Form.Item
                    name="channel_id"
                    label="频道"
                    rules={[
                        {
                            required: true,
                            message: '请输入文章频道'
                        },
                    ]}
                >
                    <Select
                        placeholder="选择文章频道"
                        allowClear
                    >

                        {options.map(item => (
                            <Option value={item.id} key={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="封面">
                    <Form.Item
                        name="type"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Radio.Group onChange={handleRadioChange}>
                            <Radio value={1}>单图</Radio>
                            <Radio value={3}>三图</Radio>
                            <Radio value={0}>无图</Radio>
                        </Radio.Group>

                    </Form.Item>
                    {maxCount > 0 && <Upload
                        name="image"
                        listType="picture-card"
                        showUploadList
                        action="http://geek.itheima.net/v1_0/upload"
                        fileList={fileList}
                        maxCount={maxCount}
                        multiple={maxCount > 1}
                        onChange={handleUpload}
                        className="avatar-uploader">
                        <div>
                            <PlusOutlined/>
                        </div>

                    </Upload>}
                </Form.Item>

                <Form.Item
                    label="内容"
                    name="content"
                    rules={[{required: true, message: '请输入文章内容'}]}
                >
                    <ReactQuill
                        className="publish-quill"
                        theme="snow"
                        placeholder="请输入文章内容"
                    />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className='btnSubmit'>
                        {editId ? '修改文章' : '发布文章'}
                    </Button>

                    <Button htmlType="button">
                        存入草稿
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}

import {
  Breadcrumb,
  Button,
  Card,
  Form,
  Input,
  message,
  Radio,
  Select,
  Space,
  Upload,
} from "antd";
import { Link, useSearchParams } from "react-router-dom";
import "./index.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import {
  createArticleUsingPost,
  getArticleByIdUsingGet,
  updateArticleUsingPut,
} from "@/apis/article";
import { PlusOutlined } from "@ant-design/icons";
import { useChannel } from "@/hooks/useChannel";

const { Option } = Select;

const Publish = () => {
  const { channelList } = useChannel();

  // 提交表单
  const articleSubmit = async (formValue) => {
    console.log(formValue);
    // 按照接口文档处理参数
    const { title, content, channel_id } = formValue;
    // 校验图片数据是否一致
    if (imageList.length !== imageType) {
      return message.warning("封面类型与数量不一致");
    }
    const queryData = {
      title: title,
      content: content,
      cover: {
        type: imageType,
        // 这里的url处理逻辑只适用于发布新文章，不适用于编辑文章
        // images: imageList.map((item) => item.response.data.url),
        images: imageList.map((item) => {
          if (item.response) {
            return item.response.data.url;
          } else {
            return item.url;
          }
        }),
      },
      channel_id: channel_id,
    };
    // 提交数据
    if (articleId) {
      // 文章编辑
      await updateArticleUsingPut({ ...queryData, id: articleId });
    } else {
      await createArticleUsingPost(queryData);
    }
  };

  // 上传图片
  const [imageList, setImageList] = useState([]);
  const onUploadChange = (value) => {
    setImageList(value.fileList);
  };

  // 切换上传图片选择显示
  const [imageType, setImageType] = useState(0);

  const onTypeChange = (e) => {
    setImageType(e.target.value);
  };

  // 文章管理跳转时回填数据
  // 获取传过来的ID
  const [searchParams] = useSearchParams();
  const articleId = searchParams.get("id");
  // 获取实例
  const [form] = Form.useForm();
  useEffect(() => {
    const getArticleById = async () => {
      const res = await getArticleByIdUsingGet(articleId);
      const { cover, ...formValue } = res.data;
      // 处理图片选择回显
      form.setFieldsValue({
        ...formValue,
        type: cover.type,
      });

      // 回填图片列表
      setImageType(cover.type);
      // 显示图片
      setImageList(
        cover.images.map((url) => {
          return { url };
        }),
      );
    };

    if (articleId) {
      // id不为空 说明是从文章管理跳转来的 才会执行方法
      getArticleById();
    }
  }, [articleId, form]);

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: `${articleId ? "编辑" : "发布"}文章` },
            ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={articleSubmit}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: "请输入文章标题" }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: "请选择文章频道" }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onTypeChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imageType > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                showUploadList
                action={"http://geek.itheima.net/v1_0/upload"}
                onChange={onUploadChange}
                maxCount={imageType}
                fileList={imageList}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: "请输入文章内容" }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入文章内容"
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Publish;

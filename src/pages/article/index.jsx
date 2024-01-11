import { Link, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Popconfirm,
  Radio,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
// 汉化包 时间选择器是中文的
import locale from "antd/es/date-picker/locale/zh_CN";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import img404 from "@/assets/error.png";
import { useChannel } from "@/hooks/useChannel";
import { useEffect, useState } from "react";
import { delArticleUsingDelete, getArticleListUsingGet } from "@/apis/article";

const { Option } = Select;
const { RangePicker } = DatePicker;
const Article = () => {
  const navigate = useNavigate();
  // 准备列数据
  const columns = [
    {
      title: "封面",
      dataIndex: "cover",
      width: 120,
      render: (cover) => {
        return (
          <img src={cover.images[0] || img404} width={80} height={60} alt="" />
        );
      },
    },
    {
      title: "标题",
      dataIndex: "title",
      width: 220,
    },
    {
      title: "状态",
      dataIndex: "status",
      /**
       *
       * @param data 后端返回的状态status，根据data做条件渲染
       * @returns {JSX.Element} 状态标签
       */
      render: (data) =>
        data === 1 ? (
          <Tag color="warning">待审核</Tag>
        ) : (
          <Tag color="success">审核通过</Tag>
        ),
    },
    {
      title: "发布时间",
      dataIndex: "pubdate",
    },
    {
      title: "阅读数",
      dataIndex: "read_count",
    },
    {
      title: "评论数",
      dataIndex: "comment_count",
    },
    {
      title: "点赞数",
      dataIndex: "like_count",
    },
    {
      title: "操作",
      render: (data) => {
        return (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => navigate(`/publish?id=${data.id}`)}
            />
            <Popconfirm
              title="删除文章"
              description="确认删除文章"
              onConfirm={() => onConfirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // 获取频道列表
  const { channelList } = useChannel();
  // 准备请求数据
  const [queryData, setQueryData] = useState({
    status: "",
    channel_id: "",
    begin_pubdate: "",
    end_pubdate: "",
    page: 1,
    per_page: 4,
  });

  //获取文章列表
  const [articleList, setArticleList] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getArticleList = async () => {
      const res = await getArticleListUsingGet(queryData);
      setArticleList(res.data.results);
      setCount(res.data?.total_count);
    };

    getArticleList();
  }, [queryData]);

  const onFinish = (formValue) => {
    console.log(formValue);
    setQueryData({
      ...queryData,
      status: formValue.status,
      channel_id: formValue.channel_id,
      begin_pubdate: formValue.date[0].format("YYYY-MM-DD"),
      end_pubdate: formValue.date[1].format("YYYY-MM-DD"),
    });
  };

  const onPageChange = (page) => {
    setQueryData({
      ...queryData,
      page,
    });
  };

  // 删除文章
  const onConfirm = async (data) => {
    await delArticleUsingDelete(data.id);
    setQueryData({
      ...queryData,
    });
  };
  return (
    <div>
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to={"/"}>首页</Link> },
              { title: "文章列表" },
            ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: "" }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={""}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select placeholder="请选择文章频道" style={{ width: 120 }}>
              {channelList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${count} 条结果：`}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={articleList}
          pagination={{
            total: count,
            pageSize: queryData.per_page,
            onChange: onPageChange,
          }}
        />
      </Card>
    </div>
  );
};

export default Article;

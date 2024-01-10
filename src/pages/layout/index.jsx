import {
  DiffOutlined,
  EditOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearUserInfo, getUserInfo } from "@/store/modules/user";
import { Layout, Menu, Popconfirm } from "antd";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];
const BasicLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const doMenuClick = (route) => {
    navigate(route.key);
  };

  // 菜单高亮
  // 获取当前页面的路由
  const location = useLocation();
  const selectedKey = location.pathname;

  // 获取用户信息
  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const username = useSelector((state) => state.user.userInfo.name);

  // 用户退出
  const userExit = () => {
    // 清除用户信息
    dispatch(clearUserInfo());
    // 跳转到登录页
    navigate("/login");
  };
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{username}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={userExit}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            onClick={doMenuClick}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;

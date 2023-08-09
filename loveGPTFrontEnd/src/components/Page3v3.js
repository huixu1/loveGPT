import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Input, Dropdown, Tooltip } from "antd";
import "../css/Page3.css";
import React, { useState } from "react";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, children, type) {
  return {
    children,
    label,
    type,
    key,
  };
}

const items = [
  getItem("Today", "sub1", [
    getItem("Title 1", "1"),
    getItem("Title 2", "2"),
    getItem("Title 3", "3"),
    getItem("Title 4", "4"),
  ]),
  getItem("Yesterday", "sub2", [
    getItem("Title 5", "5"),
    getItem("Title 6", "6"),
  ]),
  getItem("Previous 7 days", "sub4", [
    getItem("Title 9", "9"),
    getItem("Title 10", "10"),
    getItem("Title 11", "11"),
    getItem("Title 12", "12"),
  ]),
];

//const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const handleLogout = () => {
  alert("Logout!");
};

const menu = (
  <Menu>
    <Menu.Item key="1" icon={<UserOutlined />}>
      Profile
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="2" icon={<LogoutOutlined />} onClick={handleLogout}>
      Logout
    </Menu.Item>
  </Menu>
);

function Page3() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10vh", // Adjust this to set the container height
  };

  const buttonStyle = {
    /* Add any styling you want for the button here */
    //backgroundColor: "#007bff",
    ":hover": {
      backgroundColor: "#007bff",
    },
  };

  const handleClick = () => {
    alert("Button Clicked!");
  };

  // const [openKeys, setOpenKeys] = useState(["sub1"]);
  // const onOpenChange = (keys) => {
  //   const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
  //   if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
  //     setOpenKeys(keys);
  //   } else {
  //     setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
  //   }
  // };

  const [current, setCurrent] = useState("1");

  const [inputText, setInputText] = useState("");

  const [copiedMessage, setCopiedMessage] = useState([]);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  //const [theme, setTheme] = useState("dark");

  //const onSearch = (value) => console.log(value);
  const [collapsed, setCollapsed] = useState(false);

  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  const handleCopyMessage = () => {
    if (inputText !== "") {
      const newMessage = { content: inputText, type: "sent" };
      //setCopiedMessage([...copiedMessage, newMessage]);

      // Simulate the received message
      const receivedMessage = { content: "Received", type: "received" };
      setCopiedMessage([...copiedMessage, newMessage, receivedMessage]);

      setInputText("");
    }
  };

  //press enter to send msg
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleCopyMessage();
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {/* top */}
        <div className="logo" />
        <div style={containerStyle}>
          <Button style={buttonStyle} onClick={handleClick}>
            + New Chat
          </Button>
        </div>

        {/* middle, chat history */}
        <div style={{ height: "80vh", overflowY: "auto" }}>
          <Menu
            theme="dark"
            onClick={onClick}
            mode="inline"
            defaultOpenKeys={["sub1"]}
            selectedKeys={[current]}
            style={{
              width: 200,
            }}
            items={items}
          />
        </div>

        {/* bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button style={buttonStyle}>User</Button>
          </Dropdown>
        </div>
      </Sider>

      <Layout className="site-layout">
        {/* chat content */}
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          {copiedMessage.map((message, index) => (
            <div
              key={index}
              className={`${
                message.type === "sent" ? "sent" : "respond"
              } message text-wrapper`}
            >
              <div className="message-sender">
                {message.type === "sent" ? "User:" : "LoveGPT:"}
              </div>
              <div className="message-content">{message.content}</div>
            </div>
          ))}
        </Content>

        {/* message input box */}
        <Footer style={{ height: 120 }}>
          <Input.Group compact>
            <Input
              style={{
                width: "calc(100% - 200px)",
                height: 32,
              }}
              value={inputText}
              onChange={handleInput}
              onKeyPress={handleKeyPress}
            />

            <Tooltip title="Send Message">
              <Button
                type="primary"
                onClick={handleCopyMessage}
                icon={<span>&gt;</span>}
              />
            </Tooltip>
          </Input.Group>
          <br />
          <p style={{ textAlign: "center" }}>loveGPT</p>
        </Footer>
      </Layout>
    </Layout>
  );
}
export default Page3;

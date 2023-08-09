import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Input, Dropdown, Tooltip } from "antd";
import "../css/Page3.css";
import React, { useEffect, useRef, useState } from "react";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, children, type) {
  return {
    children,
    label,
    type,
    key,
  };
}

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
  //hard code menu items
  const [items, setItems] = useState([]);

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "10vh",
  };

  const buttonStyle = {
    //backgroundColor: "#007bff",
    ":hover": {
      backgroundColor: "#007bff",
    },
  };

  const [current, setCurrent] = useState("1");

  const [inputText, setInputText] = useState("");

  const [copiedMessage, setCopiedMessage] = useState([]);

  const [collapsed, setCollapsed] = useState(false);

  const chatContentRef = useRef(null);

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  const handleCopyMessage = () => {
    if (inputText !== "") {
      const newMessage = { content: inputText, type: "sent" };
      setCopiedMessage([...copiedMessage, newMessage]);

      // respond message from backend
      const receivedMessage = { content: "Received", type: "received" };
      setCopiedMessage([...copiedMessage, newMessage, receivedMessage]);

      setInputText("");
    }
  };

  // scroll to the bottom of chat content
  const scrollToBottom = () => {
    if (chatContentRef.current) {
      const scrollHeight = chatContentRef.current.scrollHeight;
      const height = chatContentRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chatContentRef.current.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  useEffect(() => {
    // Scroll to the bottom to view a new message
    scrollToBottom();
  }, [copiedMessage]);

  //press enter to send message
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleCopyMessage();
    }
  };

  // Clear the chat content when press "+ New Chat" button
  const handleNewChat = () => {
    const currentDate = new Date().toLocaleDateString();
    const newTitle = `Title ${items.length + 1}`;
    const newItem = getItem(newTitle, `${currentDate}_${items.length + 1}`);
    const updatedItems = [...items];

    const existingDateSubsection = updatedItems.find(
      (item) => item.label === currentDate
    );

    if (existingDateSubsection) {
      existingDateSubsection.children.unshift(newItem);
    } else {
      updatedItems.unshift(
        getItem(currentDate, `sub${updatedItems.length + 1}`, [newItem])
      );
    }

    setCopiedMessage([]);
    setCurrent(newItem.key);
    setItems(updatedItems);
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
          <Button style={buttonStyle} onClick={handleNewChat}>
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
          <div className="chat-content-container" ref={chatContentRef}>
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
          </div>
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

            {/* send message button */}
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

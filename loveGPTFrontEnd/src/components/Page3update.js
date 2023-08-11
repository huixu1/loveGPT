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
import React, { useRef, useState, useEffect } from "react";

const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, children, type) {
  return {
    children,
    label,
    type,
    key,
  };
}

/////////////////////////////////////////////
//simulate get chatHistory from backend

const chatHistory = [
  {
    conversation_id: 1,
    message_list: [
      {
        content: "hello",
        update_time: "8/7/2023",
        sender: "userId",
      },
    ],
  },
  {
    conversation_id: 2,
    message_list: [
      {
        content: "bye",
        update_time: "8/6/2023",
        sender: "userId",
      },
    ],
  },
];

/////////////////////////////////////////////
//simulate get chatGPTresponse from backend
const chatGPTresponse = [
  {
    message: "sunny day",
  },
];

function MenuComponent({ chatHistory }) {
  return (
    <div>
      <div
        className="parent-container"
        style={{
          position: "absolute",
          left: "20px",
        }}
      >
        Previous Chat
        <div className="child-div">
          <ul>
            {chatHistory.map((conversation, index) => (
              <li key={index}>
                <MenuItem messageList={conversation.message_list} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MenuItem({ messageList }) {
  const firstFewWords = messageList[0]?.content
    ? messageList[0].content.split(" ").slice(0, 5).join(" ")
    : "No messages";

  return (
    <div>
      <p>{firstFewWords}</p>
    </div>
  );
}

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

  const [current, setCurrent] = useState("1");

  const [inputText, setInputText] = useState("");

  const [copiedMessage, setCopiedMessage] = useState([]);

  const [newLabel, setNewLabel] = useState("");

  const [items, setItems] = useState([]);

  const [oldChat, setOldChat] = useState([]);

  const chatContentRef = useRef(null);

  const chatReceived = chatGPTresponse.map((chat) => chat.message).join("");

  const onClick = (e) => {
    //console.log("click ", e);
    setCurrent(e.key);
  };

  const [collapsed, setCollapsed] = useState(false);

  // const handleInput = (e) => {
  //   setInputText(e.target.value);
  // };

  const handleInput = (e) => {
    setInputText(e.target.value);
    console.log("handleinput", inputText);
  };
  // useEffect(() => {
  //   // This code will run whenever 'copiedMessage' state changes
  //   console.log("input changed:", inputText);
  //
  // }, [inputText]);

  const handleCopyMessage = () => {
    if (inputText) {
      const newMessage = { content: inputText, type: "sent" };
      setCopiedMessage([...copiedMessage, newMessage]);

      // Simulate the received message
      const receivedMessage = { content: chatReceived, type: "received" };
      setCopiedMessage([...copiedMessage, newMessage, receivedMessage]);

      console.log("copiedmsg in handleCopy", copiedMessage);
      setInputText("");
      console.log("items in handleCopy", items);

      handleTitleUpdate();
    }
  };

  useEffect(() => {
    // This code will run whenever 'copiedMessage' state changes
  }, [copiedMessage]); // Specify 'copiedMessage' as a dependency

  //update menu title with chat window content

  const handleTitleUpdate = () => {
    // Create a new array of items with the updated label
    console.log("check msg before titleUpdate", copiedMessage);

    const updatedItems = items.map((item) => {
      const updatedChildren = item.children.map((child) => {
        if (child.label.startsWith("Title ")) {
          return { ...child, label: newLabel };
        }
        return child;
      });

      return { ...item, children: updatedChildren };
    });

    if (copiedMessage.length > 0 && copiedMessage[0].content) {
      setNewLabel(copiedMessage[0].content.split(" ").slice(0, 3).join(" "));
      console.log("new label", newLabel);
    }

    setItems(updatedItems);
  };

  //new chat effect
  const handleNewChat = () => {
    const currentDate = new Date().toLocaleDateString();
    //const currentDateTime = new Date().toLocaleString();

    const existingDateSubsection = items.find(
      (item) => item.label === currentDate
    );
    // console.log("existing:", existingDateSubsection);
    // console.log("existing's type:", typeof existingDateSubsection);
    // console.log("items:", items.length);
    // console.log("items type", typeof items);

    let newTitle = `Title ${items.length + 1}`;
    let newItem = getItem(newTitle, `${currentDate}_${items.length + 1}`);
    const updatedItems = [...items];
    if (existingDateSubsection) {
      newTitle = `Title ${existingDateSubsection.children.length + 1}`;
      newItem = getItem(
        newTitle,
        `${currentDate}_${items.length + 1}_${
          existingDateSubsection.children.length + 1
        }`
      );
      existingDateSubsection.children.unshift(newItem);
    } else {
      newTitle = `Title 1`;
      console.log("newTitle", newTitle);
      newItem = getItem(newTitle, `${currentDate}_${items.length + 1}_1`);
      console.log("newItem", newItem);
      console.log("items in handle new chat0", items);
      updatedItems.unshift(
        getItem(currentDate, `sub${updatedItems.length + 1}`, [newItem])
      );

      console.log("updateditem in handle new chat if", updatedItems);
      setItems(updatedItems); //updated(newchat 1)
      console.log("items in handle new chat if", items);
    }

    //create new menu item or get expand current child
    // if (existingDateSubsection) {
    //   existingDateSubsection.children.unshift(newItem);
    // } else {
    //   updatedItems.unshift(
    //     getItem(currentDate, `sub${updatedItems.length + 1}`, [newItem])
    //   );
    // }

    setCopiedMessage([]);
    setCurrent(newItem.key);
    setItems(updatedItems); //updated(newchat 1)
    console.log("items in handle new chat", items);
    console.log("current in handle new chat", current);
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
          <Button style={buttonStyle} onClick={handleNewChat}>
            + New Chat
          </Button>
        </div>

        {/* middle, chat history */}
        <div style={{ height: "80vh", overflowY: "auto" }}>
          <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={["sub1"]}
            selectedKeys={[current]}
            style={{
              width: 200,
            }}
            items={items}
          />
          <MenuComponent chatHistory={chatHistory} />
        </div>

        {/* old history */}

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
